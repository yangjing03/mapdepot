<template>
    <view class="video-page">      
        <image :src="videoData.img"></image>
        <view class="video-btn">
            <view class="video-sound">声音</view>
            <view class="video-share">分享</view>
        </view>
        <view class="video-content">
                <video object-fit="fill" :src="videoData.video"></video>
        </view>
        <view class="download">
             <view class="video-download" @tap="download" >下载高清</view>
        </view>
    </view>
</template>
<script>
export default {
    data() {
        return {
            videoData: {}
        }
    },
    onLoad() {
        this.videoData = getApp().globalData.videoData
        console.log(this.videoData)      
    },
   methods: {
        async download() {
            uni.showLoading({
                title: '下载中'
            })
        const {tempFilePath} = (await uni.downloadFile({
            url: this.videoData.video
        }))[1]
        await uni.saveVideoToPhotosAlbum({
            filePath: tempFilePath
        })
        uni.hideLoading()
        await uni.showToast({
            title: '下载成功',
            icon: 'none'
        })
    }
   }
}
</script>
<style lang="scss">
.video-page {
    position: relative;       
        image {
            position: absolute;
            width: 100vw;
            height: 100vh;
            filter: blur(20px);
            z-index: -1;
        }
        .video-btn {
        display: flex;
        justify-content: flex-end;
        align-content: center;
        .video-sound {
            text-align: center;
            color: white;
            background-color: rgba($color: #000000, $alpha: 0.5);
            height: 80rpx;
            width: 80rpx;
            border-radius: 40rpx;
            padding: 5rpx;
        }
        .video-share {
            text-align: center;
            color: white;
            background-color: rgba($color: #000000, $alpha: 0.5);
            height: 80rpx;
            width: 80rpx;
            border-radius: 40rpx;
            padding: 5rpx;
        }
    }
    
        .video-content {
            display: flex;
            justify-content: center;
            video {
                width: 360rpx;
                height: 600rpx;
            }
        }
        .download {
            display: flex;
            justify-content: center;
            margin-top: 30rpx;
            .video-download {
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 40rpx;
            border: 3rpx solid white;
            border-radius: 40rpx;
            color: white;
            height: 80rpx;
            width: 360rpx;
            background-color: rgba(0,0,0,0.5);

        }
        
    
    }
    
}
</style>