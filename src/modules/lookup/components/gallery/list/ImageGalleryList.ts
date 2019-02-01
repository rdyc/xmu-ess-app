import AppMenu from '@constants/AppMenu';
import { ICollectionValue } from '@layout/classes/core';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { ImageGalleryField } from '@lookup/classes/types/gallery/ImageGalleryField';
import { WithImageGallery, withImageGallery } from '@lookup/hoc/withImageGallery';
import { WithStyles, withStyles } from '@material-ui/core';
import { WithWidth } from '@material-ui/core/withWidth';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import PictureInPictureIcon from '@material-ui/icons/PictureInPicture';
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
  direction?: 'ascending' | 'descending' | string | undefined;

  // paging
  page: number;
  size: number;

  fields: ICollectionValue[];
}

interface OwnHandler {
  handleOnSearch: (find: string | undefined, field: ICollectionValue | undefined) => void;
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
}

export type ImageGalleryListProps
  = OwnOption
  & WithImageGallery
  & WithUser
  & OwnState
  & OwnStateUpdater
  & InjectedIntlProps
  & RouteComponentProps
  & OwnHandler
  & WithLayout
  & WithStyles<typeof styles>
  & WithAppBar
  & WithWidth;

const createProps: mapper<OwnOption, OwnState> = (props: OwnOption): OwnState => ({
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
  }
};

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
  setSearchDefault: (prevState: OwnState) => (find: string, field: ICollectionValue | undefined) => ({
    find: undefined,
    findBy: undefined,
    page: 1,
    forceReload: true
  }),
  setSearchResult: (prevState: OwnState) => (find: string, field: ICollectionValue | undefined) => ({
    find,
    findBy: field ? field.value : undefined,
    page: 1,
    // forceReload: true
  }),
  setPagePrevious: (prevState: OwnState) => () => ({
    page: prevState.page > 1 ? prevState.page - 1 : 1,
    forceReload: true
  }),
  setPageOne: (prevState: OwnState) => () => ({
    page: 1,
    size: 12,
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
    const { response, isLoading } = this.props.imageGalleryState.all;

    layoutDispatch.setupView({
      view: {
        uid: AppMenu.ImageGallery,
        parentUid: AppMenu.Lookup,
        title: 'Gallery', 
        subTitle: '' 
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
      loadData(this.props);
    }

     // assign search callback
    this.props.appBarDispatch.assignSearchCallback(this.props.handleOnSearch);    

    this.props.appBarDispatch.assignControls([
      {
        icon: PictureInPictureIcon ,
        onClick: () => { 
          // redirect to manage image slider 
        }
      },
      {
        icon: AddCircleIcon,
        onClick: () => { 
          this.props.history.push('/lookup/imagegalleries/form'); 
        }
      }
    ],
    );
  },
  componentDidUpdate(props: ImageGalleryListProps, state: OwnState) {
    // only load when these props are different
    if (
      this.props.orderBy !== props.orderBy ||
      this.props.direction !== props.direction ||
      this.props.page !== props.page ||
      this.props.size !== props.size
    ) {
      loadData(this.props);
    }

    // search
    if (this.props.find !== props.find || this.props.findBy !== props.findBy) {
      loadData(this.props);
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
    this.props.appBarDispatch.dispose();
    loadAllDispose();
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
      message: 'Unable to find current user state'
    });
  }
};

export const ImageGalleryList = compose<ImageGalleryListProps, {}>(
  withLayout,
  withUser,
  withAppBar,
  withImageGallery,
  withStyles(styles),
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions)
)(ImageGalleryListView);