import React, { Fragment, useEffect, useState } from "react";
import EditSession from "./EditSession";
import "../css/style.css"
import "../App.css"

interface ISession {
  id: number,
  muscles_trained: string
}

const ListSessions = () => {
  const [sessions, setSessions] = useState([]);

  //delete session function

  const deleteSession = async (id: number) => {
    try {
        await fetch(`https://mysterious-reaches-13528.herokuapp.com/list/${id}`, {
        method: "DELETE"
      });
      setSessions(sessions.filter((session: ISession) => session.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  async function openSession (id: number) {
    console.log("trying")
    try {
        const response = await fetch(`https://mysterious-reaches-13528.herokuapp.com/list/${id}`, {
        method: "GET"
      });
      console.log(id)
      window.location.href = `https://mysterious-reaches-13528.herokuapp.com/list/${id}`;
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

  function myhref(id: number) {
    window.location.href = `https://mysterious-reaches-13528.herokuapp.com/list/${id}`;
}

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
          {sessions.map((session: ISession) => (
            <tr className = "entry" key={session.id}>
              <td><button onClick = {() => myhref(session.id)}>{session.muscles_trained}</button></td>
              {/* <td>
                <EditSession session={session} />
              </td>
              <td>
                <button
                  className="delete_button"
                  onClick={() => deleteSession(session.id)}
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