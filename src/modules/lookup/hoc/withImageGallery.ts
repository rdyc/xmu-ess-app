import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { IGalleryGetAllRequest, IGalleryGetDetailRequest } from '@lookup/classes/queries/gallery';
import { IGallery } from '@lookup/classes/response/gallery';
import { imageGalleryGetAllDispose, imageGalleryGetAllRequest, imageGalleryGetByIdDispose, imageGalleryGetByIdRequest } from '@lookup/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  imageGalleryState: {
    all: IQueryCollectionState<IGalleryGetAllRequest, IGallery>;
    detail: IQuerySingleState<IGalleryGetDetailRequest, IGallery>;
  };
}

interface PropsFromDispatch {
  imageGalleryDispatch: {
    // query
    loadAllRequest: typeof imageGalleryGetAllRequest;
    loadAllDispose: typeof imageGalleryGetAllDispose;
    loadDetailRequest: typeof imageGalleryGetByIdRequest;
    loadDetailDispose: typeof imageGalleryGetByIdDispose;
  };
}

export interface WithImageGallery extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ imageGalleryGetAll, imageGalleryGetById }: IAppState) => ({
  imageGalleryState: {
    all: imageGalleryGetAll,
    detail: imageGalleryGetById,
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  imageGalleryDispatch: {
    // query
    loadAllRequest: (request: IGalleryGetAllRequest) => dispatch(imageGalleryGetAllRequest(request)),
    loadAllDispose: () => dispatch(imageGalleryGetAllDispose()),
    loadDetailRequest: (request: IGalleryGetDetailRequest) => dispatch(imageGalleryGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(imageGalleryGetByIdDispose()),
  }
});

export const withImageGallery = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);