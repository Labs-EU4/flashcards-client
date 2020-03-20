import React from "react";
import {Modal} from "antd";
import EditForm from "./EditForm";

export default function EditModal({visible, deckValues, setVisible}) {
  return (
    <Modal
      visible={visible}
      title="Edit Deck"
      onCancel={() => setVisible(false)}
      footer={null}
    >
      <EditForm deckValues={deckValues} setVisible={setVisible} />
    </Modal>
  );
}
