import React, {useState} from "react";
import {Form, Icon, Input, Button, Alert} from "antd";
import axios from "axios";
import {Link} from "react-router-dom";

const NormalLoginForm = props => {
  //State for the form values
  const [formValues, setFormValues] = useState({
    email: "",
  });
  const [state, setState] = useState({
    isLoading: false,
    emailInvalid: null,
  });

  const handleSubmit = e => {
    e.preventDefault();
    setState({...state, isLoading: true});
    axios
      .post("https://flashdecks.herokuapp.com/api/auth/forgot_password", {
        email: formValues.email,
      })
      .then(function(response) {
        setFormValues({
          email: "",
        });
        setState({...state, isLoading: false, emailInvalid: false});
      })
      .catch(function(error) {
        setState({...state, isLoading: false, emailInvalid: true});
      });
  };

  //necessary in order to change state values
  const handleChange = e => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const {getFieldDecorator} = props.form;
  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <Form.Item>
        {getFieldDecorator("email", {
          //rules are for the form validation
          rules: [
            {required: true, message: "Please input a valid email!"},
            {
              type: "email",
              message: "Invalid email",
            },
          ],
        })(
          <Input
            name="email"
            setfieldsvalue={formValues.email}
            onChange={handleChange}
            data-testid="email"
            className="email-input"
            //form icon in the email field, change type for different icons, see antdesign docs
            prefix={<Icon type="mail" style={{color: "rgba(0,0,0,.25)"}} />}
            placeholder="Email"
          />
        )}
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          data-testid="button"
          className="login-form-button"
          loading={state.isLoading}
        >
          Reset
        </Button>
        <Link to="/login">Back to login</Link>
      </Form.Item>
      {state.emailInvalid ? (
        <Alert
          message="Email invalid"
          description="The email you tried to use is not in our database."
          type="error"
          data-testid="alertInvalid"
        />
      ) : state.emailInvalid === false ? (
        <Alert
          message="Success"
          description="You will receive an email!"
          type="success"
          data-testid="alertSuccess"
        />
      ) : null}
    </Form>
  );
};
//necessary for ant design functionality, reasoning in docs
const WrappedNormalLoginForm = Form.create({name: "normal_login"})(NormalLoginForm);

export default WrappedNormalLoginForm;
