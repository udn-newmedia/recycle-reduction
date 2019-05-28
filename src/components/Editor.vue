<template>
  <div id="editor">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Editor'
}
</script>

<style lang='scss' scoped>
  #editor{
    font-size: 15px;
    color: gray;
    @media screen and (min-width: 768px){
      width: 60%;
      margin: 0 auto;
    }
  }
</style>
