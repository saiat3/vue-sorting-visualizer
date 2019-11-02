import Vue from "vue";

export default new Vue({
  methods: {
    run(arr) {
      let originalArray = [...arr];

      arr = arr.map((value, index) => {
        return {index, value}
      });

      let result = this.mergeSort(arr, originalArray);

      return result.map((element) => element.value);
    },
    mergeSort(arr, originalArray) {
      // Do not sort if array has one element or is empty
      if (arr.length <= 1) {
        return arr;
      }

      // In order to divide the array in half, we need to figure out the middle
      const middle = Math.floor(arr.length / 2);

      // Divide array into two parts
      const left = arr.slice(0, middle);
      const right = arr.slice(middle);

      console.log(left, right);

      // Using recursion to combine the left and right
      return this.merge(
        this.mergeSort(left, originalArray),
        this.mergeSort(right, originalArray),
        originalArray
      );
    },
    merge(left, right, originalArray) {
      let resultArray = [],
        leftIndex = 0,
        rightIndex = 0;

      // We will concatenate values into the resultArray in order
      while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex].value < right[rightIndex].value) {
          resultArray.push(left[leftIndex]);
          leftIndex++; // move left array cursor
        } else {
          resultArray.push(right[rightIndex]);
          rightIndex++; // move right array cursor
        }
      }

      // We need to concat here because there will be one element remaining from left or right
      let contactedResult = resultArray
        .concat(left.slice(leftIndex))
        .concat(right.slice(rightIndex));

      this.$emit('onLeftAndRightContact', contactedResult);

      return contactedResult;
    }
  }
});
