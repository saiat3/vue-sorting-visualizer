<template>
  <div class="sort-visualizer">

    <div class="buttons-placeholder">
      <button @click="resetArray">Reset</button>
      <button @click="bubbleSort">Run Bubble Sort</button>
    </div>

    <div class="bar-container">
      <div class="bar"
           v-for="(el, index) in array"
           :style="{height: `${el * 0.7}px`}"
           :key="index">
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'SortingVisualizer',
    data() {
      return {
        array: []
      }
    },
    methods: {
      resetArray() {
        const tmpArr = [];
        for (let i = 0; i < 250; i++) {
          tmpArr.push(randomIntFromInterval(5, 1000));
        }
        this.array = [...tmpArr];
      },
      bubbleSort() {
        let isSorted = false;
        let index = this.array.length - 1;

        while(!isSorted) {
          isSorted = true;
          for (let i = 0; i < index; i++) {
            if (this.array[i] > this.array[i + 1]) {
              isSorted = false;
              let tmp = this.array[i];
              this.array[i] = this.array[i + 1];
              this.array[i + 1] = tmp;
              this.array = [...this.array];
            }
          }

          index--;
        }
      }
    },
    beforeMount() {
      this.resetArray();
    }
  }

  function randomIntFromInterval(max, min) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

</script>

<style lang="scss" scoped>

  .buttons-placeholder {
    margin: auto;
    width: 1500px;
    padding-bottom: 20px;
    padding-top: 10px;
    border-bottom: 1px solid #cecece;

    button {
      margin-right: 10px;
      &:hover {
        cursor: pointer;
      }
    }
  }

  .bar-container {
    margin: auto;
    margin-top: 60px;
    border-bottom: 1px solid #cecece;
    width: 1500px;
    text-align: center;

    .bar {
      margin-right: 2px;
      font-size: 0;
      width: 4px;
      height: 2px;
      display: inline-block;
      background-color: #782b64;
    }

  }

</style>
