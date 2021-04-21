<template>
    <form class="review-form" @submit.prevent="onSubmit">
        <h3>Leave a review</h3>
        <label for="name">Name:</label>
        <input id="name" v-model="name">
        <label for="review">Review:</label>
        <textarea id="review" v-model="review"></textarea>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
        </select>
        <label for="recommend">Would you recommend this product?</label>
        <select id="recommend" v-model="recommend">
            <option>Yes</option>
            <option>No</option>
        </select>
        <input class="button" type="submit" value="Submit">
    </form>
</template>

<script lang="ts">
    import { ref, defineComponent } from 'vue'

    export default defineComponent({
        data() {
            return {
                name: '',
                review: '',
                rating: null,
                recommend: null
            }
        },
        props: {},
        methods: {
            onSubmit() {
                if (this.name === '' || this.review === '' || this.rating === null || this.recommend === null) {
                    alert('Review is incomplete. Please fill out every field.');
                    return;
                }
                const productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommend: this.recommend
                };
                this.$emit('review-submitted', productReview);

                this.name = '';
                this.review = '';
                this.rating = null;
                this.recommend = null;
            }
        },
        computed: {}
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

    h1 {
        font-size: 50px;
    }

    h3 {
        font-size: 25px;
    }

    input {
        width: 100%;
        height: 40px;
        margin-bottom: 20px;
    }

    label {
        font-size: 20px;
        margin-bottom: 5px;
    }

    p {
        font-size: 22px;
    }

    .review-form {
        display: flex;
        flex-direction: column;
        width: 425px;
        padding: 20px;
        margin: 40px;
        border: 2px solid #d8d8d8;
        background-color: white;
        -webkit-box-shadow: 0px 2px 15px -12px rgba(0, 0, 0, 0.57);
        -moz-box-shadow: 0px 2px 15px -12px rgba(0, 0, 0, 0.57);
        box-shadow: 2px 15px -12px rgba(0, 0, 0, 0.57);
    }

    .review-container {
        width: 425px;
        padding: 20px;
        background-color: white;
        -webkit-box-shadow: 0px 2px 20px -12px rgba(0, 0, 0, 0.57);
        -moz-box-shadow: 0px 2px 20px -12px rgba(0, 0, 0, 0.57);
        box-shadow: 2px 20px -12px rgba(0, 0, 0, 0.57);
        margin-left: 40px;
        border: 2px solid #d8d8d8;
    }

    .review-container li {
        margin-bottom: 30px;
    }

    .review-form .button {
        display: block;
        margin: 30px auto;
    }

    select {
        height: 40px;
        font-size: 20px;
        background-color: white;
        cursor: pointer;
    }

    textarea {
        width: 95%;
        height: 70px;
        padding: 10px;
        font-size: 20px;
        margin-bottom: 20px;
    }
</style>

