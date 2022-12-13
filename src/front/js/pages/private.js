import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Private = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
    fetch(
      "https://3001-4geeksacade-reactflaskh-wp19dils747.ws-eu78.gitpod.io" +
        "/api/private",
      {
        method: "GET",
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }
    )
      .then((resp) => resp.json())

      .then((result) => {
        setEmail(result.email);
      });
  }, []);

  return (
    <>
      <div className="row">
        <div className="col"></div>
        <div className="col">
          <h1>Página privada del usuario {email}</h1>
        </div>
        <div className="col"></div>
      </div>
    </>
  );
};

export default Private;
