import React, {useState, useEffect} from "react";
import axiosWithAuth from "../../helpers/axiosWithAuth";
import styles from "./DeckLibrary.module.css";
import {List, Card, Icon} from "antd";
import {EditOutlined, EllipsisOutlined, SettingOutlined} from "@ant-design/icons";

export default function DeckLibrary() {
  const [decks, setDecks] = useState([{}, {}, {}, {}, {}]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      axiosWithAuth()
        .get("http://localhost:4003/api/decks")
        .then(res => {
          console.log(res);
          setDecks(res.data.data);
          return res;
        })
        .then(res => {
          setLoading(false);
        });
    }, 3000);
  }, []);

  return (
    <div className={styles.deckLibraryContainer}>
      {decks.map(deck => {
        return (
          <Card
            actions={[
              //   <Icon type="setting" style={{color: "rgba(14,12,12,.60)"}} />,
              <Icon type="edit" style={{color: "rgba(14,12,12,.60)"}} key="edit" />,
              <Icon type="delete" style={{color: "rgba(14,12,12,.60)"}} />,
              //   <SettingOutlined key="setting" />,
              //   <EditOutlined key="edit" />,
              //   <EllipsisOutlined key="ellipsis" />,
            ]}
            loading={loading}
            className={styles.placeholder}
          >
            {deck.deck_name}
          </Card>
        );
      })}
    </div>
  );
}
