<script lang="ts">
import {useStore} from "vuex";
import {computed} from "vue";
import Game from "./components/Game.vue";

export default {
  components: {Game},
  setup() {
    const store = useStore();
    store.dispatch("getAllSkins");
    return {
      skins: computed(() => {
        return store.getters.skins;
      })
    }
  }
}


</script>

<template>
  <Game :skins="skins"/>
</template>

<style>
:root{
  overflow: hidden;
}
</style>
