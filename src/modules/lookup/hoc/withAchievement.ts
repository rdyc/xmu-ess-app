import { IAchievementPatchRequest } from '@lookup/classes/queries/achievement';
import { achievementPatchDispose, achievementPatchRequest } from '@lookup/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromDispatch {
  achievementDispatch: {
    // command
    patchRequest: typeof achievementPatchRequest;
    patchDispose: typeof achievementPatchDispose;
  };
}

export interface WithAchievement extends PropsFromDispatch {}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  achievementDispatch: {
    // command
    patchRequest: (request: IAchievementPatchRequest) => dispatch(achievementPatchRequest(request)),
    patchDispose: () => dispatch(achievementPatchDispose()),
  }
});

export const withAchievement = (component: React.ComponentType) =>
  connect(undefined, mapDispatchToProps)(component);