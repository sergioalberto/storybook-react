import ReviewList from './../components/ReviewList.vue';

export default {
    title: 'Example/ReviewList',
    component: ReviewList,
    argTypes: {
        reviews: []
    },
};

const Template = (args: any) => ({
    // Components used in your story `template` are defined in the `components` object
    components: { ReviewList },
    // The story's `args` need to be mapped into the template through the `setup()` method
    setup() {
        return { args };
    },
    // And then the `args` are bound to your component with `v-bind="args"`
    template: '<ReviewList v-bind="args" />',
});

export const OneReview = Template.bind({});
OneReview.args = {
    reviews: [{
        name: 'Sergio',
        review: 'I like',
        rating: 5,
        recommend: 'Yes'
    }]
};
