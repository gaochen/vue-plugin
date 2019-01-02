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
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

</style>
