<template>
  <div class="fb-comment">
    <!-- <div class="fb-comments" data-href="https://udn.com/upf/newmedia/2019_data/recycle" data-numposts="5" data-width="100%" data-order-by="reverse_time"></div> -->
    <div class="fb-comments" data-href="https://udn.com/upf/newmedia/2019_data/lovecard/" data-numposts="5" data-width="100%" data-order-by="reverse_time"></div>
  </div>
</template>

<script>
export default {
  name: 'FbComment',
  created () {
    // if (this.$props.href === undefined && this.$props.jsonProps === null) {
    //   console.error('請輸入 href ex: <fb-comment> href="{Url}"></fb-comment>')
    // }
  }
}
</script>

<style scoped>
.fb-comment-block{
  position: relative;
}
</style>
