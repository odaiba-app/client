<template>
  <input
    class="appearance-none bg-transparent border-b border-b-2 border-gray-400 focus:border-b-2 focus:border-orange-500 w-full text-center text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
    type="text"
    placeholder="Write your answer"
    aria-label="Answer"
    v-model="answer"
  />
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "InputAnswer",
  props: ["code", "idQuestion", "indexArray", "answerTemp"],
  // code is verb
  // index of arrray
  data() {
    return {
      // answer: "",
      ans: "",
      bounce: false,
    };
  },
  computed: {
    answer: {
      get() {
        return this.ans;
      },
      set(val) {
        this.ans = val;
      },
    },
  },
  methods: {
    ...mapActions("workGroups", ["AnswerQuestion"]),
    answerQ() {
      // answer question
      console.log(this.answer);
      this.AnswerQuestion({
        indexArray: this.indexArray,
        answer: this.answer,
        code: this.code == `verb-2` ? 2 : 3,
        idQuestion: this.idQuestion,
      });
      /* {
        
      }*/
    },
  },
  created() {
    const answerTemp = this.answerTemp == false ? "" : this.answerTemp;
    this.answer = answerTemp;
  },
  watch: {
    answerTemp() {
      const answerTemp = this.answerTemp == false ? "" : this.answerTemp;
      this.answer = answerTemp;
    },
    answer(val) {
      if (!this.bounce && val !== this.answerTemp) {
        this.bounce = true;
        setTimeout(() => {
          this.answerQ();
          this.bounce = false;
        }, 1000);
      }
    },
  },
};
</script>

<style lang="css" scoped></style>
