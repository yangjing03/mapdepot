<template>
    <view @touchstart="slitherBegin" @touchend="slitherEnd">
        <slot></slot>
    </view>
</template>
<script>
export default {
    data() {
        return {
            beginX: 0,
            beginY: 0,
            beginTime: Date
        }
    },
    methods: {
        slitherBegin(e) {
            this.beginX = e.changedTouches[0].pageX
            this.beginY = e.changedTouches[0].pageY
            this.beginTime = e.timeStamp
        },
        slitherEnd(e) {
            const endX = e.changedTouches[0].pageX - this.beginX
            const endY = e.changedTouches[0].pageY - this.beginY
            const endTime = e.timeStamp - this.beginTime
            if( endTime < 2000) {
                if( Math.abs(endX) > 10 && Math.abs(endY) < 10 ) {
                    endX > 0?this.$emit('orSo', false):this.$emit('orSo', true)
                }
            }
        }
    }
}
</script>