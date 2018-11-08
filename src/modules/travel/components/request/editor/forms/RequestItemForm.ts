import { withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithLookupDiem, withLookupDiem } from '@lookup/hoc/withLookupDiem';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { TravelItemFormData, TravelRequestFormData } from '@travel/components/request/editor/forms/RequestForm';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, lifecycle, mapper, ReactLifeCycleFunctions, StateHandlerMap, StateUpdaters, withStateHandlers } from 'recompose';
import { InjectedFormProps, WrappedFieldArrayProps } from 'redux-form';
import { RequestItemFormView } from './RequestItemFormView';

interface OwnProps {
  context: WrappedFieldArrayProps<TravelItemFormData>;
  destinationTypeValue: string | null | undefined;
  diemType: string | null | undefined;
}

interface OwnState {
  active: string | undefined;
  isExpanded: boolean;
}

interface OwnStateHandler extends StateHandlerMap<OwnState> {
  handleToggle: (type: string) => OwnState;
}

export type RequestItemFormProps
  = OwnProps
  & InjectedFormProps<TravelRequestFormData, OwnProps>
  & OwnState
  & OwnStateHandler
  & WithUser
  & WithLookupDiem
  & WithStyles
  & InjectedIntlProps;

const lifecycles: ReactLifeCycleFunctions<RequestItemFormProps, {}> = {
  componentDidMount() {
    const { destinationTypeValue, diemType } = this.props;
    const { loadAllRequest } = this.props.lookupDiemDispatch;
    
    if (destinationTypeValue && diemType) {
      loadAllRequest ({
        filter: {
          destinationType: destinationTypeValue,
          projectType: 'SPT01',
          page: 1,
          size: 1,
          find: 'CP002',
          findBy: 'companyUid',
          orderBy: undefined,
          direction: undefined,        
        }
      });
    }
  }
};

const createProps: mapper<RequestItemFormProps, OwnState> = (props: RequestItemFormProps): OwnState => ({
  active: undefined,
  isExpanded: false
});

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateHandler> = {
  handleToggle: (state: OwnState) => (type: string) => ({
    active: type,
    isExpanded: state.active === type ? !state.isExpanded : true
  })
};

export const RequestItemForm = compose<RequestItemFormProps, OwnProps>(
  withUser,
  withLayout,
  withLookupDiem,
  withStyles(styles),
  injectIntl,
  withStateHandlers<OwnState, OwnStateHandler>(createProps, stateUpdaters),
  lifecycle<RequestItemFormProps, {}>(lifecycles)
)(RequestItemFormView);