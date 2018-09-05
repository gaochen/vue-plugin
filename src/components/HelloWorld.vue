<template>
    <div class="hello">
        <div class="slider-demo">
            <slider :options="options" :dataList="urlList">
            </slider>
        </div>
    </div>
</template>

<script>
import slider from '@/components/slider.vue'
import sliderItem from '@/components/slider-item.vue'

export default {
    name: 'HelloWorld',
    components: {
        slider,
        sliderItem
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
                perView: 1,
                spaceBetween: 0,
                index: 0,
                autoPlay: true,
                loop: true,
                drag: true
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.slider-demo {
    width: 800px;
    height: 200px;
    border: 1px solid #000;
    margin: 0 auto;
    background-color: green;
}
</style>
