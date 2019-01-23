import {
  layoutAction,
  layoutContent,
  layoutDialog,
  layoutField,
  layoutLabel,
  layoutPage,
  layoutText,
  layoutTooltip,
} from './layoutAllMessage';

export const layoutMessage = {
  text: layoutText,
  label: layoutLabel,
  tooltip: layoutTooltip,
  action: layoutAction,
  field: layoutField,
  dialog: layoutDialog,
  page: layoutPage,
  content: layoutContent
};