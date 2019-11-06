import React from "react";
import ListItem from "./ListItem";

class List extends React.Component {
  render() {
  	const lis = [];

    this.props.items.forEach(item => lis.push(<ListItem item={item} />));

    return (<ul>{lis}</ul>);
  }
}

export default List;
