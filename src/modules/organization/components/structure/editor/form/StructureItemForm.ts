// import { SelectSystemOption } from '@common/components/select';
// import { InputDate } from '@layout/components/input/date';
// import { InputText } from '@layout/components/input/text';
// import { SelectPosition } from '@lookup/components/position/select';
// import { organizationMessage } from '@organization/locales/messages/organizationMessage';
// import { InjectedIntlProps, injectIntl } from 'react-intl';
// import { compose, HandleCreators, withHandlers } from 'recompose';
// import { WrappedFieldArrayProps } from 'redux-form';
// import { isNullOrUndefined } from 'util';
// import { OrganizationStructureItemFormData } from './StructureForm';
// import { StructureItemFormView } from './StructureItemFormView';

// interface OwnProps {
//   context: WrappedFieldArrayProps<OrganizationStructureItemFormData>;
//   companyUidValue: string | null | undefined;
//   inactiveDateValue: string | null | undefined;
// }

// interface OwnHandlers {
//   generateFieldProps: (name: string) => any;
// }

// export type StructureItemFormProps 
//   = OwnProps
//   & OwnHandlers
//   & InjectedIntlProps;

// const handlerCreators: HandleCreators<StructureItemFormProps, OwnHandlers> = {
//     generateFieldProps: (props: StructureItemFormProps) => (name: string) => { 
//       const { 
//         intl, companyUidValue,
//         inactiveDateValue
//       } = props;
      
//       let fieldProps: SelectSystemOption & any = {};
      
//       const positionFilter: any = {
//         companyUid: companyUidValue,
//       };
  
//       switch (name) {
        
//         case 'positionUid':
//           fieldProps = {
//             type: 'text',
//             label: intl.formatMessage(organizationMessage.structure.fieldFor(name, 'fieldName')),
//             placeholder: intl.formatMessage(organizationMessage.structure.fieldFor(name, 'fieldPlaceholder')),
//             component: SelectPosition,
//             disabled: (companyUidValue),
//             filter: positionFilter
//           };
//           break;

//         case 'start':
//           fieldProps = {
//             disabled: (inactiveDateValue ? Date.parse(inactiveDateValue) : Date.now()) < Date.now(), 
//             type: 'date',
//             label: intl.formatMessage(organizationMessage.structure.fieldFor(name, 'fieldName')),
//             placeholder: intl.formatMessage(organizationMessage.structure.fieldFor(name, 'fieldPlaceholder')),
//             component: InputDate,
//             maxDate: inactiveDateValue,
//           };
//           break;

//         case 'end':
//           fieldProps = {
//             disabled: (inactiveDateValue ? Date.parse(inactiveDateValue) : Date.now()) <= Date.now(), 
//             type: 'date',
//             label: intl.formatMessage(organizationMessage.structure.fieldFor(name, 'fieldName')),
//             placeholder: intl.formatMessage(organizationMessage.structure.fieldFor(name, 'fieldPlaceholder')),
//             component: InputDate,
//             disablePast: true,
//             maxDate: inactiveDateValue,
//           };
//           break;
        
//         default:
//           fieldProps = {
//             type: 'text',
//             label: intl.formatMessage(organizationMessage.structure.fieldFor(name, 'fieldName')),
//             placeholder: intl.formatMessage(organizationMessage.structure.fieldFor(name, 'fieldPlaceholder')),
//             component: InputText,
//             disabled: true,
//           };
//           break;
//       }
//       return fieldProps;
//   }
// };

// export const StructureItemForm = compose<StructureItemFormProps, OwnProps>(
//   injectIntl,
//   withHandlers<StructureItemFormProps, OwnHandlers>(handlerCreators),
// )(StructureItemFormView);