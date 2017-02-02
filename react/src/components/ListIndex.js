import React, {Component} from 'react';
import List from './List';

class ListIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {lists: []};
    this.getLists = this.getLists.bind(this);
  }
  componentDidMount() {
    this.getLists();
    setInterval(this.getLists, 15000);
  }

  getLists() {
    fetch('api/v1/lists',
      {credentials: "same-origin"}
    )
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status}, (${response.statusText})`;
        let error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      let newLists = [];
      body.forEach((list) => {
        newLists.push(list);
      });
      this.setState({lists: newLists});
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleDelete(listId) {
    fetch(`api/v1/lists/${listId}`, {
      method: 'delete',
      credentials: 'same-origin'
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status}, (${response.statusText})`;
        let error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => {
      this.getLists();
    });

  }

  render() {
    let lists = this.state.lists.map((list) => {

      let handleDeleteList = () => {
          this.handleDelete(list.id);
      };

      return(
        <List
          key = {list.id}
          list = {list}
          handleDelete = {handleDeleteList}
        />
      );
    });

    return(
      <div>
        {lists}
      </div>
    );
  }
}

export default ListIndex;
