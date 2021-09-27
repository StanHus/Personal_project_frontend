import React, { Fragment } from "react";
import InputSession from "./components/InputSession";
import ListSessions from "./components/ListSessions";
import Header from "./components/Header";
import Footer from "./components/Footer"
import "./css/style.css"

function App() {
  return (
    <Fragment>
      <Header />
      <body className="body">
      <div className = "input">
        <InputSession />
      </div>
        <ListSessions />
      </body>
      <Footer />
    </Fragment>
  );
}

export default App;