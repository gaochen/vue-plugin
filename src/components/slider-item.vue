<template>
    <div class="ca-slider-pc-item">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'sliderItem',
    data() {
        return {}
    }
}
</script>

<style lang="less">
    .ca-slider-pc-item {
        width: auto;
        height: 100%;
        overflow: hidden;
    }
</style>
