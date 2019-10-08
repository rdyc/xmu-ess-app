import AppMenu from '@constants/AppMenu';
import { WithHrCompetencyMapped, withHrCompetencyMapped } from '@hr/hoc/withHrCompetencyMapped';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { withMasterPage, WithMasterPage } from '@layout/hoc/withMasterPage';
import { withOidc, WithOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles } from '@material-ui/core';
import { WithEmployeeFinal, withEmployeeFinal } from '@profile/hoc/withEmployeeFinal';
import { myMessage } from '@profile/locales/messages/myMessage';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, lifecycle, mapper, ReactLifeCycleFunctions, setDisplayName, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';

import { MyCompetencyDetailView } from './MyCompetencyDetailView';

interface IOwnRouteParams {
  //
}

interface IOwnState {
  // 
}

interface IOwnHandler {
  handleOnLoadApi: () => void;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  stateUpdate: StateHandler<IOwnState>;
}

export type MyCompetencyDetailProps
  = IOwnState
  & IOwnHandler
  & IOwnStateUpdaters
  & RouteComponentProps<IOwnRouteParams>
  & WithUser
  & WithOidc
  & WithLayout
  & WithMasterPage
  & WithEmployeeFinal
  & WithHrCompetencyMapped
  & WithStyles<typeof styles>
  & InjectedIntlProps;

const createProps: mapper<MyCompetencyDetailProps, IOwnState> = (): IOwnState => ({
  // 
});

const stateUpdaters: StateUpdaters<MyCompetencyDetailProps, IOwnState, IOwnStateUpdaters> = {
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),
};

const handlerCreators: HandleCreators<MyCompetencyDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: MyCompetencyDetailProps) => () => { 
    const { loadDetailRequest } = props.employeeFinalDispatch;
    const { isLoading } = props.employeeFinalState.detail;
    const { user } = props.userState;

    const { loadNextRequest, loadCurrentRequest } = props.hrCompetencyMappedDispatch;
    const { isLoading: nextLoading } = props.hrCompetencyMappedState.next;
    const { isLoading: currentLoading } = props.hrCompetencyMappedState.current;

    if (user && !isLoading && !nextLoading && !currentLoading) {
      loadDetailRequest({
        employeeUid: user.uid,
        positionUid: user.position.uid
      });

      loadNextRequest({
        positionUid: user.position.uid,
        employeeLevel: user.level.uid
      });

      loadCurrentRequest({
        positionUid: user.position.uid,
        employeeLevel: user.level.uid,
        isCurrent: true
      });
    }
  },
};

const lifecycles: ReactLifeCycleFunctions<MyCompetencyDetailProps, IOwnState> = {
  componentDidMount() {
    this.props.masterPage.changePage({
      uid: AppMenu.MyProfile,
      parentUid: AppMenu.Account,
      title: this.props.intl.formatMessage(myMessage.shared.page.detailTitle, { state: 'Competency'}),
      description: this.props.intl.formatMessage(myMessage.shared.page.detailSubheader),
    });

    const { isLoading, response } = this.props.employeeFinalState.detail;

    if (!isLoading && !response) {
      this.props.handleOnLoadApi();
    }
  },
};
 
export const MyCompetencyDetail = compose<MyCompetencyDetailProps, {}>(
  withRouter,
  withOidc,
  withUser,
  withLayout,
  withMasterPage,
  withEmployeeFinal,
  withHrCompetencyMapped,
  injectIntl,
  withStyles(styles),
  withStateHandlers<IOwnState, IOwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<MyCompetencyDetailProps, IOwnHandler>(handlerCreators),
  lifecycle(lifecycles),
  setDisplayName('MyCompetencyDetail')
)(MyCompetencyDetailView);