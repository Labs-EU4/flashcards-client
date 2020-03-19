import React from "react";
import {Modal, Button} from "antd";

export default function SummaryModal({
  visible,
  handleOk,
  handleCancel,
  numOfRightAnswers,
  numOfCards,
}) {
  return (
    <Modal
      visible={visible}
      title="Session summary!"
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button type="primary" onClick={handleOk}>
          OK
        </Button>,
      ]}
    >
      <h1>
        This is a summary of a play session! You answered {`${numOfRightAnswers}`} out of
        {` ${numOfCards}`} right!
      </h1>
    </Modal>
  );
}
