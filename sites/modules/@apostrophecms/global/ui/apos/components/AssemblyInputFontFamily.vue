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
          v-model="next"
        >
          <option
            v-for="choice in choices" :key="choice.value"
            :value="choice.value"
            :selected="choice.value === modelValue.data"
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
import AposInputMixin from 'Modules/@apostrophecms/schema/mixins/AposInputMixin';

export default {
  name: 'AssemblyInputFontFamily',
  mixins: [ AposInputMixin ],
  props: {
    icon: {
      type: String,
      default: 'menu-down-icon'
    }
  },
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
      choices
    };
  },
  watch: {
    next() {
      if (this.next == null) {
        // Conformable to the type needed to select the first element
        this.next = '';
      }
    }
  },
  mounted() {
    if (this.next == null) {
      // Conformable to the type needed to select the first element
      this.next = '';
    }
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
};
</script>

<style lang="scss" scoped>
.apos-input-icon {
  @include apos-transition();
}
</style>
