<template>
<div>
<div v-if="login_status==false">
<notfound></notfound>
</div>
<div class="dashboard" v-if="login_status==true && user_login.role=='admin'">
  <dsnavbar :user_login='user_login' @logout="logout($event)"></dsnavbar>
    <div id="main-admin">
        <div class="row">
         <dssitebar></dssitebar>
            <div class="col-md-10">
                <div class="row">
                    <div class="col-lg-12">
                        <h1 class="page-header">Dashboard</h1>
                        <hr>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="card bg-light mb-3">
                            <div class="card-body bg-success text-center text-white">
                                <div class="row">
                                    <div class="col-xs-3 ">
                                        <i class="cui-list" style="font-size:4rem"></i>
                                    </div>
                                    <div class="col-xs-9 text-right" style="padding-left:200px">
                                    <h1>{{this.done.length}}</h1>
                                    </div>
                                </div>
                            </div>
                            <div class="card-header">Done</div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card bg-light mb-3">
                            <div class="card-body bg-danger  text-center text-white">
                                <div class="row">
                                    <div class="col-xs-3 ">
                                        <i class="cui-list" style="font-size:4rem"></i>
                                    </div>
                                    <div class="col-xs-9 text-right" style="padding-left:200px">
                                    <h1>{{this.onprocess.length}}</h1>
                                    </div>
                                </div>
                            </div>
                            <div class="card-header">On Process</div>
                        </div>
                    </div>
                </div>
                <hr>
                <h5>Transactions</h5>
                <hr>
                    <div class="row">
                    <div class="col-md-6" id="main">
                        <div class="transaction">
                        <div class="card">
                        <div class="card-header">
                            Transactions Done
                        </div>
                        <div class="card-body" v-for="data in done" :key="data._id">
                            <div class="row">
                                <div class="col-md-2">
                                    <img class="card-img-right flex-auto d-none d-md-block" data-src="holder.js/200x250?theme=thumb" alt="Thumbnail [200x250]" style="width:50px; height: 50px;" :src="data.item.img" data-holder-rendered="true">
                                </div>
                                <div class="col-md-8">
                                <div class="content_transaction">
                                    <p>Iwatch ({{data.total_item}})</p>
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
                                </div>
                                <!-- <div class="col-md-2">
                                    <button type="button" class="btn btn-success btn-sm" @click="confirm(data._id)">Confirm</button>
                                </div> -->
                            </div>
                            <hr>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div class="col-md-6" id="rightbar">
                       <div class="transaction">
                        <div class="card">
                        <div class="card-header">
                            Transactions Done
                        </div>
                        <div class="card-body" v-for="data in onprocess" :key="data._id">
                            <div class="row">
                                <div class="col-md-2">
                                    <img class="card-img-right flex-auto d-none d-md-block" data-src="holder.js/200x250?theme=thumb" alt="Thumbnail [200x250]" style="width:50px; height: 50px;" :src="data.item.img" data-holder-rendered="true">
                                </div>
                                <div class="col-md-8">
                                <div class="content_transaction">
                                    <p>Iwatch ({{data.total_item}})</p>
                                    <hr>
                                    <p>{{data.createdAt.slice(0,10)}} | total: {{(data.total_item*data.item.price)}}</p>
                                    <p>{{data.address}}</p>
                                    <p>{{data.courier}}| Estimasi {{data.etd}}</p>
                                    <p>{{data.cost}}</p>
                                </div>
                                </div>
                                <div class="col-md-2">
                                    <p>Status</p>
                                    <span style="color:#ff1a1a ;font-size:12px"><p v-if="data.status == false">Process</p></span>
                                </div>
                                <!-- <div class="col-md-2">
                                    <button type="button" class="btn btn-success btn-sm" @click="confirm(data._id)">Confirm</button>
                                </div> -->
                            </div>
                            <hr>
                        </div>
                        </div>
                    </div>
                    </div>
                    </div>
            </div>
        </div>
    </div>
    <div class="" style="padding-top:4em"></div>
</div>
</div>
</template>
<script>
import dsnavbar from '@/components/dsnavbar.vue'
import dssitebar from '@/components/dssitebar.vue'
import axios from '@/api/api.js'
import notfound from '@/components/404.vue'
export default {
  name: 'dashboard',
  components: {
    dsnavbar,
    dssitebar,
    notfound
  },
  data () {
    return {
      onprocess: [],
      done: []
    }
  },
  props: ['user_login', 'login_status'],
  methods: {
    logout () {
      this.$emit('logout')
    },
    get_transaction_onprocess () {
      let accessToken = localStorage.getItem('token')
      axios({
        method: 'GET',
        url: `/transactions/done`,
        headers: {
          token: accessToken
        }
      })
        .then(({ data }) => {
          this.done = data
        }).catch((err) => {
          console.log(err.response)
        })
    },
    get_transaction_done () {
      let accessToken = localStorage.getItem('token')
      axios({
        method: 'GET',
        url: `/transactions/onprocess`,
        headers: {
          token: accessToken
        }
      })
        .then(({ data }) => {
          this.onprocess = data
        }).catch((err) => {
          console.log(err.response)
        })
    }
  },
  created () {
    this.get_transaction_onprocess()
    this.get_transaction_done()
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
