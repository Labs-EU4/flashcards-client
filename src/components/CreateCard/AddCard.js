import React, {useState} from "react";
import {Form, Icon, Input, Button, Spin, Alert} from "antd";
import "../CreateCard/AddCard.css";
import axios from "axios";

function AddCard(props) {
  const [formValues, setFormValues] = useState({
    question: "",
    answer: "",
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
    e.preventDefault();
    setLoading(true);
    // Call the server
    axios
      .post(`https://flashdecks-staging.herokuapp.com/api/cards/`)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <div className="card-container">
      <h1>Add a card</h1>
      <Spin spinning={loading} delay={300}>
        <Form onSubmit={handleSubmit}>
          <Form.Item>
            {getFieldDecorator("question", {
              //rules are for the form validation
              rules: [
                {required: true, message: "Please enter your question here"},
                {
                  type: "question",
                  message: "type a question",
                },
              ],
            })(
              <Input
                name="question"
                setFieldsValue={formValues.question}
                //form icon in the question field, change type for different icons, see antdesign docs
                prefix={<Icon type="question" style={{color: "rgba(0,0,0,.25)"}} />}
                placeholder="Question text goes here"
                onChange={handleChange}
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("answer", {
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
                name="answer"
                type="text"
                setFieldsValue={formValues.answer}
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

export const WrappedNormalLoginForm = Form.create({name: "normal_login"})(AddCard);

export default WrappedNormalLoginForm;
