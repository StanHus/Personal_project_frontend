import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

export default function Disclaimer() {
  return (
    <Card className="disclaimer">
      <Card.Body>
        <h3 className="text-center">
          Not Logged In. <Link to="/login">Do that!</Link>
        </h3>
      </Card.Body>
    </Card>
  );
}
