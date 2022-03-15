import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const localDB = {
  page1: [
    { id: 1, date: "20.03.2020", category: "Food", value: 169 },
    { id: 2, date: "21.03.2020", category: "Navigation", value: 50 },
    { id: 3, date: "22.03.2020", category: "Sport", value: 450 },
  ],
  page2: [
    { id: 4, date: "23.03.2020", category: "Entertaiment", value: 969 },
    { id: 5, date: "24.03.2020", category: "Education", value: 1500 },
    { id: 6, date: "25.03.2020", category: "Food", value: 200 },
  ],
  page3: [
    { id: 7, date: "23.03.2020", category: "Entertaiment", value: 969 },
    { id: 8, date: "24.03.2020", category: "Education", value: 1500 },
    { id: 9, date: "25.03.2020", category: "Food", value: 200 },
  ],
  page4: [
    { id: 10, date: "23.03.2020", category: "Entertaiment", value: 969 },
    { id: 11, date: "24.03.2020", category: "Education", value: 1500 },
    { id: 12, date: "25.03.2020", category: "Food", value: 200 },
  ],
};

function getCurrentDate() {
  const today = new Date();
  let d = String(today.getDate());
  d = d.length === 1 ? "0" + d : d;
  let m = String(today.getMonth() + 1);
  m = m.length === 1 ? "0" + m : m;
  const y = today.getFullYear();
  return `${d}.${m}.${y}`;
}

export default new Vuex.Store({
  state: {
    paymentsList: [],
    // paymentListIDS: [],
    categoryList: [],
  },
  mutations: {
    setPamentsListData(state, payload) {
      state.paymentsList = payload;
    },
    addDataToPaymentsList(state, data) {
      data.id = state.paymentsList.length + 1;
      state.paymentsList.push(data);
    },
    setCategories(state, payload) {
      console.log("setCategoriesMutations");
      state.categoryList = payload;
    },
  },
  actions: {
    presetData({ commit }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const items = [];
          for (let i = 1; i <= 10; i++) {
            items.push({
              date: getCurrentDate(),
              category: "Food",
              id: i,
              value: i,
            });
          }
          resolve(items);
        }, 1500);
      }).then((res) => {
        commit("setPamentsListData", res);
      });
    },
    loadCategories({ commit }) {
      console.log("loadCategories");
      commit("setCategories", [
        "Food",
        "Transport",
        "Education",
        "Entertainment",
        "Sport",
      ]);

      // return new Promise((resolve) => {
      //   // имитируем работу с сетью
      //   setTimeout(() => {
      //     resolve(["Food", "Transport", "Education", "Entertainment", "Sport"]);
      //   }, 1000);
      // }).then((res) => {
      //   // запускаем изменение состояния через commit
      //   console.log("setCategories");
      //   commit("setCategories", res);
      // });
    },
  },
  getters: {
    getPaymentList: (state) => state.paymentsList,
    getFullPaymentValue: (state) => {
      return state.paymentsList.reduce((acc, cur) => acc + cur.value, 0);
    },
    getCategoryList: (state) => state.categoryList,
  },
});
