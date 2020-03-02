import React from "react";
import axios from "axios";

function dashboard() {
  axios
    .get("")
    .then(res => {
      console.log(res.data);
    })
    .catch(error => {
      console.log(error);
    });

  return (
    <div>
      <h1>This is dashboard</h1>
    </div>
  );
}

export default dashboard;
