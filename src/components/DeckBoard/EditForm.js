import React, {useState} from "react";
import {Form, Input, Button, Alert, Checkbox, Select, Spin} from "antd";
import {useDispatch} from "react-redux";
import {deckTags} from "../../utils/deckTags";
import {updateDeck} from "../../state/actions/decks";
import diffArrays from "../../utils/diffArrays";
import styles from "../../components/RecentDecks/RecentDecks.module.css";

const NewDeckForm = props => {
  const initialValues = {
    name: props.deckValues.deck_name,
    tags:
      props.deckValues.tags[0] === null
        ? []
        : props.deckValues.tags.map(tag => `${tag.id}`),
    isPublic: props.deckValues.public,
  };
  const [formValues, setFormValues] = useState(initialValues);
  const dispatch = useDispatch();

  const [state, setState] = useState({
    success: null,
    loading: false,
  });

  const handleSubmit = e => {
    e.preventDefault();
    const numberTags = formValues.tags.map(x => parseInt(x));
    const beforeTags =
      props.deckValues.tags[0] === null ? [] : props.deckValues.tags.map(tag => tag.id);
    const [removeTags, addTags] = diffArrays(beforeTags, numberTags);
    setState({
      ...state,
      loading: true,
    });
    dispatch(
      updateDeck(props.deckValues.deck_id, {
        name: formValues.name,
        addTags,
        removeTags,
        isPublic: formValues.isPublic === true ? "1" : "0",
      })
    )
      .finally(() => {
        setState({...state, loading: false});
      })
      .then(res => {
        setState({
          ...state,
          success: true,
        });
        setTimeout(() => {
          props.setVisible(false);
          setState({
            success: null,
            loading: false,
          });
        }, 3000);
      })
      .catch(err => {
        setState({
          ...state,
          success: false,
        });
      });
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
  return (
    <div className={styles.containerupdateDeck}>
      <Spin spinning={state.loading}>
        <h1 className={styles.heading}>Update {props.deckValues.deck_name}</h1>
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
              initialValue: props.deckValues.deck_name,
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
              maxTagCount={3}
              allowClear={true}
            >
              {children}
            </Select>
          </Form.Item>
          <Form.Item>
            <Checkbox
              data-testid="inputCheck"
              onChange={changeCheckbox}
              checked={formValues.isPublic}
            >
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
              Update Deck
            </Button>
          </Form.Item>
          {state.success ? (
            <Alert
              message="Success"
              data-testid="alertSuccess"
              description="Deck updated!"
              type="success"
            />
          ) : state.success === false ? (
            <Alert
              message="Error"
              description="Not able to update Deck! Please make sure you are authed."
              type="error"
              data-testid="alertInvalid"
            />
          ) : null}
        </Form>
      </Spin>
    </div>
  );
};

const WrappedNewDeckForm = Form.create({name: "newDeckForm"})(NewDeckForm);

export default WrappedNewDeckForm;
