<template>
    <scroll-view scroll-y class="album-view" @scrolltolower="scrollToLower">
        <view class="album-bg">
            <image mode="widthFix" :src="album.cover"></image>  
            <view class="album-text">
                <view class="album-title">{{album.name}}</view>
                <view class="album-btn">+关注专辑</view>
            </view> 
        </view>
        <view class="user-wrap">
            <view class="user-name">
                <image mode="widthFix" :src="album.user.avatar"></image>
                <text>{{album.user.name}}</text>
            </view>
            <view class="user-text">
                <text>{{album.desc}}</text>
            </view>
        </view>
        <view class="wall-wrap">
            <view class="wall-item" v-for="(item, index) in wallpaper" :key="item.id">
                <detail :list="wallpaper" :index="index">
                    <image mode="aspectFill" :src="item.thumb + item.rule.replace('$<Height>', '360')"></image>
                </detail>
            </view>
        </view>
    </scroll-view>
</template>
<script>
import { getAlbumById } from '../../api/home'
import detail from '../../components/detail'
export default {
    components: {
        detail
    },
    data() {
        return {
            skip: 0,
            id: '',
            album: [],
            wallpaper: []
        }
    },
    onLoad(options) {
        this.id = options.id
        this.getData(1)
    },
    methods: {
        getData(first) {
            getAlbumById(this.id, this.skip, first).then(response => {
                const wallpaper = response.res.wallpaper
                if( first === 0 ) {
                   if(wallpaper.length > 0) {
                    this.wallpaper = this.wallpaper.concat(wallpaper)
                    this.skip +=1
                   }else {
                       uni.showToast({
                           title: '没有数据了',
                           icon: 'none'
                       })
                   }
                }else {
                    this.album = response.res.album
                    this.wallpaper = wallpaper
                    this.skip +=1
                } 
                

            })
        },
        scrollToLower() {
            this.getData(0)
        }
    }
}
</script>
<style lang="scss">
        .album-view {
            height: calc( 100vh - 40px);
        }
        .album-bg {
           position: relative;
             .album-text {
                position: absolute;
                display: flex;
                justify-content: space-between;
                left: 0px;
                bottom: 0px;
                color: #fff;
                padding: 10rpx;
                align-items: center;
                .album-title {
                    font-size: 40rpx;
                    padding: 10rpx;
                    color: #fff;
                    font-weight: 600;
                    width: 550rpx;
                }
                .album-btn {
                    display: flex;
                    justify-content: flex-end;
                    padding: 10rpx 20rpx;
                    color: #fff;
                    border: 3rpx solid $color;
                    background-color: $color;
                    align-items: center;
                    width: 180rpx;
                    border-radius: 10rpx;;
                
                }
            }
        }
        .user-wrap {
            padding: 10rpx;
            .user-name {
                display:flex;
                flex-wrap: wrap;
                align-items: center;
                image {
                    width: 80rpx;
                    justify-content: center;
                    align-items: center;
                }
                text {
                    font-weight: 600;
                    justify-content: center;
                    align-items: center;
                    padding: 0 10rpx;
                }
            }
            .user-text {

            }
        }
        .wall-wrap {
            display: flex;
            flex-wrap: wrap;
            .wall-item {
                padding: 5rpx;
                image {
                width: 240rpx;
                height: 240rpx;
                }
            }

        }

       
</style>