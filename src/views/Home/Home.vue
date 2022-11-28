<template>
    <div class="home-container">
        <van-nav-bar title="事情正在起变化" fixed />

        <!-- 基础用法 -->
        <!--  
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                <ArticleInfo v-for="article in articles" :key="'article_' + article.art_id" :article="article">
                </ArticleInfo>
            </van-list>
         -->

        <!-- 基础用法 + 错误提示 -->
        <!-- 
            <van-list v-model="loading" :error.sync="error" error-text="请求失败，点击重新加载" :finished="finished"
                finished-text="没有更多了" @load="onLoad">
                <ArticleInfo v-for="article in articles" :key="'article_' + article.art_id" :article="article">
                </ArticleInfo>
            </van-list> 
        -->

        <!-- 基础用法 + 错误提示 + 下拉刷新 -->
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list v-model="loading" :error.sync="error" error-text="请求失败，点击重新加载" :finished="finished"
                finished-text="没有更多了" @load="onLoad">
                <ArticleInfo v-for="article in articles" :key="'article_' + article.art_id" :article="article">
                </ArticleInfo>
            </van-list>
        </van-pull-refresh>

    </div>
</template>

<script>
import { ARTICLE_REQUEST_API } from '@/api/article_request_api.js'
import ArticleInfo from '@/components/Article/ArticleInfo.vue'

export default {
    name: 'Home',

    data() {
        return {
            page: 1,
            limit: 5,

            /** 使用 Vant list 数组 */
            // 基础用法 用法
            // articles: [],
            // loading: false,
            // finished: false,

            // 基础用法 + 错误提示 用法
            // articles: [],
            // error: false,
            // loading: false,
            // finished: false,

            // 基础用法 + 错误提示 + 下拉刷新 用法
            articles: [],
            error: false,
            loading: false,
            finished: false,
            refreshing: false,

        };
    },

    mounted() {
        var _this = this;
        _this.initArticles();
    },

    methods: {

        /** vant list 基础用法 */
        // async initArticles() {
        //     // 解构出 data, 重命名为 result
        //     var { data: result } = await ARTICLE_REQUEST_API(this.page, this.limit);

        //     // 上拉加载更多
        //     this.articles = [...this.articles, ...result]

        //     // 加载状态结束
        //     this.loading = false

        //     // 数据全部加载完成
        //     if (result.length === 0) {
        //         this.finished = true
        //     }
        // },

        // onLoad() {
        //     // 异步更新数据
        //     this.page++;
        //     this.initArticles();
        // },


        /** vant list 基础用法 + 错误提示 */
        // async initArticles() {
        //     // 解构出 data, 重命名为 result
        //     var { data: result } = await ARTICLE_REQUEST_API(this.page, this.limit);

        //     // 上拉加载更多
        //     this.articles = [...this.articles, ...result]

        //     // 加载状态结束
        //     this.loading = false

        //     // 数据全部加载完成
        //     if (result.length === 0) {
        //         this.finished = true
        //     }
        // },

        // onLoad() {
        //     this.page++;
        //     this.initArticles().catch(() => {
        //         this.error = true;
        //     });
        // },


        /** vant list 基础用法 + 错误提示 + 下拉刷新 */
        async initArticles(isRefresh) {
            // 解构出 data, 重命名为 result
            var { data: result } = await ARTICLE_REQUEST_API(this.page, this.limit);

            // TODO: 下拉刷新
            if (isRefresh) {
                // 清空列表数据
                this.finished = false;

                // 重新加载数据, 将 loading 设置为 true，表示处于加载状态
                this.loading = true;

                // 将 新数据 拼接在 原始数据 之前
                this.articles = [...result, ...this.articles];

                // 刷新状态结束
                this.refreshing = false;
            } else {    // TODO: 上拉 加载更多

                // 重新加载数据, 将 loading 设置为 true，表示处于加载状态
                this.loading = true;

                // 将 原始数据 拼接在 新数据 之前
                this.articles = [...this.articles, ...result];
            }

            // 加载状态结束
            this.loading = false

            // 数据全部加载完成
            if (result.length === 0) {
                this.finished = true
            }
        },

        onLoad() {
            this.page++;
            this.initArticles().catch(() => {
                this.error = true;
            });
        },

        onRefresh() {
            this.page++;
            this.initArticles(true).catch(() => {
                this.error = true;
            });
        },

    },

    components: {
        ArticleInfo
    }

};
</script>

<style lang="less" scoped>
.home-container {
    padding: 46px 0px 50px 0px;
}

.van-nav-bar {
    background-color: #007bff;
}

/deep/ .van-nav-bar__title {
    color: white;
}
</style>