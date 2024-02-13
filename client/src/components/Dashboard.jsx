import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import UsersList from "./UsersList";

function Dashboard() {
  return (
    <>
      <Navbar />
      {/* <div className="container">
        <h2 className="p-3">Users</h2>
        <table class="table table-striped container">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td colspan="2">Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
      </div> */}
       <UsersList />
      <Footer />
    </>
  );
}

export default Dashboard;
