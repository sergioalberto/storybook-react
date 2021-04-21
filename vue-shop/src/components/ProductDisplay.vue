<template>
    <div class="product-display">
        <div class="product-container">
            <div class="product-image">
                <img v-bind:src="image"/>
            </div>
            <div class="product-info">
                <h1>{{ title }}</h1>
                <p v-if="stock > 10">In Stock</p>
                <p v-else-if="stock <= 10 && stock > 0">Almost sold out!</p>
                <p v-else>Out of Stock</p>
                <p>Shipping: {{ shipping }}</p>
                <ul>
                    <li v-for="detail in details"> - {{detail}}</li>
                </ul>
                <div
                        v-for="(variant, index) in variants"
                        :key="variant.id"
                        class="color-circle"
                        @mouseover="updateVariant(index)"
                        :style="{backgroundColor: variant.color}"
                ></div>
                <button class="button" v-on:click="addToCart" :disabled="stock <= 0" :class="{disabledButton: stock <= 0}">Add to Cart</button>
            </div>
        </div>
        <ReviewList v-if="reviews.length" :reviews="reviews"/>
        <ReviewForm @review-submitted="addReview"/>
    </div>
</template>

<script lang="ts">
    import { ref, defineComponent } from 'vue'
    import ReviewForm from './ReviewForm.vue';
    import ReviewList from './ReviewList.vue';

    export default defineComponent({
        components: {
            ReviewForm: ReviewForm,
            ReviewList: ReviewList
        },
        data() {
            return {
                product: 'Socks',
                brand: 'Vue Mastery',
                selectedVariant: 0,
                details: ['50% cotton', '30% wool', '20% polyester'],
                variants: [
                    { id: 2234, color: 'green', image: './src/assets/socks_green.jpg', quantity: 20 },
                    { id: 2235, color: 'blue', image: './src/assets/socks_blue.jpg', quantity: 2 }
                ],
                reviews: [] as any,
            }
        },
        props: {
            premium: {
                type: Boolean,
                required: true
            },
        },
        methods: {
            addToCart() {
                this.$emit('add-to-cart', this.variants[this.selectedVariant].id);
                this.variants[this.selectedVariant].quantity -= 1;
            },
            updateVariant(index: any){
                this.selectedVariant = index;
            },
            addReview(review: any) {
                this.reviews.push(review);
            }
        },
        computed: {
            title(): string {
                return this.brand + ' ' + this.product;
            },
            image(): string {
                return this.variants[this.selectedVariant].image;
            },
            stock(): number {
                return this.variants[this.selectedVariant].quantity;
            },
            shipping(): any {
                if (this.premium) {
                    return 'Free';
                }
                return 2.9;
            }
        }
    })
</script>

<style scoped>

    .button {
        margin: 30px;
        background-color: #39495c;
        border-radius: 5px;
        font-size: 18px;
        width: 160px;
        height: 60px;
        color: white;
        padding: 20px;
        box-shadow: inset 0 -0.6em 1em -0.35em rgba(0, 0, 0, 0.17),
        inset 0 0.6em 2em -0.3em rgba(255, 255, 255, 0.15),
        inset 0 0 0em 0.05em rgba(255, 255, 255, 0.12);
        text-align: center;
        cursor: pointer;
    }

    .color-circle {
        width: 50px;
        height: 50px;
        margin-top: 8px;
        border: 2px solid #d8d8d8;
        border-radius: 50%;
    }

    .disabledButton {
        background-color: #d8d8d8;
        cursor: not-allowed;
    }

    h1 {
        font-size: 50px;
    }

    h3 {
        font-size: 25px;
    }

    img {
        border: 2px solid #d8d8d8;
        width: 70%;
        margin: 40px;
        padding: 15px;
        -webkit-box-shadow: 0px 2px 15px -12px rgba(0, 0, 0, 0.57);
        -moz-box-shadow: 0px 2px 15px -12px rgba(0, 0, 0, 0.57);
        box-shadow: 2px 15px -12px rgba(0, 0, 0, 0.57);
    }

    label {
        font-size: 20px;
        margin-bottom: 5px;
    }

    li {
        font-size: 18px;
    }

    p {
        font-size: 22px;
    }

    .product-display {
        display: flex;
        flex-direction: column;
        padding: 1rem;
    }

    .product-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    .product-image,
    .product-info {
        width: 50%;
    }

    ul {
        list-style-type: none;
    }
</style>

