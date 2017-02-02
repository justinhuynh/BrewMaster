import React from 'react';

const List = props =>{
  let list = <a href={`lists/${props.list.id}`}>{props.list.name}</a>;
  let deleteButton = <span> | <a href="javascript:;" onClick={props.handleDelete} id={`destroy-${props.list.id}`}>Delete</a></span>;

  return(
    <div>
      {list} {deleteButton}
    </div>
  );
};

export default List;
