import React, {useEffect, useState} from "react";
import {withAuth} from "../../utils/axios";
import {Card, Button} from "antd";
import {Link} from "react-router-dom";

function Cards(props) {
  // set the cards to state
  const [cards, setCards] = useState([{}]);
  //   Fetch cards after authentication
  useEffect(() => {
    withAuth()
      .get(`/cards`)
      .then(res => {
        console.log(res);
        setCards(res.data.cards);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  // Function for deleting cards
  const handleDelete = id => {
    withAuth()
      .delete(`/cards/${id}`)
      .then(res => {
        console.log(res);
        // Set deleted cards to state after filtering
        setCards(cards.filter(card => card.id !== id));
        props.history.push("/cards");
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    //   Map the fetched cards to an ant design cards component for display on the browser
    <div>
      {cards.map(currentCard => {
        return (
          <Card
            title="Default size card"
            extra={
              <Link
                to={{
                  pathname: `/updatecard`,
                  state: {id: currentCard.id, deckId: currentCard.deck_id},
                }}
              >
                Edit
              </Link>
            }
            style={{width: 300}}
          >
            <Button type="danger" onClick={() => handleDelete(currentCard.id)}>
              Delete
            </Button>
            <p>Question:{currentCard.question} </p>
            <p>Answer:{currentCard.answer} </p>
          </Card>
        );
      })}
    </div>
  );
}

export default Cards;
