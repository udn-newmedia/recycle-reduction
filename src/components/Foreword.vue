<template>
  <div class="foreword">
    <div class="foreword__trigger-cover-fixed"
      ref="triggerCoverFixed"/>

    <div ref="cover" class="foreword__cover"></div>

    <div ref="dialogues" class="foreword__dialogues">
      <div class="foreword__dialogue">
        <p>「我也很想自己帶餐具、飲料杯啊，但若在夜市、小吃店，用完後無法馬上洗，油油的放進包包裡很噁心耶。」</p>
      </div>

      <div class="foreword__dialogue">
        <p>「餐盒、杯子、吸管......要帶好多種東西在身上，很佔空間，重又不方便。」</p>
      </div>

      <div class="foreword__dialogue">
        <p>「如果一餐找不到地方洗，下一餐就不能用，也沒意義了。」</p>
      </div>
    </div>
    <div class="foreword__scroll">滑動繼續</div>
  </div>
</template>

<script>
export default {
  name: 'Foreword',
  data () {
    return {
      ctrl: new this.$sm.Controller()
    }
  },
  mounted () {
    new this.$sm.Scene({
      triggerElement: this.$refs.triggerCoverFixed,
      duration: '300%',
      triggerHook: 0
    })
      .addTo(this.ctrl)
      .setTween(this.$refs.dialogues, 1, { top: -10 })
      .setPin(this.$refs.cover)
      .addIndicators({ name: 'cover-fixed' })
  }
}
</script>

<style lang="scss">
.foreword {
  $frame: ".foreword";
  position: relative;
  height: 100vh;
  padding: 0 48px;

  &__trigger-cover-fixed {
    top: 0;
  }

  &__cover {
    z-index: -1;
    position: absolute;
    left: 0;
    top: 0%;
    width: 100%;
    height: 100%;
    background: url('../assets/images/reduction_cover_background_m.jpg') no-repeat center center/cover;

    @include rwd($RWD_DESKTOP_WIDE) {
      background: url('../assets/images/reduction_cover_background_pc.jpg') no-repeat center center/cover;
    }
  }

  &::before {
    content: "";
    position: absolute;
    display: block;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 0.51) 50%,
      rgba(0, 0, 0, 0) 100%);
    pointer-events: none;
  }

  &::after {
    content: "";
    display: inline-block;
    width: 0;
    height: 100%;
    vertical-align: middle;
  }

  &__dialogues {
    position: relative;
    display: inline-block;
    vertical-align: middle;

    @include rwd($RWD_DESKTOP_WIDE) {
      width: 73%;
      max-width: 1420px;
    }
  }

  &__dialogue {
    margin-bottom: 30px;

    p {
      color: #FFFFFF;
      font-size: 1.125rem;
      line-height: 1.5rem;
    }
  }

  &__scroll {
    position: absolute;
    // display: inline-block;
    width: 60px;
    // height: 46px;
    left: 0;
    right: 0;
    margin: 0 auto;
    bottom: 60px;
    padding-top: 10px;
    color: #FFFFFF;
    font-size: 0.8125rem;
    text-align: center;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      margin: 0 auto;
      width: 15px;
      height: 10px;
      color: #ECEBE4;
      font-size: 0.9375rem;
      background: url('../assets/images/index_chevron-down-solid.svg') no-repeat center top;
    }
  }
}
</style>
