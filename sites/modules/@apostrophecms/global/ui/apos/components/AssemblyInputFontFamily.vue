<template>
  <AposInputWrapper
    :field="field"
    :error="effectiveError"
    :uid="uid"
    :modifiers="modifiers"
    :display-options="displayOptions"
  >
    <template #body>
      <div class="apos-input-wrapper">
        <select
          class="apos-input apos-input--select" :id="uid"
          v-model="modelValue"
        >
          <option
            v-for="choice in choices" :key="choice.value"
            :value="choice.value"
          >
            {{ choice.label }}
          </option>
        </select>
        <AposIndicator
          icon="menu-down-icon"
          class="apos-input-icon"
          :icon-size="20"
        />
      </div>
    </template>
  </AposInputWrapper>
</template>

<script>
import { defineComponent } from 'vue';
import AposInputMixin from 'Modules/@apostrophecms/schema/mixins/AposInputMixin';

export default defineComponent ({
  name: 'AssemblyInputFontFamily',
  mixins: [ AposInputMixin ],
  props: {
    icon: {
      type: String,
      default: 'menu-down-icon'
    },
    modelValue: {
      type: Object,
      default: {}
    }
  },
  emits: ['input', 'update:modelValue'],
  data() {
    let choices = [];
    if (!this.field.required) {
      choices.unshift({
        label: 'Default',
        value: ''
      });
    }
    choices = [ ...choices, ...(apos.global.fontFamilies || []) ];
    return {
      choices,
    };
  },
  watch: {
    modelValue(newValue) {
      this.$emit('input', newValue); // Emit input event to update the parent value
      this.$emit('update:modelValue', newValue); // Make sure the model value is being updated
    },
  },
  methods: {
    validate(value) {
      if (this.field.required && !value.length) {
        return 'required';
      }

      if (value && !this.choices.find(choice => choice.value === value)) {
        return 'invalid';
      }

      return false;
    }
  }
});
</script>

<style lang="scss" scoped>
.apos-input-icon {
  @include apos-transition();
}
</style>
