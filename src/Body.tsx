import InputSession from "./components/Main Body/InputSession";
import ListSessions from "./components/Main Body/ListSessions";
import SuggestionBox from "./components/Main Body/Suggestions";
import ListProgress from "./components/ProgressPage/ProgressList";
import Analysis from "./components/Analysis Page/AnalysisMain";
import "../../css/style.css"
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
                    {!state &&             
                    <button className="switchButton">                        
                        <Link onClick={() => setState(true)} className = "navlink" to="/analysis">Analysis</Link>
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
                    <Route exact path = "/analysis">
                        <section>
                            <Analysis />
                        </section>
                    </Route>
                </Switch>
            </main>
         </BrowserRouter>
        </>
    )
}

export default Body;