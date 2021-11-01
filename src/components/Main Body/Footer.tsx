import "../../css/style.css";
import { useAuth } from "../authentification/AuthContext";

export default function Footer(): JSX.Element {
  const { currentUser } = useAuth();

  if (currentUser !== null) {
    return <p className="footer">You are doing great, champ!</p>;
  } else {
    return <p></p>;
  }
}
