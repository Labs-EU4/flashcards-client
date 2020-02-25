import React, {useState} from "react";
import "antd/dist/antd.css";
import {Form, Icon, Input, Button} from "antd";

const NormalLoginForm = props => {
  const [formValues, setFormValues] = useState({
    email: "",
  });

  //   const handleSubmit = e => {
  //     e.preventDefault();
  //     props.form.validateFields((err, values) => {
  //       if (!err) {
  //         console.log("Received values of form: ", values);
  //       }
  //     });
  //   };

  const handleChange = e => {
    setFormValues({
      formValues,
      [e.target.name]: e.target.value,
    });
  };
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleSubmit = e => {
    e.preventDefault();
  };

  const {getFieldDecorator} = props.form;
  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <Form.Item
        validateStatus={
          emailRegex.test(formValues.email) === false ? "Error" : "validating"
        }
      >
        {getFieldDecorator("email", {
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

const WrappedNormalLoginForm = Form.create({name: "normal_login"})(NormalLoginForm);

export default WrappedNormalLoginForm;
