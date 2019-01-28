<template>
  <div>
   <Search @category = "filterByCat" @search = "filterBySearch"></Search>
  <ItemCard  :items = items.showing></ItemCard>
  </div>
</template>
<script>
import Search from '@/components/Search.vue'
import ItemCard from '@/components/ItemCard.vue'
export default {
  name: 'store',
  data() {
    return {
      items: {
        all : [],
        showing: []
      }
    }
  },
  components: {
    Search,
    ItemCard
  },  
  mounted: function() {
    let self = this;
    axios({
      method:'GET',
      url:'http://localhost:3000/items/all'
    })
    .then(({data:{items}}) => {
      items.forEach(item => self.items.all.push(item));
      items.forEach(item => self.items.showing.push(item));
    });
  },
  methods: {
    filterByCat (cat) {
      if(cat == 'Home') {
        this.items.showing = this.items.all;
      } else {
        let arr = this.items.all.filter(item => {
         return item.category.toLowerCase() == cat.toLowerCase();
        });
        this.items.showing = arr;
      }
    },
    filterBySearch (string) {
      let s = string.trim().toLowerCase();
      let arr = this.items.all.filter(item => {
        let fields = ['name','brand'];
        for(let i=0; i<fields.length; i++) {
          if(item[fields[i]].toLowerCase().includes(s)) return true;
        }
      });
      this.items.showing = arr;
    }
  }
}
</script>
<style scoped>

</style>
