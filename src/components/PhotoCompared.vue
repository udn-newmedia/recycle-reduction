<template>
  <div class="photo-compared" :class="className" @mousedown="onPointDown" @touchstart="onPointDown">
    <div class="photo-compared__frame" :style="frameStyle"></div>
    <div class="photo-compared__before" :style="beforeStyle"></div>
    <div class="photo-compared__after" :style="afterStyle"></div>
    <div class="photo-compared__handler" :style="handlerStyle"></div>
  </div>
</template>

<script>
export default {
  name: 'PhotoCompared',
  props: {
    before: String,
    after: String,
    width: { type: Number, default: 16 },
    height: { type: Number, default: 9 },
    value: { type: Number, default: 0.5 },
    vertical: { type: Boolean, default: false }
  },
  data () {
    return {
      rect: { x: 0, y: 0, width: 0, height: 0 },
      position: { x: 0, y: 0 },
      percent: { x: 0, y: 0 }
    }
  },
  computed: {
    className () {
      return {
        'photo-compared--vertical': this.vertical
      }
    },
    frameStyle () {
      let ratio = Math.round(this.height / this.width * 10000) / 100
      return {
        'padding-bottom': `${ratio}%`
      }
    },
    beforeStyle () {
      return {
        'background-image': `url(${this.before})`
      }
    },
    afterStyle () {
      let right, bottom
      if (!this.vertical) {
        right = Math.round(this.percent.x * this.rect.width)
        bottom = this.rect.height
      } else {
        right = this.rect.width
        bottom = Math.round(this.percent.y * this.rect.height)
      }
      return {
        'background-image': `url(${this.after})`,
        clip: `rect(0px, ${right}px, ${bottom}px, 0px)`
      }
    },
    handlerStyle () {
      let direction = !this.vertical ? 'x' : 'y'
      let percent = Math.round(this.percent[direction] * 10000) / 100
      let translate = !this.vertical ? 'translateX' : 'translateY'
      return {
        transform: `${translate}(${percent}%)`
      }
    }
  },
  methods: {
    onResize () {
      let el = this.$el
      this.rect = {
        x: el.offsetLeft,
        y: el.offsetTop,
        width: el.offsetWidth,
        height: el.offsetHeight
      }
    },
    onPointDown (event) {
      let point = event.type.indexOf('touch') === 0 ? event.touches[0] : event
      if (!point) {
        return
      }
      let { layerX, layerY } = point
      console.log(point.layerX, point.layerY)
      // console.log('[begin]', clientX, clientY)
      this.updatePosition(layerX, layerY)
      // mouse
      document.addEventListener('mousemove', this.onPointMove)
      document.addEventListener('mouseup', this.onPointUp)
      // touch
      document.addEventListener('touchmove', this.onPointMove)
      document.addEventListener('touchend', this.onPointUp)
      document.addEventListener('touchcancel', this.onPointUp)
    },
    onPointMove (event) {
      let point = event.type.indexOf('touch') === 0 ? event.touches[0] : event
      if (!point) {
        return
      }

      let { layerX, layerY } = point
      // console.log('[move]', clientX, clientY)
      this.updatePosition(layerX, layerY)
    },
    onPointUp (event) {
      let point = event.type.indexOf('touch') === 0 ? event.touches[0] : event
      if (!point) {
        return
      }
      let { layerX, layerY } = point
      // console.log('[end]', layerX, layerY)
      this.updatePosition(layerX, layerY)
      // mouse
      document.removeEventListener('mousemove', this.onPointMove)
      document.removeEventListener('mouseup', this.onPointUp)
      // touch
      document.removeEventListener('touchmove', this.onPointMove)
      document.removeEventListener('touchend', this.onPointUp)
      document.removeEventListener('touchcancel', this.onPointUp)
    },
    updatePosition (x = null, y = null) {
      console.log('update', x, y)
      let rect = this.rect
      if (x !== null) {
        x = x - rect.x
        if (x < 0) {
          x = 0
        } else if (x > rect.width) {
          x = rect.width
        }
        this.position.x = x
        this.percent.x = x / rect.width
      }
      if (y !== null) {
        y = y - rect.y
        if (y < 0) {
          y = 0
        } else if (y > rect.height) {
          y = rect.height
        }
        this.position.y = y
        this.percent.y = y / rect.height
      }
    },
    updatePercent (x = null, y = null) {
      let rect = this.rect
      if (x != null) {
        if (x < 0) {
          x = 0
        } else if (x > 1) {
          x = 1
        }
        this.percent.x = x
        this.position.x = x * rect.width
      }
      if (y != null) {
        if (y < 0) {
          y = 0
        } else if (y > 1) {
          y = 1
        }
        this.percent.y = y
        this.position.y = y * rect.height
      }
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResize)
  },
  mounted () {
    window.addEventListener('resize', this.onResize)
    this.onResize()
    if (!this.vertical) {
      this.updatePercent(this.value, null)
    } else {
      this.updatePercent(null, this.value)
    }
  }
}
</script>

<style lang="scss">
.photo-compared {
  position: relative;
  width: auto;
  overflow: hidden;
  user-select: none;
  cursor: move;

  &__frame {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%;
  }

  &__before,
  &__after {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: no-repeat center center/cover;
    backface-visibility: hidden;
    transform-origin: left top;
  }

  &__after {
    // transition: clip 0.2s ease-out;
  }

  &__handler {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: 0 0 0 -4px;
    border-left: 4px solid white;
    // transition: transform 0.2s ease-out;
    box-shadow: 0 4px 8px -6px black;
  }

  $comp: &;
  &--vertical {
    #{$comp}__handler {
      margin: -4px 0 0 0;
      border-left: none;
      border-top: 4px solid white;
    }
  }
}
</style>
