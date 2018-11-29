import { 
  commonSystemDialog, 
  commonSystemField, 
  commonSystemFieldHelperFor, 
  commonSystemMessage, 
  commonSystemPage, 
  commonSystemSection,
  commonSystemText
} from './commonSystemMessage';

export const commonMessage = {
  system: {
    message: commonSystemMessage,
    page: commonSystemPage,
    section: commonSystemSection,
    dialog: commonSystemDialog,
    text: commonSystemText,
    field: commonSystemField,
    fieldFor: commonSystemFieldHelperFor,
  },
};