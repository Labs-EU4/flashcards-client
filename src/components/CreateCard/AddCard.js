import React, {useState} from "react";
import {Form, Icon, Input, Button, Spin, Alert} from "antd";
import "../CreateCard/AddCard.module.css";
import {axiosWithAuth} from "../../utils/axios";
import {connect} from "react-redux";
import {addCard} from "../../state/actions/CardAction";
import styles from "./AddCard.module.css";

function AddCard(props) {
  const [formValues, setFormValues] = useState({
    questionText: "",
    answerText: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {getFieldDecorator} = props.form;
  const handleChange = e => {
    // console.log(props.location.state.id);
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newCard = {
      deckId: 1,
      questionText: formValues.questionText,
      answerText: formValues.answerText,
    };

    setLoading(true);
    props.addCard(newCard);
    setLoading(false);
    props.toggleMode();
    // props.history.push("/cards");
  };
  return (
    <div className={styles.cardContainer}>
      <h1>Add a card</h1>
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
                // setFieldsValue={formValues.questionText}
                setFieldsValue={handleChange}
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
                // setFieldsValue={formValues.answerText}
                setFieldsValue={handleChange}
                //form icon in the answer field, change type for different icons, see antdesign docs
                prefix={<Icon type="edit" style={{color: "rgba(0,0,0,.25)"}} />}
                placeholder="Enter a correct answer"
                onChange={handleChange}
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

// function mapStateToProps(state) {
//   return {
//     card: state.card,
//   };
// }

export const WrappedNormalLoginForm = Form.create({name: "normal_login"})(AddCard);

export default connect(null, {addCard})(WrappedNormalLoginForm);
