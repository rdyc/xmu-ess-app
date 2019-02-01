
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { IGallery } from '@lookup/classes/response/gallery';
import { WithImageGallery, withImageGallery } from '@lookup/hoc/withImageGallery';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
  setDisplayName,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';
import { AddImageEditorView } from './AddImageEditorView';

interface OwnOption {
  isOpen: boolean;
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
  handleCheckbox: (image: IGallery) => void;
  imageGalleries: IGallery[];
}

interface OwnState {
  page: number;
  // reload: boolean;
}

interface OwnStateUpdater extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
  setPageNext: StateHandler<OwnState>;
  setPagePrevious: StateHandler<OwnState>;
}

interface OwnHandler {

}

export type AddImageEditorProps
  = OwnOption
  & OwnState
  & OwnStateUpdater
  & OwnHandler
  & WithStyles<typeof styles>
  & WithLayout
  & WithImageGallery
  & InjectedIntlProps;

const createProps: mapper<AddImageEditorProps, OwnState> = (): OwnState => ({
  page: 1,
});

const stateUpdaters: StateUpdaters<AddImageEditorProps, OwnState, OwnStateUpdater> = { 
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),
  setPageNext: (prevState: OwnState) => () => ({
    page: prevState.page + 1,
  }),
  setPagePrevious: (prevState: OwnState) => () => ({
    page: prevState.page > 1 ? prevState.page - 1 : 1,
  }),
};

const handlerCreators: HandleCreators<AddImageEditorProps, OwnHandler> = {

};

const lifecycles: ReactLifeCycleFunctions<AddImageEditorProps, OwnState> = { 
  componentDidMount() {
    const { loadAllRequest } = this.props.imageGalleryDispatch;
    const { response, isLoading } = this.props.imageGalleryState.all;
    const { page } = this.props;

    if (!response && !isLoading) {
      loadAllRequest({
        filter: {
          page,
          find: undefined,
          findBy: undefined,
          orderBy: undefined,
          direction: 'descending',
          size: undefined,
        }
      });
    }
  },
  componentDidUpdate(prevProps: AddImageEditorProps) {
    const { loadAllRequest } = this.props.imageGalleryDispatch;
    const { page } = this.props;

    if (prevProps.page !== this.props.page) {
      loadAllRequest({
        filter: {
          page,
          find: undefined,
          findBy: undefined,
          orderBy: undefined,
          direction: 'descending',
          size: undefined,
        }
      });
    }
  }
};

export const AddImageEditor = compose<AddImageEditorProps, OwnOption>(
  setDisplayName('AddImageEditor'),
  withLayout,
  withImageGallery,
  withStyles(styles),
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(AddImageEditorView);