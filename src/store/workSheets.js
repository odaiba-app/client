import Axios from "axios";
import io from "socket.io-client";
import { socketUrl } from "../config/api";
const socket = io(socketUrl);

export default {
  namespaced: true,
  state: {
    sheets: [],
    count: 1,
    groups: [],
    group: {
      id: 1,
      name: "....",
      video_call_code: "...",
      turn_time: 60 * 5,
      session_time: 60 * 15,
      status: "onprogress",
      users: [],
      classroom_id: 1,
      score: 0,
      answered: 0,
      sheets: [],
    },
    groupid: null,
  },
  mutations: {
    SET_GROUPID(state, payload) {
      state.groupid = payload;
    },
    SET_SHEETS(state, payload) {
      state.sheets = payload;
    },
    CLEAR_SHEETS(state, payload) {
      state.sheets = [];
    },
    INPUT_ANSWER(state, payload) {
      /* {
        indexArray,
        answer,
        code: code == `verb-2` ? 2 : 3,
        idQuestion
      }*/
      let sheetsTemp = JSON.stringify(state.sheets);
      sheetsTemp = JSON.parse(sheetsTemp);
      sheetsTemp[payload.indexArray].questions[payload.code] = payload.answer;
      state.sheets = sheetsTemp;
      socket.emit("updateSheet", {
        sheets: state.sheets,
        groupid: state.groupid,
      });
    },
    SET_GROUP(state, payload) {
      state.group = payload;
    },
    SET_GROUPS(state, payload) {
      state.groups = payload;
    },
  },
  actions: {
    getWorkSheets({ state, commit }) {
      // socket.on()
      // commit("SET_SHEETS", sheets);
    },
    GetWorkGroup({ state, commit }) {
      const name = localStorage.getItem("odaiba.name");
      socket.on(`getWorkGroup-${name}`, function(workGroup) {
        commit("SET_SHEETS", workGroup.sheets);
        commit("SET_GROUP", workGroup);
      });
      socket.on("reset", function(payload) {
        console.log(payload);
        const indexGroup = payload.findIndex(function(r) {
          return r.id === Number(state.groupid);
        });

        commit("SET_SHEETS", workGroup[indexGroup].sheets);
        commit("SET_GROUP", workGroup[indexGroup]);
        commit("SET_GROUPS", workGroup);
      });
      socket.emit(`getWorkGroup`, {
        id: state.groupid,
        to: name,
      });
    },
    AnswerQuestion({ commit, state }, payload) {
      commit("INPUT_ANSWER", payload);
      socket.emit("answerQ", payload);
    },
    UpdateAnswer({ commit }) {
      socket.on("answerQ", function(response) {
        console.log(response);
        commit("INPUT_ANSWER", response);
      });
    },
    NewQuestion({ dispatch }) {
      dispatch("getWorkSheets");
      socket.emit("newQ");
    },
    UpdateQuestion({ dispatch }) {
      socket.on("newQ", function() {
        dispatch("getWorkSheets");
      });
    },
    GetGroups() {
      socket.emit("getGroups", localStorage.getItem("odaiba.name"));
    },
    ListenGroups({ commit, state }) {
      socket.on(localStorage.getItem("odaiba.name"), function(response) {
        console.log(response);

        const indexGroup = response.findIndex(function(r) {
          return r.id === Number(state.groupid);
        });
        console.log(indexGroup);
        commit("SET_GROUP", response[indexGroup]);
      });
    },
    getGroups() {
      socket.emit("getGroups", "realtime-groups");
    },
    realtimeGroups({ commit }) {
      socket.on("realtime-groups", function(response) {
        console.log(response);
        commit("SET_GROUPS", response);
      });
    },
  },
};
