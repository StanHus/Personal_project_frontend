import React, { Fragment, useEffect, useState } from "react";
import "../../css/style.css";
import { IEntry, IListMuscleGroup } from "./interfaces";
import { useAuth } from "../authentification/AuthContext";

const SortByMuscle = () => {
  const [progress, setProgress] = useState([]);
  const [muscle, setMuscle] = useState("");
  const [options, setOptions] = useState([]);
  const { currentUser } = useAuth();

  const getProgress = async () => {
    try {
      const response = await fetch(
        "https://mysterious-reaches-13528.herokuapp.com/progress"
      );
      const jsonData = await response.json();
      setProgress(jsonData);
    } catch (err) {
      console.error(err);
    }
  };

  const getOptions = async () => {
    try {
      const response = await fetch(
        "https://mysterious-reaches-13528.herokuapp.com/muscleOptions"
      );
      const jsonData = await response.json();
      setOptions(jsonData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getProgress();
  }, []);

  return (
    <Fragment>
      <body>
        <h2 className="subHeading">Exercises Filtered by Muscle Group</h2>
        <section className="dropdownMuscles">
          <select
            className="dropdownMuscle"
            value={muscle}
            onChange={e => {
              const selectedMuscle = e.target.value;
              setMuscle(selectedMuscle);
            }}
          >
            <option className="dropdownMuscle" value="">
              Hide all
            </option>
            {options
              .filter(
                (val: IListMuscleGroup) => val.user_email === currentUser.email
              )
              .map((val: string) => {
                return (
                  <option className="dropdownMuscle" key={val} value={val}>
                    Show only {val}
                  </option>
                );
              })}
          </select>
        </section>
        <table className="tableEx">
          <tr className="exercise">
            <th className="stat">Date</th>
            <th className="stat">Muscle Group</th>
            <th className="stat">Exercise Name</th>
            <th className="stat">Sets</th>
            <th className="stat">Reps</th>
            <th className="stat">Weight</th>
          </tr>
          {progress
            // eslint-disable-next-line
            .filter((val: IEntry) => {
              if (val.user_email === currentUser.email) {
                let ans;
                if (muscle === "All") {
                  ans = val;
                } else if (val.muscle_group === muscle) {
                  ans = val;
                }
                return ans;
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
              </tr>
            ))}
        </table>
      </body>
    </Fragment>
  );
};

export default SortByMuscle;
