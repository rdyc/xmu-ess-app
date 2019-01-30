import AppMenu from '@constants/AppMenu';
import { withAnnouncement, WithAnnouncement } from '@home/hoc/withAnnouncement';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithWidth } from '@material-ui/core/withWidth';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps } from 'react-router';
import {
  compose,
  lifecycle,
  ReactLifeCycleFunctions,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withStateHandlers,
} from 'recompose';
import { AnnouncementEditorView } from './AnnouncementEditorView';

interface OwnOption {
}

interface OwnState {
  imageUid?: string;
  announcementImages?: IAnnouncementImage[];
}

interface OwnStateUpdater extends StateHandlerMap<OwnState> {
  setCompany: StateHandler<OwnState>;
}

export interface IAnnouncementImage {
  imageUid: string;
  imageName: string;
  order: number;
  imgPath: string;
}

export type AnnouncementEditorProps
  = OwnOption
  & WithAnnouncement
  & OwnState
  & OwnStateUpdater
  & InjectedIntlProps
  & RouteComponentProps
  & WithLayout
  & WithWidth;

const stateUpdaters: StateUpdaters<OwnOption, OwnState, OwnStateUpdater> = {
  setCompany: (prevState: OwnState) => (newState: string) => ({
    imageUid: newState ? newState !== '' ? newState : undefined : undefined
  })
};

const lifeCycleFunctions: ReactLifeCycleFunctions<AnnouncementEditorProps, OwnState> = {
  componentWillMount() {
    const { 
      layoutDispatch    } = this.props;
    const { loadRequest } = this.props.announcementDispatch;
    const { response, isLoading } = this.props.announcementState.all;

    layoutDispatch.setupView({
      view: {
        uid: AppMenu.Gallery,
        parentUid: AppMenu.Lookup,
        title: '', // intl.formatMessage(organizationMessage.workflowSetup.page.listTitle),
        subTitle : '' // intl.formatMessage(organizationMessage.workflowSetup.page.listSubHeader)
      },
      status: {
        isNavBackVisible: false,
        isSearchVisible: false,
        isActionCentreVisible: false,
        isMoreVisible: false,
        isModeSearch: false
      }
    });

    if (!response && !isLoading) {
      loadRequest({
      });
    }
  },
  componentWillUnmount() {
    const { layoutDispatch } = this.props;
    const { loadDispose } = this.props.announcementDispatch;
    
    layoutDispatch.changeView(null);
    layoutDispatch.modeListOff();
    layoutDispatch.searchHide();
    layoutDispatch.modeSearchOff();
    layoutDispatch.moreHide();
    loadDispose();
  }
};

export const AnnouncementEditor = compose<AnnouncementEditorProps, {}>(
  withLayout,
  withAnnouncement,
  injectIntl,
  withStateHandlers({}, stateUpdaters),
  lifecycle(lifeCycleFunctions)
)(AnnouncementEditorView);