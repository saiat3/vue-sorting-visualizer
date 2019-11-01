<template>
  <div class="sort-visualizer">
    <div class="buttons-placeholder">
      <button class="btn" :disabled="isSorting" @click="resetArray">Reset</button>
      <button class="btn" :disabled="isSorting || isSorted" @click="bubbleSort">Bubble Sort</button>
      <button class="btn" :disabled="isSorting || isSorted" @click="heapSort">Heap Sort</button>
      <button class="btn" :disabled="isSorting || isSorted" @click="quickSort">Quick Sort</button>
      <button class="btn" :disabled="isSorting || isSorted" @click="mergeSort">Merge Sort</button>

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
  import QuickSort from "../services/QuickSort";
  import MergeSort from "../services/MergeSort";

  const MAIN_BG_COLOR = 'chartreuse';
  const SECONDARY_BG_COLOR = '#e2201d';
  const EXTRA_BG_COLOR = '#a619e2';

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
        for (let i = 0; i < 70; i++) {
          tmpArr.push(this.randomIntFromInterval(5, 1000));
        }
        this.array = [...tmpArr];
        this.isSorted = false;
      },
      randomIntFromInterval(max, min) {
        return Math.floor(Math.random() * (max - min + 1) + min);
      },
      changeBarColor(color, index) {
        let tmp = document.getElementById(`bar-${index}`);
        if (tmp) {
          tmp.style.backgroundColor = color;
        }
      },
      resetBackgroundColors() {
        document.querySelector('.bar-container').children.forEach((child) => {
          child.style.backgroundColor = MAIN_BG_COLOR;
        })
      },
      bubbleSort() {
        this.isSorting = true;
        let counter = 0;
        let time = 0;

        BubbleSort.$on('onItemSwap', (data) => {
          counter++;
          time += 5;

          setTimeout(() => {
            this.resetBackgroundColors();
            this.changeBarColor(SECONDARY_BG_COLOR, data.right);

            setTimeout(() => {
              this.resetBackgroundColors();
            }, time);

            this.array = [...data.arr];

            if (data.counter === counter) {
              this.isSorting = false;
              this.isSorted = true;
            }
          }, time);
        });

        BubbleSort.run(this.array);
      },
      heapSort() {
        this.isSorting = true;
        let time = 10;
        HeapSort.$on('onValueSwap', (data) => {
          time += 100;
          setTimeout(() => {
            this.changeBarColor(SECONDARY_BG_COLOR, data.left);
            this.changeBarColor(EXTRA_BG_COLOR, data.right);

            setTimeout(() => {
              this.changeBarColor(MAIN_BG_COLOR, data.right);
            }, 100);

            this.array = [...data.arr];

            if (data.isLast) {
              setTimeout(() => {
                this.changeBarColor(MAIN_BG_COLOR, data.left);
                this.isSorting = false;
                this.isSorted = true;
              }, 100);
            }
          }, time);
        });
        HeapSort.run(this.array);
      },
      quickSort() {
        this.isSorting = true;
        let time = 0;
        let counter = 0;
        QuickSort.$on('onValueSwap', (data) => {
          counter++;
          time += 100;
          setTimeout(() => {
            this.changeBarColor(SECONDARY_BG_COLOR, data.left);
            this.changeBarColor(EXTRA_BG_COLOR, data.right);

            setTimeout(() => {
              this.changeBarColor(MAIN_BG_COLOR, data.left);
              this.changeBarColor(MAIN_BG_COLOR, data.right);
            }, 50);

            this.array = [...data.arr];

            if (data.counter === counter) {
              setTimeout(() => {
                this.changeBarColor(MAIN_BG_COLOR, data.left);
                this.changeBarColor(MAIN_BG_COLOR, data.right);
                this.isSorting = false;
                this.isSorted = true;
              }, 100);
            }
          }, time);
        });
        QuickSort.run(this.array);
      },
      mergeSort() {
        MergeSort.run([]);
      }
    },
    beforeMount() {
      this.resetArray();
    }
  }
</script>

<style lang="scss" scoped>

  .sort-visualizer {
    width: 1200px;
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
        margin-right: 4px;
        font-size: 0;
        width: 13px;
        height: 2px;
        display: inline-block;
        background-color: chartreuse;
      }
    }
  }
</style>
