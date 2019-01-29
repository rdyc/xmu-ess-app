import { IAppState, IQueryCollectionState } from '@generic/interfaces';
import { ISliderGetRequest, ISliderPatchRequest } from '@home/classes/queries/slider';
import { ISliderList } from '@home/classes/response/slider';
import { sliderGetDispose, sliderGetRequest, sliderPatchDispose, sliderPatchRequest } from '@home/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  sliderState: {
    list: IQueryCollectionState<ISliderGetRequest, ISliderList>;
  };
}

interface PropsFromDispatch {
  sliderDispatch: {
    // command
    patchRequest: typeof sliderPatchRequest;
    patchDispose: typeof sliderPatchDispose;

    // query
    loadListRequest: typeof sliderGetRequest;
    loadListDispose: typeof sliderGetDispose;
  };
}

export interface WithSlider extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ sliderGet }: IAppState) => ({
  sliderState: {
    list: sliderGet
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  sliderDispatch: {
    // command
    patchRequest: (request: ISliderPatchRequest) => dispatch(sliderPatchRequest(request)),
    patchDispose: () => dispatch(sliderPatchDispose()),
    
    // query
    loadListRequest: (request: ISliderGetRequest) => dispatch(sliderGetRequest(request)),
    loadListDispose: () => dispatch(sliderGetDispose()),
  }
});

export const withSlider = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);