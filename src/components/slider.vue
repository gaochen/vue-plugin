<template>
    <div id="ca-slider-pc">
        <div class="ca-slider-container" ref="container">
            <div class="ca-slider-left-btn" @click="prev()"></div>
            <div class="ca-slider-right-btn" @click="next()"></div>
            <ul class="clearfix" :style="{
						'transform':'translateX('+translateX+'px)',
		                'width': ul_w + 'px'
					}">
                <li class="ca-slier-item" v-for="(item, index) in list" :key="index" :style="{backgroundImage: 'url('+ item +')', width: li_w + 'px', marginRight: spaceBetween + 'px'}">
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'slider',
    props: {
        dataList: {
            type: Array,
            default: []
        },
        options: {
            index: {
                type: Number,
                default: 0
            },
            perView: {
                type: Number,
                default: 1
            },
            spaceBetween: {
                type: Number,
                default: 0
            },
            autoPlay: {
                type: Boolean,
                default: false
            },
            loop: {
                type: Boolean,
                default: false
            }
        }
    },
    data() {
        return {
            list: this.dataList,
            index: this.options.index || 0,
            perView: this.options.perView || 1,
            spaceBetween: this.options.spaceBetween || 0,
            autoPlay: this.options.autoPlay,
            loop: this.options.loop,
            IEVersion: null,
            translateX: 0,
            ul_w: 0,
            li_w: 0,
            parentWidth: 0
        }
    },
    computed: {},
    created() {

    },
    mounted() {
        this.IEVersion = this.getIEVersion()

        // 轮播
        if (this.loop) {
            let dataList = this.dataList

            // 右侧加入
            let arr_R = dataList.slice(0, this.perView)
            this.list = this.list.concat(arr_R)

            // 左侧加入
            let arr_L = dataList.slice(-1 * this.perView)
            this.list = arr_L.concat(this.list)

            // 充值index
            this.index = this.index + this.perView
        }

        // 计算ul、li宽度
        let length = this.list.length
        this.parentWidth = this.$el.offsetWidth
        let perView = this.perView
        let marginWidth = (perView - 1) * this.spaceBetween
        this.li_w = (this.parentWidth - marginWidth) / perView
        this.ul_w = (this.li_w + this.spaceBetween) * length

        // 计算初始位置
        this.translateX = -1 * (this.li_w + this.spaceBetween) * this.index

        // 自动播放
        if (this.autoPlay) {

        }
    },
    watch: {
        translateX: function(newValue) {
            // console.log('watch translateX:' + newValue)
            // let endValue = -1 * (this.list.length - this.perView) * this.li_w
            // if (newValue === endValue) {
            //     this.index = this.perView
            //     this.translateX =  -1 * this.index * this.li_w
            // }
        }
    },
    methods: {
        getIEVersion() {
            var userAgent = navigator.userAgent // 取得浏览器的userAgent字符串
            var isIE =
                userAgent.indexOf('compatible') > -1 &&
                userAgent.indexOf('MSIE') > -1 // 判断是否IE<11浏览器
            var isEdge = userAgent.indexOf('Edge') > -1 && !isIE // 判断是否IE的Edge浏览器
            var isIE11 =
                userAgent.indexOf('Trident') > -1 &&
                userAgent.indexOf('rv:11.0') > -1
            if (isIE) {
                var reIE = new RegExp('MSIE (\\d+\\.\\d+);')
                reIE.test(userAgent)
                var fIEVersion = parseFloat(RegExp['$1'])
                if (fIEVersion == 7) {
                    return 7
                } else if (fIEVersion == 8) {
                    return 8
                } else if (fIEVersion == 9) {
                    return 9
                } else if (fIEVersion == 10) {
                    return 10
                } else {
                    return 6 // IE版本<=7
                }
            } else if (isEdge) {
                return 'edge' //edge
            } else if (isIE11) {
                return 11 // IE11
            } else {
                return -1 // 不是ie浏览器
            }
        },
        next() {
            let max = this.list.length - this.perView
            // 无缝连接
            if (this.index === max) {
                this.index = this.perView
                this.translateX = this.translateX + this.dataList.length * (this.li_w + this.spaceBetween)
            }
            if (this.index < max) {
                this.index++

                let finalValue =
                    -1 * this.index * (this.li_w + this.spaceBetween)

                this.move('translateX', 20, finalValue, true)
            }
        },
        prev() {
            // 无缝连接
            if (this.index === 0) {
                this.index = this.list.length - this.perView
                this.translateX = this.translateX - this.dataList.length * (this.li_w + this.spaceBetween)
            }
            if (this.index > 0) {
                this.index--

                let finalValue =
                    -1 * this.index * (this.li_w + this.spaceBetween)

                this.move('translateX', 20, finalValue, false)
            }
        },
        /**
         * attr: string, 不要改变的属性
         * speed: number, 运动的速度
         * finalValue: number, 运动的终值
         * bool: boolean, 运动方向
         */
        move(attr, speed, finalValue, bool) {
            clearInterval(timer)
            let timer = null

            if (bool) {
                if (this[attr] > finalValue) {
                    timer = setInterval(() => {
                        let finalValue = -1 * this.index * (this.li_w + this.spaceBetween)
                        let distance = this[attr] - finalValue
                        let sudu = distance / 8
                        if (sudu < 3) {
                            sudu = 3
                        }

                        if (distance <= 3) {
                            this[attr] = finalValue
                            clearInterval(timer)
                        } else {
                            this[attr] = this[attr] - sudu
                        }
                    }, 1000 / 60)
                }
            } else {
                if (this[attr] < finalValue) {
                    timer = setInterval(() => {
                        let finalValue = -1 * this.index * (this.li_w + this.spaceBetween)
                        let distance = finalValue - this[attr]
                        let sudu = distance / 8
                        if (sudu < 3) {
                            sudu = 3
                        }

                        if (distance <= 3) {
                            this[attr] = finalValue
                            clearInterval(timer)
                        } else {
                            this[attr] = this[attr] + sudu
                        }
                    }, 1000 / 60)
                }
            }
        }
    }
}
</script>

<style lang="less">
#ca-slider-pc {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;

    .ca-slider-container {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;

        .ca-slider-left-btn {
            width: 40px;
            height: 60px;
            position: absolute;
            top: 50%;
            left: 0;
            margin-top: -30px;
            background-color: red;
            z-index: 100;
            cursor: pointer;
        }

        .ca-slider-right-btn {
            width: 40px;
            height: 60px;
            position: absolute;
            top: 50%;
            right: 0;
            margin-top: -30px;
            background-color: red;
            z-index: 100;
            cursor: pointer;
        }

        ul {
            width: auto;
            height: 100%;

            .ca-slier-item {
                float: left;
                height: 100%;

                background-position: center center;
                background-repeat: no-repeat;
                background-size: cover;
            }
        }
    }
}
</style>
