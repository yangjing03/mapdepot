<template>
    <view>
        <slither-or-so @orSo="orSoSlither">
        <!-- user信息 -->
        <view class="user-data">
            <view class="user-icon">
                <image mode="aspectFill" :src="imgList[imgIndex].user.avatar"></image>
            </view>
            <view class="user-text">
                <view class="user-name">{{imgList[imgIndex].user.name}}</view>
                <view class="user-time">{{imgList[imgIndex].atime}}</view>
            </view>
        </view>

        <!-- 图片信息 -->
        <view class="img-data">
            <view class="img-content">
                <image mode="widthFix" :src=" imgList[imgIndex].newthumb"></image>
            </view>
            <view class="img-btn">
                <view class="img-like">点赞 {{ imgList[imgIndex].rank }}</view>
                <view class="img-collection">收藏</view>
            </view>
        </view>

        <!-- 相关信息 -->
        <view class="album-data" v-if="album.length > 0">
            <view class="album-title">相关</view>
            <view class="album-content" v-for="item in album" :key="item.id" @tap="toAlbum" :data-id="item.id">
                <view class="album-img">
                <image mode="aspectFill" :src="item.cover"></image>
            </view>
            <view class="album-text">
                <view class="album-tag">
                    <view class="album-tag-title">专辑</view>
                    <view class="album-name">{{item.name}}</view>
                </view>
                <view class="album-next">></view>
            </view>
            </view>
        </view>

        <!-- 最热评论 -->
        <view class="comment-data" v-if="hot.length > 0">
            <view class="comment-title">最热评论</view>
            <view class="comment-item" v-for="item in hot" :key="item.id"> 
                <view class="comment-content">
                     <view class="comment-img">
                    <image :src="item.user.avatar" mode="aspectFill"></image>
                </view>
                 <view class="comment-user">
                     <view class="comment-name">
                         <view class="comment-nikename"> {{item.user.name}}</view>
                         <view class="comment-icon" v-for="item2 in item.user.title" :key="item2.icon">
                             <image :src="item2.icon" mode="aspectFill"></image>
                         </view>
                     </view>
                    <view class="comment-time">{{item.atime}}</view>  
                     </view> 
                </view>
                 <view class="comment-reply">
                        <view class="reply-text">{{item.content}}</view>
                        <view class="reply-rank">点赞{{item.user.following}}</view>
                    </view>
            </view>
            </view>
        <!--  最新评论-->
        <view class="new-data" v-if="comment.length > 0">
            <view class="new-title">最新评论</view>
            <view class="new-item" v-for="item in comment" :key="item.id">
                <view class="new-user">
                <view class="user-img">
                    <image :src="item.user.avatar" mode="aspectFill"></image>
                </view>
                <view class="user-text">
                    <view class="user-name">{{item.user.name}}</view>
                    <view class="user-time">{{item.atime}}</view>
                </view>
            </view>
            <view class="new-comtent">
                <view class="reply-comtent">{{item.content}}</view>
                <view class="reply-rank">点赞 {{item.user.following}}</view>
            </view>
            </view>
        </view>

        <!-- 下载 -->
        <view class="download">
            <view class="download-icon">
                <icon type="download"></icon>
                </view>
            <view class="download-text" @tap="download">下载</view>
        </view>
        </slither-or-so>
    </view>
</template>
<script>
import moment from 'moment'
import { getAlbumById, getImgDetail } from '../../api/home'
import slitherOrSo from '../../components/slitherOrSo'
moment.locale('zh-cn')
export default {
    components: {
        slitherOrSo
    },
    data() {
        return {
            imgList: [],
            imgIndex: 0,
            album: [],
            comment: [],
            hot: []
        }
    },
    onLoad() {
        console.log(getApp().globalData)
        this.initData()
          
    },
    methods: {
        initData() {
            const { imgList, imgIndex } = getApp().globalData
            this.imgList = imgList
            this.imgIndex = imgIndex
            for (const item in imgList) {
                this.format(imgList[item].atime, this.imgList[item])
                const index = imgList[item].thumb.indexOf('?')
                if(index !== -1) {
                    this.imgList[item].thumb = imgList[item].thumb.slice(0, index)
                }
                if(imgList[item].rule) {
                    this.imgList[item].newthumb = this.imgList[item].thumb + imgList[item].rule.replace(/[$]<Height>/g, '360').replace(/[$]<Width>/g, '202.5')
                }else {
                    this.imgList[item].newthumb = imgList[item].thumb
                }
            }
            this.getImgData()
            
        },
        getImgData() {
            getImgDetail( this.imgList[this.imgIndex].id ).then( response => {
                const {comment, album, hot} = response.res
                this.comment = comment
                this.album = album
                this.hot = hot
                for (const item in hot) {
                this.format(hot[item].atime, this.hot[item])
                }
                for (const item in comment) {
                this.format(comment[item].atime, this.comment[item])
                }
            })  
        },
        toAlbum(e) {
            const id = e.currentTarget.dataset.id
            uni.navigateTo({
                url: `/pages/album/index?id=${id}`
            })
        },
        orSoSlither(e) {
            console.log(this.imgIndex)
            if(e && this.imgIndex < this.imgList.length - 1) {
                this.imgIndex +=1
                this.getImgData()
            }else if( !e && this.imgIndex < 0 < this.imgIndex ) {
                this.imgIndex -=1
                this.getImgData()
            }else {
                uni.showToast({
                    title: '没有数据了！',
                    icon: 'none'
                })
            }
        },
        download() {
            uni.downloadFile({
                url: this.imgList[this.imgIndex].img
            }).then( res => {
                uni.saveImageToPhotosAlbum({
                    filePath: res[1].tempFilePath
                }).then(res => {
                    uni.showToast({
                        title: '保存成功',
                        icon: 'none'
                    })
                })
            })
        },
        format(date, item) {
            const atime = moment(date).format('YYYYMMDD')
            item.atime = moment( atime, 'YYYYMMDD').fromNow()
        }
    }
}
</script>
<style lang="scss">
.user-data {
    display: flex;
    align-content: center;
    .user-icon {
        padding: 20rpx;
        image {
            width: 80rpx;
            height: 80rpx;
            border-radius: 50%;
        }
    }
    .user-text {
        padding: 10rpx;
        .user-name {
            font-size: 40rpx;
            font-weight: 600;
        }
        .user-time {
            font-size: 30rpx;
            color: rgb(194, 192, 192);
        }
    }
} 
.img-data {
    .img-btn {
        display: flex;
        justify-content: center;
        align-content: center;
        padding: 10rpx;
        border-bottom: 3rpx solid #666;
        .img-like {
            flex: 1;
            text-align: center;     
        }
        .img-collection {
            flex: 1;
            text-align: center;
        }
    }
}
.album-data {
    padding: 10rpx;
    border-bottom: 3rpx solid #666;
    .album-title {
        font-weight: 600;
        padding: 10rpx;
    }
    .album-content {
        display: flex;
        justify-content: space-between;
        align-content: center;
        .album-img {
            flex: 1;
            image {
                width: 200rpx;
                height: 200rpx;
            }
        }
        .album-text {
            display: flex;
            flex: 3;
            align-content: center;
            position: relative;
            padding-left: 10rpx;
            .album-tag {
                .album-tag-title {
                    color: white;
                    background-color: $color;
                    justify-content: center;
                    align-content: center;
                    text-align: center;
                }
                .album-name {
                    padding: 5rpx;
                }  
            }
            .album-next {
                align-content: center;
                position: absolute;
                justify-content: right;
                right: 0px;
                top: 50%;
                transform: translateY(-50%);
                font-size: 40rpx;
            }
        }
    }
}
.comment-data {
    padding: 10rpx;
    .comment-title {
        font-weight: 600;
        font-size: 36rpx;
    }
    .comment-item {
        padding: 10rpx;     
        .comment-content {
            display: flex;
            .comment-img {
             image {
                width: 80rpx;
                height: 80rpx;
            }
        }
            .comment-user {
                padding-left: 10rpx;
                .comment-name {
                    display: flex;
                    position: relative;
                    flex-wrap: wrap;
               .comment-nikename {
                    font-size: 34rpx;
                    flex: 4;
               }
                .comment-icon {
                   flex: 1;
                   position: absolute;
                   right: 0;
                    image {
                    width: 40rpx;
                    height: 40rpx;
                }
                }
            }
            .comment-time {
                font-size: 30rpx;
            }
            }
            
        }
        .comment-reply {
                display: flex;
                padding: 20rpx 0;
                position: relative;
                flex-wrap: wrap;
                justify-content: center;
                border-bottom: 10rpx solid rgb(197, 197, 197);
                .reply-text {
                     font-weight: 600;
                     flex: 4;
                     justify-content: center;
                     padding-left: 90rpx;
                     color: #000;
                }
                .reply-rank {
                    flex: 1;
                    position:absolute;
                    right: 0;
                    align-content: center;
                }
            }
    }
}
.new-data {
    .new-title {
        padding: 10rpx;
        font-size: 36rpx;
    }
    .new-item {
        .new-user {
            display: flex;
            .user-img {
                padding: 10rpx;
                image {
                    width: 80rpx;
                    height: 80rpx;
                }
            }
            .user-text {
                padding-left: 10rpx;
                .user-name {
                    font-size: 34rpx;
                }
                .user-time {
                    font-size: 30rpx;
                }
            }
        }
        .new-comtent {
            display: flex;
            position: relative;
            border-bottom: 10rpx solid rgb(141, 141, 141);
            padding: 10rpx 0;
            flex-wrap: wrap;
            .reply-comtent {
                flex: 4;
                padding-left: 110rpx;
                color: #000;
                font-weight: 600;
            }
            .reply-rank {
                text-align: right;
                flex: 1;
                top: 0;
                right: 0;
            }
        }
        
    }
}
.download {
    display: flex;
    justify-content: center;
    align-content: center;
    border: 3rpx solid green;
    padding: 20rpx;
    margin: 20rpx auto;
    width: 40%;
    .download-icon {
        align-content: center;
    }
    .download-text {
        font-size: 40rpx;
        
    }
}

















    
</style>