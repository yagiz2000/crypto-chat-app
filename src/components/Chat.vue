<template>
  <div class="container">
    <div class="row" v-if="user">
      <div class="col d-flex flex-column justify-content-center align-items-center">
        <div class="input-group" id="msg-box">
          <textarea v-model="message" class="form-control" aria-label="With textarea" placeholder="Görüşünü belirt" id="msg-box"></textarea>
        </div>
        <button class="btn btn-success mt-3" @click="sendMsg">Gönder</button>
      </div>
    </div>
    <div v-else class="row text-center mt-4">
      <h3>Fikrini belirtmek için giriş yap</h3>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-8 col-sm-8 align-items-center justify-content-center">
        <div v-for="(msg, i) in liste" :key="i" id="chat-card" class="card p-3 text-right">
          <blockquote class="blockquote mb-0">
            <p>
              {{ msg.content }}
            </p>
            <footer style="color:black;" class="blockquote-footer">
              <small id="userName" class="text-muted">
                {{ msg.userName }}
              </small>
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import mixin from "../mixins/mixin";
export default {
  data() {
    return {
      message: "",
    };
  },
  mixins:[mixin],
  computed: {
    currency: {
      get() {
        return this.$store.getters.getCurrency;
      },
    },
    liste() {
      return this.$store.getters.getMessages;
    },
    user(){return this.$store.getters.getUserName}
  },
  async mounted() {
    this.$store.dispatch("getChatsFromDb");
  },
  methods: {
    sendMsg() {
      if(this.message ===""){
        let content = {title:"Upsy!",text:"Boş yorum gidemez",icon:"error"}
        this.triggerSimpleAlert(content);
      }
      else{
        this.$store.dispatch("addChatMsg", this.message);
        this.message = "";
      }
    },
  },
};
</script>
<style>
#msg-box {
  margin: 20px 0px;
}
#chat-card {
  background-color: #e7e247 !important;
  margin: 15px 0px;
  min-width: 200px;
  height: auto;
  padding: 20px;
  color: black;
}
.comment-content {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
}
.msg-parag {
  text-align: center;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
#userName {
  color: black !important;
  font-family: "Roboto", sans-serif;
}
#msg-box{
  width: 50%;
  height: 70px;
}

</style>
