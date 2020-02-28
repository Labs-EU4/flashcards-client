import React, {useState} from "react";
import {Form, Icon, Input, Button, Alert} from "antd";
import axios from "axios";

const NormalLoginForm = props => {
  //State for the form values
  const [formValues, setFormValues] = useState({
    email: "",
  });
  const [state, setState] = useState({
    isLoading: false,
    emailInvalid: false,
  });

  const handleSubmit = e => {
    e.preventDefault();
    setState({...state, isLoading: true});
    axios
      .post("http://localhost:4003/api/auth/forgot_password", {
        email: formValues.email,
      })
      .then(function(response) {
        setFormValues({
          email: "",
        });
        console.log(response);
        setState({...state, isLoading: false});
      })
      .catch(function(error) {
        console.log(error);
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
      <h1>Reset Password</h1>
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
            setFieldsValue={formValues.email}
            onChange={handleChange}
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
          className="login-form-button"
          loading={state.isLoading}
        >
          Reset
        </Button>
      </Form.Item>
      {state.emailInvalid ? (
        <Alert
          message="Email Invalid"
          description="This email doesn't exist in our database!"
          type="error"
        />
      ) : null}
    </Form>
  );
};
//necessary for ant design functionality, reasoning in docs
const WrappedNormalLoginForm = Form.create({name: "normal_login"})(NormalLoginForm);

export default WrappedNormalLoginForm;
