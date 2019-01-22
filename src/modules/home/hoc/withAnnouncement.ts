import { IAppState, IQuerySingleState } from '@generic/interfaces';
import { IAnnouncementGetRequest } from '@home/classes/queries/announcement';
import { IAnnouncement } from '@home/classes/response/announcement';
import { announcementGetDispose, announcementGetRequest } from '@home/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  announcementState: {
    all: IQuerySingleState<IAnnouncementGetRequest, IAnnouncement>;
  };
}

interface PropsFromDispatch {
  announcementDispatch: {
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
    // query
    loadRequest: (request: IAnnouncementGetRequest) => dispatch(announcementGetRequest(request)),
    loadDispose: () => dispatch(announcementGetDispose()),
  }
});

export const withAnnouncement = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);