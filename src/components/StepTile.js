import React from 'react';

const StepTile = props => {

  let handleClick = () => {
    props.setSelectedStep(props.id);
  }

  return(
    // <li>{props.step}</li>
    <li className={props.className} onClick={handleClick}>{props.step}</li>
  )
}

export default StepTile;
