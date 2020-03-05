import React from "react";
import {Input, Select} from "antd";
import styles from "./HeaderSearchBar.module.css";

const Search = Input.Search;
const Option = Select.Option;

export default function HeaderSearchBar() {
  return (
    <div className={styles.searchContainer}>
      <h1 className={styles.heading}>Public Decks</h1>
      <div className={styles.filters}>
        <Search
          placeholder="Search"
          onSearch={value => console.log(value)}
          style={{width: "20vw"}}
        />
        <div>
          Sort By:
          <Select defaultValue="Home" style={{width: "10vw"}}>
            <Option value="Home">Home Hwllo</Option>
            <Option value="Company">Company</Option>
          </Select>
        </div>
      </div>
    </div>
  );
}
