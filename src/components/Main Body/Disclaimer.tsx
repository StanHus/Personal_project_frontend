import { Link } from "react-router-dom";

export default function Disclaimer() {
  return (
    <p className="disclaimer">
      Not Logged In. <Link to="/login">Come here</Link> to log in!
    </p>
  );
}
