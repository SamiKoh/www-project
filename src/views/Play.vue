<template>
  <div>
    <NavBar></NavBar>
    <!-- Game area -->
    <div v-if="gameRunning">
      <Scoreboard :p1="player1" :p2="player2" v-on:changeMode="changeMode"></Scoreboard>
      <Game @victory="handleVictory" :ai="single" :start="aiStarts" :key="boardCounter"></Game>
      <button
        id="reload"
        disabled
        type="button"
        class="btn btn-primary"
        v-on:click="reload()"
      >Uudestaan</button>
      <br>
      <button v-on:click.prevent="changeMode" class="btn btn-secondary">Vaihda pelitapaa</button>
    </div>
    <!-- End of game area -->
    <!-- Game options -->
    <div v-if="!gameRunning">
      <PlayerSelection v-if="!modeSelected" v-on:single="setMode"></PlayerSelection>

      <div v-if="modeSelected">
        <!-- singleplayer -->
        <h5>Pelaajan 1 nimi</h5>
        <div class="col-md-6 offset-md-3">
          <input id="pname" class="form-control required" type="text" v-model="player1.name">
        </div>
        <br>
        <!-- multiplayer, ask for 2nd player name -->
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
    <!-- End of game options -->
  </div>
</template>


<script>
import Game from "@/components/Game.vue";
import Scoreboard from "@/components/Scoreboard.vue";
import NavBar from "@/components/NavBar.vue";
import PlayerSelection from "@/components/PlayerSelection.vue";
export default {
  components: {
    Game,
    Scoreboard,
    PlayerSelection,
    NavBar
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
      single: false, // singleplayer game
      modeSelected: false,
      boardCounter: 0, // used to relaod board
      p1starts: true, // player 1 starts game
      aiStarts: false // player 1 starts game
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
    changeMode: function() {
      this.gameRunning = false;
      this.modeSelected = false;
    },
    start: function() {
      this.gameRunning = true;
      this.modeSelected = true;
      /* default names */
      if (!this.player1.name) this.player1.name = "Pelaaja 1";
      if (!this.player2.name) this.player2.name = "Pelaaja 2";
      this.player1.marker = this.p1starts ? "X" : "O";
      this.player2.marker = this.p1starts ? "O" : "X";
    },
    handleVictory: function(result) {
      console.log(result);
      var winner;
      var loser;
      switch (result) {
        case 1:
          /* starting player wins */
          winner = this.p1starts ? this.player1 : this.player2;
          loser = winner == this.player1 ? this.player2 : this.player1;
          winner.score++;
          this.axios
            .post(this.api + "gameresults", {
              winner: winner.name,
              loser: loser.name,
              winnerMarker: "X",
              singlePlayer: this.single
            })
            .then(function(response) {
              console.log(response);
            })
            .catch(function(err) {
              console.log(err);
            });
          break;
        case 2:
          winner = this.p1starts ? this.player2 : this.player1;
          loser = winner == this.player1 ? this.player2 : this.player1;
          winner.score++;
          this.axios
            .post(this.api + "gameresults", {
              winner: winner.name,
              loser: loser.name,
              winnerMarker: "O",
              singlePlayer: this.single
            })
            .then(function(response) {
              console.log(response);
            })
            .catch(function(err) {
              console.log(err);
            });
          break;
        case 0:
          /* tie */
          this.axios
            .post(this.api + "gameresults", {
              winner: "",
              loser: "",
              winnerMarker: "",
              singlePlayer: this.single
            })
            .catch(err => console.log(err));
          break;
        default:
          /* unexpected result */
          break;
      }
      /* change starting player */
      this.p1starts = this.p1starts ? false : true;
      this.aiStarts = this.p1starts ? false : true;
      document.getElementById("reload").removeAttribute("disabled");
    },
    reload: function() {
      /* Assign correct markers */
      this.player1.marker = this.p1starts ? "X" : "O";
      this.player2.marker = this.p1starts ? "O" : "X";
      /* Change component key to refresh board */
      this.boardCounter++;
      document.getElementById("reload").setAttribute("disabled", "");
    }
  }
};
</script>


<style>
input {
  text-align: center;
}
</style>
