<template>
  <div class="sort-visualizer">
    <div class="buttons-placeholder">
      <button class="btn" :disabled="isSorting" @click="resetArray">Reset</button>
      <button class="btn" :disabled="isSorting" @click="bubbleSort">Run Bubble Sort</button>
      <button class="btn" :disabled="isSorting" @click="heapSort">Run Heap Sort</button>
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
  import HeapSort from "../services/HeapSort";

  const MAIN_BG_COLOR = 'chartreuse';
  const SECONDARY_BG_COLOR = 'red';

  export default {
    name: 'SortingVisualizer',
    data() {
      return {
        array: [],
        isSorting: false
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
            }, 5);
          }, data.counter / 10)
        });
        BubbleSort.run(this.array);
      },
      heapSort() {
        this.isSorting = true;
        let counter = 10;
        HeapSort.$on('onValueSwap', (data) => {
          counter += 20;
          setTimeout(() => {
            this.changeBarColor(SECONDARY_BG_COLOR, data.second.index);
            this.changeBarColor(SECONDARY_BG_COLOR, data.first.index);

            this.array[data.first.index] = data.first.value;
            this.array[data.second.index] = data.second.value;
            this.array = [...this.array];

            setTimeout(() => {
              this.changeBarColor(MAIN_BG_COLOR, data.second.index);
              this.changeBarColor(MAIN_BG_COLOR, data.first.index);
            }, 20);

            if (data.isLast) {
              this.isSorting = false;
            }
          }, counter * 2)
        });
        HeapSort.run(this.array);
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

      .btn {
        outline: none;
        background: none;
        border: 1px solid #cecece;
        padding: 10px 20px;
        margin-right: 10px;

        &:hover {
          cursor: pointer;
          color: white;
          border: 1px solid #59ce79;
          background-color: #59ce79;
        }

        &[disabled] {
          background-color: #ebebeb;
          &:hover {
            color: rgb(128, 128, 128);
            border: 1px solid #cecece;
            cursor: not-allowed;
          }
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
