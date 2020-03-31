import React from "react";
import {Modal} from "antd";
import DeckForm from "./DeckForm";

export default function EditModal({visible, deckValues, setVisible, updateDeck}) {
  return (
    <Modal
      visible={visible}
      title="Edit Deck"
      onCancel={() => setVisible(false)}
      footer={null}
    >
      <DeckForm
        submitAction={updateDeck}
        initialValues={deckValues}
        setVisible={setVisible}
      />
    </Modal>
  );
}
