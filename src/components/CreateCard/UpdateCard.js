import React, {useState} from "react";
import {Form, Icon, Input, Button, Spin, Alert} from "antd";
import "../CreateCard/AddCard.module.css";
import {updateCard} from "../../state/actions/CardAction";
import {connect} from "react-redux";
import styles from "./AddCard.module.css";

function UpdateCard(props) {
  console.log(props.cardId, "card id");
  const [formValues, setFormValues] = useState({
    deckId: "",
    questionText: "",
    answerText: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {getFieldDecorator} = props.form;

  const handleChange = e => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    console.log(props);
    e.preventDefault();
    const newCard = {
      deckId: props.currentDeckState.deck_id,
      questionText: formValues.questionText,
      answerText: formValues.answerText,
    };
    console.log(newCard);

    setLoading(true);
    console.log(props.id);

    props.updateCard(props.cardId, newCard);
    props.toggleModal();
    setLoading(false);
  };
  return (
    <div className={styles.cardContainer}>
      <h1>Update a card</h1>
      <Spin spinning={loading} delay={300}>
        <Form onSubmit={handleSubmit} className={styles.cardForm}>
          <Form.Item>
            {getFieldDecorator("questionText", {
              //rules are for the form validation
              rules: [
                {required: true, message: "Please enter your question here"},
                {
                  type: "string",
                  message: "type a question",
                },
              ],
            })(
              <Input
                name="questionText"
                type="string"
                setFieldsValue={formValues.questionText}
                //form icon in the question field, change type for different icons, see antdesign docs
                prefix={<Icon type="question" style={{color: "rgba(0,0,0,.25)"}} />}
                placeholder="Question text goes here"
                onChange={handleChange}
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("answerText", {
              //rules are for the form validation
              rules: [
                {required: true, message: "Please input a correct answer"},
                {
                  type: "string",
                  message: "enter an answer",
                },
              ],
            })(
              <Input
                name="answerText"
                type="string"
                setFieldsValue={formValues.answerText}
                //form icon in the answer field, change type for different icons, see antdesign docs
                prefix={<Icon type="edit" style={{color: "rgba(0,0,0,.25)"}} />}
                placeholder="Enter a correct answer"
                onChange={handleChange}
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className={styles.loginFormButton}>
              Edit card
            </Button>
          </Form.Item>
          {error && (
            <Alert
              message={error}
              type="error"
              closable
              afterClose={() => setError(null)}
            />
          )}
        </Form>
      </Spin>
    </div>
  );
}

function mapStateToProps(state, ownprops) {
  return {
    currentDeckState: state.deckState.currentDeckState,
    // id: ownprops.location.state.card.id,
  };
}
export const WrappedNormalLoginForm = Form.create({name: "normal_login"})(UpdateCard);

export default connect(mapStateToProps, {updateCard})(WrappedNormalLoginForm);
