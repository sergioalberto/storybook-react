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
