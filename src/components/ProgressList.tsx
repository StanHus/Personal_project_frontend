import React, { Fragment, useEffect, useState } from "react";
import "../css/style.css"
import InputExercise from "./InputExercise";

const ListProgress = () => {
  const [progress, setProgress] = useState([]);

  interface IEntry {
    ex_id: number,
    date: string,
    muscle_group: string,
    exercise_name: string,
    sets: number,
    reps: number,
    weight: number
  }

  const getProgress = async () => {
    try {
      const response = await fetch("https://mysterious-reaches-13528.herokuapp.com/progress");
      const jsonData = await response.json();
      setProgress(jsonData);
      console.log("I am an issue")
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getProgress();
  }, []);

  return (
<Fragment>
  <InputExercise />
  <table className = "tableEx">
      <tr className = "exercise">
        <th className = "stat">Date</th>
        <th className = "stat">Muscle Group</th>
        <th className = "stat">Exercise Name</th>
        <th className = "stat">Sets</th>
        <th className = "stat">Reps</th>
        <th className = "stat">Weight</th>
      </tr>
        {progress.map((entry: IEntry) => (
          <tr className = "exercise" key={entry.ex_id}>
            <td className = "stat">{entry.date.slice(0,10)}</td>
            <td className = "stat">{entry.muscle_group}</td>
            <td className = "stat">{entry.exercise_name}</td>
            <td className = "stat">{entry.sets}</td>
            <td className = "stat">{entry.reps}</td>
            <td className = "stat">{entry.weight}</td>
          </tr>))}
  </table>
  </Fragment>
  );
};

export default ListProgress;