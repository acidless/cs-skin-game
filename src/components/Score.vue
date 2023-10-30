<template>
  <div class="score-block">
    <p>{{ score }}</p>
  </div>
</template>

<style lang="scss">
.score-block {
  position: absolute;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);

  p{
    font-size: 5rem;
  }
}
</style>

<script>
export default {
  props: ["score"]
}
</script>