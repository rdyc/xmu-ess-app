import AppMenu from '@constants/AppMenu';
import { IAnnouncementPatchPayload } from '@home/classes/request/announcement';
import { IAnnouncement } from '@home/classes/response/announcement';
import { withAnnouncement, WithAnnouncement } from '@home/hoc/withAnnouncement';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { IGallery } from '@lookup/classes/response/gallery';
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
import { Dispatch } from 'redux';
import { FormErrors } from 'redux-form';
import { isObject } from 'util';
import { AnnouncementEditorView } from './AnnouncementEditorView';

interface OwnOption {
}

interface OwnState {
  imageUid?: string;
  announcementImages: IAnnouncementImage[];
  loadImages: boolean;
  enableReset: boolean;
  imageGalleries: IGallery[];
  isAddImageOpen: boolean;
}

interface OwnHandlers {
  handleSetAnnouncementImages: (images: IAnnouncement[]) => void;
  handleAddAnnouncementImage: (imageGallery: IGallery[]) => void;
  handleRemoveAnnouncementImage: (imageUid: string) => void;
  handleMoveAnnouncementImage: (index: number, direction: 'forward' | 'backward') => void;
  handleSubmitAnnouncement: () => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
  handleCheckbox: (image: IGallery) => void;
  handleAddImageVisibility: (event: React.MouseEvent<HTMLElement>) => void;
}

interface OwnStateUpdater extends StateHandlerMap<OwnState> {
  updateImages: StateHandler<OwnState>;
  afterLoad: StateHandler<OwnState>;
  changeReset: StateHandler<OwnState>;
  stateCheckbox: StateHandler<OwnState>;
  setAddImageVisibility: StateHandler<OwnState>;
}

export interface IAnnouncementImage {
  imageUid: string;
  imageName: string;
  order: number;
  imgPath: string;
}

export type AnnouncementEditorProps
  = OwnOption
  & InjectedIntlProps
  & OwnHandlers
  & WithAnnouncement
  & OwnState
  & OwnStateUpdater
  & InjectedIntlProps
  & RouteComponentProps
  & WithLayout
  & WithWidth
  & WithStyles<typeof styles>;

const createProps: mapper<AnnouncementEditorProps, OwnState> = (props: AnnouncementEditorProps): OwnState => ({ 
  announcementImages: [],
  loadImages: true,
  enableReset: true,
  imageGalleries: [],
  isAddImageOpen: false,
});

const handlerCreators: HandleCreators<AnnouncementEditorProps, OwnHandlers> = {
  handleSetAnnouncementImages: (props: AnnouncementEditorProps) => (images: IAnnouncement[]) => {
    const announcementImages: IAnnouncementImage[] = images.map((item, index) => 
      ({
      imageUid: item.imageUid,
      imageName: item.name,
      order: index + 1,
      imgPath: item.path && item.path.medium,
      })
    );

    props.afterLoad();
    props.updateImages(announcementImages);
  },
  handleAddAnnouncementImage: (props: AnnouncementEditorProps) => (imageGallery: IGallery[]) => {
    const addAnnouncementImages = imageGallery.map((item, index) => ({
      imageUid: item.uid,
      imageName: item.name,
      order: props.announcementImages.length + index + 1,
      imgPath: item.path && item.path.small,
    }));

    const newAnnouncementImages = props.announcementImages.concat(addAnnouncementImages);

    rearrangeImages(props, newAnnouncementImages);
  },
  handleRemoveAnnouncementImage: (props: AnnouncementEditorProps) => (imageUid: string) => {
    const newAnnouncementImages = props.announcementImages.filter(image => {
      return image.imageUid !== imageUid;
    });

    rearrangeImages(props, newAnnouncementImages);
  },
  handleMoveAnnouncementImage: (props: AnnouncementEditorProps) => (index: number, direction: 'forward' | 'backward') => {
    const newAnnouncementImages = props.announcementImages;

    if (direction === 'forward') {
      const currentImage = newAnnouncementImages[index];

      newAnnouncementImages[index] = newAnnouncementImages[index + 1];
      newAnnouncementImages[index + 1] = currentImage;
    } else if (direction === 'backward') {
      const currentImage = newAnnouncementImages[index];

      newAnnouncementImages[index] = newAnnouncementImages[index - 1];
      newAnnouncementImages[index - 1] = currentImage;
    }

    rearrangeImages(props, newAnnouncementImages);
  },
  handleSubmitAnnouncement: (props: AnnouncementEditorProps) => () => {
    props.changeReset();

    const itemAnnouncement = props.announcementImages.map(item => ({
      imageUid: item.imageUid,
      order: item.order,
    }));

    const payload = ({
      items: itemAnnouncement,
    });

    return new Promise((resolve, reject) => {
      props.announcementDispatch.patchRequest({
        resolve,
        reject,
        data: payload as IAnnouncementPatchPayload,
      });
    });
  },
  handleSubmitSuccess: (props: AnnouncementEditorProps) => (response: IAnnouncement[]) => {
    const { intl } = props;
    const { alertAdd } = props.layoutDispatch;
    
    let message: string = '';
    props.announcementDispatch.loadDispose();

    message = intl.formatMessage(lookupMessage.gallery.message.updateAnnouncementSuccess);

    alertAdd({
      message,
      time: new Date()
    });

    const announcementImages: IAnnouncementImage[] = response.map((item, index) => 
      ({
      imageUid: item.imageUid,
      imageName: item.name,
      order: index + 1,
      imgPath: item.path && item.path.medium,
      })
    );

    props.updateImages(announcementImages);
    props.announcementDispatch.loadRequest({});
    props.changeReset();
  },
  handleSubmitFail: (props: AnnouncementEditorProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
    const { intl } = props;
    const { alertAdd } = props.layoutDispatch;
    
    if (errors) {
      // validation errors from server (400: Bad Request)
      alertAdd({
        time: new Date(),
        message: isObject(submitError) ? submitError.message : submitError
      });
    } else {
      // another errors from server
      let message: string = '';

      message = intl.formatMessage(lookupMessage.gallery.message.updateAnnouncementFailure);

      alertAdd({
        message,
        time: new Date(),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }, 
  handleCheckbox: (props: AnnouncementEditorProps) => (image: IGallery) => {
    const { imageGalleries, stateCheckbox } = props;
    const _image = new Set(imageGalleries);

    _image.has(image)
      ? _image.delete(image)
      : _image.add(image);

    stateCheckbox(Array.from(_image));
  },
  handleAddImageVisibility: (props: AnnouncementEditorProps) => () => {
    props.setAddImageVisibility();
  }
};

const rearrangeImages = (props: AnnouncementEditorProps, newImages: IAnnouncementImage[]) => {
  const announcementImages = newImages.map((item, index) => 
      ({
      imageUid: item.imageUid,
      imageName: item.imageName,
      order: index + 1,
      imgPath: item.imgPath,
      })
    );

  props.updateImages(announcementImages);
};

const stateUpdaters: StateUpdaters<OwnOption, OwnState, OwnStateUpdater> = {
  updateImages: (prevState: OwnState) => (images: IAnnouncementImage[]) => ({
    announcementImages: images
  }),
  afterLoad: (prevState: OwnState) => () => ({
    loadImages: false,
  }),
  changeReset: (prevState: OwnState) => () => ({
    enableReset: !prevState.enableReset,
  }),
  stateCheckbox: (prevState: OwnState) => (imageGalleries: IGallery[]) => ({
    imageGalleries
  }),
  setAddImageVisibility: (prevState: OwnState) => () => ({
    isAddImageOpen: !prevState.isAddImageOpen
  })
};

const lifeCycleFunctions: ReactLifeCycleFunctions<AnnouncementEditorProps, OwnState> = {
  componentWillMount() {
    const { layoutDispatch } = this.props;
    const { loadRequest } = this.props.announcementDispatch;
    const { response, isLoading } = this.props.announcementState.all;

    layoutDispatch.setupView({
      view: {
        uid: AppMenu.ImageGallery,
        parentUid: AppMenu.Lookup,
        title: this.props.intl.formatMessage(lookupMessage.gallery.page.modifyAnnouncementTitle),
        subTitle : '' // intl.formatMessage(organizationMessage.workflowSetup.page.listSubHeader)
      },
      status: {
        isNavBackVisible: true,
        isSearchVisible: false,
        isActionCentreVisible: false,
        isMoreVisible: false,
        isModeSearch: false
      }
    });

    if (!response && !isLoading) {
      loadRequest({});
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
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters),
  withHandlers<AnnouncementEditorProps, OwnHandlers>(handlerCreators),
  lifecycle(lifeCycleFunctions)
)(AnnouncementEditorView);