<template>
    <div>
        ini restaurants
        <hr>
        <ul>
            <li v-for="(resto, i) in listResto" :key="i">
                <router-link :to="{ name: 'restaurantDetails', params: { name: resto }}">{{ resto }}</router-link>
            </li>
        </ul>
        <hr>
        <AddRestaurant @added_resto="push_resto"/>
        <hr>
        <router-view></router-view>
    </div>
</template>

<script>
import AddRestaurant from '@/components/AddRestaurant.vue'
import RestoDetail from '@/components/RestoDetail.vue'

export default {
    name: 'restaurants',
    components: {
        AddRestaurant,
        RestoDetail
    },
    data() {
        return {
            listResto: ['aaa', 'bbb', 'ccc']
        }
    },
    methods: {
        push_resto(name) {
            this.listResto.push(name)
        }
    }
}
</script>

