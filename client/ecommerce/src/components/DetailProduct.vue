<template>
    <div>
        <h5>{{details.name}}</h5>
        <h5>{{details.category}}</h5>
        <h5>{{details.description}}</h5>
        <h5>Rp. {{details.price}}</h5>
    </div>
</template>

<script>
export default {
    data() {
        return {
            details: {}
        }
    },
    methods: {
        findProduct() {
            axios({
                url: `http://localhost:3000/products/${this.$route.params.id}`,
                method: 'get',
            })
                .then((result) => {
                    this.details = result.data
                    console.log(this.details, '===== IKI DETAILS')   
                }).catch((err) => {
                    console.log(err)
                });
        }
    },
    watch: {
        $route (to, from) {
            this.findProduct()
        }
    },
    created() {
        this.findProduct()
    },

}
</script>

<style>

</style>
