import React, {useState} from "react";
import {Form, Icon, Input, Button, Spin, Alert} from "antd";
import "../CreateCard/AddCard.css";
import {axiosWithAuth} from "../../utils/axios";
import {connect} from "react-redux";
import {addCard} from "../../state/actions/CardAction";

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
    const newCard = {
      deckId: 1,
      questionText: formValues.questionText,
      answerText: formValues.answerText,
    };

    e.preventDefault();
    setLoading(true);
    // Call the server

    // axiosWithAuth()
    //   .post(`/cards`)
    //   .then(res => {
    //     console.log(res);
    //     setLoading(false);
    //     props.history.push("/cards");
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    props.addCard();
  };
  return (
    <div className="card-container">
      <h1>Add a card</h1>
      <Spin spinning={loading} delay={300}>
        <Form onSubmit={handleSubmit}>
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
            <Button type="primary" htmlType="submit" className="login-form-button">
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

function mapStateToProps(state) {
  return {
    card: state.card,
  };
}

export const WrappedNormalLoginForm = Form.create({name: "normal_login"})(AddCard);

export default connect(mapStateToProps, {addCard})(WrappedNormalLoginForm);
