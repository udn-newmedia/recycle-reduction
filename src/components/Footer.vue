<template>
  <div class="footer clearfix">
    <div class="footer-container">
      <div class="footer-links">
        <a href="http://www.udngroup.com/" class="link" title="前往聯合報系" target="_blank">聯合報系</a>
        <a href="https://udndata.com/faq/authority.html" class="link" title="聯合知識庫新聞授權" target="_blank">新聞授權</a>
        <a href="http://www.udngroup.com/members/udn_privacy" class="link" title="聯合報系網站隱私權聲明" target="_blank">隱私權聲明</a>
      </div>
      <div class="fan-groups">
        <div class="label">追蹤我們</div><!--
        --><a href="https://www.facebook.com/udnplus" class="group" title="聯合報FACEBOOK粉絲團" target="_blank">
          <i class="fab fa-facebook-square"></i>
        </a><!--
        --><a href="https://www.instagram.com/udngroup/" class="group" title="聯合報instagram" target="_blank">
          <i class="fab fa-instagram"></i>
        </a><!--
        --><a href="https://www.youtube.com/channel/UCEt9Vy6Kz4GKlePLgIJbtoA" class="group" title="United Daily News聯合報" target="_blank">
          <i class="fab fa-youtube"></i>
        </a><!--
      --></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="scss">
  .footer {
    position: relative;
    width: 100%;
    margin: 0 auto;
    padding: 20px 0 50px;
    text-align: center;
    background-color: #F7F6F6;
    border-top: 1px solid #DCDDDD;
    z-index: 999;
  }

  .footer-container {
    @include rwd($RWD_DESKTOP_WIDE) {
      width: 640px;
      margin: 0 auto;
    }
  }

  .footer-links {
    width: 100%;
    padding: 0 10px;

    .link {
      display: inline-block;
      border-right: 1px solid #A3A3A3;
      padding: 0 8px 0 4px;
      color: #2D2D2D;
      text-decoration: none;
    }

    @include rwd($RWD_TABLET) {
      width: auto;
      float: left;
    }
  }

  .fan-groups {
    width: 100%;
    padding: 4px 10px;

    .label {
      display: inline-block;
      margin: 0 5px;
      color: #7C7B7A;
      font-size: 16px;
      vertical-align: middle;
    }

    .group {
      display: inline-block;
      margin: 0 5px;
      font-size: 24px;
      vertical-align: middle;

      i {
        color: #7C7B7A;
      }
    }

    @include rwd($RWD_TABLET) {
      width: auto;
      float: right;
    }
  }
</style>
