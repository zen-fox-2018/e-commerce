<template>
    <div>
        <form @submit.prevent="addRestaurant">
            <input type="text" v-model="restaurant">
            <button type="submit">submit</button>
        </form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            restaurant: ''
        }
    },
    methods: {
        addRestaurant() {
            this.$emit('added_resto', this.restaurant)
        }
    }
}
</script>

