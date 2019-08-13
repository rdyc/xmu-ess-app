import { WithKPIMeasurement, withKPIMeasurement } from '@kpi/hoc/withKPIMeasurement';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithOidc, withOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { withRouter } from 'react-router';
import { compose, HandleCreators, lifecycle, mapper, ReactLifeCycleFunctions, setDisplayName, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { KPIMeasurementDetailView } from './KPIMeasurementDetailView';

interface OwnProps {
  categoryUid: string;
  shouldLoad: boolean;
}

interface IOwnHandler {
  handleOnLoadApi: () => void;
}

interface IOwnState {
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  stateUpdate: StateHandler<IOwnState>;
}

export type MeasurementDetailProps
  = WithUser
  & OwnProps
  & WithOidc
  & WithLayout
  & WithKPIMeasurement
  & WithStyles<typeof styles>
  & InjectedIntlProps
  & IOwnState
  & IOwnStateUpdaters
  & IOwnHandler;

const createProps: mapper<MeasurementDetailProps, IOwnState> = (): IOwnState => {
  //
  return {
    // 
  };
};

const stateUpdaters: StateUpdaters<MeasurementDetailProps, IOwnState, IOwnStateUpdaters> = {
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),
};

const handlerCreators: HandleCreators<MeasurementDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: MeasurementDetailProps) => () => { 
    if (props.userState.user && props.categoryUid && !props.kpiMeasurementState.detail.isLoading) {
      props.kpiMeasurementDispatch.loadListRequest({
        categoryUid: props.categoryUid,
      });
    }
  },
};

const lifecycles: ReactLifeCycleFunctions<MeasurementDetailProps, IOwnState> = {
  componentDidMount() {
    this.props.handleOnLoadApi();
  },
  componentDidUpdate(prevProps: MeasurementDetailProps) {
    // handle updated reload state
    if (this.props.shouldLoad !== prevProps.shouldLoad) {
      this.props.handleOnLoadApi();
    }

    // handle updated route params
    if (this.props.categoryUid !== prevProps.categoryUid) {
      this.props.handleOnLoadApi();
    }
  }
};

export const KPIMeasurementDetail = compose<MeasurementDetailProps, OwnProps>(
  setDisplayName('KPIMeasurementDetail'),
  withRouter,
  withOidc,
  withUser,
  withLayout,
  withKPIMeasurement,
  injectIntl,
  withStyles(styles),
  withStateHandlers<IOwnState, IOwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<MeasurementDetailProps, IOwnHandler>(handlerCreators),
  lifecycle(lifecycles),
)(KPIMeasurementDetailView);