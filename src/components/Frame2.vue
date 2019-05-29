<template>
  <div class="frame frame-2">
    <div class="frame-2__bg"></div>
    <div class="frame-2__summary">
      <p>多油高溫的外食，讓紙餐盒的塑化劑溶出，專家指出一份餐盒裝的食物及熱湯，就可能超過每人每日塑化劑的耐受量。毒物危機加上紙餐盒回收攏係假，不少民眾想減用紙餐盒、紙杯，外帶都自備容器，卻往往沒幾日就因太過麻煩而破功。</p>
      <p>但「減用」難道只有「自備」這一條路嗎？《聯合報》蒐集了4種減用餐盒、紙杯的創新方式，讓民眾可以盡一份環保心力，又不被不便所苦。</p>
    </div>
    <ShareButton />
  </div>
</template>

<script>
import ShareButton from '@/components/ShareButton'

export default {
  name: 'Frame2',
  components: {
    ShareButton
  },
  data () {
    return {}
  },
  computed: {},
  methods: {}
}
</script>

<style lang="scss">
.frame-2 {
  z-index: 20;
  $frame: ".frame-2";
  padding-top: 350px;

  &__bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 1) 66%,
      rgba(0, 0, 0, 1) 100%);
  }

  &__summary {
    position: relative;
    margin: 0 auto 0 auto;
    width: 95%;

    p {
      font-size: 1.125rem;
      margin-bottom: 20px;
      color: #FFFFFF;
    }

    @include rwd($RWD_DESKTOP_WIDE) {
      width: 90%;
      max-width: 812px;
      font-size: 1.3125rem;
      line-height: 1.5rem;

      p{
        font-size: 1.3125rem;
        margin-bottom: 45px;
      }
    }
  }
}
</style>
