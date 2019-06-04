<template>
  <transition name="lightbox">
    <div class="lightbox" v-if="value">
      <div class="close-btn" @click="onCloseBtnClick"></div>
      <slot></slot>
      <ShareButton />
    </div>
  </transition>
</template>

<script>
import ShareButton from '@/components/ShareButton'

export default {
  name: 'Lightbox',
  components: {
    ShareButton
  },
  props: {
    value: { type: Boolean, required: true }
  },
  data () {
    return {
      pageYOffsetBeforeScrollLocked: 0
    }
  },
  watch: {
    value: {
      handler (value) {
        this.lockScroll(value)
      },
      immediate: true
    }
  },
  methods: {
    onCloseBtnClick (event) {
      this.$emit('input', false)
    },
    lockScroll (bool = true) {
      let body = document.body
      if (!bool) {
        body.style.overflowY = ''
        body.style.top = ''
        window.scrollTo(0, this.pageYOffsetBeforeScrollLocked)
        this.pageYOffsetBeforeScrollLocked = 0
      } else {
        body.style.overflowY = 'hidden'
        body.style.top = `${-this.pageYOffsetBeforeScrollLocked}px`
        this.pageYOffsetBeforeScrollLocked = window.pageYOffset
      }
    }
  }
}
</script>

<style lang="scss">
.lightbox {
  $frame: ".lightbox";
}
</style>
