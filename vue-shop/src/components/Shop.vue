<template>
  <div id="app">
    <div class="nav-bar"></div>
    <div class="cart">Cart ({{ cart.length }})</div>
    <ProductDisplay :premium="premium" @add-to-cart="updateCart"/>
  </div>
</template>

<script lang="ts">
  import { ref, defineComponent } from 'vue'
  import ProductDisplay from './ProductDisplay.vue'

  export default defineComponent({
    components: {
      ProductDisplay: ProductDisplay
    },
    data() {
      return {
        cart: [] as any,
        premium: true
      }
    },
    methods: {
      updateCart(id: any) {
        this.cart.push(id);
      }
    }
  })
</script>

<style scoped>

  .cart {
    margin: 25px 100px;
    float: right;
    border: 1px solid #d8d8d8;
    padding: 10px 30px;
    background-color: white;
    -webkit-box-shadow: 0px 2px 15px -12px rgba(0, 0, 0, 0.57);
    -moz-box-shadow: 0px 2px 15px -12px rgba(0, 0, 0, 0.57);
    box-shadow: 2px 15px -12px rgba(0, 0, 0, 0.57);
  }

  h1 {
    font-size: 50px;
  }

  .nav-bar {
    background: linear-gradient(-90deg, #84cf6a, #16c0b0);
    height: 60px;
    margin-bottom: 25px;
    -webkit-box-shadow: 0px 2px 15px -12px rgba(0, 0, 0, 0.57);
    -moz-box-shadow: 0px 2px 15px -12px rgba(0, 0, 0, 0.57);
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.57);
  }

  p {
    font-size: 22px;
  }

</style>
