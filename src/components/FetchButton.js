import React from 'react';

const FetchButton = props => {
  let handleClick =() => {
    props.getData();
  }

  return(
    <button onClick={handleClick}>Get Favorite Thing</button>
  )
}

export default FetchButton;
