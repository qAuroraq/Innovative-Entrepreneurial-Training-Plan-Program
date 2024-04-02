<template>
  <div class="background">
    <ContentBase1>
    <div class="row justify-content-md-center">
        <form @submit.prevent="login">
          <div class="mb-3">
            <label for="username" class="form-label">用户名</label>
            <input v-model="username" type="text" class="form-control" id="username">
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">密码</label>
            <input v-model="password" type="password" class="form-control" id="password">
          </div>
          <div class="error-message">{{ error_message }}</div>
          <button type="submit" class="btn btn-primary">登录</button>
        </form>
    </div>
  </ContentBase1>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import router from '@/router/index';
import ContentBase1 from '../components/ContentBase1.vue';

export default {
  name: 'LoginView',
  components: {
    ContentBase1,
  },
  setup() {
    const store = useStore();
    let username = ref('');
    let password = ref('');
    let error_message = ref('');

    const login = () => {
      error_message.value = "";
      store.dispatch("login", {
        username: username.value,
        password: password.value,
        success() {
          router.push({name: 'home'});
        },
        error() {
          error_message.value = "用户名或密码错误";
        }
      });
    };

    return {
      username,
      password,
      error_message,
      login,
    }
  }
}
</script>

<style scoped>

.background {
  background:url("../img/background2.jpeg");
  width:100%;
  height:100%;
  position:fixed;
  background-size:100% 100%;
}

button {
  width: 100%;
}

.error-message {
  color: red;
}
</style>