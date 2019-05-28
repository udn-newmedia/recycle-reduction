<template>
  <div class="progress-bar" :style="{ opacity: opacity }">
    <div class="bar" :style="{ width: progress + '%' }"></div>
  </div>
</template>

<script>
// import Utils from 'udn-newmedia-utils'

export default {
  name: 'ProgressBar',
  data () {
    return {
      progress: 0,
      opacity: 0,
      readProgress: 0
    }
  },
  methods: {
    handelScroll () {
      let currentH = window.pageYOffset
      let totalH = document.body.scrollHeight - window.innerHeight
      this.progress = ((currentH / totalH) * 100).toFixed(2)
      if (Math.floor(this.progress / 10) > this.readProgress) {
        this.readProgress = Math.floor(this.progress / 10)

        // window.ga("newmedia.send", {
        //     "hitType": "event",
        //     "eventCategory": "read",
        //     "eventAction": "scroll",
        //     "eventLabel": "[" + Utils.detectPlatform() + "] [" + document.querySelector('title').innerHTML + "] [page read " + (this.readProgress * 10) + "%]"
        //   })
      }
      currentH < 2 ? this.opacity = 0 : this.opacity = 1
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handelScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handelScroll)
  }
}
</script>

<style lang="scss">
  .progress-bar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    transition: opacity 0.2s ease;
    height: 2px;
  }

  .bar {
    position: absolute;
    width: 0;
    height: 100%;
    background-color: #bf2923;
  }
</style>
