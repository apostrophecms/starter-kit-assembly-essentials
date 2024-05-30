<template>
  <input
    v-apos-tooltip="{
      content: tool.label,
      placement: 'top',
      delay: 650
    }"
    type="color"
    :value="computedColor"
    class="apos-rich-text-editor__control apos-rich-text-editor__control--color"
    :class="{ 'apos-is-active': active }"
    :label="tool.label"
    :icon-only="!!tool.icon"
    :icon="tool.icon || false"
    :icon-size="tool.iconSize || 16"
    :modifiers="['no-border', 'no-motion']"
    @input="handleColorChange"
  >
</template>

<script>

export default {
  name: 'ColorButton',
  props: {
    name: {
      type: String,
      required: true
    },
    editor: {
      type: Object,
      required: true
    },
    tool: {
      type: Object,
      required: true
    }
  },
  computed: {
    active() {
      // The parameters passed to isActive are unpredictable.
      // If they do not follow the pattern isActive(NAME, OPTIONS)
      // they should include their own helper
      if (this.tool.isActive) {
        return this.editor.isActive(this.tool.isActive);
      } else {
        return this.editor.isActive(this.name, this.tool.commandParameters || {});
      }
    },
    computedColor() {
      return this.editor.isActive('textStyle') ? this.convertToHex(this.editor.getAttributes('textStyle').color) : '#000000';
    }
  },
  methods: {
    command() {
      // This will return the command associated with the tool or the name as a fallback
      return this.tool.command || this.name;
    },
    handleColorChange($event) {
      this.editor.chain().focus()[this.command()]($event.target.value).run();
    },
    convertToHex(color) {
      // Check if color is in RGB format
      const rgbPattern = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/;
      const match = color.match(rgbPattern);

      if (match) {
        // Convert RGB to HEX
        const r = parseInt(match[1]).toString(16).padStart(2, '0');
        const g = parseInt(match[2]).toString(16).padStart(2, '0');
        const b = parseInt(match[3]).toString(16).padStart(2, '0');
        return `#${r}${g}${b}`.toUpperCase(); // Return the HEX value
      }

      // If not RGB, return the color as is (assuming it's already HEX or other format)
      return color.toUpperCase();
    }
  }
};
</script>

<style lang="scss" scoped>
// stylelint-disable declaration-no-important

.apos-rich-text-editor__control--color {
  box-sizing: border-box !important;
  width: 20px;
  height: 20px;
  margin-top: 2px !important;
  padding: 0;
  border: 0;
  background-color: transparent;
  cursor: pointer;
}

input[type="color" i]::-webkit-color-swatch-wrapper {
  padding: 1px;
}

input[type="color" i]::-webkit-color-swatch {
  border-radius: 5px;
  border: 1px solid var(--a-base-8);
}
</style>