<template>
  <div>
    <div v-if="gameRunning">
      <Scoreboard :p1="player1" :p2="player2"></Scoreboard>
      <Game></Game>
    </div>
    <div v-if="!gameRunning">
      <PlayerSelection v-on:single="setMode"></PlayerSelection>
      <h5>Pelaajan 1 nimi</h5>
      <PlayerName :name="player1.name"></PlayerName>
      <br>
      <div v-if="!single">
        <h5>Pelaajan 2 nimi</h5>
        <PlayerName :name="player2.name"></PlayerName>
        <br>
      </div>
      <button class="btn btn-primary" @click="start">Aloita</button>
    </div>
  </div>
</template>


<script>
import Game from "@/components/Game.vue";
import Scoreboard from "@/components/Scoreboard.vue";
import PlayerSelection from "@/components/PlayerSelection.vue";
import PlayerName from "@/components/PlayerName.vue";
export default {
  components: {
    Game,
    Scoreboard,
    PlayerSelection,
    PlayerName
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
      gameRunning: false,
      single: false
    };
  },
  methods: {
    setMode: function(mode) {
      /* this.gameRunning = true; */
      this.single = mode;
    },
    start: function() {
      this.gameRunning = true;
    }
  }
};
</script>


<style>
h5 {
}
</style>
