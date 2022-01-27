// Page that shows a message to the user that their password has been reset

import "./Login.css";
import { Link } from "react-router-dom";

export default function ResetConfirmation() {
  return (
    <div className={"login"}>
      <div className={"login-form"}>
        <h3>Reset Confirmed</h3>
        Please check your email for a reset link
        <br />
        <br />
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}
