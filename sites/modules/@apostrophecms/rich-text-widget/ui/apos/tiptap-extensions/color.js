import { Color } from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';

export default (options) => {
  const perAreaConfig = options.colors || {};

  const globalConfig = self.apos.modules['@apostrophecms/rich-text-widget'].aposColorConfig || {};
  const configuration = Object.assign({}, globalConfig, perAreaConfig);

  return Color.configure(configuration);
};
