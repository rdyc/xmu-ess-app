// import { IQuerySingleState } from '@generic/interfaces';
// import { ConnectedReduxProps } from '@generic/types';
// import { WithStyles } from '@material-ui/core';
// import { WithWidth } from '@material-ui/core/withWidth';
// import { IPurchaseGetByIdRequest } from '@purchase/classes/queries/purchaseRequest';
// import { IPurchaseDetail, IPurchaseItemRequest } from '@purchase/classes/response/purchaseRequest';
// import { InjectedIntlProps } from 'react-intl';
// import { IPurchaseItemPutPayload } from '@purchase/classes/request/purchaseRequest';

// interface PropsFromState {
//   // itemState: IQuerySingleState<IPurchaseGetByIdRequest, IPurchaseDetail>;
//   itemState: IQuerySingleState<IPurchaseGetByIdRequest, IPurchaseDetail>;
// }

// interface PropsFromDispatch {
//   itemDispatch: {
//     itemRequest: typeof IPurchaseItemRequest;
//   };
// }

// interface OwnProps {
//   onSubmitted: (name: string) => any;
// }

// type State = Readonly<typeof initialState>;          

// type AllProps = PropsFromState & 
//                 PropsFromDispatch &
//                 OwnProps &
//                 ConnectedReduxProps & 
//                 InjectedIntlProps & 
//                 WithWidth &
//                 WithStyles<typeof styles>;

// const handlerCreators: HandleCreators<PurchaseRequestDetailFormProps, OwnHandlers> = {
//   generateFieldProps: (props: PurchaseRequestItemFormProps) => (name: string) => {
//     const {
//       intl, formMode, formCurrencyType, isCurrencyIdr,
//       onChangeCurrencyType, onChangeValueIdr,
//       onChangeRate
//     } = props;

//     const fieldName = name.replace('information.', '');

//     let fieldProps: SelectSystemOption & any = {};

//     switch (fieldName) {
//       case 'uid':

//       case 'customerUid':
//         fieldProps = {
//           required: true,
//           placeholder: intl.formatMessage({ id: `purchase.field.${name}.placeholder` }),
//           component: InputCustomer
//         };
//         break;

//       case 'project':
//         fieldProps = {
//           required: formMode === FormMode.New,
//           category: 'project',
//           disabled: formMode === FormMode.Edit,
//           placeholder: intl.formatMessage({ id: `purchase.field.${name}.placeholder` }),
//           component: SelectSystem,
//         };
//         break;

//       case 'currencyType':
//         fieldProps = {
//           required: true,
//           category: 'currency',
//           placeholder: intl.formatMessage({ id: `purchase.field.${name}.placeholder` }),
//           component: SelectSystem,
//           onChange: onChangeCurrencyType
//         };
//         break;

//       case 'date':
//         fieldProps = {
//           required: true,
//           placeholder: intl.formatMessage({ id: `purchase.field.${name}.placeholder` }),
//           component: InputDate
//         };
//         break;

//       case 'rate':
//         fieldProps = {
//           type: 'number',
//           required: !isCurrencyIdr,
//           placeholder: intl.formatMessage({ id: `purchase.field.${name}.placeholder` }),
//           disabled: isCurrencyIdr || isNullOrUndefined(formCurrencyType),
//           component: InputNumber,
//           onChange: onChangeRate
//         };
//         break;

//       case 'request':
//         fieldProps = {
//           type: 'number',
//           placeholder: intl.formatMessage({ id: `purchase.field.${name}.placeholder` }),
//           component: InputNumber,
//           onChange: onChangeValueIdr
//         };
//         break;

//       // case 'requestIDR':
//       //   fieldProps = {
//       //     type: 'number',
//       //     disabled: true,
//       //     component: InputNumber
//       //   };
//       //   break;

//       case 'advance':
//         fieldProps = {
//           type: 'number',
//           disabled: true,
//           component: InputNumber
//         };
//         break;

//       case 'description':
//         fieldProps = {
//           disabled: true,
//           placeholder: intl.formatMessage({ id: `purchase.field.${name}.placeholder` }),
//           component: InputText
//         };
//         break;

//       default:
//         fieldProps = {
//           type: 'text',
//           placeholder: intl.formatMessage({ id: `purchase.field.${name}.placeholder` }),
//           component: InputText
//         };
//         break;
//     }

//     return fieldProps;
//   }
// };
