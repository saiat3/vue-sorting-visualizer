import Vue from "vue";

export default new Vue({
  methods: {
    run(arr) {
      this.heapSort([...arr]);
    },
    heapSort(arr) {

      this.buildMaxHeap(arr);
      let end = arr.length - 1;

      while (end > 0) {

        let temp = arr[end];
        arr[end] = arr[0];
        arr[0] = temp;

        this.$emit('onValueSwap', {
          arr: [...arr],
          left: 0,
          right: end,
          isLast: end === 1,
        });

        this.siftDown(arr, 0, end);
        end--;
      }

      return arr;
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
