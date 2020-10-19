import React, { Component } from "react";
import "../components/common/not-found.css";

class Customers extends Component {
  render() {
    return (
      <div id="notfound">
        <div class="notfound">
          <div class="notfound-404">
            <h1>Working...</h1>
          </div>
          <h2>This page is in under construction </h2>
          <p>
            The page you are looking is under construction please visit later.
          </p>
          <a href="/">Go To Homepage</a>
        </div>
      </div>
    );
  }
}

export default Customers;
