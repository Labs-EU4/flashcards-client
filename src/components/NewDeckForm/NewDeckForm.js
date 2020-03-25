import React, {useState} from "react";
import {Form, Input, Button, Alert, Checkbox, Select} from "antd";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {deckTags} from "../../utils/deckTags";
import {createDeck} from "../../state/actions/decks";
import styles from "../../components/RecentDecks/RecentDecks.module.css";
//Hey
const NewDeckForm = props => {
  let history = useHistory();
  const [formValues, setFormValues] = useState({
    name: "",
    tags: [],
    isPublic: false,
  });

  const dispatch = useDispatch();

  const [state, setState] = useState({
    success: null,
  });

  const location = id => ({
    pathname: `/deck/${id}`,
    state: {source: "personal"},
  });

  const handleSubmit = e => {
    e.preventDefault();
    const numberTags = formValues.tags.map(x => parseInt(x));
    if (formValues.isPublic === true) {
      dispatch(createDeck({...formValues, tags: numberTags, isPublic: "1"}))
        .then(res => {
          setState({
            success: true,
          });
          setFormValues({
            name: "",
            tags: [],
            isPublic: false,
          });
          return res;
        })
        .then(res => {
          setTimeout(() => {
            history.push(location(res.data.deck.deck_id));
          }, 1400);
        })
        .catch(err => {
          setState({
            success: false,
          });
        });
    } else if (formValues.isPublic === false) {
      dispatch(createDeck({...formValues, tags: numberTags, isPublic: "0"}))
        .then(res => {
          setState({
            success: true,
          });
          setFormValues({
            name: "",
            tags: [],
            isPublic: false,
          });
          return res;
        })
        .then(res => {
          setTimeout(() => {
            history.push(`/deck/${res.data.deck.deck_id}`);
          }, 1400);
        })
        .catch(err => {
          setState({
            success: false,
          });
        });
    } else if (formValues.name === "") {
      dispatch(createDeck({...formValues, tags: numberTags, isPublic: "0"}))
        .then(res => {
          setState({
            success: false,
          });
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
  }

  const {Option} = Select;
  const {getFieldDecorator} = props.form;
  const children = [];
  const options = deckTags;
  options.forEach(curr => {
    children.push(<Option key={curr.id}>{curr.name}</Option>);
  });
  // eslint-disable-next-line array-callback-return

  return (
    <div className={styles.containerCreateDeck}>
      <h1 className={styles.heading}>Create New Deck</h1>
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
              value={formValues.name}
            />
          )}
        </Form.Item>
        <Form.Item>
          <Select
            mode="multiple"
            style={{width: "100%"}}
            onChange={handleChangeSelection}
            tokenSeparators={[","]}
            data-testid="inputSelect"
            value={formValues.tags}
            maxTagCount="3"
            allowClear="true"
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
          <Button
            id="create-deck-button"
            type="primary"
            htmlType="submit"
            data-testid="button"
          >
            Create Deck
          </Button>
        </Form.Item>
        {state.success === true ? (
          <Alert
            message="Success"
            data-testid="alertSuccess"
            description="Deck created!"
            type="success"
            className={styles.alert}
          />
        ) : state.success === false && formValues.name !== "" ? (
          <Alert
            message="Error"
            description="Not able to create Deck! Please make sure you are authed."
            type="error"
            data-testid="alertInvalid"
            className={styles.alert}
          />
        ) : state.success === false && formValues.name === "" ? (
          <Alert
            message="Error"
            description="Please add a deckname!"
            type="error"
            data-testid="alertInvalid"
            className={styles.alert}
          />
        ) : null}
      </Form>
    </div>
  );
};

const WrappedNewDeckForm = Form.create({name: "newDeckForm"})(NewDeckForm);

export default WrappedNewDeckForm;
