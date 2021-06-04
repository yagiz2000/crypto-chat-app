<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-11 d-flex justify-content-center">
        <div class="buttons d-flex flex-wrap">
          <button v-for="(item, i) in buttonData" :key="i" type="button" @click="draw(item.val)" class="btn btn-outline-secondary" :class='{"active-button":selected===item.val}'>
            {{ item.text }}
          </button>
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class=" col-md-10 col-lg-6 col-sm-10">
        <Loading v-if="loading"/>
        <canvas v-show="!loading" ref="chart" width="400" height="400"></canvas>
      </div>
    </div>
    <Chat />
  </div>
</template>

<script>
import Chat from "./Chat";
import Loading from "./Loading";
export default {
  components: {
    Chat,
    Loading
  },
  data() {
    return {
      interval: "15",
      currentChart: null,
      buttonData: [
        { text: "7 Günlük", val: "7" },
        { text: "14 Günlük", val: "14" },
        { text: "30 Günlük", val: "30" },
        { text: "60 Günlük", val: "60" },
        { text: "120 Günlük", val: "120" },
        { text: "360 Günlük", val: "360" },
      ],
      selected:"14",
    };
  },
  computed:{
    loading(){
      return this.$store.getters.getLoading;
    }
  },
  methods: {
    async draw(val) {
      this.changeActiveButton(val);
      this.interval = val;
      let data = {location: this.$refs.chart,interval: this.interval};
      this.$store.commit("changeLoading",true);
      this.$store.dispatch("getData", data);
},
    changeActiveButton(val){
      this.selected = val;
    }
  },
  async mounted() {
    let currency = this.$route.params.coin.toLowerCase();
    this.$store.commit("changeCurrency", currency);
    let data = {
      location: this.$refs.chart,
      interval: this.interval,
    };
    this.$store.dispatch("getData", data);
  },
  beforeDestroy() {
    this.$store.commit("setChart", null);
  },
};
</script>

<style scoped>
.buttons{
  display: flex;
}
#myChart {
  height: 500px;
}
.card {
  transition-duration: 0.7s;
  border-radius: 15px;
  background-color: #708090;
  color: white;
}
.card:hover {
  transform: scale3d(1.1, 1.1, 1.1);
  cursor: pointer;
}
.card-img {
  display: flex;
  justify-content: center;
}
.username {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.buttons {
  margin-top: 20px;
}
#title {
  text-align: center;
  color: antiquewhite;
  margin-bottom: 50px;
}
.btn-outline-secondary {
  color: #3d3b30;
  border: 2px solid #3d3b30;
  font-weight: 700;
  outline: none;
  box-shadow: none;
}
.active-button{
  background-color: #E9EDDE;
  color: #3d3b30;
}
</style>
