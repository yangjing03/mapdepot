<template>
    <scroll-view scroll-y class="new-view" @scrolltolower="scrollToLower">
        <view class="new-list">
            <view class="new-item" v-for="(item, index) in imgData" :key="item.id">
                <detail :list="imgData" :index="index">
                    <image :src="item.thumb" mode="widthFix"></image>
                </detail>
            </view>
        </view>
    </scroll-view>
</template>
<script>
import { getClassifyNew } from '../../api/home'
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
        this.getNewData()
    },
    methods: {
        getNewData() {
            getClassifyNew(this.imgId, this.skip).then(response => {
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
            this.getNewData()
        }
    }
}
</script>
<style lang="scss">
    .new-view {
        height: calc( 100vh - 40rpx);
    }
    .new-list {
        display: flex;
        flex-wrap: wrap;
        .new-item {
            padding: 5rpx;
            image {
                width: 240rpx;
            }
        }
    }
</style>