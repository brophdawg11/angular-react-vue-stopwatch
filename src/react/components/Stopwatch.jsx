import React from 'react';

export class Stopwatch extends React.Component {

  constructor() {
    super();

    this.state = {
      time: 0.0,
    };
  }

  render() {
    return (
      <div>
        <h2>{ this.toNumber(this.state.time) }</h2>
      </div>
    );
  }

  toNumber(value) {
    return value.toFixed(2);
  }
}
