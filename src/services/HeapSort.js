import Vue from "vue";

export default new Vue({
  methods: {
    run(arr) {
      this.heapSort(arr);
    },
    heapSort(arr) {
      let array = [...arr];

      this.buildMaxHeap(array);
      let end = array.length - 1;

      while (end > 0) {

        let temp = array[end];
        array[end] = array[0];
        array[0] = temp;

        this.$emit('onValueSwap', {
          first: {
            index: 0,
            value: array[0]
          },
          second: {
            index: end,
            value: array[end]
          },
          isLast: end === 1
        });

        this.siftDown(array, 0, end);
        end--;
      }

      return array;
    },
    buildMaxHeap(arr) {
      let currentIndex = Math.floor(arr.length / 2);

      while (currentIndex >= 0) {
        this.siftDown(arr, currentIndex, arr.length);
        currentIndex--;
      }
    },
    siftDown(array, currentIndex, end) {
      if (currentIndex >= Math.floor(end / 2)) {
        return;
      }

      let left = currentIndex * 2 + 1;
      let right = currentIndex * 2 + 2 < end ? currentIndex * 2 + 2 : null;
      let swap;

      if (right) {
        swap = array[left] > array[right] ? left : right;
      } else {
        swap = left;
      }

      // Uncomment following code to log more info
      // console.log(`My index is ${currentIndex}`);
      // console.log(`My left is ${left}`);
      // console.log(`My right is ${right}`);
      // console.log(`My swap is ${swap}`);
      // console.log(`My arr[currIdx] is ${array[currentIndex]}`);
      // console.log(`My arr[swap] is ${array[swap]}`);

      if (array[currentIndex] < array[swap]) {
        let temp = array[swap];
        array[swap] = array[currentIndex];
        array[currentIndex] = temp;

        this.siftDown(array, swap, end);
      }
    }
  }
});
