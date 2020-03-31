import React, {useState} from "react";
import {Form, Input, Button, Alert, Checkbox, Select, Spin} from "antd";
import {deckTags} from "../../utils/deckTags";
import diffArrays from "../../utils/diffArrays";
import styles from "../../components/RecentDecks/RecentDecks.module.css";
const {Option} = Select;

// Base values for an empty form
const newDeck = {deck_name: "", tags: [], public: false};

const DeckForm = ({form, initialValues = newDeck, submitAction, setVisible, history}) => {
  // Destructuring all the necessary rc-form props
  const {
    validateFieldsAndScroll,
    getFieldDecorator,
    getFieldsValue,
    getFieldsError,
    setFieldsValue,
  } = form;
  // Loading and network errors states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  function handleSubmit(e) {
    //Different submit paths depending on whether or not the component was passed and existing deck is initialValues
    e.preventDefault();
    validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        if (initialValues.deck_name) {
          // If we are editing a deck
          setLoading(true);
          const formValues = getFieldsValue();
          const beforeTags = initialValues.tags.map(tag => tag.id);
          const afterTags = formValues.tags.map(tag => Number(tag));
          const [removeTags, addTags] = diffArrays(beforeTags, afterTags);
          submitAction(initialValues.deck_id, {
            name: formValues.name,
            addTags,
            removeTags,
            isPublic: formValues.isPublic,
          })
            .then(() => {
              setSuccess(true);
              setTimeout(() => {
                setVisible(false);
                setSuccess(null);
                setError(null);
              }, 1000);
            })
            .catch(networkError => {
              setError(networkError);
            })
            .finally(() => {
              setLoading(false);
            });
        } else {
          // Else if it's a new deck
          setLoading(true);
          submitAction(getFieldsValue())
            .then(res => {
              setSuccess(true);
              setFieldsValue({
                name: initialValues.deck_name,
                isPublic: initialValues.public,
                tags: initialValues.tags,
              });
              setTimeout(() => {
                history.push(`/deck/${res.data.deck.deck_id}`);
              }, 1000);
            })
            .catch(networkError => setError(networkError))
            .finally(() => setLoading(false));
        }
      } else {
        setError(err);
      }
    });
  }

  const onCloseError = () => {
    setError(null);
  };
  const onCloseSuccess = () => {
    setSuccess(null);
  };

  //Checks if there are errors active in any of the fields
  const hasErrors = fieldsError => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  };
  return (
    <div className={styles.containerupdateDeck}>
      <h1 className={styles.heading}>
        {initialValues.deck_name
          ? `Update ${initialValues.deck_name}!`
          : "Create new deck!"}
      </h1>
      <Spin spinning={loading} delay={100}>
        <Form onSubmit={handleSubmit} className="login-form">
          <Form.Item hasFeedback>
            {getFieldDecorator("name", {
              rules: [
                {
                  required: true,
                  message: "Deckname must be at least 4 characters long",
                  min: 4,
                },
              ],
              initialValue: initialValues.deck_name,
            })(
              <Input
                placeholder="Deck name"
                name="name"
                data-testid="inputDeckName"
                onChange={() => console.log(getFieldsValue())}
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("tags", {
              initialValue: initialValues.tags.map(tag => `${tag.id}`),
            })(
              <Select
                mode="multiple"
                allowClear={true}
                maxTagCount={3}
                placeholder="Select tags"
                notFoundContent="No matching tags"
                //Changes how options are filtered in the select while searching so that they are filtered by key instead of value
                //Done this way because we have to  send tag id's to backend but user will want to search this by actual tag names
                filterOption={(searchValue, optionNode) =>
                  optionNode.key.toLowerCase().includes(searchValue.toLowerCase())
                }
              >
                {deckTags.map(tag => (
                  <Option key={tag.name} value={tag.id.toString()}>
                    {tag.name}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("isPublic", {
              initialValue: initialValues.public,
              //Value prop name needs to be "checked" since its a checkbox
              valuePropName: "checked",
            })(<Checkbox>Public</Checkbox>)}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={hasErrors(getFieldsError())}
            >
              {initialValues.deck_name ? "Update Deck" : "Create Deck"}
            </Button>
          </Form.Item>
          {success && (
            <Alert
              message="Success"
              data-testid="alertSuccess"
              description={initialValues.deck_name ? "Deck updated!" : "Deck created!"}
              type="success"
              closable
              onClose={onCloseSuccess}
            />
          )}
          {error ? (
            <Alert
              message="Error"
              description={error.message}
              type="error"
              data-testid="alertInvalid"
              closable
              onClose={onCloseError}
            />
          ) : null}
        </Form>
      </Spin>
    </div>
  );
};

export default Form.create()(DeckForm);
