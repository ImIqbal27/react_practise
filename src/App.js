import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/user`)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleAddUser = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const phone = parseInt(e.target.phone.value);
    const user = { name, email, phone };

    fetch(`http://localhost:5000/user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const newUsers = [...users, user];
        setUsers(newUsers);
      })
      .catch((err) => console.error(err));

    e.target.reset();

    console.log(user);
  };
  return (
    <div className="App">
      <form onSubmit={handleAddUser}>
        <label>Name :</label>
        <input type="text" name="name" /> <br />
        <label>Email :</label>
        <input type="email" name="email" /> <br />
        <label>Phone :</label>
        <input type="number" name="phone" min={3} /> <br />
        <button type="submit">Add User</button>
      </form>
      <hr />
      User total : {users.length}
      {users.map((user, i) => (
        <p key={i}>
          {/* {user._id} */}
          {user.name}
          {"  ----"}
          {user.email}
          {"  ----"}
          {user.phone}
        </p>
      ))}
    </div>
  );
}

export default App;
