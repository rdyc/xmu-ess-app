import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { IGalleryGetAllRequest, IGalleryGetDetailRequest, IGalleryPostRequest } from '@lookup/classes/queries/gallery';
import { IGallery } from '@lookup/classes/response/gallery';
import {
  lookupImageGalleryGetAllDispose,
  lookupImageGalleryGetAllRequest,
  lookupImageGalleryGetByIdDispose,
  lookupImageGalleryGetByIdRequest,
  lookupImageGalleryPostDispose,
  lookupImageGalleryPostRequest,
} from '@lookup/store/actions';
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
    // command
    createRequest: typeof lookupImageGalleryPostRequest;
    createDispose: typeof lookupImageGalleryPostDispose;
    
    // query
    loadAllRequest: typeof lookupImageGalleryGetAllRequest;
    loadAllDispose: typeof lookupImageGalleryGetAllDispose;
    loadDetailRequest: typeof lookupImageGalleryGetByIdRequest;
    loadDetailDispose: typeof lookupImageGalleryGetByIdDispose;
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
    // command
    createRequest: (request: IGalleryPostRequest) => dispatch(lookupImageGalleryPostRequest(request)),
    createDispose: () => dispatch(lookupImageGalleryPostDispose()),

    // query
    loadAllRequest: (request: IGalleryGetAllRequest) => dispatch(lookupImageGalleryGetAllRequest(request)),
    loadAllDispose: () => dispatch(lookupImageGalleryGetAllDispose()),
    loadDetailRequest: (request: IGalleryGetDetailRequest) => dispatch(lookupImageGalleryGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(lookupImageGalleryGetByIdDispose()),
  }
});

export const withImageGallery = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);