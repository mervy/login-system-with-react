import React from 'react';

function Dashboard() {
    return (
  
     <nav className="navbar bg-body-tertiary">
     <div className="container-fluid">
       <a className="navbar-brand"><h1>Dashboard</h1></a>
       <form className="d-flex" role="search">
         <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
         <button className="btn btn-outline-success" type="submit">Search</button>
       </form>
     </div>
   </nav>
    );
}

export default Dashboard;
