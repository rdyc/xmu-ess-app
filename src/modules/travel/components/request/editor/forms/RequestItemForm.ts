import { withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { TravelItemFormData } from '@travel/components/request/editor/forms/RequestForm';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, withHandlers } from 'recompose';
import { WrappedFieldArrayProps } from 'redux-form';
import { RequestItemFormView } from './RequestItemFormView';

interface OwnProps {
  context: WrappedFieldArrayProps<TravelItemFormData>;
}

interface OwnHandlers {
  // handleInput: (item: ITravelRequestItem) => void;  
}

export type RequestItemFormProps
  = OwnProps
  & OwnHandlers
  & WithUser
  & WithStyles
  & InjectedIntlProps;

const handlerCreators: HandleCreators<RequestItemFormProps, OwnHandlers> = {
  // handleInput: (props: RequestItemFormProps) => (item: ITravelRequestItem): void => {
  //   const { context, intl } = props;  
  // }
};

export const RequestItemForm = compose<RequestItemFormProps, OwnProps>(
  withUser,
  withLayout,
  withStyles(styles),
  injectIntl,
  withHandlers<RequestItemFormProps, OwnHandlers>(handlerCreators),
)(RequestItemFormView);