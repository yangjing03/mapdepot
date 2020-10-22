<template>
    <view>
        <uni-segmented-control :current="current" :values="list" @clickItem="tapActive" style-type="button" active-color="#d4237a"></uni-segmented-control>
        <view class="content">
          <slot></slot>
        </view>
    </view>
</template>
<script>
import {uniSegmentedControl} from '@dcloudio/uni-ui'

export default {
    components:{
        uniSegmentedControl
    },
    props: {
         list: {
            type:Array,
            default: ['推荐','分类','最新','专辑']
            },
        current: {
            type: Number,
            default: 0
        }
    },
    methods: {
        tapActive(e) {
            this.$emit('updateIndex', e.currentIndex)
        }
    }
}
</script>
<style>
    .item-wrap {
     display: flex;
     justify-content: center;
     text-align: center;
     padding-top: 10vm;
     width: 80%;
     border: 3rpx solid #666;
     border-radius: 14rpx;
     margin: 0 auto;
    }
    .item {
        flex: 1;
        
    }
    .active {
    border-bottom: 3px solid #d4237a;
    }
</style>