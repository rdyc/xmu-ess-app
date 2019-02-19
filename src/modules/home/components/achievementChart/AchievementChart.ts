import { IAchievement, IValueResponseArray } from '@home/classes/response/achievement';
import { AchievementType } from '@home/classes/types';
import { WithAchievement, withAchievement } from '@home/hoc/withAchievement';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles } from '@material-ui/core';
import withWidth, { WithWidth } from '@material-ui/core/withWidth';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, lifecycle, mapper, ReactLifeCycleFunctions, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { AchievementChartView } from './AchievementChartView';

interface IOwnOption {
  useToolbar?: boolean;
}

interface IOwnState {
  dataDiv?: IAchievement;
  dataLob?: IAchievement;
  dataDepartment?: IAchievement;
  dataSales?: IAchievement;

  sales: IValueResponseArray;
  department: IValueResponseArray;
  division: IValueResponseArray;
  lob: IValueResponseArray;
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

const createProps: mapper<AchievementChartProps, IOwnState> = (props: AchievementChartProps): IOwnState => ({
  sales: { name: [], value: [], color: [] },
  department: { name: [], value: [], color: [] },
  division: { name: [], value: [], color: [] },
  lob: { name: [], value: [], color: [] },
});

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
        item.valueObject.map(division => {
          props.division.name.push(division.name);
          props.division.value.push(division.value);
          if (division.value > 100) {
            props.division.color.push('#2e7d32');
          } else {
            props.division.color.push('#283593');
          }
        });
      } else if (item.title === AchievementType.ETGLob) {
        props.stateUpdate({
          dataLob: item
        });
        item.valueObject.map(lob => {
          props.lob.name.push(lob.name);
          props.lob.value.push(lob.value);
          if (lob.value > 100) {
            props.lob.color.push('#2e7d32');
          } else {
            props.lob.color.push('#283593');
          }
        });
      } else if (item.title === AchievementType.ETGDepartment) {
        props.stateUpdate({
          dataDepartment: item
        });
        item.valueObject.map(department => {
          props.department.name.push(department.name);
          props.department.value.push(department.value);
          if (department.value > 100) {
            props.department.color.push('#2e7d32');
          } else {
            props.department.color.push('#283593');
          }
        });
      } else if (item.title === AchievementType.ETGSales) {
        props.stateUpdate({
          dataSales: item
        });
        item.valueObject.map(sales => {
          props.sales.name.push(sales.name);
          props.sales.value.push(sales.value);
          if (sales.value > 100) {
            props.sales.color.push('#2e7d32');
          } else {
            props.sales.color.push('#283593');
          }
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
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  withStyles(styles)
)(AchievementChartView);