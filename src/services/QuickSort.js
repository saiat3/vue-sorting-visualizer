import Vue from "vue";

export default new Vue({
  data() {
    return {
      counter: 0
    }
  },
  methods: {
    run(arr) {
      this.counter = 0;
      this.quickSort(arr, 0, arr.length - 1)
    },
    quickSort(arr, left, right) {
      // If somehow the left are equal or if the data is passed wrongly
      if (left >= right) {
        return false;
      }

      // Getting approximate middle of the array
      let pivot = arr[Math.floor((left + right) / 2)];

      let index = this.partition(arr, left, right, pivot);

      this.quickSort(arr, left, index - 1);
      this.quickSort(arr, index, right);
    },
    partition(arr, left, right, pivot) {
      while (left <= right) {

        // Moving left index to right
        while (arr[left] < pivot) {
          left++;
        }

        // Moving right index to left
        while (arr[right] > pivot) {
          right--;
        }

        // If left is less than right swap their places
        if (left <= right) {
          let tmp = arr[left];
          arr[left] = arr[right];
          arr[right] = tmp;
          left++;
          right--;

          this.counter++;
          this.$emit('onValueSwap', {
            arr: [...arr],
            counter: this.counter,
            left,
            right
          });
        }
      }
      return left;
    }
  }
});
