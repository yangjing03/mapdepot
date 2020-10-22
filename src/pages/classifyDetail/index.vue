<template>
    <view>
        <navbar :current="current" :list="list" @updateIndex="onClickItem"></navbar>
        <view class="content">
            <view v-if="current === 0">
                <hot :imgId="id"></hot>
            </view>
            <view v-if="current === 1">
                <new-classify :imgId="id"></new-classify>
            </view>
        </view>
    </view>
</template>
<script>
import navbar from '../../components/navbar'
import hot from './hot'
import newClassify from './newClassify'
export default {
    components: {
        navbar,
        hot,
        newClassify
        },
    data() {
        return {
            list: ['热门','最新'],
            current: 0,
            id: ''
        }
    },
    onLoad(option) {
        console.log(option)
        this.id = option.id
    },
    methods: {
        onClickItem(index) {
            if (this.current !== index) {
                this.current = index;
            }
        }
    }
}
</script>