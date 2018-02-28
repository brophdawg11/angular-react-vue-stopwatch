<template>
  <div>
    <h2>{{ time | toNumber }}</h2>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: 0.0,
    };
  },
  filters: {
    toNumber(value) {
      return value.toFixed(2);
    }
  },
}
</script>
