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

import { withAnnouncement, WithAnnouncement } from '@home/hoc/withAnnouncement';
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
  & WithAnnouncement
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
    const { isLoading } = this.props.announcementState.all;
    const { loadRequest } = this.props.announcementDispatch;

    if (!isLoading) {
      loadRequest({});
    }
  },
};

export const AnnouncementSlider = compose<AnnouncementSliderProps, IOwnOption>(
  setDisplayName('AnnouncementSlider'),
  withAnnouncement,
  injectIntl,
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters),
  lifecycle(lifecycles)
)(AnnouncementSliderView);