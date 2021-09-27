import React, { Fragment, useState } from "react";
import "../css/style.css"
import "../App.css"

const InputSession = () => {
  const [muscles_trained, setMuscles_trained] = useState("");

  const onSubmitForm = async (e: any) => {
    e.preventDefault();
    try {
      const body = { muscles_trained};
         await fetch("https://mysterious-reaches-13528.herokuapp.com/list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      window.location.href = "/";
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Fragment>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
          type="text"
          placeholder="Put the training here"
          className="form-control"
          value={muscles_trained}
          onChange={e => setMuscles_trained(e.target.value)}
        />
        <button className="btn-success">Add</button>
      </form>
    </Fragment>
  );
};

export default InputSession;