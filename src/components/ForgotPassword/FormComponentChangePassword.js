import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";
import {Form, Input, Button, Icon, Alert} from "antd";

const ResetPasswordForm = props => {
  const history = useHistory();
  const tokenArray = history.location.pathname.split("/");
  const token = tokenArray[tokenArray.length - 1];
  const [state, setState] = useState({
    confirmDirty: false,
    isLoading: false,
    tokenInvalid: null,
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
    setState({...state, isLoading: true});
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        axios
          .post(`https://flashdecks.herokuapp.com/api/auth/reset_password/${token}`, {
            password: formValues.newPassword,
            confirmPassword: formValues.newPassword,
          })
          .then(res => {
            setState({...state, isLoading: false, tokenInvalid: false});
            setTimeout(() => {
              history.push("/login");
            }, 2000);
          })
          .catch(err => {
            setState({...state, isLoading: false, tokenInvalid: true});
          });
      } else {
        setState({...state, isLoading: false});
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
      callback("The passwords have to match!");
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

  return (
    <Form onSubmit={handleSubmit} className="new-password-form" data-testid="form">
      <Form.Item hasFeedback>
        {getFieldDecorator("password", {
          rules: [
            {
              required: true,
              message: "Password must be at least 5 characters",
              min: 5,
            },
            {
              validator: validateToNextPassword,
            },
          ],
        })(
          <Input.Password
            placeholder="New Password"
            name="newPassword"
            data-testid="inputPassword"
            onChange={handleChange}
            prefix={<Icon type="lock" style={{color: "rgba(0,0,0,.25)"}} />}
          />
        )}
      </Form.Item>
      <Form.Item hasFeedback>
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
        })(
          <Input.Password
            placeholder="Confirm Password"
            data-testid="inputPasswordConfirm"
            onBlur={handleConfirmBlur}
            prefix={<Icon type="lock" style={{color: "rgba(0,0,0,.25)"}} />}
          />
        )}
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={state.isLoading}
          data-testid="button"
        >
          Reset
        </Button>
      </Form.Item>
      {state.tokenInvalid ? (
        <Alert
          message="Token invalid"
          description="The token you tried to use is invalid."
          type="error"
          data-testid="alertInvalid"
        />
      ) : state.tokenInvalid === false ? (
        <Alert
          message="Success"
          description="Your password was updated!"
          type="success"
        />
      ) : null}
    </Form>
  );
};

const WrappedNormalLoginForm = Form.create({name: "normal_login"})(ResetPasswordForm);

export default WrappedNormalLoginForm;
