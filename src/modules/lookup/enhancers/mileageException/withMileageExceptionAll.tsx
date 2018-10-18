import { IAppState, IQueryCollectionState } from '@generic/interfaces';
import { IMileageExceptionAllRequest } from '@lookup/classes/queries';
import { IMileageException } from '@lookup/classes/response';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, setDisplayName } from 'recompose';

interface PropsFromState {
  mileageExceptionAllState: IQueryCollectionState<
    IMileageExceptionAllRequest,
    IMileageException
  >;
}

export type WithMileageExceptionAll = PropsFromState;

const withMileageExceptionAll = (WrappedComponent: React.ComponentType) => {
  const displayName = `WithMileageExceptionAll(${WrappedComponent.displayName ||
    WrappedComponent.name ||
    'Component'})`;

  const withMileageExceptionAllWrapper: React.SFC<
    WithMileageExceptionAll
  > = props => <WrappedComponent {...props} />;

  const mapStateToProps = ({ mileageExceptionGetAll }: IAppState) => ({
    mileageExceptionAllState: mileageExceptionGetAll
  });

  return compose<WithMileageExceptionAll, {}>(
    setDisplayName(displayName),
    connect(mapStateToProps)
  )(withMileageExceptionAllWrapper);
};

export default withMileageExceptionAll;
