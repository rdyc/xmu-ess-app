import { ISystemListRequest } from '@common/classes/queries';
import { activityGetListRequest, currencyGetListRequest, projectGetListRequest } from '@common/store/actions';
import { connect } from 'react-redux';
import { compose, HandleCreators, setDisplayName, withHandlers } from 'recompose';
import { Dispatch } from 'redux';

export interface WithApiCommonSystemListHandlers {
  commonGetListRequest: (request: ISystemListRequest) => void;
}

interface PropsFromDispatch {
  commonListDispatch: {
    getActivityListRequest: typeof activityGetListRequest;
    getCurrencyListRequest: typeof currencyGetListRequest;
    getProjectListRequest: typeof projectGetListRequest;
  };
}

type AllProps = PropsFromDispatch;

const handlerCreators: HandleCreators<AllProps, WithApiCommonSystemListHandlers> = {
  commonGetListRequest: (props: AllProps) => (request: ISystemListRequest) => {
    switch (request.category) {
      case 'activity':
        props.commonListDispatch.getActivityListRequest(request);
        break;

      case 'currency':
        props.commonListDispatch.getCurrencyListRequest(request);
        break;

      case 'project':
        props.commonListDispatch.getProjectListRequest(request);
        break;
    
      default:
        break;
    }
  }
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  commonListDispatch: {
    getActivityListRequest: (request: ISystemListRequest) => dispatch(activityGetListRequest(request)),
    getCurrencyListRequest: (request: ISystemListRequest) => dispatch(currencyGetListRequest(request)),
    getProjectListRequest: (request: ISystemListRequest) => dispatch(projectGetListRequest(request)),
  }
});

export default compose<AllProps, {}>(
  setDisplayName('WithApiCommonSystemList'),
  connect(undefined, mapDispatchToProps),
  withHandlers<AllProps, WithApiCommonSystemListHandlers>(handlerCreators),
);