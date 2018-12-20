<template>
  <div>
    <h1>Ristinolla</h1>
    <h3>{{ marker }}:n vuoro laittaa merkkinsä.</h3>

    <div>
      <table id="gametable">
        <tr>
          <td v-on:click="addMarker($event)"></td>
          <td v-on:click="addMarker($event)"></td>
          <td v-on:click="addMarker($event)"></td>
        </tr>
        <tr>
          <td v-on:click="addMarker($event)"></td>
          <td v-on:click="addMarker($event)"></td>
          <td v-on:click="addMarker($event)"></td>
        </tr>
        <tr>
          <td v-on:click="addMarker($event)"></td>
          <td v-on:click="addMarker($event)"></td>
          <td v-on:click="addMarker($event)"></td>
        </tr>
      </table>
      <div v-if="victory">
        <br>
        {{ marker }} voitti pelin!
      </div>
      <div v-if="tie">
        <br>Tasapeli!
      </div>
      <div>
        <button type="button" class="btn btn-primary" v-on:click="reload()">Uudestaan</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      rounds: 0,
      victory: false,
      tie: false,
      marker: "X",
      board: [[1, 1, 2], [0, 2, 2], [2, 1, 1]]
    };
  },
  methods: {
    checkRows: function() {
      let match = false;
      this.board.forEach(element => {
        if (element[0] == 0) {
          // empty value in current row
          return;
        } else if (element[0] == element[1] && element[1] == element[2]) {
          match = true;
        }
      });
      return match;
    },
    checkColumns: function() {
      let match = false;
      for (let i = 0; i < this.board.length; i++) {
        if (
          this.board[0][i] == this.board[1][i] &&
          this.board[1][i] == this.board[2][i] &&
          this.board[0][i] != 0
        ) {
          match = true;
        }
      }
      return match;
    },
    checkDiagonal: function() {
      let match = false;
      if (
        this.board[0][0] == this.board[1][1] &&
        this.board[1][1] == this.board[2][2] &&
        this.board[0][0] != 0
      ) {
        match = true;
      } else if (
        this.board[0][2] == this.board[1][1] &&
        this.board[1][1] == this.board[2][0] &&
        this.board[1][1] != 0
      ) {
        match = true;
      }
      return match;
    },
    gameResults: function() {
      let foundStraight = false;
      if (this.checkRows() || this.checkColumns() || this.checkDiagonal()) {
        foundStraight = true;
        console.log("\nStraigth was found.");
      }
      return foundStraight;
    },
    play: function() {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          let element = document.getElementById("gametable").rows[i].cells[j];
          switch (element.innerText) {
            case "X":
              this.board[i][j] = 1;
              break;
            case "O":
              this.board[i][j] = 2;
              break;
            default:
              this.board[i][j] = 0;
          }
        }
      }
      console.log(this.board);
      return this.gameResults();
    },
    addMarker: function(caller) {
      console.log("marker requested by ", caller);
      let square = caller.target;
      if (!this.victory) {
        if (!square.innerText) {
          console.log("Cell is empty, adding marker");
          square.innerText = this.marker;
          this.rounds++;
          if (this.play()) {
            console.log("Victory!");
            this.victory = true;
          } else {
            if (this.rounds == 9) {
              /* alert("Tasapeli!"); */
              this.tie = true;
            }
            this.marker = this.marker == "X" ? "O" : "X";
          }
        }
      }
    },
    reload: function() {
      /* TODO */
    }
  },

  created: function() {
    this.reload();
  }
};
</script>


<style>
table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
  margin-left: auto;
  margin-right: auto;
}

tr {
  height: 50px;
}
td {
  width: 50px;
  text-align: center;
}
button {
  margin: 20px;
}
</style>
