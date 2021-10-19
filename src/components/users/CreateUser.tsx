import { useState } from "react";
import "../../css/style.css";
import LoginPage from "./LogMeIn";

export default function SignUp() {
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [completed, setCompleted] = useState(false);

  const onSubmitForm = async (e: any) => {
    if (userName !== "" && email !== "" && password !== "") {
      e.preventDefault();
      try {
        await fetch("https://mysterious-reaches-13528.herokuapp.com/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userName: userName,
            email: email,
            password: password,
          }),
        });
      } catch (err) {
        console.error(err);
      }
      setCompleted(true);
    } else {
      return <h2>You must enter all, no user was created</h2>;
    }
  };

  const toLogin = () => {
    window.location.href = "/login";
  };

  if (!completed) {
    return (
      <section>
        <h2 className="subheader">Create an account</h2>
        <form className="inputs" onSubmit={onSubmitForm}>
          <input
            type="text"
            placeholder="Username"
            className="ex-input"
            value={userName}
            onChange={e => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="email"
            className="ex-input"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Password"
            className="ex-input"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button className="btn-success">Add</button>
        </form>
      </section>
    );
  } else {
    return (
      <div>
        <h2>User Created</h2>
        <button onClick={toLogin}>Proceed to the Log In Page</button>
      </div>
    );
  }
}
