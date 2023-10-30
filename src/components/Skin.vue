<template>
  <div class="skin-card" :class="{'win':isWon && isChoosen, 'loose':!isWon && isChoosen}" @click="$emit('skinClicked')">
    <img :src="skin.image_512" alt="">
    <p>{{ skin.market_name }}</p>
    <p class="skin-price" :class="{active:isCompleted}">{{ Math.round(skin.price * 100) / 100 }}$</p>
  </div>
</template>

<style lang="scss">
.skin-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  cursor: pointer;
  transition: 0.3s background-color ease-in-out;

  img{
    margin-bottom: 1rem;
  }

  &.win {
    background-color: green;

    &:hover {
      background-color: green;
    }
  }

  &.loose {
    background-color: red;

    &:hover {
      background-color: red;
    }
  }

  &:hover {
    background-color: var(--main-color);
  }

  &:first-child {
    border-right: 1px solid var(--main-color);
  }

  &:last-child {
    border-left: 1px solid var(--main-color);
  }
}

.skin-price {
  font-weight: bold;
  font-size: 2rem;
  opacity: 0;
  transform: scale(0.8);

  &.active {
    opacity: 1;
    transform: scale(1);
    transition: 0.3s all ease-in-out;
  }
}


</style>

<script>
export default {
  props: ["skin", "className", "isWon", "isChoosen", "isCompleted"]
}
</script>