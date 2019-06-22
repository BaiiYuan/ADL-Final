import React, { Component, useState, useRef } from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import ParnoramaImage from '../container/ParnoramaImage'

export const defaultStatus = {
    previous: 0,
    current: [0],
    next: 0,
};


class Parnorama extends Component {
  constructor(props) {
    super(props);
    // this.myRef = React.createRef();
    this.state = {
      sourecs: ["https://i.imgur.com/B1buLH3.jpg", "https://i.imgur.com/q1oP0pYr.jpg"],
      currentSelect: 0,
    }
    this.selectVersion = this.selectVersion.bind(this);
  }

  // handleScroller(state) {
  //   console.log(state)
  //   // console.log(this.myRef.current.scrollTo)
  //   if (state.previous === 1 && !state.next && !state.current.length) {
  //     this.myRef.current.scrollTo(0, 'center')
  //   }
  // }

  componentDidUpdate(prevProps) {
    if (this.props.sourecs !== this.state.sourecs) {
      this.setState({sourecs: this.props.sourecs});
    }
  }

  selectVersion(e) {
    console.log(parseInt(e.target.value))
    this.setState({currentSelect: parseInt(e.target.value)});
  }

  render() {
    return (
      <div>
        <button onClick={(e) => {console.log(this.state)}}>test</button>
        <Input type="select" name="versionSelect" onChange={(e) => this.selectVersion(e)}>
          {this.state.sourecs.map((e, index) =>
            <option value={index} >Version {index+1}</option>
          )}
        </Input><br />

        <ParnoramaImage
          link={this.state.sourecs[this.state.currentSelect]}
        />
      </div>
    )
  }
}
export default Parnorama