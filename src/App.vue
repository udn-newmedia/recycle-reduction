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

    <!-- <FrameInfor /> -->
    <content-container style="background:#30343f;color:#e4e4e4;">
      <hr>
      <br>
      <br>
      <br>
      <br>
      <share></share>
      <br>
      <br>
      <br>
      <editor style="color:#e4e4e4;">
        <div>採訪團隊：鄭朝陽、郭政芬、張裕珍、林敬家、張雅婷、陳斯穎、許政榆、賴香珊、范榮達、魏翊庭</div>
        <div>製作人：洪欣慈</div>
        <div>影像：黃仲裕、郭政芬、賴香珊、報系資料照</div>
        <div>視覺設計：張心慈</div>
        <div>網頁製作：曾雅珮、謝化挺</div>
        <div>監製：林秀姿、潘如瑩、董谷音</div>
        <div>2019.06.05</div>
      </editor>
      <br>
      <logo use-ubrand="no" use-vision='no'></logo>
      <br>
      <br>
      <question href="https://www.surveycake.com/s/KpQKN" text="填寫閱讀體驗問卷"></question>
      <br>
      <br>
      <br>
      <relate 
        text1="「#減塑時尚」 了解一下　6樣可愛環保小物分享" href1="https://style.udn.com/style/story/8066/3664395" :img1="require('@/assets/images/reduction_read1.jpg')"
        text2="打造無塑低碳島 小琉球飲水地圖服務上線" href2="https://udn.com/news/story/7328/3457766" :img2="require('@/assets/images/reduction_read2.jpg')"
        text3="12不塑心法 環保免當苦行僧" href3="https://vision.udn.com/vision/story/12840/3731989" :img3="require('@/assets/images/reduction_read3.jpg')"
        text4="徒步環島57天...垃圾海灘淌黑水 看見你我的自私" href4="https://vision.udn.com/vision/story/12840/3769323" :img4="require('@/assets/images/reduction_read4.jpg')">
      </relate>
    </content-container>
    <content-container>
      <FbComment />
    </content-container>
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

import ContentContainer from './components/Content.vue'
import Editor from './components/Editor.vue'
import Logo from './components/Logo.vue'
import Relate from './components/Relate.vue'
import Share from './components/Share.vue'
import Question from './components/Question.vue'

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
    Footer,
    ContentContainer,
    Editor,
    Logo,
    Relate,
    Share,
    Question,
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
