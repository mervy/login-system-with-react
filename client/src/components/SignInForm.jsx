import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Substitua esta URL pela URL do seu servidor de autenticação
      const response = await fetch('http://localhost:5000/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token); // Armazena o token
        navigate('/dashboard'); // Substitua '/dashboard' pela sua rota de dashboard
      } else {
        // Tratamento de erros, como login inválido
        alert('Login failed: ' + data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login error: ' + error.message);
    }
  };

  return (
    <div className="container mt-5 w-50">
      <h1 className='text-center p-5'>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group mt-3">
          <label htmlFor="email">Email:</label>
          <input type="email" className="form-control" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="password">Password:</label>
          <input type="password" className="form-control" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="d-grid gap-2 col-12 mx-auto mt-3">
          <button className="btn btn-primary py-3" type="submit">
            Sign In
          </button>
        </div>       
      </form>
    </div>
  );
}

export default SignInForm;
