import "../css/style.css"
import "../App.css"
import {useState} from "react"

const InputExercise = () => {

    const [date, setDate] = useState("")
    const [muscle_group, setMuscle_group] = useState("")
    const [exercise_name, setExercise_name] = useState("")
    const [sets, setSets] = useState("")
    const [reps, setReps] = useState("")
    const [weight, setWeight] = useState("")
  
    const onSubmitForm = async (e: any) => {
        e.preventDefault();
    try {
        await fetch("https://mysterious-reaches-13528.herokuapp.com/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            date: date,
            muscle_group: muscle_group,
            exercise_name: exercise_name,
            sets: sets,
            reps: reps,
            weight: weight

          }),
      });
      window.location.href = "/progress";
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2 className = "subheader">Input the stats</h2>
      <form className = "inputs" onSubmit={onSubmitForm}>
        <input
          type="text"
          placeholder="Date"
          className="form-control"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Muscle Group"
          className="form-control"
          value={muscle_group}
          onChange={e => setMuscle_group(e.target.value)}
        />
        <input
          type="text"
          placeholder="Ex name"
          className="form-control"
          value={exercise_name}
          onChange={e => setExercise_name(e.target.value)}
        />
        <input
          type="text"
          placeholder="Sets"
          className="form-control"
          value={sets}
          onChange={e => setSets(e.target.value)}
        />
        <input
          type="text"
          placeholder="Reps"
          className="form-control"
          value={reps}
          onChange={e => setReps(e.target.value)}
        />
        <input
          type="text"
          placeholder="Weight"
          className="form-control"
          value={weight}
          onChange={e => setWeight(e.target.value)}
        />
        <button className = "btn-success">Add</button>
      </form>
    </div>
  );
};

export default InputExercise;
