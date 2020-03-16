import React, {useState} from "react";
import {Form, Icon, Input, Button, Alert, Checkbox, Select} from "antd";
import {useDispatch} from "react-redux";
import {deckTags} from "../../utils/deckTags";
import {axiosWithAuth} from "../../utils/axios";

const NewDeckForm = props => {
  const [formValues, setFormValues] = useState({
    name: "",
    tags: [],
    isPublic: false,
  });

  const dispatch = useDispatch();

  const [state, setState] = useState({
    success: null,
  });

  const handleSubmit = e => {
    e.preventDefault();
    const numberTags = formValues.tags.map(x => parseInt(x));
    if (formValues.isPublic === true) {
      axiosWithAuth()
        .post(`/decks`, {...formValues, tags: numberTags, isPublic: "1"})
        .then(res => {
          console.log(res);
          setState({
            success: true,
          });
          setFormValues({
            name: "",
            tags: [],
            isPublic: false,
          });
          // THIS IS WHERE I WOULD PUT MY REDUX ACTION.... IF I HAD ONE!
          // https://i.imgur.com/sOE11EE.jpg
          // dispatch()
        })
        .catch(err => {
          setState({
            success: false,
          });
        });
    } else if (formValues.isPublic === false) {
      axiosWithAuth()
        .post(`/decks`, {...formValues, tags: numberTags, isPublic: "0"})
        .then(res => {
          console.log(res);
          setState({
            success: true,
          });
          setFormValues({
            name: "",
            tags: [],
            isPublic: false,
          });
          // THIS IS WHERE I WOULD PUT MY REDUX ACTION.... IF I HAD ONE!
          // https://i.imgur.com/sOE11EE.jpg
          // dispatch()
        })
        .catch(err => {
          setState({
            success: false,
          });
        });
    }
  };

  const changeCheckbox = e => {
    setFormValues({...formValues, isPublic: e.target.checked});
  };

  const handleChange = e => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  function handleChangeSelection(value) {
    setFormValues({...formValues, tags: value});
    console.log(formValues.tags);
  }

  const {Option} = Select;
  const {getFieldDecorator} = props.form;
  const children = [];
  const options = deckTags;
  // eslint-disable-next-line array-callback-return
  options.map((curr, index) => {
    children.push(<Option key={index}>{curr}</Option>);
  });
  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <Form.Item hasFeedback>
        {getFieldDecorator("text", {
          rules: [
            {
              required: true,
              message: "Deckname must be atleast 4 characters long",
              min: 4,
            },
          ],
        })(
          <Input
            placeholder="Deckname"
            name="name"
            data-testid="inputDeckName"
            onChange={handleChange}
          />
        )}
      </Form.Item>
      <Form.Item>
        <Select
          mode="tags"
          style={{width: "100%"}}
          onChange={handleChangeSelection}
          tokenSeparators={[","]}
          data-testid="inputSelect"
        >
          {children}
        </Select>
      </Form.Item>
      <Form.Item>
        <Checkbox data-testid="inputCheck" onChange={changeCheckbox}>
          Public
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" data-testid="button">
          Create Deck
        </Button>
      </Form.Item>
      {state.success ? (
        <Alert
          message="Success"
          data-testid="alertSuccess"
          description="Deck created!"
          type="success"
        />
      ) : state.success === false ? (
        <Alert
          message="Error"
          description="Not able to create Deck!"
          type="error"
          data-testid="alertInvalid"
        />
      ) : null}
    </Form>
  );
};

const WrappedNewDeckForm = Form.create({name: "newDeckForm"})(NewDeckForm);

export default WrappedNewDeckForm;