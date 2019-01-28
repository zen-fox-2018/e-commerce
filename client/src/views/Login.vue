  <template>
    <div class="card login-form">
      <div class="card-header">
        <h3>Fake Zappos</h3>
            <span class="glyphicon glyphicon-chevron-left"></span>
      </div>
      <div v-show="views.login" class="row card-body">
        <div class="col-6 border-right border-danger">
        <form id="loginForm" @submit.prevent="onLogin">
            <input v-model=forms.email class="mb-2 pl-3" type="text" placeholder="insert email" required>
            <br>
            <input v-model=forms.password class="mb-2 pl-3" type="password" placeholder="insert password" required>
            <hr>
          
            <input id="loginFormBtn" type="submit" value="Login" class="btn-lg btn-primary">
            <label for="checkbox" class="container mt-3">
              <input type="checkbox" v-model="forms.admin"> 
              <span style="color:blue; background-color: rgba(0,0,0,0.1)">admin</span>
              <span class="checkmark"></span>
            </label>
          </form>
        </div>
        <div class="col-6 d-flex justify-content-center align-items-center">
          <div id="googleBtn" @click="gLogin" class="g-signin2">
            
          </div>
        </div>
      </div>
      
      <div v-show="views.register" class="card-body">
        <form id="registerForm" @submit.prevent="submitRegistration">
          <input v-model=forms.name class="mb-2 pl-3" type="text" placeholder="insert full name" required>
          <br>
          <input v-model=forms.email class="mb-2 pl-3" type="text" placeholder="insert email" required>
          <br>
          <input v-model=forms.password class="mb-2 pl-3" type="password" placeholder="insert password" required>
          <br>
          <input id="regFormBtn" type="submit" value="Register" class="btn btn-warning ml-5">
          <button id="cancelRegister" class="btn btn-link" @click="views.register=false ; views.login=true">
          Cancel
          </button>
        </form>
      </div>
      <div class="card-footer">
        <div>
          <transition name="status-msg-trans">
            <p v-show="msg.register !== ''" class="statusMsg">{{msg.register}}</p>
          </transition>
          <transition>
            <p  v-show="msg.login !== ''" class="statusMsg">{{msg.login}}</p>
          </transition>
        </div>
        <div v-show="views.login">
          <span>Don't have an account?</span>
          <button id="register" class="btn btn-link " @click="clickRegister">
            Register here
          </button>
        </div>
      
      </div>
    </div>
  </template>
  <script>
    export default {
      data () {
        return {
          forms: {
            name: '',
            email: '',
            password:'',
            admin: false
          },
          views: {
            register: false,
            login: true
          },
          msg: {
            register:'',
            login:''
          }
        }
      },
      methods: {
        gLogin() {
          let self = this;
          gapi.signin2.render("googleBtn", {
            "scope": "profile email openid",
            "width": 200,
            "height": 40,
            "longtitle": true,
            "theme": "dark",
            "onsuccess": function (googleUser) {
              var accessToken = googleUser.getAuthResponse().id_token;
              axios({
                method:"POST",
                url:"http://api.zappos-clone.theodarmawan.com:3000/users/gsignin",
                data: {
                  accessToken
                }
              })
              .then(res => {
                // console.log(res)
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('cart', res.data.cart);
                self.msg.login= res.data.name + ' '+ res.data.message;
                setTimeout(() => {
                  self.$router.push('/home/store');
                  self.msg.login= '';
                }, 1500)
              })
              .catch(error => {
                // console.log(error)
                self.msg.login= 'error logging in with google.';
                setTimeout(() => {
                  self.msg.login= '';
                }, 4000)
              })     // Called when the user signs in
            },
            "onfailure": function (e) {
              self.msg.login= e.error;
                setTimeout(() => {
                  self.msg.login= '';
                }, 4000)
                console.warn("Google Sign-In failure: " + e.error);
            }
          })
        },
        onLogin() {
          let self = this;
          if(self.forms.admin == true) {
            var url ="http://api.zappos-clone.theodarmawan.com:3000/users/admin"
          } else {
            var url ="http://api.zappos-clone.theodarmawan.com:3000/users/signin"
          };
          let options = {
            method:"POST",
            url,
            data: {
              email: self.forms.email,
              password: self.forms.password
            }
          }
          axios(options)
          .then( ({data}) => {
            localStorage.setItem('token', data.token);
            if(self.forms.admin == true) {
              var path = '/admin';
              localStorage.setItem('customers', JSON.stringify(data.data));
            console.log('zzz')
            } else {
              var path = '/home/store'
              localStorage.setItem('cart', data.cart);
            };

            self.msg.login= ' Success! Redirecting...';
            setTimeout(() => {
              self.msg.login= '';
              self.$router.push(path);
            }, 1000)
          })
          .catch(error => {
            self.msg.login= 'error logging in.';
            setTimeout(() => {
              self.msg.login= '';
            }, 3000)
          })
        },
        clickRegister() {
          this.views.login = false;
          this.views.register = true;
        },
        submitRegistration() {
          let self = this;
          let options = {
            method:"POST",
            url:"http://api.zappos-clone.theodarmawan.com:3000/users/signup",
            data: {
              name: this.forms.name,
              email: this.forms.email,
              password: this.forms.password
            }
          }
          axios(options)
          .then (data => {
            console.log(data)
            localStorage.setItem('token', data.token)
            // localStorage.setItem('cart', data.user.cart)
            self.msg.register= 'Successfully registered user. Signing in...';
            setTimeout(() => {
              //emit
              self.$router.push('/home/store');
              self.msg.register= '';
            }, 1500)
          })
          .catch(err => {
            self.msg.register= 'Could not register user. Please check that fields are correctly filled in.';
            setTimeout(() => {
              self.msg.register= '';
            }, 3000)
          })
        }
      },
      mounted() {
        let self = this;
        this.gLogin();
      }
    }
  </script>
  
  <style scoped>
  p {
    font-size: 20px;
    margin-top: 10px;
    color:red;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
  }
  .login-form .card-body {
    height: 300px;
    background-image: url('../assets/Shoestring-Pattern-Vector.jpg')
  }

  </style>
   