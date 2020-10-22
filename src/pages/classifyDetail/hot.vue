<template>
    <scroll-view scroll-y class="hot-view" @scrolltolower="scrollToLower">
        <view class="hot-list">
            <view class="hot-item" v-for="(item, index) in imgData" :key="item.id">
                <detail :list="imgData" :index="index">
                    <image :src="item.thumb" mode="widthFix"></image>
                </detail>
            </view>
        </view>
    </scroll-view>
</template>
<script>
import { getClassifyHot } from '../../api/home'
import detail from '../../components/detail'
export default {
    components: {
        detail
    },
    props:{
        imgId: String
    },
    data() {
        return {
            skip: 0,
            imgData: []
        }
    },
    mounted() {
        this.getHotData()
    },
    methods: {
        getHotData() {
            getClassifyHot(this.imgId, this.skip).then(response => {
                const imgData = response.res.vertical
                if ( imgData.length > 0) {
                    if( this.skip === 0) {
                    this.imgData = imgData
                }else {
                    this.imgData = this.imgData.concat(imgData)
                }
                this.skip += 1
                }else {
                    uni.showToast({
                        title: '没有数据了',
                        icon: 'none'
                    })
                }
            })
        },
        scrollToLower() {
            this.getHotData()
        }
    }
}
</script>
<style lang="scss">
    .hot-view {
        height: calc( 100vh - 40rpx);
    }
    .hot-list {
        display: flex;
        flex-wrap: wrap;
        .hot-item {
            padding: 5rpx;
            image {
                width: 240rpx;
            }
        }
    }
</style>