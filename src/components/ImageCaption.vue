<template>
  <figure class="image-caption-component my-6">
    <img
      :src="src"
      :alt="alt"
      class="block mx-auto rounded-lg shadow-lg border border-gray-700"
      :style="{ maxWidth: width }"
    />
    <figcaption class="mt-2 text-center italic text-gray-400">
      {{ caption }}
    </figcaption>
  </figure>
</template>

<script>
export default {
  name: "ImageCaption",
  props: {
    src: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      default: "",
    },
    alt: {
      type: String,
      default: "",
    },
    width: {
      type: String,
      default: "100%",
    },
  },
};
</script>
