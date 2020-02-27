import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";
import {Form, Input, Button, Spin} from "antd";

const ResetPasswordForm = props => {
  const history = useHistory();
  const tokenArray = history.location.pathname.split("/");
  const token = tokenArray[tokenArray.length - 1];
  const [state, setState] = useState({
    confirmDirty: false,
    spinner: true,
  });
  const [formValues, setFormValues] = useState({
    newPassword: "",
  });

  const handleChange = e => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        axios
          .post(`http://localhost:4003/api/auth/reset_password/${token}`, {
            password: formValues.newPassword,
            confirmPassword: formValues.newPassword,
          })
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  };

  const handleConfirmBlur = e => {
    const {value} = e.target;
    setState({...state, confirmDirty: state.confirmDirty || !!value});
  };

  const compareToFirstPassword = (rule, value, callback) => {
    const {form} = props;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  const validateToNextPassword = (rule, value, callback) => {
    const {form} = props;
    if (value && state.confirmDirty) {
      form.validateFields(["confirm"], {force: true});
    }
    callback();
  };

  const {getFieldDecorator} = props.form;

  const formItemLayout = {
    labelCol: {
      xs: {span: 24},
      sm: {span: 8},
    },
    wrapperCol: {
      xs: {span: 24},
      sm: {span: 16},
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  return (
    <Form {...formItemLayout} onSubmit={handleSubmit} className="new-password-form">
      <Form.Item label="Password" hasFeedback>
        {getFieldDecorator("password", {
          rules: [
            {
              required: true,
              message: "Please input your password!",
            },
            {
              validator: validateToNextPassword,
            },
          ],
        })(<Input.Password name="newPassword" onChange={handleChange} />)}
      </Form.Item>
      <Form.Item label="Confirm Password" hasFeedback>
        {getFieldDecorator("confirm", {
          rules: [
            {
              required: true,
              message: "Please confirm your password!",
            },
            {
              validator: compareToFirstPassword,
            },
          ],
        })(<Input.Password onBlur={handleConfirmBlur} />)}
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
      {state.spinner ? <Spin className="loading" /> : null}
    </Form>
  );
};

const WrappedNormalLoginForm = Form.create({name: "normal_login"})(ResetPasswordForm);

export default WrappedNormalLoginForm;
