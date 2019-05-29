<template>
  <div class="logo-block">
    <div id="vision" class="logo" v-if="yesToBoolean(setProps('useVision'))">
      <a href="https://vision.udn.com/" target="_blank"><img width="140" src="https://udn.com/upf/newmedia/image/20180829Logo/logo_udnhope2.jpg" alt=""></a>
    </div>
    <div class="logo" @click="click">
      <a href="https://udn.com/news/index" target="_blank"><img src="@/assets/images/udn_logo_white.svg"></a>
    </div>
    <div class="logo" id="nmd" v-if="yesToBoolean(setProps('useUbrand'))">
      <a href="https://udn.com/upf/newmedia/ubrandstudio/" target="_blank"><img src="https://udn.com/upf/newmedia/image/20180829Logo/logo_u_brand_studio2.jpg"></a>
    </div>
    <div class="logo" id="nmd" v-if="!yesToBoolean(setProps('useUbrand'))">
      <img src="@/assets/images/newmedia_logo_white.svg">
    </div>
    <div class="thirdparty">
      <slot></slot>
    </div>    
  </div>
</template>

<script>
import yesToBoolean from '../mixin/yesToBoolean.js'
import setProps from '../mixin/setProps.js'
export default {
  name: 'Logo',
  mixins: [setProps, yesToBoolean],
  props: {
    jsonProps: {
      type: Object,
      default: null
    },
    useVision: {
      type: String
    },
    useUbrand: {
      type: String
    }
  },
  mounted () {
    // console.log(this.useUbrand)
  },
  methods: {
    click(){
      ga('newmedia.send', {
        hitType: 'event',
        eventCategory: 'out link title',
        eventAction: 'click',
        eventLabel: 'page2logo1',
      });
    },
  }
}
</script>

<style lang="scss" scoped>
  .logo{
    width: 140px;
    img{
      width: 100%;
      height: auto;
    }
  }
  #vision img{
    width: 100%;
  }
  .thirdparty{
    display: block;
  }
  #nmd img{
    width: 100%;
  }
  .logo-block{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: flex-start;
    align-items: flex-start;
    margin-top:2rem;
  }
  .logo{
    flex-shrink: 0;
  }  
  @media (min-width: 768px) and (max-width: 1024px){
    .logo-block{
      margin-top: 32px;
      justify-content: center;
      align-content: flex-start;
      align-items: center;
      width: 60%;
      margin: 2rem auto;     
    }
    .logo{
      margin-right: 12px;
    }
  }
  @media screen and (min-width: 1025px){
    .logo-block{
      margin-top: -24px;
      justify-content: center;
      align-content: flex-start;
      align-items: center;
      width: 60%;
      margin: 2rem auto;
    }
    .logo{
      margin-left: 12px;
    }
    .thirdparty{
      display: inline-block;
    }
  }
</style>
