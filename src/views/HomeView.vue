<template>
<div class="background1">
<el-row class="row-1">
    <el-col
      v-for="(o, index) in 3" :key="o" :span="6" :offset="index > 0 ? 1 : 0">
      <el-card :body-style="{ padding: '1px' }">
        <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image"/>
        <div style="padding: 14px">
          <div class="name">{{goods[index].name}}</div>
          <div class="price">￥{{goods[index].price}}</div>
          <div class="bottom">
            <div class="server"> 本平台用于提供服务</div>
            <el-button @click="buy_goods(goods[index])" type="warning">购买</el-button>
          </div>
        </div>
      </el-card>
    </el-col>
</el-row>
  <div class="card card-info" v-if="is_login" style="width: 18rem;">
      <img :src="user.photo" class="card-img-top" alt="...">
        <ul class="list-group list-group-flush">
          <li class="list-group-item">用户名：{{user.username}}</li>
          <li class="list-group-item">余额：{{user.balance}}</li>
          <time class="time">登录时间： {{ user.time}}</time>
        </ul>
        <div>
          <a href="#" class="card-link">个人中心</a>
        </div>
  </div>
</div>  
</template>

<script>
import { reactive, ref } from 'vue'
import { useStore } from 'vuex';
import $ from 'jquery';
import router from '@/router';

export default {
  name: 'HomeView',
  components: {
  },
  setup(){
    const currentDate = ref(new Date());
    const store = useStore();
    const is_login = store.state.user.is_login;
    const user = reactive({});
    const userID = store.state.user.id;
    const goods = [
      {
        'id': 1,
        'name': "洗衣机",
        'price': 316,
      },
      {
        'id': 2,
        'name': "饮水机",
        'price': 317,
      },
      {
        'id':3,
        'name': "空调",
        'price':318,
      },
    ];
    if(is_login){
      $.ajax({
        url: "http://43.138.30.253:8000/myspace/getinfo/",
        type: "GET",
        data: {
          user_id: userID,
        },
        headers: {
          'Authorization': "Bearer " + store.state.user.access,
        },
        success(resp){
          user.username = resp.username;
          user.balance = resp.balance;
          user.user_id = resp.user_id;
          user.time = currentDate;
          user.photo = resp.photo;
        },
      });
  }
  const buy_goods = good => {
    if(is_login){
          let username = user.username;
          $.ajax({
            url: "http://43.138.30.253:8000/myspace/buygoods/",
            type: "GET",
            data:{
              user_id: userID,
              price: good.price,
              product_name: good.name,
            },
            success(resp){
              if(resp.result === "success"){
                router.push({
                  'name': 'result',
                  params: [
                  good.price,
                  username,
                ],
                });
              }
            }
          })
        }
    else{
      router.push({
        'name': 'login',
      })
    }
  };
    return {
      currentDate,
      is_login,
      user,
      goods,
      buy_goods,
    }
  },
}
</script>

<style scoped>

.background1 {
  background:url("../img/background.jpeg");
  width:100%;
  height:100%;
  position:fixed;
  background-size:100% 100%;
}

.time{
  margin-left: 1vw;
}

.server{
  font-style: italic;
  font-size: small;
}

.name{
  display: inline;
}
.price{
  display: inline;
  float: right;
}

a {
  margin-left: 1vw;
}


.row-1 {
  margin-left: 30vw;
  margin-top: 20vh;
}
.card-info {
  position: absolute;
  left: 0%;
  bottom:10vh;
}

.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
}
</style>