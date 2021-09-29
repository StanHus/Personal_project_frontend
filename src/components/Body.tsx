import InputSession from "./InputSession";
import ListSessions from "./ListSessions";
import SuggestionBox from "./Suggestions";
import ListProgress from "./ProgressList";
import "../css/style.css"
import { useState } from "react";
import {BrowserRouter, Link, Switch, Route} from "react-router-dom";



function Body(): JSX.Element {

    const [state, setState] = useState(true)



    return(
        <>
         <BrowserRouter>
            <nav>
                   {state && 
                        <button className="switchButton">
                        <Link onClick={() => setState(false)} className = "navlink" to="/progress">Exercises</Link>
                    </button>}
                    {!state &&             
                    <button className="switchButton">                        
                        <Link onClick={() => setState(true)} className = "navlink" to="/">Main Page</Link>
                    </button>}                            
            </nav>
            <main>

                <Switch>
                    <Route exact path = "/">
                        <section>
                         <body className="body">
                         <div className = "input">
                          <InputSession />
                           </div>
                          <SuggestionBox />
                          <ListSessions />
                       </body>
                        </section>
                    </Route>
                    <Route exact path = "/progress">
                    <section>
                     <ListProgress />
                    </section>
                    </Route>
                </Switch>
            </main>
         </BrowserRouter>
        </>
    )
//   if(state){
//     return (
        // <section>
        // <button className = "switchButton" onClick = {Switch}>{buttonName}</button>
        //   <body className="body">
        //     <div className = "input">
        //      <InputSession />
        //     </div>
        //      <SuggestionBox />
        //      <ListSessions />
        //   </body>
        // </section>
//       );
//   }
//   else {
//       return(
        //   <section>
        //     <button className = "switchButton" onClick = {Switch}>{buttonName}</button>
        //     <ListProgress />
        //   </section>

//       )
//   }
}

export default Body;