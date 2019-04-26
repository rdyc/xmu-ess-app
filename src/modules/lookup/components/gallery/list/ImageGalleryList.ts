import AppMenu from '@constants/AppMenu';
import { DirectionType } from '@generic/types';
import { ICollectionValue } from '@layout/classes/core';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { ImageGalleryField } from '@lookup/classes/types/gallery/ImageGalleryField';
import { WithImageGallery, withImageGallery } from '@lookup/hoc/withImageGallery';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { WithStyles, withStyles } from '@material-ui/core';
import { WithWidth } from '@material-ui/core/withWidth';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps } from 'react-router';
import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
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
  direction?: DirectionType;

  // paging
  page: number;
  size: number;

  fields: ICollectionValue[];

  customComponent?: React.ReactNode;
  customComponentFlag: boolean;
}

interface OwnHandler {
  handleOnSearch: (find: string | undefined, field: ICollectionValue | undefined) => void;
  handleOnLoad: () => void;
}

interface OwnStateUpdater extends StateHandlerMap<OwnState> {
  setImage: StateHandler<OwnState>;
  setPageNext: StateHandler<OwnState>;
  setPagePrevious: StateHandler<OwnState>;
  setPageOne: StateHandler<OwnState>;
  setField: StateHandler<OwnState>;
  setOrder: StateHandler<OwnState>;
  setSize: StateHandler<OwnState>;
  setSearchDefault: StateHandler<OwnState>;
  setSearchResult: StateHandler<OwnState>;
  setCustomComponent: StateHandler<OwnState>;
  setCustomComponentFlag: StateHandler<OwnState>;
}

export type ImageGalleryListProps
  = OwnOption
  & WithImageGallery
  & WithUser
  & WithMasterPage
  & OwnState
  & OwnStateUpdater
  & InjectedIntlProps
  & RouteComponentProps
  & OwnHandler
  & WithLayout
  & WithStyles<typeof styles>
  & WithWidth;

const createProps: mapper<OwnOption, OwnState> = (): OwnState => ({
  customComponentFlag: true,
  forceReload: false,
  isLoading: false,
  page: 1,
  size: 12,
  fields: Object.keys(ImageGalleryField)
        .map(key => ({
          value: key,
          name: ImageGalleryField[key]
        })),
});

const handlerCreators: HandleCreators<ImageGalleryListProps, OwnHandler> = {
  handleOnSearch: (props: ImageGalleryListProps) => (find?: string, field?: ICollectionValue) => {
    // when find is undefided, that means user has close or exit from search mode
    if (find) {
      // set search state props for searching
      props.setSearchResult(find.trim(), field);
    } else {
      // set search state props to default
      props.setSearchDefault();
    }
  },
  handleOnLoad: (props: ImageGalleryListProps) => () => {
    loadData(props);
  },
};

const stateUpdaters: StateUpdaters<OwnOption, OwnState, OwnStateUpdater> = {
  setForceReload: (prev: OwnState) => (toFirst?: boolean): Partial<OwnState> => ({
    page: toFirst ? 1 : prev.page,
    forceReload: true
  }),
  setImage: () => (newState: string) => ({
    imageUid: newState ? newState !== '' ? newState : undefined : undefined
  }),
  setPageNext: (prevState: OwnState) => () => ({
    page: prevState.page + 1,
    forceReload: true
  }),
  setSearchDefault: () => () => ({
    find: undefined,
    findBy: undefined,
    page: 1,
    forceReload: true
  }),
  setSearchResult: () => (find: string, field: ICollectionValue | undefined) => ({
    find,
    findBy: field ? field.value : undefined,
    page: 1,
    // forceReload: true
  }),
  setPagePrevious: (prevState: OwnState) => () => ({
    page: prevState.page > 1 ? prevState.page - 1 : 1,
    forceReload: true
  }),
  setPageOne: () => () => ({
    page: 1,
    size: 12,
    forceReload: true
  }),
  setField: () => (field: string) => ({
    orderBy: field,
    page: 1,
    forceReload: true
  }),
  setOrder: () => (direction: DirectionType) => ({
    direction,
    page: 1,
    forceReload: true
  }),
  setSize: () => (size: number) => ({
    size,
    page: 1,
    forceReload: true
  }),
  setCustomComponent: () => (customComponent: React.ReactNode) => ({
    customComponent
  }),
  setCustomComponentFlag: () => () => ({
    customComponentFlag: false
  })
};

const lifeCycleFunctions: ReactLifeCycleFunctions<ImageGalleryListProps, OwnState> = {
  componentDidMount() {
    const { intl } = this.props;
    const { response, isLoading } = this.props.imageGalleryState.all;

    this.props.masterPage.changePage({
      uid: AppMenu.ImageGallery,
      parentUid: AppMenu.Lookup,
      title: intl.formatMessage(lookupMessage.gallery.page.listTitle),
      description : intl.formatMessage(lookupMessage.gallery.page.listTitle)
    });

    if ((!response && !isLoading) || this.props.forceReload) {
      loadData(this.props);
    }
  },
  componentDidUpdate(props: ImageGalleryListProps) {
    // if (this.props.forceReload) {
    //   loadData(this.props);
    // }
    // only load when these props are different
    if (
      this.props.orderBy !== props.orderBy ||
      this.props.direction !== props.direction ||
      this.props.page !== props.page ||
      this.props.size !== props.size ||
      this.props.forceReload !== props.forceReload
    ) {
      loadData(this.props);
    }

    // search
    if (this.props.find !== props.find || this.props.findBy !== props.findBy) {
      loadData(this.props);
    }

    //  custom component
    if (this.props.customComponent && this.props.customComponentFlag) {
      this.props.masterPage.changeCustomComponent(this.props.customComponent);
      this.props.setCustomComponentFlag();
    }
  },
  componentWillUnmount() {
    // const { masterPage } = this.props;
    // const { loadAllDispose } = this.props.imageGalleryDispatch;

    // masterPage.resetPage();

    // loadAllDispose();
  }
};

const loadData = (props: ImageGalleryListProps): void => {
  const { orderBy, direction, page, size } = props;
  const { user } = props.userState;
  const { loadAllRequest } = props.imageGalleryDispatch;
  const { alertAdd } = props.layoutDispatch;

  if (user) {
    loadAllRequest({
      filter: {
        direction,
        orderBy,
        page,
        size
      }
    }); 
  } else {
    alertAdd({
      time: new Date(),
      message: props.intl.formatMessage(lookupMessage.gallery.message.emptyProps)
    });
  }
};

export const ImageGalleryList = compose<ImageGalleryListProps, {}>(
  withLayout,
  withUser,
  withMasterPage,
  withImageGallery,
  withStyles(styles),
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions)
)(ImageGalleryListView);