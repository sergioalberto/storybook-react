<template>
  <Shop/>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import Shop from './components/Shop.vue'

  export default defineComponent({
    name: 'App',
    components: {
      Shop: Shop
    }
  })
</script>

<style>
  body {
    background-color: #f2f2f2;
    margin: 0px;
    font-family: tahoma;
    color: #282828;
  }
</style>
