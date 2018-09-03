<template>
  <div class="hello">
    <slider class="test" :options="options" :dataList="urlList"></slider>
  </div>
</template>

<script>
import slider from "@/components/slider.vue";

export default {
  name: "HelloWorld",
  components: {
    slider
  },
  data() {
    return {
      urlList: [
        "https://m.hexiehealth.com/abwx_cms/up_load/20180329095447_573.jpg",
        "https://m.hexiehealth.com/abwx_cms/up_load/20180522165547_637.jpg",
        "https://m.hexiehealth.com/abwx_cms/up_load/20180511105015_386.jpg",
        "https://m.hexiehealth.com/abwx_cms/up_load/20171211093006_832.jpg"
      ],
      options: {
        width: 800, // li的宽度
        index: 0
      }
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.test {
  width: 800px; /*no*/
  height: 200px; /*no*/
}
</style>
