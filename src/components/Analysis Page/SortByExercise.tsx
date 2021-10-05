import React, { Fragment, useEffect, useState } from "react";
import "../../css/style.css"
import { Bar } from 'react-chartjs-2';
// import BarChart from "./BarChart";

const SortByExercise = () => {
  const [exercise, setExercise] = useState("")
  const [progression, setProgression] = useState([]);
  const [options, setOptions] = useState([]);
  const [displayChart, setDisplayChart] = useState(false)

  interface IExercise {
    exercise_name: string,
    total_weight: number
    date: string
  }

  interface IListItem {
    exercise_name: string
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

  const getOptions = async () => {
    try {
      const response = await fetch("https://mysterious-reaches-13528.herokuapp.com/options");
      const jsonData = await response.json();
      setOptions(jsonData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getProgression()
    getOptions()
  }, []);

  const list: string[] = []

  const listOptions = () => {
    options.map((entry: IListItem) => list.push(entry.exercise_name))
  }
  listOptions()

  console.log(list)

  const filteredProgression = progression.filter((val: IExercise) => {
    let ans;
    if (exercise === "All") {
      ans = val;
    } else if (val.exercise_name ===exercise) {
      ans = val;
    }
    return ans;
  })

  let chartOptions: string[] =[]
  let chartStats: number[] = []

const progressionMappped = filteredProgression.map((entry: IExercise) => {
  chartStats.push(entry.total_weight)
  chartOptions.push(entry.date.slice(0,10))
  return (
    <tr className = "exercise" key={entry.total_weight}>
      <td className = "stat">{entry.exercise_name}</td>
      <td className = "stat">{entry.total_weight}</td>
    </tr>)})

const chartData = {
  labels:chartOptions,
  datasets: [
    {
      label: 'Total Weight',
      data: chartStats,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
      ],
      borderWidth: 2,
    },
  ],
};


  return (
<Fragment>
  <body>
    <h2 className= "subHeading">Analysis by Exercise</h2>
   <section className="dropdownMuscles">
          <select
            className="dropdownMuscle"
            value={exercise}
            onChange={(e) => {
              const selectedExercise = e.target.value;
              setExercise(selectedExercise);
            }}
          >
            <option className="dropdownMuscle" value="">Hide all</option>
            {list.map((val: string) => {
              return (
                <option className="dropdownMuscle" key={val} value={val}>{val}</option>
              );
            })}
          </select>
        </section>
  <table className = "tableEx">
      <tr className = "exercise">
        <th className = "stat">Exercise Name</th>
        <th className = "stat">Total Weight</th>
      </tr>
        {progressionMappped}
  </table>
    <button className = "showButton" onClick = {() => (
      displayChart ? setDisplayChart(false): setDisplayChart(true))}>Draw it for me</button>
    {displayChart && <Bar className = "barchart"data={chartData} />}
</body>
</Fragment>)};

export default SortByExercise;