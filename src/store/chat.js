import { db } from "../../firebase/firestore";
export default {
  state: {
    messages: [],
    userName:localStorage.getItem("userName")
  },
  mutations:{
    setUserName(state,payload){
      state.userName = payload;
      localStorage.setItem("userName",payload);
    },
  },
  actions: {
    getChatsFromDb({state}) {
      const ref = db.collection(location.pathname.split("/")[1]);
      const msgQuery = ref.orderBy("createdAt", "desc").limit(100);
      msgQuery.onSnapshot((data) => {
        state.messages = [];
        data.docs.map((item) => {
          state.messages.push(item.data());
        });
      });
    },
    // eslint-disable-next-line no-unused-vars
    async addChatMsg({ state }, payload) {
      let msg = {
        content: payload,
        createdAt: Date.now(),
        userName:state.userName
      };
      await db.collection(location.pathname.split("/")[1]).add(msg);
    },
  },
  getters: {
    getMessages(state) {
      return state.messages;
    },
    getUserName(state){
      return state.userName;
    }
  },
};
