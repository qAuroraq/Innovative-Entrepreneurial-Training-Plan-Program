<template>
<div class="background">
  <ContentBase>
      <div class="row">
        <div class="col-3">
          <UserProfileInfo @follow="follow" @unfollow="unfollow" :user="user" />
          <!-- <UserProfileWrite v-if="is_me" @post_a_post="post_a_post" /> -->
        </div>
        <div class="col-9">
          <!-- //将参数传入子组件 -->
          <UserProfilePosts :user="user" :posts="posts" @delete_a_post="delete_a_post" />   
        </div>
      </div>
  </ContentBase>
</div>
</template>

<script>
import ContentBase from '../components/ContentBase'
import UserProfileInfo from '../components/UserProfileInfo';
import UserProfilePosts from '../components/UserProfilePosts';
// import UserProfileWrite from '../components/UserProfileWrite';
import { reactive } from 'vue';
import { useRoute } from 'vue-router';
import $ from 'jquery';
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  name: 'UserList',
  components: {
      ContentBase,
      UserProfileInfo,
      UserProfilePosts,
      // UserProfileWrite
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const userId = parseInt(route.params.userId);
    const user = reactive({});
    const posts = reactive({});

    $.ajax({
      url: "http://43.138.30.253:8000/myspace/getinfo/",
      type: "GET",
      data: {
        user_id: userId,
      },
      headers: {
        'Authorization': "Bearer " + store.state.user.access,
      },
      success(resp) {
        user.username = resp.username;
        user.balance = resp.balance;
        user.user_id = resp.user_id;
        user.photo = resp.photo;
      }
    });

    $.ajax({
      url: "http://43.138.30.253:8000/myspace/product/",
      type: "GET",
      data: {
        user_id: userId,      //传入的参数
      },
      headers: {
        'Authorization': "Bearer " + store.state.user.access,
      },
      success(resp) {
        posts.count = resp.length;
        posts.posts = resp;
      }
    });

    const follow = () => {
      if (user.is_followed) return;
      user.is_followed = true;
      user.followerCount ++ ;
    };

    const unfollow = () => {
      if (!user.is_followed) return;
      user.is_followed = false;
      user.followerCount -- ;
    };

    const post_a_post = content => {
      posts.count ++ ;
      posts.posts.unshift({
        id: posts.count,
        userId: 1,
        content: content,
      })
    };

    const delete_a_post = post_id => {
      posts.posts = posts.posts.filter(post => post.id !== post_id);
      posts.count = posts.posts.length;
    }
    
    const is_me = computed(() => userId === store.state.user.id);

    return {
      user,
      follow,
      unfollow,
      posts,
      post_a_post,
      delete_a_post,
      is_me,
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
</style>