import { IAppState, IQuerySingleState } from '@generic/interfaces';
import { IChartGetDetailRequest } from '@home/classes/queries';
import { IChart } from '@home/classes/response';
import { chartGetDetailDispose, chartGetDetailRequest } from '@home/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  chartState: {
    detail: IQuerySingleState<IChartGetDetailRequest, IChart>;
  };
}

interface PropsFromDispatch {
  chartDispatch: {
    // query
    loadAllRequest: typeof chartGetDetailRequest;
    loadAllDispose: typeof chartGetDetailDispose;
  };
}

export interface WithChart extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ chartGetDetail }: IAppState) => ({
  chartState: {
    detail: chartGetDetail,
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  chartDispatch: {
    // query
    loadAllRequest: (request: IChartGetDetailRequest) => dispatch(chartGetDetailRequest(request)),
    loadAllDispose: () => dispatch(chartGetDetailDispose()),
  }
});

export const withChart = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);