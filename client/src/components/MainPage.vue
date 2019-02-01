<template>
  <div>
    <div class="container">
      <div class="row">
        <br>
        <div class="card-columns">
          <div v-for="(game, index) in games" :key="`article-${index}`" @click="itemDetail(game)" class="card card-pin">
            <img class="card-img" :src="game.image" alt="Card image">
            <div class="overlay">
              <h3 class="card-title title">{{ game.name }}</h3>           
              <div class="more">
                <a href="#!">
                <!-- <i @click="addToCart(game)" class="fas fa-shopping-cart"></i> -->
                </a>
              </div>                
            </div>
          </div>   
        </div>
      </div>
	  </div>
  </div>
</template>

<script>
export default {
  name: 'MainPage',
  data() {
    return {
      server: 'http://localhost:3000',
      games: [],
    }
  },
  methods: {
    getAllGames() {
      axios({
        method: 'get',
        url: `${this.server}/items`,
      })
        .then(({ data }) => {
          console.log(data);
          this.games = data
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addToCart(item) {
      axios({
        method: 'post',
        url: `${this.server}/carts`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          itemId: item._id
        }
      })
      .then(({ data }) => {
        this.$emit('item_from_mainpage', item)
        console.log(item, 'masuk data item dari main page vue trus nge emit')
      })
      .catch((err) => {
        console.log(err);
        swal('Oops', 'Have to Signed in First', 'error');
      })
    },
    itemDetail(item) {
      this.$router.push(`/detail/${item.name}`) 
      this.$emit('detail_item', item)
    }
  },
  created() {
    this.getAllGames();
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.container {
  width: 98%;
}
.logo {
  border-radius: 50%;
}
.text-muted a {
  color: #989898;
}
.text-muted a:hover {
  color: grey;
}
.fa a:active, a:hover, a:visited {
  text-decoration: none;
}
/* Tool Colors */
.general {
  background-color: #0095af;
}
.general .card-title {
  color: #f3f3f3;
}
.general .card-text {
  color: #f3f3f3;
}
.card-img {
  display: block;
  width: 100%;
  height: auto;
}
.overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: .2s ease;
  background-color: #008CBA;
}
.card-pin:hover .overlay {
  opacity: .5;
  transition: ease .5s;
  background-color: #000000;
  cursor: pointer;
}
.more {
  color: white;
  font-size: 20px;
  position: absolute;
  bottom: 0;
  right: 0;
  text-transform: uppercase;
  transform: translate(-20%, -20%);
  -ms-transform: translate(-50%, -50%);
}
.download {
  color: white;
  font-size: 20px;
  position: absolute;
  bottom: 0;
  left: 0;
  margin-left: 20px;
  text-transform: uppercase;
  transform: translate(-20%, -20%);
  -ms-transform: translate(-50%, -50%);
}
.card-pin:hover .card-title {
  color: #ffffff;
  margin-top: 10px;
  text-align: center;
  font-size: 1.2em;
}
.card-pin:hover .more a {
  text-decoration: none;
  color: #ffffff;
}
.card-pin:hover .download a {
  text-decoration: none;
  color: #ffffff;
}
.social {
position: relative;
transform: translateY(-50%);
}
.social .fa {
margin: 0 3px;
}
</style>
