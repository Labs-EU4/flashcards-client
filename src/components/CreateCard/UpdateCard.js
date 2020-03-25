import React, {useState, useEffect} from "react";
import {Form, Icon, Input, Button, Spin, Alert} from "antd";
import "../CreateCard/AddCard.module.css";
import {updateCard} from "../../state/actions/CardAction";
import {connect} from "react-redux";
import styles from "./AddCard.module.css";

function UpdateCard(props) {
  // console.log(props.card.id, "card id");
  const [formValues, setFormValues] = useState({
    questionText: "",
    answerText: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const hasErrors = fieldsError => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  };
  useEffect(() => {
    setFormValues({
      questionText: props.card.question,
      answerText: props.card.answer,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = e => {
    console.log(formValues);
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newCard = {
      deckId: props.currentDeckState.deck_id,
      questionText: formValues.questionText,
      answerText: formValues.answerText,
    };

    setLoading(true);

    props.updateCard(props.card.id, newCard);
    props.toggleModal();
    setLoading(false);
  };

  const {
    getFieldDecorator,
    getFieldsError,
    validateFields,
    isFieldTouched,
    getFieldError,
  } = props.form;
  useEffect(() => {
    validateFields();
  }, [validateFields]);

  const questionTextError =
    isFieldTouched("questionText") && getFieldError("questionText");
  const answerTextError = isFieldTouched("answerText") && getFieldError("answerText");
  return (
    <div className={styles.cardContainer}>
      <h1>Update a card</h1>
      <Spin spinning={loading} delay={300}>
        <Form onSubmit={handleSubmit} className={styles.cardForm}>
          <Form.Item
            name="questionText"
            validateStatus={questionTextError ? "error" : ""}
            hasFeedback
            help={questionTextError || ""}
          >
            {getFieldDecorator("questionText", {
              //rules are for the form validation
              initialValue: formValues.questionText,

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
                setfieldsvalue={formValues.questionText}
                //form icon in the question field, change type for different icons, see antdesign docs
                prefix={<Icon type="question" style={{color: "rgba(0,0,0,.25)"}} />}
                placeholder="Question text goes here"
                onChange={handleChange}
              />
            )}
          </Form.Item>
          <Form.Item
            name="answerText"
            validateStatus={answerTextError ? "error" : ""}
            help={answerTextError || ""}
            hasFeedback
          >
            {getFieldDecorator("answerText", {
              initialValue: formValues.answerText,
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
                setfieldsvalue={formValues.answerText}
                //form icon in the answer field, change type for different icons, see antdesign docs
                prefix={<Icon type="edit" style={{color: "rgba(0,0,0,.25)"}} />}
                placeholder="Enter a correct answer"
                onChange={handleChange}
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.loginFormButton}
              disabled={hasErrors(getFieldsError())}
            >
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
