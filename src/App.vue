<template>
  <div class="app" :class="{ 'slide-menu-open': isSlideMenuTrigger }">
    <Header v-on:onSlideMenuTrigger="onClassChange" :scrolled= isScrolled></Header>

    <Foreword />

    <Story
      ref="story0"
      :id="0"
      title="減用餐盒飲料杯"
      subtitle="不只自備這條路">

      <Frame2 />
    </Story>

    <FrameReduction />

    <!-- <StoryTransition
      :backward="0"
      :forward="1"
      :from-photo="require('@/assets/images/story0/index_cover_background_video_m.jpg')"
      :from-photo-large="require('@/assets/images/story0/index_cover_background_video_pc.jpg')"
      :to-photo="require('./assets/images/story1/index_part1_background_video1_m.jpg')"
      :to-photo-large="require('./assets/images/story1/index_part1_background_video1_pc.jpg')"
      @transition="onTransition" /> -->

    <FrameInfor />
    <FbComment />
    <Footer />

  </div>
</template>

<script>
import { TweenMax, Power2, ScrollToPlugin } from 'gsap/all'
import Story from '@/components/Story'
// import StoryTransition from '@/components/StoryTransition'
import Header from '@/components/Header'

import Foreword from '@/components/Foreword'
// story0
import Frame2 from '@/components/Frame2'
import FrameReduction from '@/components/FrameReduction'

import FrameInfor from '@/components/FrameInfor'
import FbComment from '@/components/FbComment'
import Footer from '@/components/Footer'

// reference doc: https://greensock.com/docs/NPMUsage
// prevent TweenMax plugin removed by tree shaking
/* eslint-disable no-unused-vars */
const TweenPlugins = [ ScrollToPlugin ]

export default {
  name: 'App',
  components: {
    Story,
    // StoryTransition,
    Header,
    Foreword,
    Frame2,
    FrameReduction,
    FrameInfor,
    FbComment,
    Footer
  },
  data () {
    return {
      isSlideMenuTrigger: false,
      isScrolled: false
    }
  },
  methods: {
    onBeforeUnload () {
      // window.scrollTo(0, 0)
    },
    onTransition ({ direction, storyId }) {
      let target = this.$refs[`story${storyId}`].$el
      let offsetY = 0
      let ease = Power2.easeInOut
      if (direction === 'REVERSE') {
        // scroll reverse direction, align to bottom of story by offsetY
        offsetY = window.innerHeight - target.offsetHeight
      }
      TweenMax.to(window, 1, {
        scrollTo: {
          y: target,
          offsetY,
          autoKill: false
        },
        ease
      })
    },
    onClassChange () {
      this.isSlideMenuTrigger = !this.isSlideMenuTrigger
    }
  },
  beforeDestroy () {
    window.removeEventListener('beforeunload', this.onBeforeUnload)
  },
  mounted () {
    window.addEventListener('beforeunload', this.onBeforeUnload)
    window.addEventListener('scroll', (event) => {
      if (window.scrollY >= 20) {
        this.isScrolled = true
      } else {
        this.isScrolled = false
      }

      console.log(event)
    })
  }
}
</script>

<style lang="scss" src="@/assets/styles/app.scss"></style>
