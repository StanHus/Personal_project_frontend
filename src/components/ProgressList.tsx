import React, { Fragment, useEffect, useState } from "react";
import "../css/style.css"

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
      console.log(progress)
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getProgress();
  });

  return (
<Fragment>
  <table>
      <tr>
        <th>Date</th>
        <th>Muscle Group</th>
        <th>Exercise Name</th>
        <th>Sets</th>
        <th>Reps</th>
        <th>Weight</th>
      </tr>
        {progress.map((entry: IEntry) => (
          <tr className = "exercise" key={entry.ex_id}>
            <td>{entry.date}</td>
            <td>{entry.muscle_group}</td>
            <td>{entry.exercise_name}</td>
            <td>{entry.sets}</td>
            <td>{entry.reps}</td>
            <td>{entry.weight}</td>
          </tr>))}
  </table>
  </Fragment>
  );
};

export default ListProgress;