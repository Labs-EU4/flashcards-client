import React, {useState} from "react";
import {Progress, Button, Icon, PageHeader, Alert, Spin} from "antd";
import * as styles from "./PlayMode.module.less";
import FlipCard from "../../components/PlayMode/FlipCard/FlipCard";
import SummaryModal from "../../components/PlayMode/SummaryModal";
import UserAnswerButtons from "../../components/PlayMode/UserAnswerButtons/UserAnswerButtons";
import {connect} from "react-redux";
import {axiosWithAuth} from "../../utils/axios";
import {
  clearDeckInPlaySession,
  storeUnfinishedSession,
  fetchDeckById,
  touchDeck,
} from "../../state/actions/decks";
import {useEffect} from "react";
import ErrorHandlingScreen from "../../components/PlayMode/ErrorHandlingScreen/ErrorHandlingScreen";

export function PlayMode({
  deckInPlaySession,
  clearDeckInPlaySession,
  fetchDeckById,
  storeUnfinishedSession,
  touchDeck,
  history,
  match,
}) {
  const [loading, setLoading] = useState(false);
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
  const [cardRanks, setCardRanks] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetchDeckById(match.params.deckId)
      .catch(error => setError(error))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchDeckById, match.params.deckId, touchDeck]);
  useEffect(() => {
    if (deckInPlaySession) {
      touchDeck(deckInPlaySession[0]);
      setCardRanks(
        deckInPlaySession.map(card => {
          return card.value;
        })
      );
      axiosWithAuth().post("/cards/initialise", {
        cardIds: deckInPlaySession
          .filter(card => {
            if (card.value === null) {
              return card;
            }
          })
          .map(card => {
            return card.id;
          }),
      });
    }
  }, [deckInPlaySession, touchDeck]);
  function next(e) {
    if (current !== deckInPlaySession.length - 1) {
      if (answer) {
        setNumOfRightAnswers(numOfRightAnswers + 1);
        setCardRanks(
          cardRanks.map((card, index) => {
            if (index === current && card < 4) {
              return card + 1;
            }
            return card;
          })
        );
      } else {
        setCardRanks(
          cardRanks.map((card, index) => {
            if (index === current && card > 0) {
              return card - 1;
            }
            return card;
          })
        );
      }
      setAnswer(null);
      setShowAnswer(false);
    } else {
      if (answer) {
        setNumOfRightAnswers(numOfRightAnswers + 1);
        setCardRanks(
          cardRanks.map((card, index) => {
            console.log(card, index);
            if (index === current && card < 4) {
              return card + 1;
            }
            return card;
          })
        );
      } else {
        setCardRanks(
          cardRanks.map((card, index) => {
            console.log(card, index);
            if (index === current && card > 0) {
              return card - 1;
            }
            return card;
          })
        );
      }
      setFinished(true);
    }
    setCurrent(current + 1);
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
    const cardIds = deckInPlaySession.map(card => {
      return card.id;
    });
    console.log("over here", cardRanks);
    axiosWithAuth().put("/cards", {
      cardIds: cardIds,
      ranks: cardRanks,
    });
    clearDeckInPlaySession();
    setFinished(false);
    history.goBack();
  }
  const progress = deckInPlaySession
    ? Math.floor((current / deckInPlaySession.length) * 100)
    : 100;
  if (error) {
    return <ErrorHandlingScreen history={history} error={error} />;
  }
  if (deckInPlaySession === null) {
    return <Spin spinning={deckInPlaySession === null} delay={300}></Spin>;
  }
  if (deckInPlaySession.length === 0) {
    return (
      <ErrorHandlingScreen
        history={history}
        deck_id={deckInPlaySession.deck_id}
        author_id={deckInPlaySession.user_id}
        user_id={deckInPlaySession.user_id}
      />
    );
  }
  return (
    <>
      <div className={styles.progress_block}>
        <PageHeader
          title="placeholder"
          // {deckInPlaySession.deck_name}
          onBack={closeSession}
          backIcon={<Icon type="close" />}
        />
        <Progress percent={finished ? 100 : progress} />
        <SummaryModal
          visible={finished}
          handleOk={finishSession}
          handleCancel={finishSession}
          numOfCards={deckInPlaySession.length}
          numOfRightAnswers={numOfRightAnswers}
        />
      </div>
      {deckInPlaySession.length ? (
        !finished && (
          <FlipCard
            card={deckInPlaySession[current]}
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
  touchDeck,
})(PlayMode);

export default connectedPlayMode;
