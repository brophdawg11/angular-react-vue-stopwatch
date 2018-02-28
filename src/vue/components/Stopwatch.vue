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
export default {
  created() {
      this.subscription = null;
  },
  data() {
    return {
      time: 0.0,
      previousTimes: [],
      active: false
    };
  },
  computed: {
    previousTime () {
      return this.previousTimes.reduce((prev, cur) => prev + cur, 0);
    }
  },
  filters: {
    toNumber(value) {
      return value.toFixed(2);
    }
  },
  methods: {
    start() {
      if (this.active) return;

      this.active = true;
      this.subscription = setInterval(() =>
        this.time += 0.01, 10);
    },
    stop() {
      if (!this.active) return;

      this.active = false;
      clearInterval(this.subscription);
      this.subscription = null;
    },
    reset() {
      this.stop();
      this.previousTimes.push(this.time);
      this.time = 0.0;
    }
  }
}
</script>
