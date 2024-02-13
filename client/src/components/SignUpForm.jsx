import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null); // Limpa mensagens anteriores
    setIsError(false); // Reseta o estado de erro

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Failed to sign up");

      setMessage(data.message || "User created successfully!");
      // Resetando todos os campos após o sucesso
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setIsError(true);
      setMessage(error.message || "Something went wrong!");
    }
  };

  //Para chamar o form de login
  let navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="container w-50 d-flex align-items-center flex-column bg-warning col-4 p-5 mt-5">
      <h1 className="text-center mt-5 mb-5">Register new User</h1>

      {message && (
        <div
          className={`alert alert-${
            isError ? "danger" : "success"
          } alert-dismissible fade show w-100`}
          role="alert"
        >
          {message}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="col-12">
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingFirstName"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <label htmlFor="floatingFirstName">First Name</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingLastName"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <label htmlFor="floatingLastName">Last Name</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingEmail"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="floatingEmail">Email address</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <div className="d-grid gap-2 col-12 mx-auto mt-3">
          <button className="btn btn-primary py-3" type="submit">
            Sign Up
          </button>
        </div>
        <div className="d-grid gap-2 col-6 mx-auto mt-3 float-end">
          <button className="btn btn-info py-3" type="button">
            <a href="/signin"> Sign In</a>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
