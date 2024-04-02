<template>
  <div class="background">
  <ContentBase>
      <div class="card" v-for="user in users" :key="user.id" @click="open_user_profile(user.id)">
        <div class="card-body">
          <div class="row">
            <div class="col-1 img-field">
              <img class="img-fluid" :src="user.photo" alt="">
            </div>
            <div class="col-11">
              <div class="username">{{ user.username }}</div>
              <div class="follower-count">{{ user.followerCount }}</div>
            </div>
          </div>
        </div>
      </div>
  </ContentBase>
</div>
</template>

<script>
import ContentBase from '../components/ContentBase'
import $ from 'jquery';
import { ref } from 'vue';
import router from '@/router/index';
import { useStore } from 'vuex';

export default {
  name: 'UserList',
  components: {
      ContentBase,
  },
  setup() {
    //store是vuex的组件，用来维护全局变量
    const store = useStore();
    let users = ref([]);

    $.ajax({
      url: 'https://app165.acapp.acwing.com.cn/myspace/userlist/',
      type: "get",
      success(resp) {
        users.value = resp;
      }
    });

    //router.push跳转到相应的页面
    const open_user_profile = userId => {
      if (store.state.user.is_login) {
        router.push({
          name: "userprofile",
          params: {
            userId
          }
        })
      } else {
        router.push({
          name: "login"
        });
      }
    }

    return {
      users,
      open_user_profile
    };
  },
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

img {
  border-radius: 50%;
}

.username {
  font-weight: bold;
  height: 50%;
}

.follower-count {
  font-size: 12px;
  color: gray;
  height: 50%;
}

.card {
  margin-bottom: 20px;
  cursor: pointer;
}

.card:hover {
  box-shadow: 2px 2px 10px lightgrey;
  transition: 500ms;
}

.img-field {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>