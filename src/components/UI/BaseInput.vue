<template>
  <label class="label">
    {{ label }}
    <div class="input__wrapper">
      <input
        class="input"
        :type="type"
        :placeholder="placeholder"
        :value="value"
        :name="name"
        v-model="modelValue"
        @input="updateValue"
        :error="error">

      <button 
        class="button button--toggle-visibility" 
        type="button"
        @mousedown.prevent="showPassword"
        :hidden="type !== 'password'">
      </button>
    </div>

    <span class="error">{{ error }}</span>
  </label>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'text'
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      modelValue: '',
    }
  },
  methods: {
    updateValue(evt) {
      this.$emit('update:modelValue', evt.target.value, evt.target.name);
    },
    blurField(evt) {
      this.$emit('blur', evt);
    },
    showPassword() {
    }
  },
}
</script>

<style lang="scss" scoped>
  .label {
    font-size: 16px;
    line-height: 120%;
    font-weight: 600;
    color: var(--alt-text-color);

    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    position: relative;
  }

  .input__wrapper {
    position: relative;
  }

  .input {
    font-family: inherit;
    font-size: 16px;
    line-height: 120%;

    padding: 16px;
    border-radius: 8px;
    border: 1px solid var(--border-color);

    width: 100%;
  }

  .input:focus,
  .input:active {
    outline: none;
  }

  .button {
    width: 24px;
    height: 24px;
    background: #fff;

    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 16px;
    cursor: pointer;
  }

  .error {
    font-weight: 400;
    color: rgb(217, 55, 55);
    position: absolute;
    bottom: 0;
    transform: translateY(100%);
  }
</style>