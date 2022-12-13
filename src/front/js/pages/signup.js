import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signin = () => {
    fetch(
      "https://3001-4geeksacade-reactflaskh-wp19dils747.ws-eu78.gitpod.io" +
        "/api/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          is_active: true,
        }),
      }
    )
      .then((resp) => resp.json())
      // //////////////
      .then((result) => console.log(result), navigate("/login"));
  };

  return (
    <>
      <div className="container text-center mt-5">
        <h1>Sign Up</h1>
        <div className="row">
          <div className="col"></div>
          <div className="col">
            <div className="mb-3 row">
              <label for="inputEmail" className="col-sm-2 col-form-label">
                Email
              </label>
              <div className="col-sm-10">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  className="form-control"
                  id="inputEmail"
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label for="inputPassword" className="col-sm-2 col-form-label">
                Password
              </label>
              <div class="col-sm-10">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="form-control"
                  id="inputPassword"
                />
              </div>
            </div>
            <button onClick={signin} type="submit" class="btn btn-primary mb-3">
              Create user
            </button>
          </div>
          <div className="col"></div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
