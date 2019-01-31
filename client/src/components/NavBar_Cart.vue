<template>
  <div class="topnav">
    <a @click= "navigateHome" href="#"><em><< back</em></a>
    <a class="anchor active">My Cart</a>
    <a class="anchor">My Purchase History</a>
  </div>
</template>
<script>
export default {
  data() {
    return{
    }
  },
  mounted() {
    let self = this;
    var anchors = document.getElementsByClassName("anchor");
    var myFunction = function() {
      event.preventDefault();
      var current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace("active", "");
      var attribute = this.setAttribute("class","active");
      self.$emit("changeView", $(event.target)[0].innerHTML);
    };
    for (var i = 0; i < anchors.length; i++) {
        anchors[i].addEventListener('click', myFunction, false);
    }
  },
  methods: {
    navigateHome() {
      this.$router.push('/home/store')
    },
    mySearch() {
      this.$emit('search', this.searchString);
    }
  }
}
</script>
<style>
* {box-sizing: border-box;}

a:hover {
 cursor: pointer;;
}
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}

.topnav {
  overflow: hidden;
  background-color: #e9e9e9;
}

.topnav a {
  float: left;
  display: block;
  color: black;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.topnav a:hover {
  background-color: #ddd;
  color: black;
}

.topnav a.active {
  background-color: #2196F3;
  color: white;
}

.topnav .search-container {
  float: center;
}

.topnav input[type=text] {
  padding: 6px;
  margin-top: 8px;
  font-size: 17px;
  border: none;
  width: 40%;
}

.topnav .search-container button {
  float: center;
  padding: 6px 10px;
  margin-top: 8px;
  margin-right: 16px;
  background: #ddd;
  font-size: 17px;
  border: none;
  cursor: pointer;
}

.topnav .search-container button:hover {
  background: #ccc;
}

@media screen and (max-width: 600px) {
  .topnav .search-container {
    float: none;
  }
  .topnav a, .topnav input[type=text], .topnav .search-container button {
    float: none;
    display: block;
    text-align: left;
    width: 100%;
    margin: 0;
    padding: 14px;
  }
  .topnav input[type=text] {
    border: 1px solid #ccc;  
  }
}
</style>

