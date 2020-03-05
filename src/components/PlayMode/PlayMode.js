import React, {useState} from "react";
import {Progress, Carousel} from "antd";

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

export default function PlayMode(props) {
  console.log(deckData.deck.flashcards);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [cards, setCards] = useState(deckData.deck.flashcards);
  return (
    <>
      <Progress percent={currentIndex / cards.length} />
      <Carousel autoplay dots={true}>
        {cards.map(card => (
          <p>{card.question}</p>
        ))}
      </Carousel>
    </>
  );
}
