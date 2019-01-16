import { withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { DateType } from 'material-ui-pickers/constants/prop-types';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';
import { WrappedFieldArrayProps } from 'redux-form';
import { TravelSettlementItemFormData } from './TravelSettlementForm';
import { TravelSettlementItemFormView } from './TravelSettlementItemFormView';

interface OwnProps {
  context: WrappedFieldArrayProps<TravelSettlementItemFormData>;
  minDate?: DateType;
  maxDate?: DateType;
  onCostChange: (event: any, newValue: number, oldValue: number) => void;
}

export type TravelSettlementItemFormProps
  = OwnProps
  & WithUser
  & WithStyles
  & InjectedIntlProps;

export const TravelSettlementItemForm = compose<TravelSettlementItemFormProps, OwnProps>(
  withUser,
  withLayout,
  withStyles(styles),
  injectIntl
)(TravelSettlementItemFormView);