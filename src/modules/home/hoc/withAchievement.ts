import { IAppState, IQueryCollectionState } from '@generic/interfaces';
import { IAchievementGetRequest } from '@home/classes/queries/achievement';
import { IAchievement } from '@home/classes/response/achievement';
import { achievementGetDispose, achievementGetRequest } from '@home/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  achievementState: {
    all: IQueryCollectionState<IAchievementGetRequest, IAchievement>;
  };
}

interface PropsFromDispatch {
  achievementDispatch: {
    // query
    loadRequest: typeof achievementGetRequest;
    loadDispose: typeof achievementGetDispose;
  };
}

export interface WithAchievement extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ achievementGet }: IAppState) => ({
  achievementState: {
    all: achievementGet,
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  achievementDispatch: {
    // query
    loadRequest: (request: IAchievementGetRequest) => dispatch(achievementGetRequest(request)),
    loadDispose: () => dispatch(achievementGetDispose()),
  }
});

export const withAchievement = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);