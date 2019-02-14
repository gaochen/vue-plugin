<template>
    <div class="hello">
        Message: {{ message }}
        <br>
        <button @click="message = null">click here to set message to null and provoke watcher error</button>
        <!-- <div>
            Name: <b>{{ person.name }}</b> - Zip: {{ person.address.zip }}
        </div> -->
        <h1 @click="test" v-stat="{poi: inputValue, router: $route.name}" :content="`search|mall|${inputValue}`">搜索</h1>
        <input type="text" v-model="inputValue">
        <div class="slider-demo">
            <ca-slider-pc :options="options" :dataList="urlList">
            </ca-slider-pc>
            <!-- <sliderContainer :options="options">
                <sliderItem v-for="(item, index) in urlList" :key="index">
                    <img class="slider-image" :src="item" alt="">
                </sliderItem>
            </sliderContainer> -->
        </div>
        <div class="youjian" oncontextmenu="return false;">
            <!-- <img src="https://m.hexiehealth.com/abwx_cms/up_load/20180329095447_573.jpg" oncontextmenu="return false;" alt=""> -->
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'one',
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
                perView: 2, // 一屏多少个图片
                spaceBetween: 20, // 图片的间距
                index: 0, // 轮播起始位置
                autoPlay: true, // 是否自动播放，需要先看起无缝滚动,
                autoSpeed: 2500, // 自动播放的时间间隔
                loop: true, // 无缝滚动
                drag: true, // 是否鼠标可拖动
                slideGroup: true // 是否全屏滚动，针对于一屏有多个图片
            },
            people: [
                { name: 'Check the console', address: { zip: 4444 } },
                { name: 'No address' /* address: {zip: 5555} */ }
            ],
            message: 'Some message',
            inputValue: 'abc'
        }
    },
    mounted() {
        let options = {
            title: '页面1',
            description: '这是页面one',
            keywords: 'one,page-one'
        }
        this.$setMeta(options)

        axios.get('http://192.168.10.153:3000/get').then(function(response) {
            console.log(response)
        })
    },
    computed: {
        name: function() {
            return this.qwe + 2
        }
    },
    watch: {
        message: function() {
            console.log(this.message.trim())
        }
    },
    methods: {
        test() {
            console.log(document.cookie)
            this.$router.push('two')

            // console.log(abcd)
            try {
                aFunctionThatMightFail()
            } catch (err) {
                // 手动抓取错误
                // window.Sentry.captureException(err)
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
.youjian {
    width: 400px;
    height: 400px;
    background-image: url("https://m.hexiehealth.com/abwx_cms/up_load/20180511105015_386.jpg");
    background-size: cover;
    background-repeat: no-repeat;
}
</style>