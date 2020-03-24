import React, {useState} from "react";
import {Form, Icon, Input, Button, Spin, Alert} from "antd";
import "../CreateCard/AddCard.module.css";
import {connect, useSelector} from "react-redux";
import {addCard} from "../../state/actions/CardAction";
import styles from "./AddCard.module.css";

function AddCard(props) {
  const deck_id = useSelector(state => state.deckState.currentDeckState.deck_id);
  const [formValues, setFormValues] = useState({
    questionText: "",
    answerText: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {getFieldDecorator} = props.form;
  const handleChange = e => {
    console.log(formValues);
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    console.log(e);
    e.preventDefault();
    const newCard = {
      deckId: deck_id,
      questionText: formValues.questionText,
      answerText: formValues.answerText,
    };

    setLoading(true);
    props.addCard(newCard);
    setFormValues({
      questionText: "",
      answerText: "",
    });
    setLoading(false);
    props.toggleMode();
  };
  return (
    <div className={styles.cardContainer}>
      <h1>Add a card</h1>
      <Spin spinning={loading} delay={300}>
        <Form onSubmit={e => handleSubmit(e)} className={styles.cardForm}>
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
                type="text"
                // setFieldsValue={formValues.questionText}
                setfieldsvalue={formValues.questionText}
                //form icon in the question field, change type for different icons, see antdesign docs
                prefix={<Icon type="question" style={{color: "rgba(0,0,0,.25)"}} />}
                placeholder="Question text goes here"
                onChange={e => handleChange(e)}
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
                type="text"
                // setFieldsValue={formValues.answerText}
                setfieldsvalue={formValues.answerText}
                //form icon in the answer field, change type for different icons, see antdesign docs
                prefix={<Icon type="edit" style={{color: "rgba(0,0,0,.25)"}} />}
                placeholder="Enter a correct answer"
                onChange={e => handleChange(e)}
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className={styles.loginFormButton}>
              ADD YOUR CARD
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

export const WrappedNormalLoginForm = Form.create({name: "normal_login"})(AddCard);

export default connect(state => state, {addCard})(WrappedNormalLoginForm);
