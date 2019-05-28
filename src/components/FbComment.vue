<template>
  <div class="fb-comment">
    <div class="fb-comments" data-href="https://udn.com/upf/newmedia/2019_data/recycle/reduction" data-numposts="5" data-width="100%" data-order-by="reverse_time"></div>
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

<style lang="scss">
.fb-comment{
  position: relative;
  min-height: 200px;
  background-color: #FFFFFF;

  @include rwd($RWD_DESKTOP_WIDE) {
    width: 940px;
    margin: 0 auto;
  }
}
</style>
