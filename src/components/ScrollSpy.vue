<template>
  <div class="scroll-spy">
    <div class="mobile"><!--
    --><a href="#story1" id="spy1" class="spy-btn" title="清潔隊" target="_self">清潔隊</a><!--
    --><a href="#story2" id="spy2" class="spy-btn" title="焚化爐" target="_self">焚化爐</a><!--
    --><a href="#story3" id="spy3" class="spy-btn" title="回收場" target="_self">回收場</a><!--
    --><a href="#story4" id="spy4" class="spy-btn" title="紙廠" target="_self">紙廠</a>
    </div>

    <div class="desktop">
      <a href="#story1" id="spy1-d" class="spy-btn" title="清潔隊" target="_self">清潔隊</a>
      <a href="#story2" id="spy2-d" class="spy-btn" title="焚化爐" target="_self">焚化爐</a>
      <a href="#story3" id="spy3-d" class="spy-btn" title="回收場" target="_self">回收場</a>
      <a href="#story4" id="spy4-d" class="spy-btn" title="紙廠" target="_self">紙廠</a>
    </div>
  </div>

</template>

<script>

export default {
  name: 'ScrollSpy',
  components: {}
}
</script>

<style lang="scss">
  .scroll-spy {
    display: inline-block;
    width: 100%;
    text-align: center;

    @include rwd($RWD_DESKTOP) {
      z-index: 900;
      position: fixed;
      top: 0;
      left: 40px;
      width: auto;
      height: 100vh;

      @include use-vertical-align();
    }

    @include rwd($RWD_DESKTOP_WIDE) {
      left: 140px;
    }

    & .mobile {
      display: block;

      @include rwd($RWD_TABLET_SMALL) {
        padding-left: 20px;
        text-align: left;
      }

      @include rwd($RWD_DESKTOP) {
        display: none;
      }
    }

    & .desktop {
      display: none;
      vertical-align: middle;

      .spy-btn {
        display: block;
        padding-right: 0;
        padding-bottom: 30px;
        font-size: .9375rem;
        color: #FFFFFF;
        letter-spacing: 1rem;
        writing-mode: vertical-rl;

        &.active {
          color: #FF3737;
        }
      }

      @include rwd($RWD_DESKTOP) {
        display: inline-block;
      }
    }
  }

  .spy-btn {
    display: inline-block;
    width: 25%;
    color: #CBCBCB;
    font-size: 0.9375rem;
    text-decoration: none;
    cursor: pointer;

    @include rwd($RWD_TABLET_SMALL) {
      width: auto;
      padding-right: 20px;
    }
    &.active {
      color: #000000;
    }
  }
</style>
