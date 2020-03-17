import React, {useState} from "react";
import {Progress, Button, Icon, PageHeader, Alert} from "antd";
import * as styles from "./PlayMode.module.less";
import FlipCard from "../../components/PlayMode/FlipCard/FlipCard";
import SummaryModal from "../../components/PlayMode/SummaryModal";
import UserAnswerButtons from "../../components/PlayMode/UserAnswerButtons/UserAnswerButtons";
import {connect} from "react-redux";
import {
  clearDeckInPlaySession,
  storeUnfinishedSession,
  fetchDeckById,
} from "../../state/actions/decks";
import {useEffect} from "react";

export function PlayMode({
  deckInPlaySession,
  clearDeckInPlaySession,
  fetchDeckById,
  storeUnfinishedSession,
  history,
  match,
}) {
  //current card displayed to the user
  const [current, setCurrent] = useState(0);
  //error state in case of errors during fetching
  const [error, setError] = useState(null);
  // whether or not the deck was finished, display summary if it was
  const [finished, setFinished] = useState(false);
  // next button state, will brobably be expanded when more interactive play is added
  const [answer, setAnswer] = useState(null);
  const [numOfRightAnswers, setNumOfRightAnswers] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    fetchDeckById(match.params.deckId).catch(error => setError(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function next(e) {
    if (current !== deckInPlaySession.flashcards.length - 1) {
      setCurrent(current + 1);
      setAnswer(null);
      if (answer) setNumOfRightAnswers(numOfRightAnswers + 1);
      setAnswer(null);
      setShowAnswer(false);
    } else {
      if (answer) setNumOfRightAnswers(numOfRightAnswers + 1);
      setFinished(true);
    }
  }

  function handleAnswer(e) {
    setAnswer(e.target.value);
  }

  function revealAnswer(e) {
    setShowAnswer(!showAnswer);
  }

  function closeSession() {
    storeUnfinishedSession({current, numOfRightAnswers, deckInPlaySession});
    history.goBack();
  }

  function finishSession() {
    clearDeckInPlaySession();
    setFinished(false);
    history.goBack();
  }
  console.log(deckInPlaySession);
  const progress = deckInPlaySession
    ? Math.floor((current / deckInPlaySession.flashcards.length) * 100)
    : 100;
  if (error) {
    return (
      <Alert
        message={error.message}
        type="error"
        data-testid="server-alert"
        closable
        afterClose={() => setError(null)}
      />
    );
  }
  if (deckInPlaySession === null) {
    return <h1>Loading</h1>;
  }
  return (
    <>
      <div className="progress-block">
        <PageHeader
          title={deckInPlaySession.deck_name}
          onBack={closeSession}
          backIcon={<Icon type="close" />}
        />
        <Progress percent={finished ? 100 : progress} />
        <SummaryModal
          visible={finished}
          handleOk={finishSession}
          handleCancel={finishSession}
          numOfCards={deckInPlaySession.flashcards.length}
          numOfRightAnswers={numOfRightAnswers}
        />
      </div>
      {deckInPlaySession.flashcards.length ? (
        !finished && (
          <FlipCard
            card={deckInPlaySession.flashcards[current]}
            showAnswer={showAnswer}
            revealAnswer={revealAnswer}
          />
        )
      ) : (
        <h1>No cards in the deck</h1>
      )}
      <div className={styles.bottom_block}>
        <UserAnswerButtons
          handleAnswer={handleAnswer}
          answer={answer}
          showAnswer={showAnswer}
        />
        <div className={styles.controls_block}>
          {answer !== null || showAnswer ? (
            <Button
              onClick={next}
              className={styles.play_button}
              size="large"
              type="primary"
              disabled={answer === null}
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={revealAnswer}
              className={styles.play_button}
              size="large"
              type="primary"
            >
              Show answer
            </Button>
          )}
          {answer === null && (
            <Button
              onClick={next}
              className={styles.play_button}
              size="large"
              type="ghost"
            >
              Skip
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

const mapStateToProps = state => {
  return {
    deckInPlaySession: state.deckState.deckInPlaySession,
  };
};

const connectedPlayMode = connect(mapStateToProps, {
  clearDeckInPlaySession,
  storeUnfinishedSession,
  fetchDeckById,
})(PlayMode);

export default connectedPlayMode;
