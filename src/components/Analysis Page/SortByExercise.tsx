import React, { Fragment, useEffect, useState } from "react";
import "../../css/style.css"

const SortByExercise = () => {
  const [exercise, setExercise] = useState("")
  const [progression, setProgression] = useState([]);
  const options = ["Dips", "Inclined DB Press"]

  interface IExercise {
    exercise_name: string,
    total_weight: number
  }

  const getProgression = async () => {
    try {
      const response = await fetch("https://mysterious-reaches-13528.herokuapp.com/analysis");
      const jsonData = await response.json();
      setProgression(jsonData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getProgression();
  }, []);

  return (
<Fragment>
   <section className="dropdownMuscles">
          <select
            className="dropdownMuscle"
            value={exercise}
            onChange={(e) => {
              const selectedExercise = e.target.value;
              setExercise(selectedExercise);
            }}
          >
            <option className="dropdownMuscle" value="">Choose an exercise to analyse</option>
            {options.map((val: string) => {
              return (
                <option className="dropdownMuscle" key={val} value={val}>
                  Show {val}
                </option>
              );
            })}
          </select>
        </section>
  <table className = "tableEx">
      <tr className = "exercise">
        <th className = "stat">Exercise Name</th>
        <th className = "stat">Total Weight</th>
      </tr>
        {progression.filter((val: IExercise) => {
              let ans;
              if (exercise === "All") {
                ans = val;
              } else if (val.exercise_name ===exercise) {
                ans = val;
              }
              return ans;
            }).map((entry: IExercise) => (
          <tr className = "exercise" key={entry.total_weight}>
            <td className = "stat">{entry.exercise_name}</td>
            <td className = "stat">{entry.total_weight}</td>
          </tr>))}
  </table>
  </Fragment>
  );
};

export default SortByExercise;