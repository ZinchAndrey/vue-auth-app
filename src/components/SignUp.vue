<template>
  <the-loader v-if="isLoading" />
  <div v-else class="container">
    <div class="auth">
      <div class="auth__logo">
        <img class="auth__icon" src="@/assets/logo.svg" alt="">
        Travalizer
      </div>

      <h1 class="auth__caption">
        Artificial Intelligence giving you travel recommendations
      </h1>
      <p class="auth__sub">
        Welcome Back, Please login to your account
      </p>

      <form class="auth__form form" @submit.prevent="submitForm">

        <!-- input block  -->
        <base-input class="form__input" type="email" label="Email" placeholder="Email" name="email" :value="email"
          :error="v$.$errors.find(item => item.$property === 'email')" @update:modelValue="updateFieldValue"
          @blur="validateField" />

        <base-input class="form__input" type="password" label="Password" placeholder="Password" name="password"
          :value="password" :error="v$.$errors.find(item => item.$property === 'password')"
          @update:modelValue="updateFieldValue" @blur="validateField" />

        <base-input v-if="currentFormType === 'sign-up'" class="form__input" type="password" label="Confirm password"
          :value="confirmedPassword" placeholder="Password" name="confirmedPassword"
          :error="v$.$errors.find(item => item.$property === 'confirmedPassword')" @update:modelValue="updateFieldValue"
          @blur="validateField" />

        <!-- button block  -->
        <div class="auth__buttons">
          <base-button :mode="isLoginMode ? 'filled' : ''" :type="isLoginMode ? 'submit' : 'button'"
            @click.prevent="login">
            Login
          </base-button>
          <base-button :mode="!isLoginMode ? 'filled' : ''" :type="!isLoginMode ? 'submit' : 'button'"
            @click.prevent="signUp">
            Sign Up
          </base-button>
        </div>

      </form>
    </div>


    <div class="decoration">
      <!-- эмблема машинки -->

    </div>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, helpers, sameAs } from '@vuelidate/validators'

import { SIGN_UP_ENDPOINT, SIGN_IN_ENDPOINT } from '@/utils.js'

import TheLoader from './UI/TheLoader.vue'

export default {
  setup() {
    return { v$: useVuelidate() }
  },
  components: {
    TheLoader
  },
  data() {
    return {
      email: '',
      password: '',
      confirmedPassword: '',
      currentFormType: 'login',
      isLoading: false,
      fetchError: null,
      authData: {},
    }
  },
  computed: {
    isValid() {
      return !this.v$.$invalid;
    },
    isLoginMode() {
      return this.currentFormType === 'login';
    }
  },
  methods: {
    updateFieldValue(value, field) {
      this[field] = value;
    },
    validateField(evt) {
      this.v$[evt.target.name] && this.v$[evt.target.name].$touch();
      // console.log(this.v$);
    },
    toggleCurrentFormType() {
      if (this.currentFormType === 'login') {
        this.currentFormType = 'sign-up';
      } else {
        this.currentFormType = 'login'
      }
    },
    // TO DO - login и sugn-up можно как-нибудь объединить 
    login() {
      if (!this.isLoginMode) {
        this.toggleCurrentFormType();
        return;
      }

      this.submitForm();
    },
    signUp() {
      if (this.isLoginMode) {
        this.toggleCurrentFormType();
        return;
      }

      this.submitForm();
    },
    fetchData(data) {
      data.returnSecureToken = true;

      this.isLoading = true;

      fetch(this.isLoginMode ? SIGN_IN_ENDPOINT : SIGN_UP_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(response => {
        console.log(response);
        if (response.ok) {
          return response.json();
        }
      }).then(data => {
        console.log(data);
        // если такая почта уже есть, нужно в компонент email кидать эту ошибку 
        const { idToken, expiresIn, localId } = data;
        this.authData = { idToken, expiresIn, localId };
        console.log(this.authData);

        sessionStorage.setItem('userId', localId);
        sessionStorage.setItem('token', idToken);

        this.isLoading = false;
        this.redirectToCountriesList();
      });
    },
    submitForm() {
      this.v$.$touch();

      if (!this.isValid) {
        return;
      }

      const data = {
        email: this.email,
        password: this.password,
      }

      this.fetchData(data);
      console.log('Send data');
    },
    redirectToCountriesList() {
      this.$router.push('/countries');
    }
  },
  validations() {
    return {
      email: {
        required: helpers.withMessage('Enter your email', required),
        email: helpers.withMessage('Incorrect email', email),
        $lazy: true
      },
      password: {
        required: helpers.withMessage('Enter your password', required),
        minLength: helpers.withMessage('Minimal length is 8 symbols', minLength(8))
      },
      confirmedPassword: {
        sameAsPassword: this.isLoginMode ? '' : helpers.withMessage('Password mismatch', sameAs(this.password))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  font-size: 16px;
  line-height: 100%;

  display: flex;
  align-items: stretch;

  width: fit-content;
  margin: 0 auto;
  border-radius: 24px;
  overflow: hidden;
  background-color: var(--main-bg-color);

  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);
}

.auth {
  width: 550px;
  padding: 40px 60px;
}

.auth__logo {
  font-weight: 600;
  font-size: 32px;
  line-height: 100%;

  display: flex;
  align-items: center;
  gap: 6px;

  margin-bottom: 55px
}

.auth__caption {
  font-size: 24px;
  line-height: 150%;
  font-weight: 600;

  margin: 0 0 16px;
}

.auth__sub {
  margin: 0 0 15px;
}

.form__input+.form__input {
  margin-top: 24px;
}

.auth__buttons {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 40px;
}

.decoration {
  width: 640px;
  background: #F5DBC4 url('@/assets/decoration-image.svg') no-repeat center;
}

@media (max-width: 1200px) {
  .auth {
    padding: 30px 40px;
    width: 450px;
  }

  .auth__logo {
    font-size: 28px;
    margin-bottom: 20px;
  }

  .auth__caption {
    font-size: 20px;
    line-height: 120%;
  }

  .auth__buttons button {
    min-width: 150px;
  }

  .decoration {
    width: 450px;
    background-size: 80% auto;
  }
}

@media (max-width: 1024px) {
  .auth__caption {
    font-size: 18px;
  }

  .decoration {
    display: none;
  }
}
</style>