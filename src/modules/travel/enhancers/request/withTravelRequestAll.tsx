import { IAppState, IQueryCollectionState } from '@generic/interfaces';
import { ITravelGetAllRequest } from '@travel/classes/queries';
import { ITravelRequest } from '@travel/classes/response';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, setDisplayName } from 'recompose';

interface PropsFromState {
  travelAllState: IQueryCollectionState<ITravelGetAllRequest, ITravelRequest>;
}

export type WithTravelRequestAll = PropsFromState;

const withTravelRequestAll = (WrappedComponent: React.ComponentType) => {
  const displayName = `WithTravelRequestAll(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  
  const withTravelRequestAllWrapper: React.SFC<WithTravelRequestAll> = props => <WrappedComponent {...props} />;

  const mapStateToProps = ({ travelRequestGetAll }: IAppState) => ({
    travelAllState: travelRequestGetAll
  });
  return compose<WithTravelRequestAll, {}>(
    setDisplayName(displayName),
    connect(mapStateToProps)
  )(withTravelRequestAllWrapper);
};

export default withTravelRequestAll;