<template>
    <div class="slider">
        <div class="slider-container">
            <div class="Lbtn" @click="prev()"></div>
            <div class="Rbtn" @click="next()"></div>
            <ul class="clearfix" :style="{
						'transform':'translateX('+translateX+'px)',
		                'width': ulWidth + 'px'
					}">
                <li v-for="(item, index) in dataList" :key="index" :style="{backgroundImage: 'url('+ item +')', width: options.width + 'px'}">
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
            width: {
                type: Number
            },
            index: {
                type: Number,
                default: 0
            }
        }
    },
    data() {
        return {
            IEVersion: null,
            translateX: 0
        }
    },
    computed: {
        ulWidth: function() {
            return this.dataList.length * this.options.width
        },
        // translateX: function() {
        //     return -1 * this.options.index * this.options.width + 'px'
        // }
    },
    mounted() {
        this.IEVersion = this.getIEVersion()
        
    },
    methods: {
        getIEVersion() {
            var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
            var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器  
            var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器  
            var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
            if(isIE) {
                var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
                reIE.test(userAgent);
                var fIEVersion = parseFloat(RegExp["$1"]);
                if(fIEVersion == 7) {
                    return 7;
                } else if(fIEVersion == 8) {
                    return 8;
                } else if(fIEVersion == 9) {
                    return 9;
                } else if(fIEVersion == 10) {
                    return 10;
                } else {
                    return 6;//IE版本<=7
                }   
            } else if(isEdge) {
                return 'edge';//edge
            } else if(isIE11) {
                return 11; //IE11  
            }else{
                return -1;//不是ie浏览器
            }
        },
        next() {
            let max = this.dataList.length - 1
            if (this.options.index < max) {
                this.options.index++
                
                let finalValue = -1 * this.options.index * this.options.width

                this.move('translateX', 20, finalValue, true)
            }
        },
        prev() {
            if (this.options.index > 0) {
                this.options.index--

                let finalValue = -1 * this.options.index * this.options.width

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
                    }, 1000/60)
                }
            } else {
                if (this[attr] < finalValue) {
                    timer = setInterval(() => {
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
                    }, 1000/60)
                }
            }
        }
    }
}
</script>

<style lang="less">
    .slider {
        width: 100%;
        height: 100%;

        .slider-container {
            width: 100%;
            height: 100%;
            overflow: hidden;
            position: relative;

            .Lbtn {
                width: 50px;
                height: 100px;
                position: absolute;
                top: 50%;
                left: 0;
                margin-top: -50px;
                background-color: red;
                z-index: 100;
            }

            .Rbtn {
                width: 50px;
                height: 100px;
                position: absolute;
                top: 50%;
                right: 0;
                margin-top: -50px;
                background-color: red;
                z-index: 100;
            }

            ul {
                width: auto;
                height: 100%;

                li {
                    float: left;
                    width: 100%;
                    height: 100%;

                    background-position: center center;
                    background-repeat: no-repeat;
                    background-size: cover;
                }
            }
        }
    }
</style>
