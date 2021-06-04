import Chart from "chart.js";
export default {
  state: {
    currency: "dogecoin",
    chart: null,
    isLoading:true
  },
  mutations: {
    changeCurrency:(state, type)=> {state.currency = type},
    setChart:(state, chart)=> {state.chart = chart},
    changeLoading:(state,payload)=>{ state.isLoading = payload}
  },
  getters: {
    getCurrency:(state)=>state.currency,
    getLoading:(state)=>state.isLoading
  },
  actions: {
    async getData({ state, dispatch }, payload) {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${state.currency}/market_chart?vs_currency=usd&days=${payload.interval}&interval=daily`
      );
      const jsnd = await res.json();
      let listeTarih = [];
      let listeFiyat = [];
      jsnd.prices.map((item) => {
        var date = new Date(item[0]);
        var price = item[1];
        listeTarih.push(
          date.getDate().toString() +
            " " +
            date.toLocaleString("default", { month: "long" })
        );

        listeFiyat.push(price);
      });
      let data = {
        listeFiyat,
        listeTarih,
        location: payload.location,
      };
      dispatch("drawGraph", data);
    },
    drawGraph({ state, commit }, payload) {
      if (!state.chart) {
        var myChart = new Chart(payload.location, {
          type: "line",
          data: {
            labels: payload.listeTarih,
            datasets: [
              {
                label: state.currency,
                data: payload.listeFiyat,
                backgroundColor: "rgb(233, 237, 222)",
                borderColor: "rgb(61, 59, 48)",
              },
            ],
          },
          options: {
            animation:{
              onComplete:()=>{
                commit("changeLoading",false)
              }
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    callback: function(value) {
                      return "$" + value.toFixed(3);
                    },
                    fontColor: "white",
                    fontSize: 15,
                  },
                },
              ],
              xAxes: [
                {
                  ticks: { fontColor: "white", fontSize: 15 },
                },
              ],
              y: { beginAtZero: true },
            },
            responsive: true,
            legend: { labels: { fontColor: "#FFFFFF", fontSize: 20 } },
          },
        });
        commit("setChart", myChart);
      } else {
        state.chart.data.datasets[0].data = payload.listeFiyat;
        state.chart.data.labels = payload.listeTarih;
        state.chart.options.animation = {onComplete:()=>commit("changeLoading",false)}
        state.chart.update();
      }
      
    },
  },
};
