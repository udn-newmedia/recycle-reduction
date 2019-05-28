<template>
  <section :id="'story' + id" class="story" :style="storyStyle">
    <div class="story__trigger-unblur"
      ref="triggerUnblur" />

    <div class="story__trigger-sticky"
      ref="triggerSticky" />

    <div class="story__trigger-topic"
      ref="triggerTopic" />

    <div class="story__bg" ref="bg">
      <div class="story__bg-wrapper">
        <div class="story__bg-photo"></div>
      </div>
    </div>

    <div class="story__topic"
      ref="topic"><!--
    --><template v-if="endingTitle"><!--
      --><h2 class="ending-title">{{ endingTitle }}</h2>
      </template>
      <template v-else-if="!subtitle"><!--
      --><h2 class="title">{{ title }}</h2>
      </template>
      <template v-else><!--
      --><h2 class="subtitle">{{ subtitle }}</h2><!--
      --><h1 class="title">{{ title }}</h1>
      </template>
    </div>

    <slot />
  </section>
</template>

<script>
import { TimelineMax } from 'gsap'

const BLUR_DEFAULT = 8

export default {
  name: 'Story',
  props: {
    id: Number,
    title: String,
    subtitle: String,
    endingTitle: String,
    photo: String,
    photoLarge: String,
    video: String,
    videoLarge: String
  },
  data () {
    return {
      ctrl: new this.$sm.Controller(),
      bgBlur: BLUR_DEFAULT
    }
  },
  computed: {
    storyStyle () {
      let layer = this.id * 10
      return {
        'z-index': layer
      }
    },
    bgWrapperStyle () {
      return {
        '-webkit-filter': `blur(${this.bgBlur}px)`,
        'filter': `blur(${this.bgBlur}px)`
      }
    },
    bgPhotoStyle () {
      let photo = !this.useLargeAssets ? this.photo : this.photoLarge
      return {
        'background-image': `url(${photo})`
      }
    },
    bgVideoStyle () {
      return {}
    },
    videoSource () {
      return !this.useLargeAssets ? this.video : this.videoLarge
    },
    useLargeAssets () {
      let mq = this.$mq
      return mq === 'tablet' || mq === 'desktop' || mq === 'desktopWide'
    }
  },
  methods: {

  },
  mounted () {
    // bg blur
    new this.$sm.Scene({
      triggerElement: this.$refs.triggerUnblur,
      duration: '50%'
    })
      .addTo(this.ctrl)
      .on('progress', (event) => {
        let progress = event.progress.toFixed(2)
        this.bgBlur = Math.floor((1 - progress) * BLUR_DEFAULT)
      })
      // .addIndicators({ name: 'bg-blur' })

    // sticky
    new this.$sm.Scene({
      triggerElement: this.$refs.triggerSticky,
      duration: 0
    })
      .addTo(this.ctrl)
      .setPin(this.$refs.bg)
      // .addIndicators({ name: 'bg-sticky' })

    // topic
    let topicTween = new TimelineMax()
      .to(this.$refs.topic, 2, {
        opacity: 0,
        delay: 2
      })
    new this.$sm.Scene({
      triggerElement: this.$refs.triggerTopic,
      duration: '100%'
    })
      .addTo(this.ctrl)
      .setTween(topicTween)
      .setPin(this.$refs.topic)
      // .addIndicators({ name: 'topic' })
  }
}
</script>

<style lang="scss">
.story {
  position: relative;
  width: 100%;
  min-height: 100vh;
  // color: white;
  overflow-x: hidden;

  &__trigger-unblur {
    position: absolute;
    top: 150vh;
  }

  &__trigger-sticky {
    position: absolute;
    top: 50vh;
  }

  &__trigger-topic {
    position: absolute;
    top: 50vh;
  }

  &__bg {
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &__bg-wrapper {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    transform: scale(1.1);
    @include use-filter-blur(8);
  }

  &__bg-photo {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeat center center/cover;
  }

  &__bg-video {
    position: absolute;
    top: 0;
    left: 50%;
    height: 100%;
    transform: translateX(-50%);
  }

  &__topic {
    position: relative;
    height: 100vh;
    text-align: center;
    @include use-vertical-align();

    &::after {
      content: "滑動繼續";
      z-index: 960;
      position: absolute;
      left: 0;
      right: 0;
      margin: 0 auto;
      bottom: 60px;
      display: inline-block;
      width: 60px;
      height: 46px;
      padding-top: 23px;
      color: #ECEBE4;
      font-size: 0.9375rem;
      background: url('../assets/images/index_chevron-down-solid.svg') no-repeat center top;
    }

    // @include rwd($RWD_TABLET) {
    //   &::after {
    //     margin-bottom: 5%;
    //   }
    // }

    h1.title {
      display: inline-block;
      vertical-align: middle;
      writing-mode: vertical-rl;
      margin-top: -10px;
      margin-right: 22px;
      color: #FFFFFF;
      font-size: 2rem;
      text-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
      opacity: 0.8;

      @include rwd($RWD_DESKTOP_WIDE) {
        font-size: 3.75rem;
      }
    }

    .subtitle {
      display: inline-block;
      vertical-align: middle;
      writing-mode: vertical-rl;
      font-size: 2rem;
      line-height: 2rem;
      padding: 190px 13px 0 0;
      color: #FFFFFF;
      text-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
      opacity: 0.8;

      @include rwd($RWD_DESKTOP_WIDE) {
        font-size: 3.75rem;
      }
    }

    .subtitle {
      white-space: nowrap;

      @include rwd($RWD_DESKTOP_WIDE) {
        &::after {
          width: 54px;
          padding-top: 20px;
        }
      }
    }
  }
}
</style>
