<template>
  <div class="game">
    <score :score="score"/>
    <skin v-for="(skin, idx) of gameSkins" :is-completed="choosenIdx !== -1" :is-choosen="choosenIdx === idx"
          :is-won="isWon" @skin-clicked="()=>{onSkinClicked(idx)}"
          :skin="skin"></skin>
  </div>
</template>

<style lang="scss">
.game {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: stretch;
}
</style>

<script>
import {random, shuffle} from "../utils.ts";
import {reactive, ref} from "vue";
import Score from "./Score.vue";
import Skin from "./Skin.vue";

export default {
  components: {Skin, Score},
  props: ["skins"],
  setup(props) {
    const canChoose = ref(true);
    const score = ref(0);
    const baseIdx = ref(0);
    const secondIdx = ref(0);
    const choosenIdx = ref(-1);
    const isWon = ref(false);
    let gameSkins = ref([]);

    startRound();

    function onSkinClicked(idx) {
      if(!canChoose.value) return;

      choosenIdx.value = idx;
      const oppositeIdx = (idx === 1 ? 0 : 1);
      if (gameSkins.value[idx].price >= gameSkins.value[oppositeIdx].price) {
        score.value++;
        isWon.value = true;
      } else {
        score.value = 0;
        isWon.value = false;
      }

      canChoose.value = false;
      setTimeout(() => {
        startRound();
      }, 1000);
    }

    function startRound() {
      baseIdx.value = random(0, props.skins.length);
      secondIdx.value = random(baseIdx.value - 10, Math.min(props.skins.length, baseIdx.value + 10));

      if(props.skins[baseIdx.value].market_name === props.skins[secondIdx.value].market_name){
        startRound();
      }

      choosenIdx.value = -1;
      isWon.value = false;
      gameSkins.value = shuffle([props.skins[baseIdx.value], props.skins[secondIdx.value]]);
      console.log(gameSkins.value[0].stickers);
      console.log(gameSkins.value[1].stickers);
      canChoose.value = true;
    }

    return {onSkinClicked, gameSkins, choosenIdx, isWon, score};
  }
}
</script>
