import "../../css/style.css";
import { useAuth } from "../authentification/AuthContext";
import { useState } from "react";

const InputSession = () => {
  const [session, setSession] = useState("");
  const { currentUser } = useAuth();
  const checkUser = (user: any) => (user === null ? false : true);

  const onSelection = async () => {
    try {
      const body = { muscles_trained: session, user_email: currentUser.email };
      await fetch("https://mysterious-reaches-13528.herokuapp.com/list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      window.location.href = "/";
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {checkUser(currentUser) && (
        <section className="dropdown">
          <h2>Input a session</h2>
          <form className="input">
            <input
              type="text"
              placeholder="Session"
              className="ex-input"
              value={session}
              onChange={e => setSession(e.target.value)}
            />
            <button
              onClick={() => {
                onSelection();
              }}
              className="btn-success"
            >
              Add
            </button>
          </form>
        </section>
      )}
    </div>
  );
};

export default InputSession;
