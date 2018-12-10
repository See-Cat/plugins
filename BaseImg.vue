<template>
    <div class="flex base-img__wrap" @click="$emit('click')">
        <img class="base-img_img" :src="src" :alt="alt">
    </div>
</template>

<script>
/** 基础img组件
 * props:
 *  src 图片地址
 *  alt alt属性
 * @click：支持绑定click事件
 */

export default {
    name: 'BaseImg',
    props: {
        src: {
            type: null,
            default: require('@/assets/images/default-img.png')
        },
        alt: String
    }
}
</script>

<style scoped>
    .base-img__wrap {
        justify-content: center;
        align-items: center;
    }

    .base-img_img {
        max-width: 100%;
        max-height: 100%;
    }
</style>


