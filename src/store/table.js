export default {
  state: {
    tableData: [],
  },
  mutations: {
    setTableData(state, payload) {
      state.tableData = payload;
    },
  },
  actions: {
    async getTableDataFromApi({ commit }) {
      let res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum%2C%20dogecoin%2C%20bitcoin&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      );
      let jsnd = await res.json();
      commit("setTableData", jsnd);
    },
  },
  getters: {
    getTableData(state) {
      return state.tableData;
    },
  },
};
