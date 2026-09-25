<script setup lang="ts">
const props = defineProps<{
  src: string
  alt: string
  width?: string | number
  height?: string | number
}>()

const webpSrc = computed(() => {
  return /\.jpe?g$/i.test(props.src) ? props.src.replace(/\.jpe?g$/i, '.webp') : undefined
})
</script>

<template>
  <picture>
    <source
      v-if="webpSrc"
      :srcset="webpSrc"
      type="image/webp"
    />
    <img
      :src="src"
      :alt="alt"
      :width="width"
      :height="height"
      loading="lazy"
      decoding="async"
    />
  </picture>
</template>