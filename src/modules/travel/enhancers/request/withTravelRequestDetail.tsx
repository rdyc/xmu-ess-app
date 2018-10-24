import { IAppState, IQuerySingleState } from '@generic/interfaces';
import { ITravelGetByIdRequest } from '@travel/classes/queries';
import { ITravelRequestDetail } from '@travel/classes/response';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, setDisplayName } from 'recompose';

interface PropsFromState {
  travelDetailState: IQuerySingleState<ITravelGetByIdRequest, ITravelRequestDetail>;
}

export type WithTravelRequestDetail = PropsFromState;

const withTravelRequestDetail = (WrappedComponent: React.ComponentType) => { 
  const displayName = `WithTravelRequestDetail(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  
  const withTravelRequestDetailWrapper: React.SFC<WithTravelRequestDetail> = props => <WrappedComponent {...props} />;

  const mapStateToProps = ({ travelRequestGetById }: IAppState) => ({
    travelDetailState: travelRequestGetById
  });

  return compose<WithTravelRequestDetail, {}>(
    setDisplayName(displayName),
    connect(mapStateToProps)
  )(withTravelRequestDetailWrapper);
};

export default withTravelRequestDetail;