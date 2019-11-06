import React from 'react';
import List from './Components/List'

class Note extends React.Component {
  render() {
  	let items = ["asdas", "aedfas", "asfsdf"];
    return (
      <div>
        <h1>Note</h1>
        <List items={items} />
      </div>
    );
  }
}

export default Note;
