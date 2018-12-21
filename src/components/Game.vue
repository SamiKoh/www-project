<template>
  <div>
    <h1>Ristinolla</h1>
    <h3>{{ marker }}:n vuoro laittaa merkkinsä.</h3>

    <div>
      <table id="gametable">
        <tr>
          <td v-on:click="addMarker($event)">{{ board[0].row[0] | symbol }}</td>
          <td v-on:click="addMarker($event)">{{ board[0].row[1] | symbol }}</td>
          <td v-on:click="addMarker($event)">{{ board[0].row[2] | symbol }}</td>
        </tr>
        <tr>
          <td v-on:click="addMarker($event)">{{ board[1].row[0] | symbol }}</td>
          <td v-on:click="addMarker($event)">{{ board[1].row[1] | symbol }}</td>
          <td v-on:click="addMarker($event)">{{ board[1].row[2] | symbol }}</td>
        </tr>
        <tr>
          <td v-on:click="addMarker($event)">{{ board[2].row[0] | symbol }}</td>
          <td v-on:click="addMarker($event)">{{ board[2].row[1] | symbol }}</td>
          <td v-on:click="addMarker($event)">{{ board[2].row[2] | symbol }}</td>
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
  props: ["ai", "start"],

  data: function() {
    return {
      rounds: 0,
      victory: false,
      tie: false,
      marker: "X",
      board: [{ row: [0, 0, 0] }, { row: [0, 0, 0] }, { row: [0, 0, 0] }]
    };
  },
  filters: {
    symbol: function(num) {
      if (!num) return "";
      return num == 1 ? "X" : "O";
    }
  },
  methods: {
    checkRows: function() {
      let match = false;
      this.board.forEach(element => {
        if (element.row[0] == 0) {
          // empty value in current row
          return;
        } else if (
          element.row[0] == element.row[1] &&
          element.row[1] == element.row[2]
        ) {
          match = true;
        }
      });
      return match;
    },
    checkColumns: function() {
      let match = false;
      for (let i = 0; i < this.board.length; i++) {
        if (
          this.board[0].row[i] == this.board[1].row[i] &&
          this.board[1].row[i] == this.board[2].row[i] &&
          this.board[0].row[i] != 0
        ) {
          match = true;
        }
      }
      return match;
    },
    checkDiagonal: function() {
      let match = false;
      if (
        this.board[0].row[0] == this.board[1].row[1] &&
        this.board[1].row[1] == this.board[2].row[2] &&
        this.board[0].row[0] != 0
      ) {
        match = true;
      } else if (
        this.board[0].row[2] == this.board[1].row[1] &&
        this.board[1].row[1] == this.board[2].row[0] &&
        this.board[1].row[1] != 0
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
      console.log(this.board);
      if (this.gameResults()) return true;
      else if (this.ai) {
        this.computer();
        return this.gameResults();
      } else return false;
    },
    addMarker: function(caller) {
      const rows = document.querySelectorAll("tr");
      const rowsArray = Array.from(rows);
      const i = rowsArray.findIndex(row => row.contains(caller.target));
      const columns = Array.from(rowsArray[i].querySelectorAll("td"));
      const j = columns.findIndex(column => column == event.target);
      console.log(i, j);
      if (!this.victory && !this.board[i][j]) {
        this.$set(this.board[i].row, j, this.marker == "X" ? 1 : 2);
        this.rounds++;
        if (this.play()) {
          console.log("Victory!");
          this.victory = true;
          this.$emit("victory", this.marker == "X" ? 1 : 2);
        } else {
          if (this.rounds == 9) {
            this.tie = true;
            this.$emit("victory", 0);
          }
          this.marker = this.marker == "X" ? "O" : "X";
        }
      }
      console.log(this.board);
      /* if (!square.innerText) {
          console.log("Cell is empty, adding marker");
          square.innerText = this.marker;
          this.rounds++;
          if (this.play()) {
            console.log("Victory!");
            this.victory = true;
          } else {
            if (this.rounds == 9) {
              this.tie = true;
            }
            this.marker = this.marker == "X" ? "O" : "X";
          }
        } */
    },
    reload: function() {
      this.computer();
      /* TODO */
    },
    computer: function() {
      let i = this.random(0, 3);
      let j = this.random(0, 3);
      while (this.board[i].row[j] > 0) {
        i = this.random(0, 3);
        j = this.random(0, 3);
      }
      this.$set(this.board[i].row, j, this.start ? 1 : 2);

      console.log(i);
    },
    random: function(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
  },
  mounted: function() {
    if (this.start) {
      this.computer();
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
