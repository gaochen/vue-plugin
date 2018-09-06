<template>
    <div class="ca-slider-pc-item" :style="{width: li_w + 'px', marginRight: spaceBetween + 'px'}">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'sliderItem',
    props: {
        name: String
    },
    data() {
        return {
            li_w: 0,
            spaceBetween: 0
        }
    }
}
</script>

<style lang="less">
    .ca-slider-pc-item {
        width: 100%;
        height: 100%;
        overflow: hidden;
        float: left;
    }
</style>
