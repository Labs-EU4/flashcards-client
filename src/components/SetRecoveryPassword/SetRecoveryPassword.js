import React, {useState} from "react";
import {Form, Icon, Input, Button, Spin, Alert} from "antd";

export function SetRecoveryPasswordForm(props) {
  const {
    getFieldDecorator,
    getFieldsError,
    setFieldsValue,
    validateFieldsAndScroll,
    validateFields,
  } = props.form;
  const [error, setError] = useState(null);
  const [confirmDirty, setConfirmDirty] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    password: "",
    confirm: "",
  });
  const hasErrors = fieldsError => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  };
  const handleSubmit = async e => {
    e.preventDefault();
    validateFieldsAndScroll({suppressWarning: true}, (err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
    setLoading(true);
    try {
      await props.addRecoveryPassword(formValues.password, props.token);
      props.history.push("/");
    } catch (error) {
      setError("Something went wrong! Try again");
    } finally {
      setLoading(false);
    }
  };
  const handleConfirmBlur = e => {
    const {value} = e.target;
    setConfirmDirty(confirmDirty || !!value);
  };
  const compareToFirstPassword = (rule, value, callback) => {
    const {form} = props;
    if (value && value !== form.getFieldValue("password")) {
      callback("Passwords do not match!");
    } else {
      callback();
    }
  };

  const validateToNextPassword = (rule, value, callback) => {
    if (value && confirmDirty) {
      validateFields(["confirm"], {force: true, suppressWarning: true});
    }
    callback();
  };
  const handleChange = e => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
    setFieldsValue({[e.target.name]: e.target.value});
  };
  return (
    <Spin spinning={loading} delay={300}>
      <h3>Set a recovery password to finish your account creation</h3>
      <Form onSubmit={handleSubmit} className="login-form">
        <Form.Item hasFeedback>
          {getFieldDecorator("password", {
            //rules are for the form validation
            rules: [
              {required: true, message: "Please input a password!"},
              {
                type: "string",
                message: "Invalid password",
              },
              {
                type: "string",
                whitespace: true,
                message: "Can't consist of only whitespace characters",
              },
              {
                validator: validateToNextPassword,
              },
            ],
          })(
            <Input
              name="password"
              type="password"
              onChange={handleChange}
              //form icon in the email field, change type for different icons, see antdesign docs
              prefix={<Icon type="lock" style={{color: "rgba(0,0,0,.25)"}} />}
              placeholder="Password"
              onBlur={handleConfirmBlur}
            />
          )}
        </Form.Item>
        <Form.Item hasFeedback>
          {getFieldDecorator("confirm", {
            //rules are for the form validation
            rules: [
              {required: true, message: "Please input a valid confirm!"},
              {
                type: "string",
                message: "Invalid confirm",
              },
              {
                validator: compareToFirstPassword,
              },
            ],
          })(
            <Input
              type="password"
              name="confirm"
              onChange={handleChange}
              //form icon in the confirm field, change type for different icons, see antdesign docs
              prefix={<Icon type="lock" style={{color: "rgba(0,0,0,.25)"}} />}
              placeholder="Confirm password"
              onBlur={handleConfirmBlur}
            />
          )}
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            data-testid="submit"
            disabled={
              hasErrors(getFieldsError()) || !formValues.password || !formValues.confirm
            }
          >
            Create Account
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
  );
}
const wrapped = Form.create({name: "recovery"})(SetRecoveryPasswordForm);

export default wrapped;
