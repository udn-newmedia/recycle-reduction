<template>
  <div class="story-transition" :style="style">
    <div class="story-transition__from-bg" :style="fromBgStyle"></div>
    <div class="story-transition__to-bg" :style="toBgStyle"></div>
  </div>
</template>

<script>
export default {
  name: 'StoryTransition',
  props: {
    backward: { type: Number, default: -1 },
    forward: { type: Number, default: -1 },
    bgColor: { type: String, default: 'rgba(0, 0, 0, 0.95)' },
    fromPhoto: { type: String, required: true },
    fromPhotoLarge: { type: String, required: true },
    toPhoto: { type: String, required: true },
    toPhotoLarge: { type: String, required: true }
  },
  data () {
    return {
      ctrl: new this.$sm.Controller()
    }
  },
  computed: {
    style () {
      let zIndex = (this.backward + this.forward) * 10 + 50
      return {
        'z-index': zIndex,
        background: this.bgColor
      }
    },
    fromBgStyle () {
      let photo = !this.useLargeAssets ? this.fromPhoto : this.fromPhotoLarge
      return {
        'background-image': `url(${photo})`
      }
    },
    toBgStyle () {
      let photo = !this.useLargeAssets ? this.toPhoto : this.toPhotoLarge
      return {
        'background-image': `url(${photo})`
      }
    },
    useLargeAssets () {
      let mq = this.$mq
      return mq === 'tablet' || mq === 'desktop' || mq === 'desktopWide'
    }
  },
  mounted () {
    // enter forward
    new this.$sm.Scene({
      triggerElement: this.$el,
      triggerHook: 0.95,
      duration: '300%'
    })
      .addTo(this.ctrl)
      .on('enter', (event) => {
        let direction = event.scrollDirection
        let storyId = this.forward
        if (direction === 'FORWARD') {
          this.$emit('transition', { direction, storyId })
        }
      })
    // enter backward
    new this.$sm.Scene({
      triggerElement: this.$el,
      triggerHook: 0.05,
      duration: '300%'
    })
      .addTo(this.ctrl)
      .on('enter', (event) => {
        let direction = event.scrollDirection
        let storyId = this.backward
        if (direction === 'REVERSE') {
          this.$emit('transition', { direction, storyId })
        }
      })
  }
}
</script>

<style lang="scss">
.story-transition {
  position: relative;
  width: 100%;
  height: 300vh;
  background: rgba(0, 0, 0, 0.95);
  overflow: hidden;

  &__from-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: no-repeat center center/cover;
    backface-visibility: hidden;
    opacity: 0.6;
    transform: scale(1.05, 4);
    filter: blur(12px);
  }

  &__to-bg {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: no-repeat center center/cover;
    backface-visibility: hidden;
    opacity: 0.4;
    transform: scale(1.05, -4);
    filter: blur(12px);
  }
}
</style>
