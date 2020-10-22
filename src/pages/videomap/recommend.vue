<template>
    <scroll-view scroll-y class="recommend-view" @scrolltolower="scrollToLower">
        <view class="video-list">
            <view class="video-item" 
            v-for="item in videoList" 
            :key="item.id"
            @tap="toVideoPlay"
            :data-item="item">
                <image mode="widthFix" :src="item.img"></image>
            </view>
        </view>
    </scroll-view>
</template>
<script>
import { getRecommend } from '../../api/video'
export default {
    data() {
        return {
            skip: 0,
            videoList: []
        }
    },
    mounted() {
        this.getList()
    },
    methods: {
        getList() {
            getRecommend(this.skip).then(response => {
                const videoList = response.res.videowp
                if(videoList.length > 0) {
                    if (this.skip === 0) {
                        this.videoList = videoList
                    }else {
                        this.videoList = this.videoList.concat(videoList)
                    }
                    this.skip +=1
                }else {
                    uni.showToast({
                        title: '没有数据了',
                        icon: 'none'
                    })
                      
                }
            })
        },
        scrollToLower() {
            this.getList()
        },
        toVideoPlay(e) {
            const item = e.currentTarget.dataset.item
            getApp().globalData.videoData = item
            uni.navigateTo({
                url: '/pages/videoPlay/index'
            })            
        }
    }
}
</script>
<style lang="scss">
    .recommend-view {
        height: calc( 100vh - 40rpx);
    }
    .video-list {
        display: flex;
        flex-wrap: wrap;
        .video-item {
            padding: 5rpx;
            image {
                width: 240rpx;
            }
        }
    }
</style>