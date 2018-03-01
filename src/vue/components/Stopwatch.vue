<template>
  <div>
    <h2>{{ time | toNumber }}</h2>

    <button v-on:click="start"
            v-bind:disabled="active">
      Start
    </button>
    <button v-on:click="stop"
            v-bind:disabled="!active">
      Stop
    </button>
    <button v-on:click="reset">
      Reset
    </button>


    <p v-if="previousTime + time > 0">
      Total elapsed time: {{ previousTime + time | toNumber }}
    </p>

    <ol>

      <li v-for="(time, index) in previousTimes"
          :key="index">
        {{ time | toNumber }}
      </li>
    </ol>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { mutations, actions } from '../store';

export default {
  created() {
      this.subscription = null;
  },
  computed: {
    // Method 1 => Explicit
    time() {
      return this.$store.state.time;
    },
    previousTimes() {
      return this.$store.state.previousTimes;
    },
    active() {
      return this.$store.state.active;
    },

    // Method 2 => Mapper functions
    // ...mapState({
    //   time: state => state.time,
    //   previousTimes: state => state.previousTimes,
    //   active: state => state.active,
    // }),

    // Method 3 => shorthand property references
    // ...mapState([
    //   'time',
    //   'previousTimes',
    //   'active',
    // ]),

    previousTime() {
      return this.previousTimes.reduce((prev, cur) => prev + cur, 0);
    },
  },
  filters: {
    toNumber(value) {
      return value.toFixed(2);
    }
  },
  methods: {
    // Method 1 - Explicit $store.commit()/dispatch() calls
    start() {
      this.$store.commit(mutations.SET_ACTIVE, true);
      this.$store.dispatch(actions.START_INTERVAL);
    },
    stop() {
      this.$store.commit(mutations.SET_ACTIVE, false);
      this.$store.dispatch(actions.STOP_INTERVAL);
    },
    reset() {
      this.stop();
      this.$store.commit(mutations.ADD_PREVIOUS_TIME, this.time);
      this.$store.commit(mutations.RESET_TIME);
    },

    // Method 2 - Vuex utilities to map them to methods
    // ...mapMutations({
    //   setActive: mutations.SET_ACTIVE,
    //   resetTime: mutations.RESET_TIME,
    //   increment: mutations.INCREMENT,
    //   addPreviousTime: mutations.ADD_PREVIOUS_TIME
    // }),

    // ...mapActions({
    //   startInterval: actions.START_INTERVAL,
    //   stopInterval: actions.STOP_INTERVAL,
    // }),

    // start() {
    //   this.setActive(true);
    //   this.startInterval();
    // },
    // stop() {
    //   this.setActive(false),
    //   this.stopInterval();
    // },
    // reset() {
    //   this.stop();
    //   this.addPreviousTime(this.time);
    //   this.resetTime();
    // },
  }
}
</script>
