import React, {useEffect} from "react";
import axiosWithAuth from "../../helpers/axiosWithAuth";

export default function DecksList() {
  useEffect(() => {
    axiosWithAuth()
      .get("http://localhost:4003/api/decks/public")
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return <h1>Decks List</h1>;
}
