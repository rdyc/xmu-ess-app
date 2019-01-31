import AppMenu from '@constants/AppMenu';
import { ICollectionValue } from '@layout/classes/core';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { ImageGalleryField } from '@lookup/classes/types/gallery/ImageGalleryField';
import { WithImageGallery, withImageGallery } from '@lookup/hoc/withImageGallery';
import { WithStyles, withStyles } from '@material-ui/core';
import { WithWidth } from '@material-ui/core/withWidth';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps } from 'react-router';
import {
  compose,
  lifecycle,
  mapper,
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

  isLoading: boolean;

  forceReload: boolean;

  // filter
  find?: string;
  findBy?: string;

  // order
  orderBy?: string;
  direction?: 'ascending' | 'descending' | string | undefined;

  // paging
  page: number;
  size: number;

  fields: ICollectionValue[];
}

interface OwnStateUpdater extends StateHandlerMap<OwnState> {
  setImage: StateHandler<OwnState>;
  setPageNext: StateHandler<OwnState>;
  setPagePrevious: StateHandler<OwnState>;
  setPageOne: StateHandler<OwnState>;
  setField: StateHandler<OwnState>;
  setOrder: StateHandler<OwnState>;
  setSize: StateHandler<OwnState>;
}

export type ImageGalleryListProps
  = OwnOption
  & WithImageGallery
  & OwnState
  & OwnStateUpdater
  & InjectedIntlProps
  & RouteComponentProps
  & WithLayout
  & WithStyles<typeof styles>
  & WithWidth;

const createProps: mapper<OwnOption, OwnState> = (props: OwnOption): OwnState => ({
  forceReload: false,
  isLoading: false,
  page: 1,
  size: 10,
  fields: Object.keys(ImageGalleryField)
        .map(key => ({
          value: key,
          name: ImageGalleryField[key]
        })),
});

const stateUpdaters: StateUpdaters<OwnOption, OwnState, OwnStateUpdater> = {
  setForceReload: (prev: OwnState) => (toFirst?: boolean): Partial<OwnState> => ({
    page: toFirst ? 1 : prev.page,
    forceReload: true
  }),
  setImage: (prevState: OwnState) => (newState: string) => ({
    imageUid: newState ? newState !== '' ? newState : undefined : undefined
  }),
  setPageNext: (prevState: OwnState) => () => ({
    page: prevState.page + 1,
    forceReload: true
  }),
  setPagePrevious: (prevState: OwnState) => () => ({
    page: prevState.page > 1 ? prevState.page - 1 : 1,
    forceReload: true
  }),
  setPageOne: (prevState: OwnState) => () => ({
    page: 1,
    forceReload: true
  }),
  setField: (prevState: OwnState) => (field: string) => ({
    orderBy: field,
    page: 1,
    forceReload: true
  }),
  setOrder: (prevState: OwnState) => (direction: string) => ({
    direction,
    page: 1,
    forceReload: true
  }),
  setSize: (prevState: OwnState) => (size: number) => ({
    size,
    page: 1,
    forceReload: true
  }),
};

const lifeCycleFunctions: ReactLifeCycleFunctions<ImageGalleryListProps, OwnState> = {
  componentDidMount() {
    const {
      layoutDispatch } = this.props;
    const { loadAllRequest } = this.props.imageGalleryDispatch;
    const { response, isLoading } = this.props.imageGalleryState.all;

    layoutDispatch.setupView({
      view: {
        uid: AppMenu.ImageGallery,
        parentUid: AppMenu.Lookup,
        title: '', // intl.formatMessage(organizationMessage.workflowSetup.page.listTitle),
        subTitle: '' // intl.formatMessage(organizationMessage.workflowSetup.page.listSubHeader)
      },
      status: {
        isNavBackVisible: false,
        isSearchVisible: true,
        isActionCentreVisible: false,
        isMoreVisible: false,
        isModeSearch: false
      },
      
    });

    if ((!response && !isLoading) || this.props.forceReload) {
      loadAllRequest({
        filter: {
          find: this.props.find,
          findBy: this.props.findBy,
          orderBy: this.props.orderBy,
          direction: this.props.direction,
          page: this.props.page,
          size: this.props.size,
        }
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
  withStyles(styles),
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  lifecycle(lifeCycleFunctions)
)(ImageGalleryListView);