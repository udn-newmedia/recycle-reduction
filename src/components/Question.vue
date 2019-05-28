<template>
  <a target="_blank" :href="setProps('href')">
    <div class="question-button">{{setProps('text')}}</div>
  </a>
</template>

<script>
import setProps from '../mixin/setProps.js'
export default {
  name: 'Question',
  mixins: [setProps],
  props: {
    href: {
      type: String
    },
    jsonProps: {
      type: Object,
      default: null
    },
    text: {
      type: String,
      default: '請填寫閱讀體驗問卷'
    }
  }
}
</script>

<style scoped>
  a{
    text-decoration: none;
  }
  a:hover{
    text-decoration: none;
  }
  .question-button{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 212px;
    margin: 0 auto;
    height: 63px;
    border: 1px solid #e4e4e4;
    border-radius: 35px;
    background-color: #30343f;
    /* box-shadow: 0 0 5.6px 0.4px rgba(53, 53, 53, 0.3); */
    text-align: center;
    color: #e4e4e4;
    letter-spacing: -0.4px;
    font-size: 18px;
    /* line-height: 70px; */
  }
  @media screen and (min-width: 1024px){
    .question-button{
      max-width: 250px;
      height: 70px;
      margin: 0 auto;
      border-radius: 50px;
    }
  }
</style>
