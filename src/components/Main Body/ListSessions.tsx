import React, { Fragment, useEffect, useState } from "react";
import EditSession from "./EditSession";
import "../../css/style.css"


interface ISession {
  id: number,
  muscles_trained: string
}

const ListSessions = () => {
  const [sessions, setSessions] = useState([]);

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

  return (
    <Fragment>
      {" "}
        <section className = "days">
            <p className = "day"><strong>Mon</strong></p>
            <p className = "day"><strong>Tue</strong></p>
            <p className = "day"><strong>Wed</strong></p>
            <p className = "day"><strong>Thu</strong></p>
            <p className = "day"><strong>Fri</strong></p>
            <p className = "day"><strong>Sat</strong></p>
            <p className = "day"><strong>Sun</strong></p>
        </section>
      <table className = "list">
        <tbody className = "containers">
          {sessions.map((session: ISession) => (
            <tr className = "entry" key={session.id}>
               <td>
                <EditSession session={session} />
              </td>
            </tr>))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListSessions;