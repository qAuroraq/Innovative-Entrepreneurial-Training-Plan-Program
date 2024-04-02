<template>
<div class="background">
    <el-form :inline="true" class="queryhash">
        <el-form-item>
            <el-input class="queryform" v-model="queryhash" placeholder="请输入查询的哈希值" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
    </el-form>
  <div class="card">
    <div class="card-header">
      查询结果如下：
    </div>
    <div class="card-body">
    <blockquote class="blockquote mb-0">
      <div class="show-result">{{transaciton}}</div>
    </blockquote>
    </div>
  </div>
</div>
</template>

<script >
import $ from 'jquery';
import {ref} from 'vue';
export default{
    'name': 'QueryView',
    component: {

    },
    setup(){
      let queryhash = ref('');

      let transaciton = ref('');
      const onSubmit = () => {
        $.ajax({
          url: "http://43.138.30.253:8000/myspace/query/",
          type: "GET",
          data:{
            hashcode: queryhash.value,
          },
          success(resp){
            transaciton.value = JSON.parse(resp);
            console.log(transaciton.value);
          }
        })
      };
      return{
        queryhash,
        transaciton,
        onSubmit,
      }
    }
}
</script>

<style scoped>
.show-result{
  white-space: pre-wrap;
  overflow: hidden;
  font-size: 1px;
}
.card{
  width: 80vw;
  margin-left: 10vw;
}
.queryform{
  width: 50vw;
  margin-left: 20vw;
}
.background {
  background:url("../img/background.jpeg");
  width:100%;
  height:100%;
  position:fixed;
  background-size:100% 100%;
}
</style>