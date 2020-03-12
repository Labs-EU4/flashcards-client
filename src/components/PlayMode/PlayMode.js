import React, {useState} from "react";
import {Progress, Button, Icon, Radio, PageHeader} from "antd";
import * as styles from "./PlayMode.module.less";
import "./Playmode.css";
const RadioGroup = Radio.Group;

export default function PlayMode(props) {
  const deckData = {
    deck: {
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
    },
  };
  // all the cards in the deck, needs to be in the state
  // for future purposes of adding mastery rating to cards
  const [cards, setCards] = useState(deckData.deck.flashcards);
  //current card displayed to the user
  const [current, setCurrent] = useState(0);
  // whether or not the deck was finished, summary display if it is
  const [finished, setFinished] = useState(false);
  // next button state, will brobably be expanded when more interactive play is added
  const [answered, setAnswered] = useState(false);
  const [answer, setAnswer] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  function next(e) {
    if (current !== cards.length - 1) {
      setCurrent(current + 1);
      setAnswered(false);
      setAnswer(null);
      setShowAnswer(false);
    } else {
      setFinished(true);
    }
  }

  function handleAnswer(e) {
    setAnswered(true);
    setAnswer(e.target.value);
  }

  function revealAnswer(e) {
    setShowAnswer(!showAnswer);
  }

  return (
    <>
      <div className="progress-block">
        <PageHeader
          title="Deck name"
          onBack={() => null}
          backIcon={<Icon type="close" />}
        />
        <Progress percent={finished ? 100 : Math.floor((current / cards.length) * 100)} />
      </div>
      {!finished && (
        <div className={styles.card_block}>
          <div className="scene" onClick={revealAnswer}>
            <div className={`card${showAnswer ? " is-flipped" : ""}`}>
              <h1 className="card__face card__face--front">{cards[current].question}</h1>
              <h1 className="card__face card__face--back">{cards[current].answer}</h1>
            </div>
          </div>
        </div>
      )}
      <div className={styles.bottom_block}>
        bottom block
        <div className={styles.correct_buttons}>
          <RadioGroup
            size="medium"
            onChange={handleAnswer}
            value={answer}
            disabled={!showAnswer}
          >
            <Radio.Button value={true}>
              <Icon type="like" theme="twoTone" twoToneColor="#52c41a" />
              Got it right!
            </Radio.Button>
            <Radio.Button value={false}>
              <Icon type="dislike" theme="twoTone" twoToneColor="#ff6666" />
              Got it wrong...
            </Radio.Button>
          </RadioGroup>
        </div>
        <div className={styles.controls_block}>
          {answered || showAnswer ? (
            <Button
              onClick={next}
              className={styles.play_button}
              size="large"
              type="primary"
              disabled={!answered}
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
          <Button onClick={next} className={styles.play_button} size="large" type="ghost">
            Skip
          </Button>
        </div>
      </div>
    </>
  );
}
