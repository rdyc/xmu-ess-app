import { IAchievementPatchRequest } from '@lookup/classes/queries/achievement';
import { lookupAchievementPatchDispose, lookupAchievementPatchRequest } from '@lookup/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromDispatch {
  achievementDispatch: {
    // command
    patchRequest: typeof lookupAchievementPatchRequest;
    patchDispose: typeof lookupAchievementPatchDispose;
  };
}

export interface WithAchievement extends PropsFromDispatch {}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  achievementDispatch: {
    // command
    patchRequest: (request: IAchievementPatchRequest) => dispatch(lookupAchievementPatchRequest(request)),
    patchDispose: () => dispatch(lookupAchievementPatchDispose()),
  }
});

export const withAchievement = (component: React.ComponentType) =>
  connect(undefined, mapDispatchToProps)(component);