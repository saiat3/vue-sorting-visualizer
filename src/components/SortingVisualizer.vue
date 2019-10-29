<template>
  <div class="sort-visualizer">
    <div class="buttons-placeholder">
      <button class="btn" :disabled="isSorting" @click="resetArray">Reset</button>
      <button class="btn" :disabled="isSorting || isSorted" @click="bubbleSort">Run Bubble Sort</button>
      <button class="btn" :disabled="isSorting || isSorted" @click="heapSort">Run Heap Sort</button>

      <div class="status-placeholder">
        <table>
          <tr>
            <td>
              Processing
            </td>
            <td :class="{'processing': isSorting, 'not-processing': !isSorting}">
              {{isSorting ? 'Yes' : 'No'}}
            </td>
          </tr>
        </table>
        <table>
          <tr>
            <td>State</td>
            <td :class="{'sorted': isSorted, 'unsorted': !isSorted}">
              {{isSorted ? 'Sorted' : 'Unsorted'}}
            </td>
          </tr>
        </table>
      </div>

      <div style="clear: both"></div>
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
  const SECONDARY_BG_COLOR = '#e2201d';

  export default {
    name: 'SortingVisualizer',
    data() {
      return {
        array: [],
        isSorting: false,
        isSorted: false
      }
    },
    methods: {
      resetArray() {
        const tmpArr = [];
        for (let i = 0; i < 250; i++) {
          tmpArr.push(this.randomIntFromInterval(5, 1000));
        }
        this.array = [...tmpArr];
        this.isSorted = false;
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
        this.isSorting = true;
        let maxCounter = 0;

        BubbleSort.$on('onItemSwap', (data) => {
          // Save max counter to afterwards enable input fields
          if (data.counter > maxCounter) {
            maxCounter = data.counter;
          }

          setTimeout(() => {
            this.resetBackgroundColors();
            this.changeBarColor(SECONDARY_BG_COLOR, data.second.index);
            this.array[data.first.index] = data.first.value;
            this.array[data.second.index] = data.second.value;
            this.array = [...this.array];

            setTimeout(() => {
              this.resetBackgroundColors();
            }, 5);

            if (data.counter === maxCounter) {
              this.isSorting = false;
              this.isSorted = true;
            }

          }, data.counter);
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
              this.isSorted = true;
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
    width: 1500px;
    margin: 0 auto;

    .buttons-placeholder {
      margin: auto;
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

    .status-placeholder {
      display: inline-block;
      font-size: 20px;
      float: right;

      table {
        border-collapse: collapse;
        display: inline-block;

        &:first-child {
          margin-right: 10px;
        }

        td {
          font-weight: 500;
          width: 100px;

          &:first-child {
            font-weight: 800;
          }

          &.unsorted, &.not-processing {
            background-color: #e2201d;
            color: #ffffff;
          }

          &.sorted, &.processing {
            background-color: chartreuse;
          }

          padding: 5px 10px;
          border: 1px solid #cecece;
        }
      }
    }

    .bar-container {
      margin: auto;
      margin-top: 60px;
      border-bottom: 1px solid #cecece;
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
