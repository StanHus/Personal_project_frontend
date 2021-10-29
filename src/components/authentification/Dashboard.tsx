import { Card, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import { useAuth } from "./AuthContext";
import { useHistory } from "react-router";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");
    try {
      await logout();
      history.push("/login");
    } catch (error) {
      setError("Failed to Log Out");
    }
  }

  return (
    <>
      <Card className="signUp">
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email: </strong>
          {currentUser.email}
        </Card.Body>
        <div className="w-100 text-center mt-2">
          <Button variant="link" onClick={handleLogout}>
            Log Out
          </Button>
        </div>
      </Card>
    </>
  );
}
