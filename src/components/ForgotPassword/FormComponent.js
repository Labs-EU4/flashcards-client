import React, {useState} from "react";
import {Form, Icon, Input, Button} from "antd";
import axios from "axios";

const NormalLoginForm = props => {
  //State for the form values
  const [formValues, setFormValues] = useState({
    email: "",
  });

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post("http://localhost:4003/api/auth/forgot_password", {
        email: formValues.email,
      })
      .then(function(response) {
        setFormValues({
          email: "",
        });
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  //necessary to change state values
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
            setFieldsValue={formValues.email}
            onChange={handleChange}
            //form icon in the email field, change type for different icons, see antdesign docs
            prefix={<Icon type="mail" style={{color: "rgba(0,0,0,.25)"}} />}
            placeholder="Email"
          />
        )}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
};
//necessary for ant design functionality, reasoning in docs
const WrappedNormalLoginForm = Form.create({name: "normal_login"})(NormalLoginForm);

export default WrappedNormalLoginForm;
