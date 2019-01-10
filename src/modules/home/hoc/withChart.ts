import { IAppState, IQueryCollectionState } from '@generic/interfaces';
import { IChartGetAllRequest } from '@home/classes/queries';
import { IChart } from '@home/classes/response';
import { chartGetAllDispose, chartGetAllRequest } from '@home/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  chartState: {
    all: IQueryCollectionState<IChartGetAllRequest, IChart>;
  };
}

interface PropsFromDispatch {
  chartDispatch: {
    // query
    loadAllRequest: typeof chartGetAllRequest;
    loadAllDispose: typeof chartGetAllDispose;
  };
}

export interface WithChart extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ chartGetAll }: IAppState) => ({
  chartState: {
    all: chartGetAll,
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  chartDispatch: {
    // query
    loadAllRequest: (request: IChartGetAllRequest) => dispatch(chartGetAllRequest(request)),
    loadAllDispose: () => dispatch(chartGetAllDispose()),
  }
});

export const withChart = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);