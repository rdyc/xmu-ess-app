import AppMenu from '@constants/AppMenu';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithImageGallery, withImageGallery } from '@lookup/hoc/withImageGallery';
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
import { ImageGalleryListView } from './ImageGalleryListView';

interface OwnOption {
}

interface OwnState {
  imageUid?: string;
}

interface OwnStateUpdater extends StateHandlerMap<OwnState> {
  setCompany: StateHandler<OwnState>;
}

export type ImageGalleryListProps
  = OwnOption
  & WithImageGallery
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

const lifeCycleFunctions: ReactLifeCycleFunctions<ImageGalleryListProps, OwnState> = {
  componentWillMount() {
    const { 
      layoutDispatch    } = this.props;
    const { loadAllRequest } = this.props.imageGalleryDispatch;
    const { response, isLoading } = this.props.imageGalleryState.all;

    layoutDispatch.setupView({
      view: {
        uid: AppMenu.LookupDiem,
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
      loadAllRequest({
      });
    }
  },
  componentWillUnmount() {
    const { layoutDispatch } = this.props;
    const { loadAllDispose } = this.props.imageGalleryDispatch;
    
    layoutDispatch.changeView(null);
    layoutDispatch.modeListOff();
    layoutDispatch.searchHide();
    layoutDispatch.modeSearchOff();
    layoutDispatch.moreHide();
    loadAllDispose();
  }
};

export const ImageGalleryList = compose<ImageGalleryListProps, {}>(
  withLayout,
  withImageGallery,
  injectIntl,
  withStateHandlers({}, stateUpdaters),
  lifecycle(lifeCycleFunctions)
)(ImageGalleryListView);