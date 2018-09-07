<template>
    <div class="hello">
        <div class="slider-demo">
            <slider :options="options" :dataList="urlList">
            </slider>
            <!-- <sliderContainer :options="options">
                <sliderItem v-for="(item, index) in urlList" :key="index">
                    <img class="slider-image" :src="item" alt="">
                </sliderItem>
            </sliderContainer> -->
        </div>
    </div>
</template>

<script>
import slider from '@/components/slider.vue'
import sliderItem from '@/components/slider-item.vue'
import sliderContainer from '@/components/slider-container.vue'

export default {
    name: 'HelloWorld',
    components: {
        slider,
        sliderItem,
        sliderContainer
    },
    data() {
        return {
            urlList: [
                'https://m.hexiehealth.com/abwx_cms/up_load/20180329095447_573.jpg',
                'https://m.hexiehealth.com/abwx_cms/up_load/20180522165547_637.jpg',
                'https://m.hexiehealth.com/abwx_cms/up_load/20180511105015_386.jpg',
                'https://m.hexiehealth.com/abwx_cms/up_load/20171211093006_832.jpg',
                'https://m.hexiehealth.com/abwx_cms/up_load/1250122_index.jpg'
            ],
            options: {
                perView: 1,     // 一屏多少个图片
                spaceBetween: 0,    // 图片的间距
                index: 0,       // 轮播起始位置
                autoPlay: false,     // 是否自动播放，需要先看起无缝滚动,
                autoSpeed: 2500,    // 自动播放的时间间隔
                loop: false,     // 无缝滚动
                drag: false,     // 是否鼠标可拖动
                slideGroup: true,   // 是否全屏滚动，针对于一屏有多个图片
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.slider-demo {
    width: 1400px;
    height: 500px;
    border: 1px solid #e5e5e5;
    margin: 0 auto;
    background-color: #fff;

    .slider-image {
        width: 100%;
    }
}
</style>
