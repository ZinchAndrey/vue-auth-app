<template>
  <div class="container">
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
        <base-input class="form__input" type="email" label="Email" placeholder="Email" name="email"
          :error="v$.$errors.find(item => item.$property === 'email')" @update:modelValue="updateFieldValue"
          @blur="validateField" />

        <base-input class="form__input" type="password" label="Password" placeholder="Password" name="password"
          :error="v$.$errors.find(item => item.$property === 'password')" @update:modelValue="updateFieldValue"
          @blur="validateField" />

        <base-input v-if="currentFormType === 'sign-up'" class="form__input" type="password" label="Repeat password" placeholder="Repeat password" name="repeatedPassword"
          :error="v$.$errors.find(item => item.$property === 'repeatedPassword')" @update:modelValue="updateFieldValue"
          @blur="validateField" />

        <!-- button block  -->
        <div class="auth__buttons">
          <base-button :mode="currentFormType === 'login' ? 'filled' : ''"
            :type="currentFormType === 'login' ? 'submit' : 'button'" @click.prevent="login">
            Login
          </base-button>
          <base-button :mode="currentFormType === 'sign-up' ? 'filled' : ''"
            :type="currentFormType === 'sign-up' ? 'submit' : 'button'" @click.prevent="signUp">
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
import { required, email, minLength, helpers } from '@vuelidate/validators'

export default {
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      email: '',
      password: '',
      repeatedPassword: '',
      currentFormType: 'login'
    }
  },
  computed: {
    isValid() {
      return !this.v$.$invalid;
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
      if (this.currentFormType === 'sign-up') {
        this.toggleCurrentFormType();
        return;
      }

      this.submitForm();
    },
    signUp() {
      if (this.currentFormType === 'login') {
        this.toggleCurrentFormType();
        return;
      }

      this.submitForm();
    },

    submitForm() {
      this.v$.$touch();

      if (!this.isValid) {
        return;
      }

      console.log('Send data');
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
        minLength: helpers.withMessage('Minimal length is 4 symbols', minLength(4))
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

  width: 1300px;
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

.auth__icon {}

.auth__caption {
  font-size: 24px;
  line-height: 150%;
  font-weight: 600;

  margin: 0 0 16px;
}

.auth__sub {}

.auth__form {}

.form {}

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
  width: 746px;
  background: #F5DBC4 url('@/assets/decoration-image.svg') no-repeat center;
}
</style>