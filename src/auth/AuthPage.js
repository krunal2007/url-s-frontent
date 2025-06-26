import { useEffect, useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import { useSelector } from "react-redux";

function AuthPage() {
  const [showSignUp, setShowSignUp] = useState(false);
  const { isRegistered } = useSelector((state) => state.user);

  useEffect(() => {
    if (isRegistered) {
      setShowSignUp(false);
    }
  }, [isRegistered]);

  return (
    // sign-up-mode
    <div className={`container ${showSignUp ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <Login />
          <SignUp />
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>
              Sign up to generate unlimited custom shorten urls and manage them
              for free.
            </p>
            <button
              onClick={() => {
                setShowSignUp(true);
              }}
              className="btn transparent"
              id="sign-up-btn"
            >
              Sign up
            </button>
          </div>

          <img src="img/log.svg" className="image" alt="" />
        </div>

        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>
              If you already have an account, go ahead and sign in to manage all
              your shortened urls.
            </p>
            <button
              onClick={() => {
                setShowSignUp(false);
              }}
              className="btn transparent"
              id="sign-in-btn"
            >
              Sign in
            </button>
          </div>

          <img src="img/register.svg" className="image" alt="" />
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
