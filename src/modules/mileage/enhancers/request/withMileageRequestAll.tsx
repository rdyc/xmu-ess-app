import { IAppState, IQueryCollectionState } from '@generic/interfaces';
import { IMileageRequestGetAllRequest } from '@mileage/classes/queries';
import { IMileageRequest } from '@mileage/classes/response';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, setDisplayName } from 'recompose';

interface PropsFromState {
  mileagerequestAllState: IQueryCollectionState<
    IMileageRequestGetAllRequest,
    IMileageRequest
  >;
}

export type WithMileageRequestAll = PropsFromState;

const withMileageRequestAll = (
  WrappedComponent: React.ComponentType
) => {
  const displayName = `WithMileageRequestAll(${WrappedComponent.displayName ||
    WrappedComponent.name ||
    'Component'})`;

  const withMileageRequestAllWrapper: React.SFC<
    WithMileageRequestAll
  > = props => <WrappedComponent {...props} />;

  const mapStateToProps = ({ mileagerequestGetAll }: IAppState) => ({
    mileagerequestAllState: mileagerequestGetAll
  });

  return compose<WithMileageRequestAll, {}>(
    setDisplayName(displayName),
    connect(mapStateToProps)
  )(withMileageRequestAllWrapper);
};

export default withMileageRequestAll;
