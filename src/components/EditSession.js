import React, { Fragment, useState } from "react";
import "../App.css"

const EditSession = ({session}) => {
  const [muscles_trained, setMuscles_trained] = useState(session.muscles_trained);

  const updateMuscles_trained = async (e)  => {
    e.preventDefault();
    try {
      const body = { muscles_trained };
      const response = await fetch(
        `https://mysterious-reaches-13528.herokuapp.com/list/${session.session_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );
      window.location.href = "/";
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Fragment>
      <button
        type="button"
        className="edit_button"
        data-toggle="modal"
        data-target={`#id${session.session_id}`}
      >
        Edit
      </button>

      <div
        className="modal"
        id={`id${session.session_id}`}
        onClick={() => setMuscles_trained(session.muscles_trained)}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit session</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={() => setMuscles_trained(session.muscles_trained)}
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={muscles_trained}
                onChange={e => setMuscles_trained(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
                onClick={e => updateMuscles_trained(e)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={() => setMuscles_trained(session.muscles_trained)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditSession;