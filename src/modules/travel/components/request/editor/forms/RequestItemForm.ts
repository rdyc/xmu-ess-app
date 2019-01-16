import { withLayout, WithLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IDiem } from '@lookup/classes/response';
import { WithLookupDiem, withLookupDiem } from '@lookup/hoc/withLookupDiem';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { TravelItemFormData } from '@travel/components/request/editor/forms/RequestForm';
import { DateType } from 'material-ui-pickers/constants/prop-types';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';
import { WrappedFieldArrayProps } from 'redux-form';
import { RequestItemFormView } from './RequestItemFormView';

interface OwnProps {
  context: WrappedFieldArrayProps<TravelItemFormData>;
  destinationTypeValue: string | null | undefined;
  projectTypeValue: string | null | undefined;
  diemRequest: IDiem | undefined;
  minDate?: DateType; 
  maxDate?: DateType; 
}

export type RequestItemFormProps
  = OwnProps
  & WithUser
  & WithLayout
  & WithLookupDiem
  & WithStyles
  & InjectedIntlProps;

export const RequestItemForm = compose<RequestItemFormProps, OwnProps>(
  withUser,
  withLayout,
  withLookupDiem,
  withStyles(styles),
  injectIntl
)(RequestItemFormView);