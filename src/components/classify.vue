<template>
    <view>
        <view class="classify-list">
            <view class="classify-item" v-for="item in classifyData" :key="item.id" @tap="toClassifyDetail" :data-id="item.id">
                <image mode="aspectFill" :src="item.cover"></image>
                <text class="classify-title">{{item.name}}</text>
            </view>
        </view>
    </view>
</template>
<script>
import { getClassify } from '../api/home'
export default {
    data() {
        return {
            classifyData: []
        }
    },
    mounted() {
        this.getClassifyTitle()
    },
    methods: {
        getClassifyTitle() {
            getClassify().then(response => {
                this.classifyData = response.res.category
                console.log(this.classifyData)
            })
        },
        toClassifyDetail(e) {
            const id = e.currentTarget.dataset.id
            uni.navigateTo({
                url: `/pages/classifyDetail/index?id=${id}`
            })
        }
    }
}
</script>
<style lang="scss">
    .classify-list {
        display: flex;
        flex-wrap: wrap;
        .classify-item {
            padding: 5rpx;
            position: relative;
            image {
                width: 240rpx;
                height: 240rpx;
            }
            text {
                position: absolute;
                color: white;
                left: 20rpx;
                bottom: 10rpx;
            }
        }
    }
</style>