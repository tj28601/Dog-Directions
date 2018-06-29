import React, { Component } from 'react';
import StepTile from '../components/StepTile';
import ItemTile from '../components/ItemTile';
import FetchButton from '../components/FetchButton';

class InstructionsContainer
 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // id: null,
      step: null,
      data: null
    }
    // this.setId = this.setId.bind(this);
    this.getData= this.getData.bind(this);
    this.chooseTile = this.chooseTile.bind(this);
  }


  chooseTile(id){
    this.setState({ step: id });
  }

  getData(){
  	 fetch('/api/v1/favorite_things.json')
  	  .then(response => {
  	     if (response.ok) {
  	       return response;
  	     } else {
  	       let errorMessage = `${response.status} (${response.statusText})`,
  	           error = new Error(errorMessage);
  	       throw(error);
  	     }
  	   })
  	   .then(response => {
  	     return response.json()
  	   })
  	   .then(json => {
  	     this.setState({
  	       data: json
  	     })
  	   })
  	   .catch(error => console.error(`Error in fetch: ${error.message}`));
  };

  // this.setSelectedStep = this.setSelectedStep.bind(this);
  // this.fetchData = this.fetchData.bind(this);
  // setId(newId){
  //   this.setState({ id: newId })
  // }

  render(){
    // console.log(this.state.data)
    // let supplies = this.props.data.supplies
    // let directions = this.props.data.directions

    let activity;
    let items;
    let steps;

    	    if (this.state.data !== null) {
    	      let supplies = this.state.data.supplies
    	      let directions = this.state.data.directions

    	      activity = this.state.data.activity

    items = supplies.map(supply => {
      return(
        <ItemTile
        item={supply.item}
        key={supply.id}
        id={supply.id}
        />
      )
    })

    steps = directions.map(direction => {
      let className;
        if (direction.id === this.state.step) {
          className = "selected"
        }

        return(
          <StepTile
            step={direction.step}
            key={direction.id}
            id={direction.id}
            setSelectedStep={this.chooseTile}
            className={className}
          />
        )
      })
    }

    return(
      <div>
        <h1>How To {this.props.data.activity}</h1>
        <h3>Supplies:</h3>
        <ul>
          {items}
        </ul>
        <h3>Instructions:</h3>
        <ol>
          {steps}
        </ol>
        <FetchButton
          getData={this.getData}
        />
      </div>
    )
  }
}

export default InstructionsContainer
