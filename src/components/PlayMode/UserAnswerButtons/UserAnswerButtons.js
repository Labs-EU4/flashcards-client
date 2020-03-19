import React from "react";
import {Radio, Icon} from "antd";
import * as styles from "./UserAnswerButtons.module.css";
const RadioGroup = Radio.Group;

export default function UserAnswerFeedbackButtons({handleAnswer, answer, showAnswer}) {
  return (
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
  );
}
