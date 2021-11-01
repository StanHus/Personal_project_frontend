import React, { Fragment, useEffect, useState } from "react";
import EditSession from "./EditSession";
import "../../css/style.css";
import { useAuth } from "../authentification/AuthContext";

interface ISession {
  id: number;
  muscles_trained: string;
  user_email: string;
}

const ListSessions = () => {
  const [sessions, setSessions] = useState([]);
  const { currentUser } = useAuth();

  const getSessions = async () => {
    try {
      const response = await fetch(
        "https://mysterious-reaches-13528.herokuapp.com/list"
      );
      const jsonData = await response.json();
      setSessions(jsonData);
    } catch (err) {
      console.error(err);
    }
  };

  const checkUser = (user: any) => (user === null ? false : true);

  useEffect(() => {
    getSessions();
  }, []);

  return (
    <Fragment>
      {!checkUser(currentUser) && <p>No User Yet. Sign In!</p>}
      {checkUser(currentUser) && (
        <section>
          <section className="days">
            <p className="day">
              <strong>Mon</strong>
            </p>
            <p className="day">
              <strong>Tue</strong>
            </p>
            <p className="day">
              <strong>Wed</strong>
            </p>
            <p className="day">
              <strong>Thu</strong>
            </p>
            <p className="day">
              <strong>Fri</strong>
            </p>
            <p className="day">
              <strong>Sat</strong>
            </p>
            <p className="day">
              <strong>Sun</strong>
            </p>
          </section>
          <table className="list">
            <tbody className="containers">
              {sessions
                // eslint-disable-next-line
                .filter((session: ISession) => {
                  if (checkUser(currentUser)) {
                    return session.user_email === currentUser.email;
                  }
                })
                .map((session: ISession) => (
                  <tr className="entry" key={session.id}>
                    <td>
                      <EditSession session={session} />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>
      )}
    </Fragment>
  );
};

export default ListSessions;
