<template>
    <div class="hello">
        <h1>这是第二个页面</h1>
        <editor :value="'123'"></editor>
    </div>
</template>

<script>
import editor from './editor.vue'

export default {
    name: 'two',
    components: {
        editor
    },
    data() {
        return {
           
        }
    },
    mounted() {
        let options = {
            title: '页面2',
            description: '这是页面two',
            keywords: 'two,page-two'
        }
        this.$setMeta(options)


        console.log(window.referrer)
        console.log(window.location.href)
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

</style>
