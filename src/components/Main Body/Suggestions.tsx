import "../../css/style.css";
import { useState, useEffect } from "react";
import { useAuth } from "../authentification/AuthContext";

export default function SuggestionBox(): JSX.Element {
  const [answer, setAnswer] = useState("crunches");
  const { currentUser } = useAuth();
  const checkUser = (user: any) => (user === null ? false : true);
  const isStan = () => {
    if (checkUser(currentUser)) {
      return currentUser.email === "guseletovs@gmail.com" ? true : false;
    }
    return false;
  };

  const suggestPlease = async () => {
    try {
      const response = await fetch(
        "https://mysterious-reaches-13528.herokuapp.com/suggest"
      );
      const jsonData = await response.json();
      setAnswer(jsonData.answer);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    suggestPlease();
  });

  return (
    <main>
      {isStan() && (
        <h3 className="suggestion-box">
          Today, it is best to have a {answer} Day
        </h3>
      )}
    </main>
  );
}
