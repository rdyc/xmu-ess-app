import { WithAnnouncement, withAnnouncement } from '@home/hoc/withAnnouncement';
import { IStepperSource } from '@layout/components/stepper/Stepper';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import {
  compose,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
  setDisplayName,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withStateHandlers,
} from 'recompose';

import { AnnouncementSliderView } from './AnnouncementSliderView';

interface IOwnOption {

}

interface IOwnState {
  images?: IStepperSource[];
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setImages: StateHandler<IOwnState>;
}

export type AnnouncementSliderProps
  = IOwnState
  & IOwnStateUpdater
  & WithAnnouncement
  & InjectedIntlProps;

const createProps: mapper<IOwnOption, IOwnState> = (props: IOwnOption): IOwnState => ({
  
});

const stateUpdaters: StateUpdaters<AnnouncementSliderProps, IOwnState, IOwnStateUpdater> = {
  setImages: (prevState: IOwnState) => (images?: IStepperSource[]): Partial<IOwnState> => ({
    images
  })
};

const lifecycles: ReactLifeCycleFunctions<AnnouncementSliderProps, IOwnState> = {
  componentDidMount() {
    const { isLoading } = this.props.announcementState.all;
    const { loadRequest } = this.props.announcementDispatch;

    if (!isLoading) {
      loadRequest({});
    }
  },
  componentDidUpdate(prevProps: AnnouncementSliderProps) {
    if (this.props.announcementState.all.response !== prevProps.announcementState.all.response) {
      if (this.props.announcementState.all.response && 
        this.props.announcementState.all.response.data && 
        this.props.announcementState.all.response.data.images) {
        this.props.setImages(this.props.announcementState.all.response.data.images);
      }
    }
  }
};

export const AnnouncementSlider = compose(
  setDisplayName('AnnouncementSlider'),
  withAnnouncement,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  lifecycle(lifecycles)
)(AnnouncementSliderView);