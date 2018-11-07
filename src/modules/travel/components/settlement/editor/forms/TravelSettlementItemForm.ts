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

interface OwnStateHandler extends StateHandlerMap<OwnState> {
  handleToggle: (type: string) => OwnState;
}

export type TravelSettlementItemFormProps
  = OwnProps
  & InjectedFormProps<TravelSettlementFormData, OwnProps>
  & OwnState
  & OwnStateHandler
  & WithUser
  & WithStyles
  & InjectedIntlProps;

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
  withStateHandlers<OwnState, OwnStateHandler>(createProps, stateUpdaters)
)(TravelSettlementItemFormView);