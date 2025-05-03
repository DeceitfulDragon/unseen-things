<template>
  <span>{{ current }}</span>
</template>

<script>
export default {
  name: "RandomText",
  props: {
    items: {
      type: Array,
      required: true,
    },
    interval: {
      type: Number,
      default: 2000,
    },
  },
  data() {
    return {
      current: "",
    };
  },
  mounted() {
    // pick initial one immediately
    this.pickRandom();
    // rotate
    this._timer = setInterval(this.pickRandom, this.interval);
  },
  beforeUnmount() {
    clearInterval(this._timer);
  },
  methods: {
    pickRandom() {
      const idx = Math.floor(Math.random() * this.items.length);
      this.current = this.items[idx];
    },
  },
};
</script>
