<template>
  <div class="share">
    <div class="share-btn fb-like-block">
      <div class="fb-like" data-href="https://udn.com/upf/newmedia/2019_data/lovecard/" data-layout="button_count" data-action="like" data-size="small" data-show-faces="true" data-share="true"></div>
    </div>
    <a class="share-btn share-line" title="LINE" target="_blank" :href="lineSharedUrl">
      <img class="line-share" src="//media.line.me/img/button/zh-hant/84x20.png" width="84" height="20" alt="LINE分享給朋友"></a>
  </div>
</template>

<script>
export default {
  name: 'Share',
  methods: {
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

      // window.ga('newmedia.send', {
      //   hitType: 'event',
      //   eventCategory: 'share',
      //   eventAction: 'click',
      //   eventLabel: `[${detectPlatform()}] [${document.querySelector('title').innerHTML}] [一般line icon] [line share]`,
      // });
    }
  },
  created () {
    (function (d, s, id) {
      var js = d.getElementsByTagName(s)[0]
      var fjs = d.getElementsByTagName(s)[0]

      if (d.getElementById(id)) return
      js = d.createElement(s); js.id = id
      js.src = '//connect.facebook.net/zh_TW/sdk.js?t-1#xfbml=1&version=v2.7&appId=1010324812347164'
      fjs.parentNode.insertBefore(js, fjs)
    }(document, 'script', 'facebook-jssdk'))
    // if (this.$props.href === undefined && this.$props.jsonProps === null) {
    //   console.error('請輸入 href ex: <share href="{Url}"></share>');
    // }
  }
}
</script>

<style lang="scss">
.share {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 0 45px 20px 45px;
  height: 150px;
  background-color: #30343f;
  color: #EBEBEB;
  text-align: left;
  // outline: 1px solid red;

  &::after {
    content: "";
    display: inline-block;
    width: 0;
    height: 100%;
    vertical-align: middle;
  }

  &::before {
    content: "";
    display: inline-block;
    width: 100%;
    height: 1px;
    background-color: #FFFFFF;
    opacity: 0.2;
  }

  @include rwd($RWD_TABLET) {
    padding: 0 85px 20px;
    text-align: center;
  }
}

.share-btn {
  display: inline-block;
  // padding-top: 80px;
  margin-right: 10px;
  margin-bottom: 34px;
  cursor: pointer;
  // outline: 1px solid goldenrod;
  vertical-align: bottom;

  &.share-line {
  }

  img {
    display: inline-block;
    height: 100%;
    vertical-align: bottom;
  }
}
</style>
