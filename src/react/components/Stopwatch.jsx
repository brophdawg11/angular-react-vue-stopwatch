import React from 'react';

export class Stopwatch extends React.Component {

  subscription = null;

  constructor() {
    super();

    this.state = {
      time: 0.0,
      active: false
    };

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.reset = this.reset.bind(this);
  }

  render() {
    return (
      <div>
        <h2>{ this.toNumber(this.state.time) }</h2>

        <button onClick={this.start}
                disabled={this.state.active}>
          Start
        </button>
        <button onClick={this.stop}
                disabled={!this.state.active}>
          Stop
        </button>
        <button onClick={this.reset}>
          Reset
        </button>

      </div>
    );
  }

  toNumber(value) {
    return value.toFixed(2);
  }

  start() {
    if (this.state.active) return;

    this.setState({ active: true })
    this.subscription = setInterval(() =>
      this.setState({ time: this.state.time + 0.01 }), 10);
  }

  stop() {
    if (!this.state.active) return;

    this.setState({ active: false })
    clearInterval(this.subscription);
    this.subscription = null;
  }

  reset() {
    this.stop();
    this.setState({
      time: 0.0
    });
  }
}
