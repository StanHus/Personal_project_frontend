import React, { Fragment, useEffect, useState } from "react";
import EditSession from "./EditSession";
import "../css/style.css"
import "../App.css"

const ListSessions = () => {
  const [sessions, setSessions] = useState([]);


  //delete session function

  const deleteSession = async (id) => {
    try {
        await fetch(`https://mysterious-reaches-13528.herokuapp.com/list/${id}`, {
        method: "DELETE"
      });
      setSessions(sessions.filter(session => session.session_id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const openSession = async (id) => {
    try {
        const response = await fetch(`https://mysterious-reaches-13528.herokuapp.com/list/${id}`, {
        method: "GET"
      });
      const jsonData = await response.json();  
      return jsonData
    } catch (err) {
      console.error(err);
    }
  };


  const getSessions = async () => {
    try {
      const response = await fetch("https://mysterious-reaches-13528.herokuapp.com/list");
      const jsonData = await response.json();
      setSessions(jsonData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getSessions();
  }, []);

  console.log(sessions);

  return (
    <Fragment>
      {" "}
        <section className = "days">
            <p className = "day">Mon</p>
            <p className = "day">Tue</p>
            <p className = "day">Wed</p>
            <p className = "day">Thu</p>
            <p className = "day">Fri</p>
            <p className = "day">Sat</p>
            <p className = "day">Sun</p>
        </section>
      <table className = "list">
        <tbody className = "containers">
          {sessions.map(session => (
            <tr className = "entry" key={session.session_id}>
              <td><button onClick = {() => openSession(session.session_id)}>{session.muscles_trained}</button></td>
              {/* <td>
                <EditSession session={session} />
              </td>
              <td>
                <button
                  className="delete_button"
                  onClick={() => deleteSession(session.session_id)}
                >
                  Delete
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListSessions;