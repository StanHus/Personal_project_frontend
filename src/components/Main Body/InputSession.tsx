import "../../css/style.css";
import { useAuth } from "../authentification/AuthContext";

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
  const checkUser = (user: any) => (user === null ? false : true);
  const onSelection = async (input: string) => {
    try {
      const body = { muscles_trained: input, user_email: currentUser.email };
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
          <h2>Choose a session</h2>
          <select
            onChange={e => {
              onSelection(e.target.value);
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
      )}
    </div>
  );
};

export default InputSession;
