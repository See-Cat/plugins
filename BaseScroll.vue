<template>
    <div class="base-scroll" ref="wrap">
        <slot></slot>
    </div>
</template>

<script>
/**
 * 滚动组件
 * props {
 *  probeType:
 *      1 滚动的时候会派发scroll事件，会截流
 *      2 滚动的时候实时派发scroll事件，不会截流
 *      3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
 *  scrollX: 是否开启横向滚动，默认开启
 *  data: 滚动内容数据，主要为了监听数据变化后重置滚动组件
 * }
 */

import { BetterScroll } from 'cube-ui'

export default {
    name: 'BaseScroll',
    props: {
        probeType: {
            type: Number,
            default: 1
        },
        scrollX: {
            type: Boolean,
            default: true
        },
        data: {
            type: null,
            default: null
        }
    },
    watch: {
        data () {
            this.$nextTick(() => {
                this.refresh()
            })
        }
    },
    methods: {
        _initScroll () {
            if (!this.$refs.wrap) {
                return
            }
            this.scroll = new BetterScroll(this.$refs.wrap, {
                probeType: this.probeType,
                scrollX: this.scrollX
            })
        },
        refresh () {
            this.scroll && this.scroll.refresh()
        }
    },
    mounted () {
      this.$nextTick(() => {
        this._initScroll()
      })
    }
}
</script>

<style scoped>
    .base-scroll {
        overflow: hidden;
    }
</style>
