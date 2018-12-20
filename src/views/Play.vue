<template>
  <div>
    <div v-if="gameRunning">
      <Scoreboard :p1="player1" :p2="player2"></Scoreboard>
      <Game></Game>
    </div>
    <div v-if="!gameRunning">
      <PlayerSelection v-on:single="setMode"></PlayerSelection>
    </div>
  </div>
</template>


<script>
import Game from "@/components/Game.vue";
import Scoreboard from "@/components/Scoreboard.vue";
import PlayerSelection from "@/components/PlayerSelection.vue";
export default {
  components: {
    Game,
    Scoreboard,
    PlayerSelection
  },
  data: function() {
    return {
      player1: {
        name: "Pelaaja 1",
        score: 0,
        marker: "X"
      },
      player2: {
        name: "Pelaaja 2",
        score: 0,
        marker: "O"
      },
      gameRunning: false
    };
  },
  methods: {
    setMode: function() {
      this.gameRunning = true;
    }
  }
};
</script>
