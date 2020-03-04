import React, {useState} from "react";
import {Form, Icon, Input, Button, Spin, Alert} from "antd";
import {connect} from "react-redux";
import styles from "./SetRecoveryPassword.module.less";

export function SetRecoveryPasswordForm(props) {
  const [error, setError] = useState("");
  const [confirmDirty, setConfirmDirty] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    password: "",
    confirm: "",
  });
  const hasErrors = fieldsError => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  };
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
    setLoading(true);
    try {
      // await props.login(formValues);
    } catch (error) {
      setError(error);
      console.log(error);
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
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  const validateToNextPassword = (rule, value, callback) => {
    const {form} = props;
    if (value && confirmDirty) {
      form.validateFields(["confirm"], {force: true});
    }
    callback();
  };
  const handleChange = e => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };
  const {getFieldDecorator, getFieldsError} = props.form;
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
              setFieldsValue={formValues.password}
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
              setFieldsValue={formValues.confirm}
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
export const wrapped = Form.create({name: "recovery"})(SetRecoveryPasswordForm);

export const addRecoveryPassword = (userData, token) => async dispatch => {
  /*   try {
    const response = await axios.post("/auth/recovery", userData, {
      headers: {Authorization: token},
    });
    const userData = response.data.data.user;
    userData.token = response.data.data.token;
    dispatch(action(types.LOGIN_SUCCESS), {userData});
  } catch (error) {
    console.error(error);
    throw error;
  } */
};

export default connect(null, {addRecoveryPassword})(wrapped);
