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
           :id="`bar-${index}`"
           :key="index">
      </div>
    </div>
  </div>
</template>

<script>
  import BubbleSort from "../services/BubbleSort";

  const MAIN_BG_COLOR = 'chartreuse';
  const SECONDARY_BG_COLOR = 'red';

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
          tmpArr.push(this.randomIntFromInterval(5, 1000));
        }
        this.array = [...tmpArr];
      },
      randomIntFromInterval(max, min) {
        return Math.floor(Math.random() * (max - min + 1) + min);
      },
      changeBarColor(color, index) {
        document.getElementById(`bar-${index}`).style.backgroundColor = color;
      },
      resetBackgroundColors() {
        document.querySelector('.bar-container').children.forEach((child) => {
          child.style.backgroundColor = MAIN_BG_COLOR;
        })
      },
      bubbleSort() {
        BubbleSort.$on('onItemSwap', (data) => {
          setTimeout(() => {
            this.resetBackgroundColors();
            this.changeBarColor(SECONDARY_BG_COLOR, data.second.index);
            this.array[data.first.index] = data.first.value;
            this.array[data.second.index] = data.second.value;
            this.array = [...this.array];
            setTimeout(() => {
              this.resetBackgroundColors();
            }, 5)
          }, data.counter / 10)
        });
        BubbleSort.run(this.array);
      }
    },
    beforeMount() {
      this.resetArray();
    }
  }
</script>

<style lang="scss" scoped>

  .sort-visualizer {
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
        background-color: chartreuse;
      }
    }
  }
</style>
