<template>
    <view>
        <navbar :list="list" :current="current" @updateIndex="updateIndex">
           <template>
                <view v-if="current === 0">
                <recommend></recommend>
            </view>
            <view v-if="current === 1">
                <classify></classify>
            </view>
            <view v-if="current === 2">
                <newimg></newimg>
            </view>
             <view v-if="current === 3">
                <album></album>
            </view>
           </template>
        </navbar>
    </view>
</template>
<script>
import navbar from '../../components/navbar'

import recommend from '../../components/recommend'
import classify from '../../components/classify'
import newimg from '../../components/newimg'
import album from '../../components/album'

export default {
    components: {
        navbar,
        recommend,
        classify,
        newimg,
        album
    },
    data() {
        return {
        list: ['推荐','分类','最新','专辑'],
        current: 0
        }
    },
    methods: {
        updateIndex(index) {
            this.current = index
        }
    }
}
</script>