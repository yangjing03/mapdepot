<template>
<scroll-view scroll-y class="recommend-view" v-if="recommend.length > 0" @scrolltolower="scrollToLower">
    <!-- 推荐 -->
    <view class="recommend-wrap">
        <view v-for="(item, index) in recommend" 
        :key="item.id" 
        class="recommend-item"
        :url="`/pages/album/index?id=${item.img}`">
            <detail :list="recommend" :index="index">
                <image mode="widthFix" :src="item.thumb"></image>
            </detail>
        </view>
    </view>

    <!-- 月份 -->
    <view class="moneths-wrap">
        <view class="moneths-title">
            <view class="moneths-title-info">
                <view class="moneths-info">
                    <text>{{moneths.DD}}</text>
                    /{{moneths.MM}}
                </view>
                <view class="moneths-text">
                    {{moneths.title}}
                </view>
                </view>
            <view class="moneths-title-more">更多></view>
        </view>
        <view class="moneths-content">
            <view class="moneths-content-item"
            v-for="(item, index) in moneths.items"
            :key="item.id">
            <detail :list="moneths.items" :index="index">
            <image mode="aspectFill" :src="item.thumb + item.rule.replace('$<Height>', '360')"></image>
            </detail>
            </view>
        </view>
    </view>

    <!-- 热门 -->
    <view class="host-wrap">
        <view class="host-title">
            <text>热门</text>
        </view>
        <view class="host-content">
            <view class="host-item"
            v-for="(item, index) in host"
            :key="item.id">
            <detail :list="host" :index="index">
                <image mode="widthFix" :src="item.thumb "></image>
            </detail>
            </view>
        </view>
    </view>
</scroll-view>
</template>
<script>
import moment from 'moment'
import detail from './detail'
export default {
    components:{
        detail
    },
    data() {
        return {
        recommend: [],
        moneths: [],
        host: [],
        skip: 0,
        isScrollToLower: false
        }
    },
    mounted(){
        this.getData()
    },
    methods: {
         getData() {
            this.request({
                url: 'http://157.122.54.189:9088/image/v3/homepage/vertical',
                methods: 'get',
                data: {
                limit: 30,
                skip: this.skip * 30,
                order: 'hot'
                }
            }).then(res => {
                console.log(res)
               if(this.recommend.length === 0) {
                    // 推荐
                this.recommend = res.res.homepage[1].items
                // 月份
                this.moneths = res.res.homepage[2]
                this.moneths.MM = moment(this.moneths.stime).format('MM')
                this.moneths.DD = moment(this.moneths.stime).format('DD')
               }
                // 热门
                const vertical = res.res.vertical
                if(vertical.length > 0) {
                  this.skip = this.skip + 1
                  if(this.skip === 0) {
                  this.host = vertical
                  }else {
                     this.host = this.host.concat(vertical)
                }
                }else {
                    uni.showToast({
                        title: '没有数据了',
                        icon: 'none'
                    })
                }
                
            })
        },
        scrollToLower() {
            this.getData()
        }
    }
}
</script>
<style lang="scss">
.recommend-view {
    height: calc( 100vh - 38px );
}
.recommend-wrap {
    display: flex;
    flex-wrap: wrap;
    .recommend-item {
        width: 50%;
        border: 5rpx solid #ffffff;
    }
}
.moneths-wrap {
    .moneths-title {
        display: flex;
        justify-content: space-between;
        padding: 20rpx;
        .moneths-title-info {
            display: flex;
            font-size: 30rpx;
            font-weight: 600;
            .moneths-info {
                color: #d4237a;
                text {
                    font-size: 36rpx;
                    color: #d4237a;
                }
            }
            .moneths-text {
                font-size: 34rpx;
                margin-left: 30rpx;
            }
        }
        .moneths-title-more {
            justify-content: right;
            text-align: right;
            color: #d4237a;
        }
    }

    .moneths-content {
        display: flex;
        flex-wrap: wrap;
        .moneths-content-item {
            width: 33.33%;
            border: 3rpx solid #ffffff;
        }
    }
}
.host-wrap {
    .host-title {
        padding: 20rpx;
    text {
        border-left: 5rpx solid #d4237a;
        font-size: 34rpx;
        font-weight: 600;
        padding-left: 20rpx;
    }
    }
    .host-content {
        display: flex;
        flex-wrap: wrap;
        .host-item {
        border: 3rpx solid #ffffff;
        width: 33.33%;
        
    }
    }
}
</style>