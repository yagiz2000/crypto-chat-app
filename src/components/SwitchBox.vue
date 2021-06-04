<template>
  <div class="form-check form-switch">
    <input class="form-check-input" v-model="isOn" type="checkbox" id="SwitchCheckBox2" checked/>
    <p>{{ isOn }}</p>
  </div>
</template>

<script>
export default {
  computed: {
    isOn: {
      get() {
        return this.$store.getters.getUserName;
      },
      set() {
        setTimeout(() => this.$store.commit("setUserName", "Anonim"), 600);
      },
    },
  },
};
</script>

<style>
.form-check {
  display: flex;
  justify-content: center;
}
.form-switch .form-check-input[type="checkbox"] {
  border-radius: 2em;
  height: 50px;
  width: 100px;
}
</style>
