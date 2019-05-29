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
      firstTouchMovedPosition: null,
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
    getPositionFromViewport (el) {
      let pos = { x: el.offsetLeft, y: el.offsetTop }
      let parent = el.offsetParent
      while (parent) {
        pos.x += parent.offsetLeft
        pos.y += parent.offsetTop
        parent = parent.offsetParent
      }
      pos.x -= window.pageXOffset
      pos.y -= window.pageYOffset
      return { ...pos }
    },
    onResize () {
      let el = this.$el
      let origin = this.getPositionFromViewport(el)
      this.rect = {
        x: origin.x,
        y: origin.y,
        width: el.offsetWidth,
        height: el.offsetHeight
      }
    },
    onPointDown (event) {
      let isTouch = event.type.indexOf('touch') === 0
      let point = isTouch ? event.touches[0] : event
      if (!point) {
        return
      }
      let { clientX, clientY } = point
      // console.log('[begin]', clientX, clientY)
      this.updatePosition(clientX, clientY)
      if (!isTouch) {
        // mouse
        window.addEventListener('mousemove', this.onPointMove)
        window.addEventListener('mouseup', this.onPointUp)
      } else {
        // touch
        window.addEventListener('touchmove', this.onPointMove, { passive: false })
        window.addEventListener('touchend', this.onPointUp)
        window.addEventListener('touchcancel', this.onPointUp)
      }
    },
    onPointMove (event) {
      event.preventDefault()
      let isTouch = event.type.indexOf('touch') === 0
      let point = isTouch ? event.touches[0] : event
      if (!point) {
        return
      }
      let { clientX, clientY } = point
      // console.log('[move]', clientX, clientY)
      this.updatePosition(clientX, clientY)
    },
    onPointUp (event) {
      let isTouch = event.type.indexOf('touch') === 0
      let point = isTouch ? event.touches[0] : event
      if (!isTouch) {
        // mouse
        window.removeEventListener('mousemove', this.onPointMove)
        window.removeEventListener('mouseup', this.onPointUp)
      } else {
        // touch
        window.removeEventListener('touchmove', this.onPointMove)
        window.removeEventListener('touchend', this.onPointUp)
        window.removeEventListener('touchcancel', this.onPointUp)
      }
      if (!point) {
        return
      }
      let { clientX, clientY } = point
      // console.log('[end]', clientX, clientY)
      this.updatePosition(clientX, clientY)
    },
    updatePosition (x = null, y = null) {
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
    margin: 0 0 0 -2px;
    border-left: 4px solid white;
    // transition: transform 0.2s ease-out;
    box-shadow: 0 4px 8px -6px black;
  }
  $comp: &;
  &--vertical {
    #{$comp}__handler {
      margin: -2px 0 0 0;
      border-left: none;
      border-top: 4px solid white;
    }
  }
}
</style>
