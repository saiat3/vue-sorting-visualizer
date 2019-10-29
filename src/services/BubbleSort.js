import Vue from "vue";

export default new Vue({
  methods: {
    run(arr) {
      arr = [...arr];
      let isSorted = false;
      let index = arr.length - 1;
      let counter = 0;
      while (!isSorted) {
        isSorted = true;
        for (let i = 0; i < index; i++) {
          isSorted = false;
          if (arr[i] > arr[i + 1]) {
            counter++;

            let tmp = arr[i];
            arr[i] = arr[i + 1];
            arr[i + 1] = tmp;
            this.$emit("onItemSwap", {
              arr: [...arr],
              left: i,
              right: i + 1,
              counter
            });
          }
        }
        index--;
      }
    }
  }
});
