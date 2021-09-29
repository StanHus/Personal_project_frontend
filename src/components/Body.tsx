import InputSession from "./InputSession";
import ListSessions from "./ListSessions";
import SuggestionBox from "./Suggestions";
import ListProgress from "./ProgressList";
import {useState} from "react";
import "../css/style.css"


function Body(): JSX.Element {

const [state, setState] = useState(true)

function Switch () {
    state ? setState(false): setState(true)
}

  if(state){
    return (
        <section>
          <body className="body">
            <div className = "input">
            <button onClick = {Switch}>Switch view</button>
             <InputSession />
            </div>
             <SuggestionBox />
             <ListSessions />
          </body>
        </section>
      );
  }
  else {
      return(
          <section>
            <button onClick = {Switch}>Switch view</button>
            <ListProgress />
          </section>

      )
  }
}

export default Body;