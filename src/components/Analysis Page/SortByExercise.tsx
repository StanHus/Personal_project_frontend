import React, { Fragment, useEffect, useState } from "react";
import "../../css/style.css"
import { Bar } from 'react-chartjs-2';
// import BarChart from "./BarChart";

const SortByExercise = () => {
  const [exercise, setExercise] = useState("")
  const [progression, setProgression] = useState([]);
  const [analysis, setAnalysis] = useState([]);
  const [options, setOptions] = useState([]);
  const [displayChart, setDisplayChart] = useState(false)

  interface IExercise {
    exercise_name: string,
    total_weight: number
    date: string
  }

  interface IAnalysis {
    exercise_name: string,
    total_weight: number, 
    days_trained: number, 
    average_total_weight: number,
    average_weight: number,
    average_sets: number,
    average_reps: number
    min_session: number,
    max_session: number
  }

  interface IListItem {
    exercise_name: string
  }

  const getExercises = async () => {
    try {
      const response = await fetch("https://mysterious-reaches-13528.herokuapp.com/exercises");
      const jsonData = await response.json();
      setProgression(jsonData);
    } catch (err) {
      console.error(err);
    }
  };

  const getAnalysis = async () => {
    try {
      const response = await fetch("https://mysterious-reaches-13528.herokuapp.com/analysis");
      const jsonData = await response.json();
      setAnalysis(jsonData);
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
    getExercises()
    getOptions()
    getAnalysis()
  }, []);

  const list: string[] = []

  const listOptions = () => {
    options.map((entry: IListItem) => list.push(entry.exercise_name))
  }
  listOptions()

  let chartOptions: string[] =[]
  let chartStats: number[] = []

  const filteredProgression = progression.filter((val: IExercise) => (exercise === "All" || val.exercise_name === exercise) ? val :  "")

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
  const increaseWeight = (num: number) => ((num % 4 === 0) ? num+4 : (Math.ceil(num/4))*4)

  const pulledAnalysis = analysis.filter((val: IAnalysis) => (val.exercise_name === exercise)).map((val: IAnalysis) => (<div><p>You trained {val.exercise_name} {val.days_trained} {(val.days_trained > 1) ? "times" : "time"}. The average weight per rep per session was {Math.floor(val.average_total_weight)} kgs. This means next time you ideally need to do {Math.ceil(val.average_sets)} sets, with {Math.ceil(val.average_reps)} reps each, with a weight of at least {increaseWeight(val.average_weight/(val.average_reps*val.average_sets))} kgs. 
  </p>
  <p>Since you started, you have increased your total weight in this exercise by a factor of {(val.max_session/val.min_session).toFixed(2)}. That's a {(val.max_session/val.min_session) >1.5 ? "great" : "solid"} job!</p>
  <p>Your min weight per session was {val.min_session}. If you are feeling tired, do at least {val.average_sets} sets of {val.average_reps} reps with {increaseWeight(val.min_session/(val.average_reps*val.average_sets))} kgs</p>
  <p>Your max weight per session was {val.max_session} - to top that you will need to do {val.average_sets} sets of {val.average_reps} reps with {increaseWeight(val.max_session/(val.average_reps*val.average_sets))} kgs. Are you up to the task?</p>
  </div>))
  


  return (
<Fragment>
  <body>
    <h2 className= "subHeading">Individual Exercise Insights</h2>
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
            <p className ="analysisText">{pulledAnalysis}</p>
  <table className = "tableEx">
      <tr className = "exercise">
        <th className = "stat">Exercise Name</th>
        <th className = "stat">Total Weight</th>
      </tr>
        {progressionMappped}
  </table>
    <button className = "showButton" onClick = {() => (
      displayChart ? setDisplayChart(false): setDisplayChart(true))}>{!displayChart ? "Illustate" : "Hide chart"}</button>
    {displayChart && <Bar className = "barchart"data={chartData} />}
</body>
</Fragment>)};

export default SortByExercise;