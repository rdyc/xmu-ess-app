import { IAchievement } from '@home/classes/response/achievement';
import { AchievementType } from '@home/classes/types';
import { WithAchievement, withAchievement } from '@home/hoc/withAchievement';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles } from '@material-ui/core';
import withWidth, { WithWidth } from '@material-ui/core/withWidth';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, lifecycle, ReactLifeCycleFunctions, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { AchievementChartView } from './AchievementChartView';

interface IOwnOption {
  useToolbar?: boolean;
}

interface IOwnState {
  symbol?: string;
  dataDiv?: IAchievement;
  dataLob?: IAchievement;
  dataDepartment?: IAchievement;
  dataSales?: IAchievement;
}

interface IOwnHandler {
  handleOnChange: (data: IAchievement[] | null | undefined) => void;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  stateUpdate: StateHandler<IOwnState>;
}

export type AchievementChartProps
  = WithUser
  & IOwnOption
  & IOwnState
  & IOwnHandler
  & IOwnStateUpdaters
  & WithAchievement
  & WithWidth
  & WithStyles<typeof styles>
  & InjectedIntlProps;

const stateUpdaters: StateUpdaters<AchievementChartProps, IOwnState, IOwnStateUpdaters> = {
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),
};

const handlerCreators: HandleCreators<AchievementChartProps, IOwnHandler> = {
  handleOnChange: (props: AchievementChartProps) => (data: IAchievement[]) => {

    data.map(item => {
      if (item.title === AchievementType.ETGDiv) {
        props.stateUpdate({
          dataDiv: item
        });
      } else if (item.title === AchievementType.ETGLob) {
        props.stateUpdate({
          dataLob: item
        });
      } else if (item.title === AchievementType.ETGDepartment) {
        props.stateUpdate({
          dataDepartment: item
        });
      } else if (item.title === AchievementType.ETGSales) {
        props.stateUpdate({
          dataSales: item
        });
      }
    });
  }
};

const lifecycles: ReactLifeCycleFunctions<AchievementChartProps, {}> = {
  componentDidMount() {
    const { user } = this.props.userState;
    const { isLoading, response } = this.props.achievementState.all;
    const { loadRequest } = this.props.achievementDispatch;

    if (user) {
      if (!isLoading && !response) {
        loadRequest({});
      } else if (response) {
        if (response.data) {
          this.props.handleOnChange(response.data);
        }
      }
    }
  },
  componentDidUpdate(prevProps: AchievementChartProps) {
    if (this.props.achievementState.all !== prevProps.achievementState.all) {
      if (this.props.achievementState.all.response) {
        this.props.handleOnChange(this.props.achievementState.all.response.data);
      }
    }
  }
};

export const AchievementChart = compose<AchievementChartProps, IOwnOption>(
  withAchievement,
  withWidth(),
  withUser,
  injectIntl,
  withStateHandlers({}, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  withStyles(styles)
)(AchievementChartView);