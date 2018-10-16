import { IAppState, IQuerySingleState } from '@generic/interfaces';
import { IMileageRequestGetByIdRequest } from '@mileage/classes/queries';
import { IMileageRequestDetail } from '@mileage/classes/response';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, setDisplayName } from 'recompose';

interface PropsFromState {
  mileagerequestDetailState: IQuerySingleState<IMileageRequestGetByIdRequest, IMileageRequestDetail>;
}

export type WithMileageRequestDetail = PropsFromState;

const withMileageRequestDetail = (WrappedComponent: React.ComponentType) => {
  const displayName = `WithMileageRequestDetail(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  const withMileageRequestDetailWrapper: React.SFC<WithMileageRequestDetail> = props => <WrappedComponent {...props} />;

  const mapStateToProps = ({ mileagerequestGetById }: IAppState) => ({
    mileagerequestDetailState: mileagerequestGetById
  });

  return compose<WithMileageRequestDetail, {}>(
    setDisplayName(displayName),
    connect(mapStateToProps),
  )(withMileageRequestDetailWrapper);
};

export default withMileageRequestDetail;