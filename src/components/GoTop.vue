<template>
  <div class="gotop" @click="goTop">
    <div class="gotop-btn" :class="{ active: isActive }">
      <i class="fa fa-chevron-up fa-2x"></i>
    </div>
  </div>
</template>

<script>
import { TweenLite } from 'gsap'
import Utils from 'udn-newmedia-utils'

export default {
  name: 'GoTop',
  data () {
    return {
      isActive: false
    }
  },
  methods: {
    goTop () {
      this.isActive = true
      TweenLite.to(window, 1, { scrollTo: 0 })

      window.ga('newmedia.send', {
        'hitType': 'event',
        'eventCategory': 'headbar',
        'eventAction': 'click',
        'eventLabel': '[' + Utils.detectPlatform() + '] [' + document.querySelector('title').innerHTML + '] [點擊回到最上面]'
      })
    },
    handle_scroll () {
      let currentH = window.pageYOffset
      if (currentH > window.innerHeight) {
        this.isActive = false
      } else {
        this.isActive = true
      }
    }
  },
  created () {
  },
  mounted () {
    window.addEventListener('scroll', this.handle_scroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handle_scroll)
  }
}
</script>

<style lang="scss">
  .gotop {
    position: fixed;
    z-index: 9997;
    right: 10px;
    bottom: 10px;
    width: 45px;
    height: 45px;
    overflow: hidden;
    opacity: .6;

    @include rwd($RWD_DESKTOP_WIDE) {
      bottom: 3.5vh;
      right: 50%;
      margin-right: -520px;
    }
  }

  .gotop-btn{
    width: 45px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #E5E5E5;
    cursor: pointer;
    transition: 333ms ease;
    transform: translate3d(0, 0, 0);

    i{
      color: #fff;
    }

    &.active{
      transform: translate3d(0, 100%, 0);
    }
  }
</style>
