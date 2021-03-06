import React, { Fragment, useEffect, useState } from "react";
import "../../css/style.css";
import InputExercise from "./InputExercise";
import { useAuth } from "../authentification/AuthContext";
import Disclaimer from "../Main Body/Disclaimer";

const ListProgress = () => {
  const [progress, setProgress] = useState([]);
  const { currentUser } = useAuth();
  const checkUser = (user: any) => (user === null ? false : true);

  interface IEntry {
    session_id: number;
    date: string;
    muscle_group: string;
    exercise_name: string;
    sets: number;
    reps: number;
    weight: number;
    user_email: string;
  }

  const getProgress = async () => {
    try {
      const response = await fetch(
        "https://mysterious-reaches-13528.herokuapp.com/progressFull"
      );
      const jsonData = await response.json();
      setProgress(jsonData);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteExercise = async (id: number) => {
    await fetch(
      `https://mysterious-reaches-13528.herokuapp.com/progress/${id}`,
      {
        method: "DELETE",
      }
    );
    setProgress(progress.filter((entry: IEntry) => entry.session_id !== id));
    window.location.href = "/progress";
  };

  useEffect(() => {
    getProgress();
  }, []);

  return (
    <Fragment>
      {!checkUser(currentUser) && <Disclaimer />}
      {checkUser(currentUser) && (
        <section>
          <InputExercise />
          <table className="tableEx">
            <tr className="exercise">
              <th className="stat">Date</th>
              <th className="stat">Muscle Group</th>
              <th className="stat">Exercise Name</th>
              <th className="stat">Sets</th>
              <th className="stat">Reps</th>
              <th className="stat">Weight</th>
              <th className="stat">Delete</th>
            </tr>
            {progress
              // eslint-disable-next-line
              .filter((entry: IEntry) => {
                if (checkUser(currentUser)) {
                  return entry.user_email === currentUser.email;
                }
              })
              .map((entry: IEntry) => (
                <tr className="exercise" key={entry.session_id}>
                  <td className="stat">{entry.date.slice(0, 10)}</td>
                  <td className="stat">{entry.muscle_group}</td>
                  <td className="stat">{entry.exercise_name}</td>
                  <td className="stat">{entry.sets}</td>
                  <td className="stat">{entry.reps}</td>
                  <td className="stat">{entry.weight}</td>
                  <td className="stat">
                    <button
                      type="button"
                      className="btn-delete"
                      data-dismiss="modal"
                      onClick={() => deleteExercise(entry.session_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </table>
        </section>
      )}
    </Fragment>
  );
};

export default ListProgress;
