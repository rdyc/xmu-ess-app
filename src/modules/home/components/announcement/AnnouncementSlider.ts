import { IStepperSource } from '@layout/components/stepper/Stepper';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import {
  compose,
  lifecycle,
  ReactLifeCycleFunctions,
  setDisplayName,
} from 'recompose';

import { withAnnouncement, WithAnnouncement } from '@home/hoc/withAnnouncement';
import { AnnouncementSliderView } from './AnnouncementSliderView';

interface IOwnOption {
  useToolbar?: boolean;
}

interface IOwnState {
  images?: IStepperSource[];
}

export type AnnouncementSliderProps
  = IOwnOption
  & IOwnState
  & WithAnnouncement
  & WithStyles<typeof styles>
  & InjectedIntlProps;

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
  lifecycle(lifecycles)
)(AnnouncementSliderView);