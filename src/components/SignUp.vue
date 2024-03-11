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

      <form class="auth__form form">
        <!-- input block  -->
        <base-input
          class="form__input"
          type="email"
          label="Email"
          placeholder="Email"
          name="email"
        />

        <base-input
          class="form__input"
          type="password"
          label="Password"
          placeholder="Password"
          name="password"
        />

        <!-- button block  -->
        <div class="auth__buttons">
          <base-button mode="filled">
          Login
          </base-button>
          <base-button>
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

.form__input + .form__input {
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