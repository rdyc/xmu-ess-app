import { IStepperSource } from '@layout/components/stepper/Stepper';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
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

import { withSlider, WithSlider } from '@home/hoc/withSlider';
import { AnnouncementSliderView } from './AnnouncementSliderView';

interface IOwnOption {
  useToolbar?: boolean;
}

interface IOwnState {
  images?: IStepperSource[];
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setImages: StateHandler<IOwnState>;
}

export type AnnouncementSliderProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & WithSlider
  & WithStyles<typeof styles>
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
    const { isLoading } = this.props.sliderState.list;
    const { loadListRequest } = this.props.sliderDispatch;

    if (!isLoading) {
      loadListRequest({});
    }
  },
  // componentDidUpdate(prevProps: AnnouncementSliderProps) {
  //   if (this.props.announcementState.all.response !== prevProps.announcementState.all.response) {
  //     if (this.props.announcementState.all.response && 
  //       this.props.announcementState.all.response.data && 
  //       this.props.announcementState.all.response.data.images) {
  //       this.props.setImages(this.props.announcementState.all.response.data.images);
  //     }
  //   }
  // }
};

export const AnnouncementSlider = compose<AnnouncementSliderProps, IOwnOption>(
  setDisplayName('AnnouncementSlider'),
  withSlider,
  injectIntl,
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters),
  lifecycle(lifecycles)
)(AnnouncementSliderView);