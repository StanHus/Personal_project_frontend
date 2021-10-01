import "../../css/style.css"
import {useState, useEffect} from "react";

export default function SuggestionBox (): JSX.Element {
    const [answer, setAnswer] = useState("crunches")

    const suggestPlease = async () => {
          try {
            const response = await fetch("https://mysterious-reaches-13528.herokuapp.com/suggest");
            const jsonData = await response.json();
            setAnswer(jsonData.answer)
          } catch (err) {
            console.error(err);
          }
        };

        useEffect(() => {
           suggestPlease();
          });

    return(
        <main>
            <h3 className = "suggestion-box">Today, it is best to have a {answer} Day</h3>
        </main>
    )
}