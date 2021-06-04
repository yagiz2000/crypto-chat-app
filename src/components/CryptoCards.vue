<template>
  <div class="container">
    <div class="row">
      <div v-for="(data, i) in tableData" :key="i"  class="col-md-4 col-sm-4">
        <router-link id="crypto-card" class="card mt-4" tag="div" :to="{ name: 'coin', params: { coin: data.name } }">
          <div  class="card-img d-flex justify-content-center">
            <img :src="data.image" class="card-img-top" style="width:150px" />
          </div>
          <div class="card-body text-center">
            <h5 class="card-title">{{ data.name }}</h5>
            <h4 class="card-title">{{ data.current_price }} $</h4>
            <h4 class="card-title" :class="switchColor(data.price_change_percentage_24h)">
              {{ data.price_change_percentage_24h }} %
            </h4>
          </div>
        </router-link>
      </div>
    </div>
      <div class="row my-4" style="width:50%; margin:auto">
      <div class="col">
        <div class="username" v-if="showUser!==''">
          <h1 id="title">Hoşgeldin, {{showUser}}</h1>
          <button type="button" @click="logOut" class="btn btn-danger">Çıkış Yap</button>
        </div>
        <div v-else class="username">
          <h1 id="title"> Kullanıcı adı </h1>
          <div class="input-group">
            <input ref="registerInput" v-model="userName" type="text" class="form-control" />
          </div>
          <div class="buttons">
            <button type="button" id="signBtn" @click="registerUserName" class="btn btn-success">Giriş Yap</button>
          </div>
          <h2>Ya da anonim ol</h2>
          <SwitchBox/>
        </div>
      </div>
    </div>
 
  </div>
</template>

<script>
import mixin from "../mixins/mixin";
import SwitchBox from "./SwitchBox";
export default {
  components:{
    SwitchBox
    },
  mixins:[mixin],
  data() {
    return {
      userName:""
    };
  },
  computed: {
    tableData() {
      return this.$store.getters.getTableData;
    },
    showUser(){
      return this.$store.getters.getUserName;
    }
  },
  mounted() {
    this.userName = localStorage.getItem("userName");
    this.$store.dispatch("getTableDataFromApi");
  },
  methods: {
    switchColor(data) {
      return data < 0 ? "decreased" : "increased";
    },
    registerUserName(){
      if(this.userName ===""){
        const content = {title:"oops",text:"Kullanıcı adı boş kalamaz",icon:"warning"}
        this.triggerSimpleAlert(content);
        }
      else{this.$store.commit("setUserName",this.userName);}
    },
    logOut(){
      this.$store.commit("setUserName","");
    }
  },
};
</script>

<style scoped>
.username{
  text-align: center;
}
.crypto-logo {
  width: 65px;
}
.decreased {
  color: rgb(230, 40, 40);
}
.increased {
  color: rgb(25, 206, 25);
}
#crypto-card{
  cursor: pointer;
  background-color: #4D5061;
  transition-duration: 0.7s;
  color: white;
}
#crypto-card:hover{
  transform: scale3d(1.1,1.1,1.1);
}
.buttons{
  margin-top:20px;
}
#signBtn{
  outline: none;
  box-shadow: none;
}

</style>
