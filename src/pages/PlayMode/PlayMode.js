import React, {useState} from "react";
import {Progress, Button, Icon, PageHeader} from "antd";
import * as styles from "./PlayMode.module.less";
import FlipCard from "../../components/PlayMode/FlipCard/FlipCard";
import SummaryModal from "../../components/PlayMode/SummaryModal";
import UserAnswerButtons from "../../components/PlayMode/UserAnswerButtons/UserAnswerButtons";
import {connect} from "react-redux";
import {clearDeckInPlaySession, storeUnfinishedSession} from "../../state/actions/decks";

export function PlayMode({
  deckInPlaySession,
  clearDeckInPlaySession,
  storeUnfinishedSession,
  history,
}) {
  const deckData = {
    deck_id: 1,
    user_id: 1,
    deck_name: "Statistical Learning",
    public: true,
    created_at: "2020-03-05T10:31:48.748Z",
    updated_at: "2020-03-05T10:31:48.748Z",
    tags: [
      {
        id: 1,
        name: "Accounting & Finance",
      },
      {
        id: 2,
        name: "Aeronautical & Manufacturing Engineering",
      },
    ],
    flashcards: [
      {
        id: 1,
        deck_id: 1,
        user_id: 1,
        question: "What is data mining?",
        answer: "Its when biotech and infotech merge and people become data mines",
        created_at: "2020-01-08T10:44:38.761+00:00",
        updated_at: "2020-01-08T10:44:38.761+00:00",
      },
      {
        id: 2,
        deck_id: 1,
        user_id: 1,
        question: "Hey Anna hehe sup",
        answer: "How you doing?",
        created_at: "2020-01-08T10:45:05.269+00:00",
        updated_at: "2020-01-08T10:45:05.269+00:00",
      },
    ],
  };

  // all the cards in the deck, needs to be in the state
  // for future purposes of adding mastery rating to cards
  // Also could be loaded on demand if initialized from router
  const [cards, setCards] = useState(
    deckInPlaySession ? deckInPlaySession.flashcards : deckData.flashcards
  );
  //current card displayed to the user
  const [current, setCurrent] = useState(0);
  // whether or not the deck was finished, display summary if it was
  const [finished, setFinished] = useState(false);
  // next button state, will brobably be expanded when more interactive play is added
  const [answer, setAnswer] = useState(null);
  const [numOfRightAnswers, setNumOfRightAnswers] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  function next(e) {
    if (current !== cards.length - 1) {
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

  return (
    <>
      <div className="progress-block">
        <PageHeader
          title="Deck name"
          onBack={closeSession}
          backIcon={<Icon type="close" />}
        />
        <Progress percent={finished ? 100 : Math.floor((current / cards.length) * 100)} />
        <SummaryModal
          visible={finished}
          handleOk={finishSession}
          handleCancel={finishSession}
          numOfCards={cards.length}
          numOfRightAnswers={numOfRightAnswers}
        />
      </div>
      {!finished && (
        <FlipCard
          card={cards[current]}
          showAnswer={showAnswer}
          revealAnswer={revealAnswer}
        />
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
})(PlayMode);

export default connectedPlayMode;
