import React, {useState} from "react";
import {Form, Icon, Input, Button, Spin, Alert} from "antd";
import "../CreateCard/AddCard.css";
import {axiosWithAuth} from "../../utils/axios";
import {updateCard} from "../../state/actions/CardAction";
import {connect} from "react-redux";

function UpdateCard(props) {
  const [formValues, setFormValues] = useState({
    id: "",
    questionText: "",
    answerText: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {getFieldDecorator} = props.form;

  const handleChange = e => {
    console.log(props.location.state.id);
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    const newCard = {
      deckId: props.location.state.deckId,
      questionText: formValues.questionText,
      answerText: formValues.answerText,
    };

    e.preventDefault();
    setLoading(true);
    console.log(props.id);

    props.updateCard(props.location.state.id, newCard);
    // Call the server after authentication
    // // axiosWithAuth()
    // //   .put(`/cards/${props.location.state.id}`, newCard)
    // //   .then(res => {
    setLoading(false);
    props.history.push("/cards");
    // //     setFormValues(...formValues, [
    // //       {
    // //         id: res.data.cards.id,
    // //         questionText: res.data.cards.question,
    // //         answerText: res.data.cards.id,
    // //       },
    // //     ]);
    // //   })
    // //   .catch(err => {
    // //     console.log(err);
    //   });
  };
  return (
    <div className="card-container">
      <h1>Update a card</h1>
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
            <Button type="primary" htmlType="submit" className="login-form-button">
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
    card: state.card,
    id: ownprops.location.state.id,
  };
}
export const WrappedNormalLoginForm = Form.create({name: "normal_login"})(UpdateCard);

export default connect(mapStateToProps, {updateCard})(WrappedNormalLoginForm);
