import Vue from "vue";

export default new Vue({
  methods: {
    run(array) {
      array = [...array];
      let isSorted = false;
      let index = array.length - 1;
      let counter = 0;
      while (!isSorted) {
        isSorted = true;
        for (let i = 0; i < index; i++) {
          isSorted = false;
          counter++;
          if (array[i] > array[i + 1]) {
            let tmp = array[i];
            array[i] = array[i + 1];
            array[i + 1] = tmp;

            this.$emit("onItemSwap", {
              first: {
                index: i,
                value: array[i]
              },
              second: {
                index: i + 1,
                value: array[i + 1]
              },
              counter
            });
          }
        }
        index--;
      }
    }
  }
});
