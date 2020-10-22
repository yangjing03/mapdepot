<template>
    <scroll-view scroll-y @scrolltolower="scrollToLower" class="album-view">
        <!-- 轮播图-->
        <view class="swiper-wrap">
            <swiper autoplay interval="2000" circular>
                <swiper-item v-for="item in banner" :key="item.id">
                    <navigator :url="`/pages/album/index?id=${item.id}`">
                        <image mode="widthFix" :src="item.thumb" :data-id="item.id"></image>
                    </navigator>
                </swiper-item>
            </swiper>
        </view>

        <!-- 专辑列表-->
        <view class="album-wrap">
            <navigator class="album-item" 
            v-for="item in album" 
            :key="item.id" 
            :data-id="item.id" 
            :url="`/pages/album/index?id=${item.id}`">
                <view class="album-img">                  
                    <image mode="aspectFill" :src="item.cover"></image>
                </view>
            <view class="album-text">
                <view class="album-title">{{item.name}}</view>
                <view class="album-content">{{item.desc}}</view>
                <view class="album-follow">
                    <text>+关注</text>
                </view>
            </view>
            </navigator>
        </view>
    </scroll-view>
</template>
<script>
import { getAlbumData } from '../api/home'
export default {
    data() {
        return {
            skip: 0,
            banner: [],
            album: []
        }
    },
    mounted() {
        uni.setNavigationBarTitle({
            title: '专辑'
        })
        this.getData()
    },
    methods: {
        getData() {
            getAlbumData(this.skip).then(response => {
                console.log(response)
                this.banner = response.res.banner

                let album = response.res.album
                if(this.skip === 0) {
                  this.album = album
                  this.skip = this.skip + 1
                }else if(album.length > 0) {
                    this.album = this.album.concat( album ) 
                    this.skip = this.skip + 1
                    
                } else {
                        uni.showToast({
                            title: '没有数据了',
                            icon: 'none'
                        })
                    }
                
                
            })
        },
        tapAlubmData(e) {
            console.log(e)
        },
        scrollToLower() {
            this.getData()
        }
    }
}
</script>
<style lang="scss">
    .album-view {
        height: 100vh;
    }
    .album-wrap {
      .album-item {
            display: flex;
        justify-content: space-between;
        padding: 10rpx 0;
        border-bottom: 3rpx solid #666;
         .album-img {
            padding: 10rpx;
           flex: 1;
           image {
               width: 200rpx;
           height: 200rpx;
           }
        }
        .album-text {
            flex: 2;
            overflow: hidden;
            .album-title {
                font-weight: 600;
                padding: 10rpx;
            }
            .album-content {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            .album-follow {
                display: flex;
                justify-content: flex-end;
                padding: 10rpx;
                text {
                border: 3rpx solid $color;
                color: $color;
                }
                
            }
      }
       
        }
    }
</style>