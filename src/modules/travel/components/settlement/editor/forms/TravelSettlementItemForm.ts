// import { SelectSystemOption } from '@common/components/select';
// import { InputDate } from '@layout/components/input/date';
// import { InputText } from '@layout/components/input/text';
import { withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, mapper, StateHandlerMap, StateUpdaters, withStateHandlers } from 'recompose';
import { InjectedFormProps, WrappedFieldArrayProps } from 'redux-form';
import { TravelSettlementFormData, TravelSettlementItemFormData } from './TravelSettlementForm';
import { TravelSettlementItemFormView } from './TravelSettlementItemFormView';

interface OwnProps {
  context: WrappedFieldArrayProps<TravelSettlementItemFormData>;
}

interface OwnState {
  active: string | undefined;
  isExpanded: boolean;
}
// interface OwnHandlers {
//   generateFieldProps: (name: string) => any;
// }

interface OwnStateHandler extends StateHandlerMap<OwnState> {
  handleToggle: (type: string) => OwnState;
}

export type TravelSettlementItemFormProps
  = OwnProps
  & InjectedFormProps<TravelSettlementFormData, OwnProps>
  & OwnState
  // & OwnHandlers
  & OwnStateHandler
  & WithUser
  & WithStyles
  & InjectedIntlProps;

// const handlerCreators: HandleCreators<RequestItemFormProps, OwnHandlers> = {
//   generateFieldProps: (props: RequestItemFormProps) => (name: string) => {
//     const {
//       intl, // formMode
//     } = props;

//     const fieldName = name.replace('information.item', '');

//     let fieldProps: SelectSystemOption & any = {};

//     switch (fieldName) {
//         case 'departureDate': 
//         fieldProps = {
//           required: true,
//           placeholder: intl.formatMessage({id: `travel.field.${name}.placeholder`}),
//           component: InputDate
//         };
//         break;
        
//       case 'returnDate': 
//         fieldProps = {
//           required: true,
//           placeholder: intl.formatMessage({id: `travel.field.${name}.placeholder`}),
//           component: InputDate
//         };
//         break;

//         default:
//         fieldProps = {
//           type: 'text',
//           placeholder: intl.formatMessage({id: `travel.field.${name}.placeholder`}),
//           component: InputText
//         };
//         break;
//     }
//     return fieldProps;
//   }
// };

const createProps: mapper<TravelSettlementItemFormProps, OwnState> = (props: TravelSettlementItemFormProps): OwnState => ({
  active: undefined,
  isExpanded: false
});

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateHandler> = {
  handleToggle: (state: OwnState) => (type: string) => ({
    active: type,
    isExpanded: state.active === type ? !state.isExpanded : true
  })
};

export const TravelSettlementItemForm = compose<TravelSettlementItemFormProps, OwnProps>(
  withUser,
  withLayout,
  withStyles(styles),
  injectIntl,
  // withHandlers<RequestItemFormProps, OwnHandlers>(handlerCreators),
  withStateHandlers<OwnState, OwnStateHandler>(createProps, stateUpdaters)
)(TravelSettlementItemFormView);