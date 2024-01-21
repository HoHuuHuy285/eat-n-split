import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function Button({ children, onIsOpen }) {
  return (
    <button className="button" onClick={onIsOpen}>
      {children}
    </button>
  );
}

export default function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friendList, setFriendList] = useState(initialFriends);

  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }

  function handleAddFriend(friend) {
    setFriendList((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friendList={friendList} />
        {showAddFriend && <FormAddFriend onFriendList={handleAddFriend} />}

        <Button isOpen={showAddFriend} onIsOpen={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      <FormSplitBill />
    </div>
  );
}

function FriendsList({ friendList }) {
  return (
    <ul>
      {friendList.map((f) => (
        <Friend key={f.id} name={f.name} img={f.image} balance={f.balance} />
      ))}
    </ul>
  );
}

function Friend({ name, img, balance }) {
  return (
    <li>
      <h3>{name}</h3>
      <img src={img} alt={name} />
      {balance === 0 && <p>{`You and ${name} are even`}</p>}

      {balance > 0 && <p className="green">{`${name} owe you ${balance}$`}</p>}

      {balance < 0 && <p className="red">{`You owe ${name} ${balance}$`}</p>}

      <Button> Select</Button>
    </li>
  );
}

function FormAddFriend({ onFriendList, onShowAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };
    console.log(newFriend);
    onFriendList(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>💂‍♀️Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>

      <label>🖼Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      ></input>

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with X</h2>

      <label>💰Bill Value</label>
      <input type="text"></input>

      <label>🐧Your expense</label>
      <input type="text"></input>

      <label>👭X's expense</label>
      <input type="text" disabled></input>

      <label>🤑Who is paying the bill</label>
      <select>
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
}
