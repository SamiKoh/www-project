<template>
  <div>
    <div v-if="gameRunning">
      <Scoreboard :p1="player1" :p2="player2"></Scoreboard>
      <Game @victory="handleVictory" :ai="single" :start="false"></Game>
    </div>
    <div v-if="!gameRunning">
      <PlayerSelection v-if="!modeSelected" v-on:single="setMode"></PlayerSelection>

      <div v-if="modeSelected">
        <h5>Pelaajan 1 nimi</h5>
        <div class="col-md-6 offset-md-3">
          <input id="pname" class="form-control required" type="text" v-model="player1.name">
        </div>
        <br>
        <div v-if="!single">
          <h5>Pelaajan 2 nimi</h5>
          <div class="col-md-6 offset-md-3">
            <input id="pname" class="form-control required" type="text" v-model="player2.name">
          </div>
          <br>
        </div>
        <button class="btn btn-primary" @click="start">Aloita</button>
      </div>
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
        name: "",
        score: 0,
        marker: "X"
      },
      player2: {
        name: "",
        score: 0,
        marker: "O"
      },
      gameRunning: false,
      single: false,
      modeSelected: false
    };
  },
  methods: {
    setMode: function(mode) {
      /* this.gameRunning = true; */
      this.single = mode;
      this.modeSelected = true;
      if (mode) {
        this.player2.name = "Tietokone";
      }
    },
    start: function() {
      this.gameRunning = true;
      this.modeSelected = true;
    },
    handleVictory: function(result) {
      console.log(result);
      this.player1.score++;
    }
  }
};
</script>


<style>
input {
  text-align: center;
}
</style>
