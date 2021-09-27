import React, {useEffect,  Fragment, useState } from "react";

interface ISession {
  id: number,
  muscles_trained: string
}


const EditSession = ({session}: any) => {

  const [muscles_trained, setMuscles_trained] = useState(session.muscles_trained);
  const [sessions, setSessions] = useState([]);
  //edit muscles_trained function ONLY

  const getSessions = async () => {
    try {
      const response = await fetch("https://mysterious-reaches-13528.herokuapp.com/list");
      const jsonData = await response.json();
      setSessions(jsonData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getSessions();
  }, []);

  const updateMuscles_trained = async (e: any)  => {
    e.preventDefault();
    try {
      const body = { muscles_trained };
       await fetch(
        `https://mysterious-reaches-13528.herokuapp.com/${session.id}`,
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

  const deleteSession = async (id: number) => {
    try {
       await fetch(`https://mysterious-reaches-13528.herokuapp.com/${id}`, {
        method: "DELETE"
      });

      setSessions(sessions.filter((session: ISession) => session.id !== id));
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
        data-target={`#id${session.id}`}
      >
        {muscles_trained}
      </button>

      <div
        className="modal"
        id={`id${session.id}`}
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
                className="btn-edit"
                data-dismiss="modal"
                onClick={e => updateMuscles_trained(e)}
              >
                Edit
              </button>
                <button
                  type="button"
                  className="btn-delete"
                  data-dismiss="modal"
                  onClick={() => deleteSession(session.id)}
                >
                  Delete
                </button>
              <button
                type="button"
                className="btn-close"
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