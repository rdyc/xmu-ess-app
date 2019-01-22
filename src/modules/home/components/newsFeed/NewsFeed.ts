import { WithNewsFeed, withNewsFeed } from '@home/hoc/withNewsFeed';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, lifecycle, ReactLifeCycleFunctions, setDisplayName } from 'recompose';

import { NewsFeedView } from './NewsFeedView';

interface IOwnOption {

}

export type NewsFeedProps
  = IOwnOption
  & WithNewsFeed
  & WithStyles<typeof styles>
  & InjectedIntlProps;

const lifeCycles: ReactLifeCycleFunctions<NewsFeedProps, {}> = {
  componentDidMount() {
    const { isLoading, response } = this.props.newsFeedState.all;
    const { loadRequest } = this.props.newsFeedDispatch;
    
    if (!isLoading && !response) {
      loadRequest({});
    }
  }
};

export const NewsFeed = compose<NewsFeedProps, IOwnOption>(
  setDisplayName('NewsFeed'),
  injectIntl,
  withNewsFeed,
  withStyles(styles),
  lifecycle(lifeCycles)
)(NewsFeedView);