import React, {useState, useEffect} from "react";
import {Card, Avatar} from "antd";
import {getAllDecks} from "../../state/actions/decks/decksActions";
import {EditOutlined, EllipsisOutlined, SettingOutlined} from "@ant-design/icons";

const {Meta} = Card;

const DeckCard = () => {
  const [decks, setDecks] = useState([{}, {}, {}]);

  useEffect(() => {
    console.log("hi");

    getAllDecks()();
  }, []);
  return (
    <div>
      <h1>My Decks</h1>
      {decks.map(deck => {
        return (
          // <li>
          <Card
            style={{width: 300}}
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            }
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title={deck.title}
              description="This is the description"
            />
          </Card>
        );
      })}
    </div>
  );
};

export default DeckCard;
