<template>
  <div class="container">
    <div class="row mr-0">
      <div class="col-4 mt-5">
        <h1>Welcome to <b>WordPost</b>, where words matter..</h1>
        <br>
        <h4>We’ll deliver the best stories and ideas on the topics you care about most straight to your homepage, app, or inbox.</h4>
      </div>
      <div class="col-8">
        <form class="form-signin text-center">
          <img src="" alt="" width="72" height="72">
          <h1 v-if="formLogin" class="login h3 mb-3 font-weight-normal">Login</h1>
          <h1 v-if="!formLogin" class="register h3 mb-3 font-weight-normal">Register for free</h1>
          <input v-if="!formLogin" v-model="name" type="text" id="inputName" class="form-control" placeholder="Name" autofocus>
          <input v-model="email" type="email" id="inputEmail" class="form-control" placeholder="Email address" autofocus>
          <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password">
          <button v-if="!formLogin" class="btn btn-lg btn-primary btn-block" @click.prevent='register'>Register</button><br>
          <button v-if="formLogin" class="btn btn-lg btn-primary btn-block" @click.prevent='login'>Login</button><br>
          <p>Continue with </p>
          <center>
            <div class="g-signin2" data-onsuccess="onSignIn"></div>
          </center>
          <br><br>
          <div v-if="!formLogin" class="register" @click.prevent="formLogin = !formLogin">
            <p>Have an Account? <button>Login here</button></p>
          </div>
          <div v-if="formLogin" class="login" @click.prevent="formLogin = !formLogin">
              <p>Don't Have an Account? <button>Register here</button></p>
            </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

