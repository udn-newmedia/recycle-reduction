<template>
  <div class="share-button">
    <div class="share-button__social"><!--
    --><a class="share-button__share-facebook" title="FB分享" @click.prevent.stop="onShareFacebook"><!--
      --><i class="fab fa-facebook-f" /></a><!--
    --><a class="share-button__share-line" title="LINE分享" target="_blank" :href="lineSharedUrl"><!--
      --><img src="@/assets/images/share-line.png" alt="LINE分享" /></a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShareButton',
  computed: {
    sharedUrl () {
      let url = window.location.href
      return url.replace(/^http:\/\//, 'https://')
    },
    lineSharedUrl () {
      let sharedUrl = this.sharedUrl
      let sharedText = document.title
      // desktop
      if (!this.$isMobile) {
        return `https://lineit.line.me/share/ui?text=${encodeURIComponent(sharedText)}&url=${encodeURIComponent(sharedUrl)}`
      }
      // mobile
      if (!this.$isInApp) {
        return `https://line.me/R/msg/text/${encodeURIComponent(sharedText)} ${encodeURIComponent(sharedUrl)}`
      }
      // mobile in-app webview
      return `https://line.naver.jp/R/msg/text/?${encodeURIComponent(sharedUrl)}`
    }
  },
  methods: {
    onShareFacebook () {
      let fbShareConfig = {
        method: 'share',
        display: 'popup',
        href: this.sharedUrl
      }
      window.FB && window.FB.ui(fbShareConfig)
    }
  }
}
</script>

<style lang="scss">
  .share-button {
    $frame: ".share-button";
    position: relative;
    padding: 45px 0 120px 0;
    text-align: center;

    a {
      display: inline-block;
      position: relative;
      width: 60px;
      height: 60px;
      text-align: center;
      cursor: pointer;
      vertical-align: top;

      @include use-vertical-align();
    }

    a + a {
      margin-left: 12px;
    }

    i {
      display: inline-block;
      position: relative;
      font-size: 1.625rem;
      color: #E8E8E8;
      vertical-align: middle;
    }

    @include rwd($RWD_DESKTOP_WIDE) {
      i {
        font-size: 2rem;
      }
    }

    &__share-line {
      position: relative;
      text-align: center;

      img {
        display: inline-block;
        width: 70%;
        vertical-align: middle;
        // opacity: 0.8;
      }

      @include rwd($RWD_DESKTOP_WIDE) {
        img {
          width: 80%;
        }
      }
    }
  }
</style>
