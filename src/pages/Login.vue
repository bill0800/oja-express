<template>
    <div class="container d-flex justify-content-center" style="height: 100vh">
        <div class="card m-auto col-md-6" style="height: fit-content; border: 0">
            <div class="text-center">
                <h1 class="logo-title">OjaExpress</h1>
                <h5>Merchant account</h5>
            </div>
            <div class="alert alert-danger fade show"
                :class="{gone: errorMsg === null}" role="alert">
                {{errorMsg}}
            </div>
            <form @submit.prevent="submit" @keydown="clearErrors($event.target.name)">
                <div class="form-group">
                    <input id="email" class="form-control" :class="{'has-error': fieldHasError('email')}" type="email" name="email" v-model="email" placeholder="Username" />
                    <span class="text-danger" :class="{hidden: !fieldHasError('email')}">
                        {{fieldError('email')}}
                    </span>
                </div>

                <div class="form-group">
                    <input id="password" class="form-control" type="password" name="password" v-model="password" placeholder="Password" autocomplete/>
                    <span class="text-danger" :class="{hidden: !fieldHasError('password')}">
                        {{ fieldError('password')}}
                    </span>
                </div>

                <div class="form-group">
                    <div class="col-md-6" id="loginMbl">
                        <div class="form-group">
                            <button type="submit" class="btn btn-lg w-100 login" :class="{disabled: anyError}">Sign In</button>
                        </div>
                    </div>
                    <div class="col-md-6" id="pwdMbl">
                        <div class="form-group">
                            <button type="submit" class="btn btn-lg w-100 forgot">Forgot Password?</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
  import { mapMutations, createNamespacedHelpers } from 'vuex'
  import * as mutationTypes from '../store/mutation-types'
  import * as getterTypes from '../store/getter-types'
  import {LOGIN} from '../store/action-types'

  const authMaps = createNamespacedHelpers('auth')

  export default {
    name: 'login',
    data () {
      return {
        email: null,
        password: null
      }
    },
    computed: {
      ...authMaps.mapGetters({
        fieldHasError: getterTypes.HAS_ERROR_IN_FIELD,
        anyError: getterTypes.ANY_ERRORS,
        fieldError: getterTypes.GET_ERROR_BY_FIELD,
        errorMsg: getterTypes.GET_ERROR_MSG
      })
    },
    methods: {
      ...authMaps.mapActions([LOGIN]),
      ...authMaps.mapMutations({
        clearErrors: mutationTypes.CLEAR_ERRORS,
        recordErrors: mutationTypes.RECORD_ERRORS,
        saveAuthData: mutationTypes.SAVE_AUTH_DATA,
        saveAuthErrors: mutationTypes.RECORD_ERRORS,
        cacheAuthData: mutationTypes.CACHE_AUTH_DATA
      }),
      ...mapMutations({
        startLoader: mutationTypes.START_LOADER,
        stopLoader: mutationTypes.STOP_LOADER
      }),
      saveData ({data}) {
        this.stopLoader({name: 'login'})
        this.saveAuthData(data)
        this.cacheAuthData()
        this.goHome()
      },
      saveErrors ({response}) {
        this.stopLoader({name: 'login'})
        this.saveAuthErrors(response.data)
      },
      goHome () {
        this.$router.replace({name: 'home'})
      },
      submit () {
        if (this.anyError) {
          return
        }
        this.startLoader({name: 'login'})
        this.login({email: this.email, password: this.password}).then(
          this.saveData.bind(this),
          this.saveErrors.bind(this)
        )
      }
    }
  }
</script>

<style type="text/css" scoped>
    .logo-title {
        color: #F05C28;
        font-weight: bolder;
        text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
    }
    #email, #password {
        border: 1px solid #957a68;
        border-radius: 0;
    }
    #email:-ms-input-placeholder, #password:-ms-input-placeholder {/* Internet Explorer 10-11 */
        font-size: 16px;
        padding-left: 20px;
        font-family: "Times New Roman", Times, serif;
    }
    #email::-ms-input-placeholder, #password::-ms-input-placeholder {/* Microsoft Edge */
        font-size: 16px;
        padding-left: 20px;
        font-family: "Times New Roman", Times, serif;
    }
    #email::-ms-input-placeholder, #password::-ms-input-placeholder {
        font-size: 16px;
        padding-left: 20px;
        font-family: "Times New Roman", Times, serif;
    }
    #email::placeholder, #password::placeholder {/* Chrome, Firefox, Opera, Safari 10.1+ */
        font-size: 16px;
        padding-left: 20px;
        font-family: "Times New Roman", Times, serif;
    }
    #loginMbl {
        padding-left: 0px;
        float: left;
    }
    #pwdMbl {
         padding-right: 0px;
         float: left;
    }
    .login, .forgot {
        border: 1px solid #957a68!important;
        font-family: "Times New Roman", Times, serif; 
    }
    .login {
        background-color: #F15A23;
        color: white;
        font-size: 14px;
    }
    .forgot {
        background-color: white;
        border: 1px solid #F15A23;;
        color: #F15A23;
        font-size: 14px;
    }
    .text-center h5 {
        font-family: "Times New Roman", Times, serif;
        margin-bottom: 28px;

    }
    @media screen and (max-width: 768px) {
        #loginMbl, #pwdMbl {
            padding: 0;
        }

    }
</style>