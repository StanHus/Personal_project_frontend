import "../../css/style.css";
import { useAuth } from "../authentification/AuthContext";
import { Fragment, useState } from "react";

const InputSession = () => {
  const options = [
    "Triceps",
    "Chest",
    "Biceps",
    "Back",
    "Shoulders",
    "Rest Day",
  ];
  const { currentUser } = useAuth();
  const [userEmail, setUserEmail] = useState("");
  if (currentUser) {
    setUserEmail(currentUser.email);
  }

  const onSelection = async (input: string, user_email: string) => {
    try {
      const body = { muscles_trained: input, user_email };
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
  if (currentUser === null)
    return (
      <Fragment>
        <h2 className="footer">No user yet</h2>
      </Fragment>
    );
  else {
    return (
      <div>
        <section className="dropdown">
          <h2>Choose a session</h2>
          <select
            onChange={e => {
              onSelection(e.target.value, userEmail);
            }}
          >
            <option className="dropdownelement">
              What are we training today?
            </option>
            {options.map((val: string) => {
              return (
                <option className="dropdownelement" key={val} value={val}>
                  {val}
                </option>
              );
            })}
          </select>
        </section>
      </div>
    );
  }
};

export default InputSession;
