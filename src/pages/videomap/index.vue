<template>
    <view>
        <navbar :list="title" :current="current" @updateIndex="updateCurrent">
            <viewv v-if="current === 0">
                <recommend></recommend>
            </viewv>
            <viewv v-if="current === 1">
                <distraction></distraction>
            </viewv>
            <viewv v-if="current === 2">
                <newvid></newvid>
            </viewv>
            <viewv v-if="current === 3">
                <hot></hot>
            </viewv>
            <viewv v-if="current === 4">
                <classify></classify>
            </viewv>
        </navbar>
    </view>
</template>
<script>
import navbar from '../../components/navbar'
import recommend from './recommend'
import distraction from './distraction'
import newvid from './newvid'
import hot from './hot'
import classify from './classify'

export default {
    components: {
        navbar,
        recommend,
        distraction,
        newvid,
        hot,
        classify
    },
    data() {
        return {
            title: ['推荐', '娱乐', '最新', '热门', '分类'],
            current: 0
        }
    },
    mounted() {},
    methods: {
        updateCurrent(id) {
            this.current = id
        }
    }
}
</script>