<template>
    <view @tap="handelClick">
        <slot></slot>
    </view>
</template>
<script>
export default {
    props:{
        list: Array,
        index: Number
    },
    methods: {
        handelClick() {
            getApp().globalData.imgList = this.list
            getApp().globalData.imgIndex = this.index
            uni.navigateTo({
                url: '/pages/imgdetails/index'
            })

            
              
            
              
        }
    }

}
</script>