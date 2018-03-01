import React from 'react';
import { connect } from 'react-redux'
import { setActive, incrementTime, resetTime, addPreviousTime  } from '../actions'

class Stopwatch extends React.Component {

  subscription = null;

  constructor() {
    super();

    this.state = {
      time: 0.0,
      previousTimes: [],
      active: false
    };

    this.previousTime = this.previousTime.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.reset = this.reset.bind(this);
  }

  render() {
    return (
      <div>
        <h2>{ this.toNumber(this.props.time) }</h2>

        <button onClick={this.start}
                disabled={this.props.active}>
          Start
        </button>
        <button onClick={this.stop}
                disabled={!this.props.active}>
          Stop
        </button>
        <button onClick={this.reset}>
          Reset
        </button>

        { this.previousTime() + this.props.time > 0 && (
          <p>
            Total elapsed time: { this.toNumber(this.previousTime() + this.props.time) }
          </p> )}

        <ol>
          { this.props.previousTimes.map((time, index) =>
            <li key={index}>
              { this.toNumber(time) }
            </li>) }
        </ol>
      </div>
    );
  }

  previousTime() {
    return this.props.previousTimes.reduce((prev, cur) => prev + cur, 0);
  }

  toNumber(value) {
    return value.toFixed(2);
  }

  start() {
    this.props.setActive(true)
    this.subscription = setInterval(this.props.incrementTime, 10);
  }

  stop() {
    this.props.setActive(false)
    clearInterval(this.subscription);
    this.subscription = null;
  }

  reset() {
    this.stop();

    this.props.addPreviousTime(this.props.time);
    this.props.resetTime();
  }
}

function mapStateToProps(state, ownProps) {

  return {
    time: state.time,
    active: state.active,
    previousTimes: state.previousTimes
  }
}

const mapDispatchToProps = {
    setActive,
    incrementTime,
    resetTime,
    addPreviousTime
}

export default connect(mapStateToProps, mapDispatchToProps)(Stopwatch)
