<template>
  <div class="stick-cover">
    <div ref="triggerStickCover" class="trigger-stick-cover"></div>

    <div ref="stickcover" class="stick-cover-container">

    <div ref="title" class="success-titles">
      <div class="success-title">國外借鏡<span>:</span>德國押金杯如何成功</div>
    </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'StickCover',
  data () {
    return {
      ctrl: new this.$sm.Controller()
    }
  },
  mounted () {
    new this.$sm.Scene({
      triggerElement: this.$refs.triggerStickCover,
      duration: '200%',
      triggerHook: 0
    })
      .addTo(this.ctrl)
      .setTween(this.$refs.title, 1, { paddingTop: 0 })
      .setPin(this.$refs.stickcover)
      // .addIndicators({ name: 'fixed-cover' })
  }
}
</script>

<style lang="scss">
  .trigger-stick-cover {
    position: absolute;
    top: 0;
  }

  .stick-cover {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .stick-cover-container {
    position: relative;
    width: 100%;
    height: 100vh;
    background: url('../assets/images/reduction_background_3_m.jpg') no-repeat center center/cover;

    @include rwd($RWD_DESKTOP_WIDE) {
      background: url('../assets/images/reduction_background_3_pc.jpg') no-repeat center center/cover;
    }
  }

  success-titles {
    display: inline-block;
    vertical-align: middle;
  }

  .success-titles {
      position: relative;
      width: 100%;
      height: 100vh;
      padding-top: 200%;
      text-align: center;
      white-space: nowrap;

      @include use-vertical-align;
    }

    .success-title {
      display: inline-block;
      vertical-align: middle;
      position: relative;
      padding: 0 0 145px 0;
      color: #FFFFFF;
      font-size: 1.875rem;
      writing-mode: vertical-rl;

      span {
        display: inline-block;
        writing-mode: horizontal-tb;
        position: relative;
        // width: 44px;
        padding-left: 4px;
        height: auto;
        color: #FFFFFF;
        font-size: 1.875rem;
        text-align: center;
      }

      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        right: 20px;
        width: 1px;
        height: 135px;
        margin: 0 auto;
        background-color: #FFFFFF;
      }

      @include rwd($RWD_DESKTOP_WIDE) {
        padding: 0 0 165px 0;
        font-size: 2.125rem;
        font-weight: bold;

        &::after {
          right: 22px;
        }
      }
    }
</style>
