import Vue from "vue";

export default new Vue({
  methods: {
    run(arr) {
      this.selectionSort([...arr]);
    },
    selectionSort(arr) {
      // Starting index of sort should start with 0
      let index = 0;
      let swapCounter = 0;

      while (index !== arr.length) {
        let minValue = arr[index];
        let innerTmpIndex = index;

        for (let i = index; i < arr.length; i++) {
          // Save value and index if lesser value will be found than saved before
          if (arr[i] < minValue) {
            minValue = arr[i];
            innerTmpIndex = i;
          }
        }

        // Swap only if lesser value was found in the unsorted array
        if (innerTmpIndex !== index) {
          let tmp = arr[index];
          arr[index] = minValue;
          arr[innerTmpIndex] = tmp;

          this.$emit('onValueSwap', {
            left: {
              index: index,
              value: arr[index]
            },
            right: {
              index: innerTmpIndex,
              value: arr[innerTmpIndex]
            },
            counter: swapCounter++
          });
        }

        index++;

        // Notify function caller when the sort is finished
        if (index === arr.length) {
          this.$emit('onSortFinish', {
            counter: ++swapCounter
          });
        }
      }

      return arr;
    }
  }
});
