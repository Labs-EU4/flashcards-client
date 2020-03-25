import React from "react";
import {Button} from "antd";
import * as styles from "./ErrorHandlingScreen.module.css";

export default function ErrorHandlingScreen({
  history,
  error,
  deck_id,
  user_id,
  author_id,
}) {
  const goBack = () => {
    history.goBack();
  };
  const location = id => ({
    pathname: `/deck/${id}`,
    state: {source: "personal"},
  });
  const goToEdit = () => {
    history.push(location(deck_id));
  };
  if (error) {
    return (
      <main className={styles.main}>
        <h2>There was an error retrieveing this deck.</h2>
        <Button size="large" type="primary" onClick={goBack}>
          Go back
        </Button>
      </main>
    );
  }
  return (
    <main className={styles.main}>
      <h2>This deck has 0 cards in it.</h2>
      {user_id === author_id && author_id !== undefined ? (
        <Button className={styles.button} onClick={goToEdit}>
          Add cards to your deck!
        </Button>
      ) : null}
      <Button size="large" type="primary" onClick={goBack}>
        Go back
      </Button>
    </main>
  );
}
