import React, {useEffect} from "react";
import axios from "axios";

function Cards() {
  useEffect(() => {
    axios
      .get(`https://flashdecks-staging.herokuapp.com/api/cards/`)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
}

export default Cards;
