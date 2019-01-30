import { IAppState, IQueryCollectionState } from '@generic/interfaces';
import { IAnnouncementGetRequest, IAnnouncementPatchRequest } from '@home/classes/queries/announcement';
import { IAnnouncement } from '@home/classes/response/announcement';
import { announcementGetDispose, announcementGetRequest, announcementPatchDispose, announcementPatchRequest } from '@home/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  announcementState: {
    all: IQueryCollectionState<IAnnouncementGetRequest, IAnnouncement>;
  };
}

interface PropsFromDispatch {
  announcementDispatch: {
    // command
    patchRequest: typeof announcementPatchRequest;
    patchDispose: typeof announcementPatchDispose;

    // query
    loadRequest: typeof announcementGetRequest;
    loadDispose: typeof announcementGetDispose;
  };
}

export interface WithAnnouncement extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ announcementGet }: IAppState) => ({
  announcementState: {
    all: announcementGet,
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  announcementDispatch: {
    // command
    patchRequest: (request: IAnnouncementPatchRequest) => dispatch(announcementPatchRequest(request)),
    patchDispose: () => dispatch(announcementPatchDispose()),
    
    // query
    loadRequest: (request: IAnnouncementGetRequest) => dispatch(announcementGetRequest(request)),
    loadDispose: () => dispatch(announcementGetDispose()),
  }
});

export const withAnnouncement = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);