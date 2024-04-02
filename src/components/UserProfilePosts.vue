<template>
    <div class="card">
        <div class="card-body">
            历史购买记录：
            <div v-for="(post,index) in posts.posts" :key="post.id">
                <div class="card single-post">
                    <div class="card-body">
                        <div>购买编号：{{ index + 1 }}</div>
                        <div>购买时间：{{post.createtime}}</div>
                        <div>购买商品：{{post.name}}</div>
                        <div>交易信息区块链哈希值：{{post.hashcode}}</div>
                        <button @click="delete_a_post(post.id)" v-if="is_me" type="button" class="btn btn-danger btn-sm">删除</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import $ from 'jquery';

export default {
    name: "UserProfilePosts",
    //父组件传入参数
    props: {
        posts: {
            type: Object,
            required: true,
        },
        user: {
            type: Object,
            required: true,
        }
    },
    setup(props, context) {
        const store = useStore();
        let is_me = computed(() => store.state.user.id === props.user.id);

        const delete_a_post = post_id => {
            $.ajax({
                url: "https://app165.acapp.acwing.com.cn/myspace/post/",
                type: "DELETE",
                data: {
                    post_id,
                },
                headers: {
                    'Authorization': "Bearer " + store.state.user.access,
                },
                success(resp) {
                    if (resp.result === "success") {
                        context.emit('delete_a_post', post_id);
                    }
                }
            })
        }

        return {
            is_me,
            delete_a_post,
        }
    }
}
</script>


<style scoped>
.single-post {
    margin-bottom: 10px;
}

button {
    float: right;
}
</style>