<template>
  <label class="label">
    {{ label }}
    <div class="input__wrapper">
      <input
        class="input"
        :type="currentType"
        :placeholder="placeholder"
        :name="name"
        v-model="modelValue"
        @input="updateValue"
        @blur="blurField"
        :error="error">

      <button 
        class="button button--toggle-visibility" 
        type="button"
        @mousedown.prevent="showField"
        @mouseup.prevent="hideField"
        :hidden="type !== 'password'">
      </button>
    </div>

    <span v-if="error && error.$message" class="error">{{ error.$message }}</span>
  </label>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: String,
      default: ''
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
      type: Object,
      required: false
    },
  },
  data() {
    return {
      modelValue: this.value,
      currentType: this.type,
    }
  },
  methods: {
    updateValue(evt) {
      this.$emit('update:modelValue', evt.target.value, evt.target.name);
    },
    blurField(evt) {
      this.$emit('blur', evt);
    },
    showField() {
      this.currentType = 'text';
    },
    hideField() {
      this.currentType = this.type;
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
    width: 30px;
    height: 30px;
    padding: 0;
    border: none;
    background: #fff;

    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 12px;
    cursor: pointer;
    background: url('@/assets/visibility-icon.svg') no-repeat center;
    transition: opacity ease-in 0.3s;
  }

  @media (hover: hover) {
    .button:hover {
      opacity: 0.8
    }
  }

  .error {
    font-size: 13px;
    font-weight: 400;
    color: rgb(217, 55, 55);
    position: absolute;
    bottom: 0;
    transform: translateY(100%);
  }
</style>