import "../../css/style.css";
import SortByExercise from "./SortByExercise";
// import SortByMuscle from "./SortByMuscle";
import { useAuth } from "../authentification/AuthContext";
import { Fragment } from "react";

const Analysis = () => {
  const { currentUser } = useAuth();
  const checkUser = (user: any) => (user === null ? false : true);

  return (
    <>
      {checkUser(currentUser) && (
        <Fragment>
          {/* <SortByMuscle /> */}
          <SortByExercise />
        </Fragment>
      )}
      {!checkUser(currentUser) && <p>No User Yet, sign in</p>}
    </>
  );
};

export default Analysis;
