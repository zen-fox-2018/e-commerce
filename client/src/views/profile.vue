<template>
    <div class="container " style="margin-top: 5rem">
        <div class="row">
        <div class="col-md-2">
            <div class="card" style="width: 12rem">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpdX6tPX96Zk00S47LcCYAdoFK8INeCElPeJrVDrh8phAGqUZP_g" class="card-img-top">
            <div class="card-body">
              <div class="profile">
               <a class= "fas fa-clipboard-list"> Transactions</a>
                <hr>
                 <a class="fa fa-credit-card fa-2">  Wallet</a>
                 <hr>
              <span class="cui-dollar mr-4">  Point</span>
              </div>
            </div>
            </div>
        </div>
        <div class="col-md-8">
            <div class="transaction">
            <div class="card" style="margin-left:20px">
            <div class="card-header">
                Transactions
            </div>
            <div class="card-body" v-for="data in transactions" :key="data._id">
                <div class="row">
                    <div class="col-md-2">
                        <img class="card-img-right flex-auto d-none d-md-block" data-src="holder.js/200x250?theme=thumb" alt="Thumbnail [200x250]" style="width:50px; height: 50px;" :src="data.item.img" data-holder-rendered="true">
                    </div>
                    <div class="col-md-6">
                      <div class="content_transaction">
                        <p>{{data.item.title}}({{data.total_item}})</p>
                        <hr>
                        <p>{{data.createdAt.slice(0,10)}} | total: {{(data.total_item*data.item.price)}}</p>
                        <p>{{data.address}}</p>
                        <p>{{data.courier}}| Estimasi {{data.etd}}</p>
                        <p>{{data.cost}}</p>
                    </div>
                    </div>
                    <div class="col-md-2">
                        <p>Status</p>
                       <span style="color:#00b33c"> <p v-if="data.status == true">Done</p></span>
                        <span style="color:#ff1a1a"><p v-if="data.status == false">On Process</p></span>
                    </div>
                    <div class="col-md-2">
                        <button type="button" class="btn btn-success btn-sm" @click="confirm(data._id)">Confirm</button>
                    </div>
                </div>
                <hr>
            </div>
            </div>
          </div>
        </div>
        </div>
    </div>
</template>
<script>
import axios from '@/api/api.js'
export default {
  name: 'profile',
  data: function () {
    return {
      transactions: []
    }
  },
  props: ['user'],
  methods: {
    get_transaction () {
      let accessToken = localStorage.getItem('token')
      axios({
        method: 'GET',
        url: `/transactions`,
        headers: {
          token: accessToken
        }
      })
        .then(({ data }) => {
          this.transactions = data
        }).catch((err) => {
          console.log(err.response)
        })
    },
    confirm (id) {
      let accessToken = localStorage.getItem('token')
      axios({
        method: 'PUT',
        url: `/transactions/${id}`,
        headers: {
          token: accessToken
        }
      })
        .then(({ data }) => {
          this.get_transaction()
        }).catch((err) => {
          console.log(err.response)
        })
    }
  },
  created () {
    this.get_transaction()
  }
}
</script>
<style>
.content_transaction{
  font-size: 10px;
  line-height: 0.5;
}
.profile{
  font-family: 'Lato', sans-serif;
  font-size: 14px;
  line-height: 0.5;
}
</style>
