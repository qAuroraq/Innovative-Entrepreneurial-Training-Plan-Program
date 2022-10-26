<template>
<div class="background">  
        <div class="card">
            <div class="card-body">
                <div class="main">
                    <div class="title">
                        <div class="success-tips">
                            <p class="tips">您已成功购买该商品服务！</p>
                        </div>
                    </div>
                    <div class="order-info">
                        <p class="info"><b>付款时间：</b><span>{{currentDate}}</span></p>
                        <p class="info"><b>购买用户：</b><span>￥{{username}}</span></p>
                        <p class="info"><b>支付金额：</b><span><span>￥{{price}}</span></span></p>
                    </div>
                    <el-result icon="success" title="支付成功！" sub-title="点击下方按钮返回主页">
        <template #extra>
          <el-button @click="back" type="primary">Back</el-button>
        </template>
      </el-result>
                </div>
            </div>
        </div>
</div>  
</template>

<script>
import { useRoute } from 'vue-router';
import router from '@/router/index';
import {ref} from 'vue';

export default{
    name: 'ResultView',
    components:{
    },
    setup(){
        const currentDate = ref(new Date().toLocaleString());
        const route = useRoute();
        const username = route.params[0];
        const price = route.params[1];

        const back = () => {
            router.push({
                'name': 'home',
            })
        }
        return{
            username,
            price,
            back,
            currentDate,
        }
    }
}
</script>

<style scoped>

#el-button {
    color: white;;
}
.background {
  background:url("../img/background.jpeg");
  width:100%;
  height:100%;
  position:fixed;
  background-size:100% 100%;
}
.success {
    margin: 0;
    padding: 0;
}

.card {
    margin-top: 10vh;
    padding: 1px;
    background-image: url("../img/background.jpeg");
}
.main {
        border-radius: 5px;
        padding: 60px 0;
        width: 35vw;
        background: rgba(9, 235, 228, 0.734);
        margin-left: 33%;
    }

    .main .title {
        display: flex;
        -ms-flex-align: center;
        align-items: center;
        padding: 25px 40px;
        border-bottom: 1px solid #f2f2f2;
    }

    .main .title .success-tips {
        box-sizing: border-box;
    }

    .title img {
        vertical-align: middle;
        width: 60px;
        height: 60px;
        margin-right: 40px;
    }

    .title .success-tips {
        box-sizing: border-box;
    }

    .title .tips {
        font-size: 26px;
        color: #000;
    }


    .info span {
        color: black;
    }

    .order-info {
        padding: 25px 48px;
        padding-bottom: 15px;
        border-bottom: 1px solid #f2f2f2;
    }

    .order-info p {
        display: -ms-flexbox;
        display: flex;
        margin-bottom: 10px;
        font-size: 16px;
    }

    .order-info p b {
        font-weight: 400;
        color: black;
        white-space: nowrap;
    }

    .study {
        padding: 25px 40px;
    }

    .study span {
        display: block;
        width: 140px;
        height: 42px;
        text-align: center;
        line-height: 42px;
        cursor: pointer;
        background: #ffc210;
        border-radius: 6px;
        font-size: 16px;
        color: #fff;
    }
</style>