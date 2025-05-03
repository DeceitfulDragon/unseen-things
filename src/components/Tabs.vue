<template>
  <div class="tabs-component">
    <!-- tab buttons -->
    <div class="flex space-x-2 border-b border-gray-700 mb-4">
      <button
        v-for="(t, i) in tabs"
        :key="i"
        @click="active = i"
        :class="[
          'px-3 py-1 focus:outline-none',
          active === i
            ? 'border-b-2 border-white'
            : 'text-gray-400 hover:text-white',
        ]"
      >
        {{ t.title }}
      </button>
    </div>

    <!-- tab panels -->
    <div v-for="(t, i) in tabs" :key="i" v-show="active === i">
      <div class="prose prose-invert" v-html="t.content"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tabs",
  props: {
    tabs: {
      type: Array,
      required: true,
    },
  },
  data() {
    return { active: 0 };
  },
};
</script>

<style scoped>
.tabs-component button {
  transition: color 0.2s;
}
</style>
