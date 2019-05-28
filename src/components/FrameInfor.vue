<template>
  <div class="frame frame-infor">
    <div class="frame-infor__contents">
      <div class="frame-infor__editors">
        <div class="frame-infor__editor">採訪團隊：鄭朝陽、郭政芬、張裕珍、林敬家、張雅婷、陳斯穎、許政榆、賴香珊、范榮達、魏翊庭</div>
        <div class="frame-infor__editor">製作人：洪欣慈</div>
        <div class="frame-infor__editor">影像：黃仲裕、郭政芬、報系資料照、<a href="https://recup.de/" title="" target="_blank">RECUP官方網站</a></div>
        <div class="frame-infor__editor">視覺設計：張心慈</div>
        <div class="frame-infor__editor">監製：林秀姿、潘如瑩、董谷音</div>
        <div class="frame-infor__editor">2019.05.30</div>
      </div>

      <div class="frame-infor__brand-links">
        <a href="https://udn.com/news/index" class="frame-infor__brand-link" title="聯合新聞網" target="_blank">
          <img src="@/assets/images/udn_logo_white.svg" alt="聯合新聞網UDN">
        </a>
        <a href="/" class="frame-infor__brand-link" title="新媒體中心" target="_blank">
          <img src="@/assets/images/newmedia_logo_white.svg" alt="聯合報新媒體中心">
        </a>
      </div>

      <a href="https://www.surveycake.com/s/KpQKN" class="frame-infor__questionnaire" title="填寫閱讀體驗問卷" target="_blank">填寫閱讀體驗問卷</a>

      <div class="frame-infor__read-more clearfix">
        <div class="frame-infor__read-more-layout">
          <div class="frame-infor__read-more-label">延伸閱讀</div>
          <a href="https://style.udn.com/style/story/8066/3664395" class="frame-infor__more clearfix" title="「#減塑時尚」 了解一下　6樣可愛環保小物分享" target="_blank">
            <div class="frame-infor__image clearfix">
              <img src="@/assets/images/reduction_read1.jpg" alt="「#減塑時尚」 了解一下　6樣可愛環保小物分享">
            </div>
            <div class="frame-infor__title">「#減塑時尚」 了解一下　6樣可愛環保小物分享</div>
          </a>
          <a href="https://udn.com/news/story/7328/3457766" class="frame-infor__more clearfix" title="打造無塑低碳島 小琉球飲水地圖服務上線" target="_blank">
              <div class="frame-infor__image clearfix">
              <img src="@/assets/images/reduction_read2.jpg" alt="打造無塑低碳島 小琉球飲水地圖服務上線">
            </div>
            <div class="frame-infor__title">打造無塑低碳島 小琉球飲水地圖服務上線</div>
          </a>
          <a href="https://vision.udn.com/vision/story/12840/3731989" class="frame-infor__more clearfix" title="12不塑心法 環保免當苦行僧" target="_blank">
              <div class="frame-infor__image clearfix">
              <img src="@/assets/images/reduction_read3.jpg" alt="12不塑心法 環保免當苦行僧">
            </div>
            <div class="frame-infor__title">12不塑心法 環保免當苦行僧</div>
          </a>
          <a href="https://vision.udn.com/vision/story/12840/3769323" class="frame-infor__more clearfix" title="徒步環島57天...垃圾海灘淌黑水 看見你我的自私" target="_blank">
              <div class="frame-infor__image clearfix">
              <img src="@/assets/images/reduction_read4.jpg" alt="徒步環島57天...垃圾海灘淌黑水 看見你我的自私">
            </div>
            <div class="frame-infor__title">徒步環島57天...垃圾海灘淌黑水 看見你我的自私</div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'FrameInfor'
}
</script>

<style lang="scss">
.frame-infor {
  $frame: ".frame-infor";

  &__contents {
    padding-top: 130px;
    background-color: #30343f;

    @include rwd($RWD_DESKTOP_WIDE) {
      padding-top: 170px;
    }
  }

  &__editors {
    padding: 0 45px;
    font-size: 0.9375rem;
    color: #E1E1E1;

    a {
      color: #E1E1E1;

      &:hover {
        color: #30343f;
        background-color: #E1E1E1;
        text-decoration: none;
      }
    }

    @include rwd($RWD_TABLET) {
      padding: 0 150px;
      line-height: 1.375rem;
    }

    @include rwd($RWD_DESKTOP_WIDE) {
      width: 536px;
      padding: 0;
      margin: 0 auto;
    }
  }

  &__editor {
    @include rwd($RWD_DESKTOP_WIDE) {
      margin-bottom: 5px;
    }
  }

  &__brand-links {
    position: relative;
    padding: 35px 45px 0;

    @include use-vertical-align();

    @include rwd($RWD_TABLET) {
      padding: 35px 0;
      text-align: center;
    }
  }

  &__brand-link {
    position: relative;
    display: inline-block;
    width: 40%;
    max-width: 128px;
    margin-right: 10px;
    vertical-align: middle;

    img {
      position: relative;
      display: inline-block;
      width: 100%;
    }

    @include rwd($RWD_TABLET) {
      width: 112px;
      max-width: none;
    }

    @include rwd($RWD_DESKTOP_WIDE) {
      width: 180px;
    }
  }

  &__questionnaire {
    display: block;
    margin: 100px auto;
    width: 250px;
    height: 70px;
    line-height: 70px;
    text-align: center;
    color: #f7f6f6;
    border-radius: 50px;
    border: 1px solid #f7f6f6;
    text-decoration: none;

    @include rwd($RWD_TABLET) {
      width: 200px;
      height: 60px;
      line-height: 60px;
    }

    @include rwd($RWD_DESKTOP_WIDE) {
      width: 250px;
      height: 70px;
      line-height: 70px;
      font-size: 0.9375rem;
    }
  }

  &__read-more {
    position: relative;
    padding: 0 16px 100px;

    &::before {
      content: "";
      display: block;
      top: 0;
      width: 100%;
      height: 1px;
      background-color: #FFFFFF;
      opacity: 0.2;
    }

    @include rwd($RWD_TABLET) {
      padding: 0 85px 100px;
    }
  }

  &__read-more-label {
    padding-top: 60px;
    font-size: 1.4375rem;
    color: #E1E1E1;

    @include rwd($RWD_TABLET) {
      padding-top: 100px;
      font-size: 1.0625rem;
    }

    @include rwd($RWD_DESKTOP_WIDE) {
      text-align: left;
      padding-bottom: 20px;
    }
  }

  &__read-more-layout {
    @include rwd($RWD_TABLET) {
      padding: 0 75px 0 65px;
    }

    @include rwd($RWD_DESKTOP_WIDE) {
      width: 870px;
      padding: 0;
      margin: 0 auto;
    }
  }

    &__image {
    position: relative;
    float: right;
    width: 50%;
    padding-bottom: 35%;
    height: 0;
    overflow: hidden;

    img {
      position: absolute;
      width: 100%;
      height: auto;
      left: 0;
      top: 0;
    }

    @include rwd($RWD_TABLET) {
      float: none;
      width: auto;
      padding-bottom: 58.9%;
      margin-right: 5px;
    }

    @include rwd($RWD_DESKTOP_WIDE) {
      margin: 0;
      margin-right: 10px
    }
  }

  &__more {
    display: block;
    margin-bottom: 12px;
    color: #A8A8A8;
    text-decoration: none;
    clear: both;

    @include rwd($RWD_TABLET) {
      width: 50%;
      float: left;
      clear: none;

      &#{$frame}__more:nth-child(odd) {
        &#{$frame}__image {
          margin-right: 0;
          margin-left: 5px;
        }
      }
    }

    @include rwd($RWD_DESKTOP_WIDE) {
      width: 212px;

      #{$frame}__image {
        margin: 0;
        margin-left: 10px;
      }

      &#{$frame}__more:nth-child(1) {
        &#{$frame}__image {
          margin-left: 0;
        }
      }
    }
  }

  // &__image {
  //   position: relative;
  //   float: right;
  //   width: 50%;
  //   padding-bottom: 35%;
  //   height: 0;
  //   overflow: hidden;

  //   img {
  //     position: absolute;
  //     width: 100%;
  //     height: auto;
  //     left: 0;
  //     top: 0;
  //   }

  //   @include rwd($RWD_TABLET) {
  //     float: none;
  //     width: auto;
  //     padding-bottom: 58.9%;
  //     margin-right: 5px;
  //   }

  //   @include rwd($RWD_DESKTOP_WIDE) {
  //     margin: 0;
  //     margin-right: 10px
  //   }
  // }

  &__title {
    float: left;
    width: 50%;
    padding: 10px 20px 0 0;

    @include rwd($RWD_TABLET) {
      float: none;
      width: 100%;
      padding-bottom: 70px;
    }

    @include rwd($RWD_DESKTOP_WIDE) {
      padding-left: 10px;
    }
  }
}
</style>
