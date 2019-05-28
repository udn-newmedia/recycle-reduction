<template>
  <div class="auto-video">
    <video webkit-playsinline playsinline muted loop
      ref="video"
      :style="videoStyle"
      :src="videoSource"
      :autoplay="!auto"></video>
  </div>
</template>

<script>
const THRESHOLD = [
  0.05, 0.1,
  0.15, 0.2,
  0.25, 0.3,
  0.35, 0.4,
  0.45, 0.5,
  0.55, 0.6,
  0.65, 0.7,
  0.75, 0.8,
  0.85, 0.9,
  0.95, 1.0
]

const BLUR_DEFAULT = 8

export default {
  name: 'AutoVideo',
  props: {
    src: String,
    srcLarge: String,
    auto: { type: Boolean, default: true },
    blur: { type: Boolean, default: false },
    freeze: { type: Boolean, default: false }
  },
  data () {
    return {
      options: {
        root: null,
        rootMargin: '0px 0px 0px 0px',
        threshold: THRESHOLD
      },
      observer: null
    }
  },
  computed: {
    videoStyle () {
      let blurValue = !this.blur ? 0 : BLUR_DEFAULT
      return {
        '-webkit-filter': `blur(${blurValue}px)`,
        'filter': `blur(${blurValue}px)`
      }
    },
    videoSource () {
      return !this.useLargeAssets ? this.src : this.srcLarge
    },
    useLargeAssets () {
      let mq = this.$mq
      return mq === 'tablet' || mq === 'desktop' || mq === 'desktopWide'
    }
  },
  watch: {
    freeze (value) {
      if (value) {
        this.pause()
      }
    }
  },
  methods: {
    onIntersect (entries) {
      if (!this.auto) {
        return
      }
      if (this.freeze) {
        this.pause()
        return
      }
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0.2) {
          this.play()
        } else {
          this.pause()
        }
      })
    },
    play () {
      let video = this.$refs.video
      if (!video || !video.paused) {
        return
      }
      this.$refs.video.play()
    },
    pause () {
      let video = this.$refs.video
      if (!video || video.paused) {
        return
      }
      this.$refs.video.pause()
    }
  },
  mounted () {
    this.observer = new IntersectionObserver(this.onIntersect, this.options)
    this.observer.observe(this.$el)
  }
}
</script>

<style lang="scss">
.auto-video {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  video {
    position: absolute;
    left: 50%;
    height: 100%;
    transform: translateX(-50%) scale(1.05);
    transition: filter 0.5s;
  }
}
</style>
