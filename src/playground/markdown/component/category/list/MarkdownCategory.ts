import { withUser, WithUser } from '@layout/hoc/withUser';
import { withStyles, WithStyles } from '@material-ui/core';
import styles from '@styles';
import { WithMarkdownCategory, withMarkdownCategory } from 'playground/markdown/hoc/withMarkdownCategory';
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

import { MarkdownCategoryView } from './MarkdownCategoryView';

interface IOwnOption {
  isOpen: boolean;
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
}

interface IOwnState {
  isAddOpen: boolean;
  categoryUid: string | undefined;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  stateUpdate: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleAddOpen: () => void;
  handleChangeCategoryUid: (categoryUid: string | undefined) => void;
}

export type MarkdownCategoryProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithMarkdownCategory
  & WithUser
  & WithStyles<typeof styles>
  & InjectedIntlProps;

const createProps: mapper<IOwnOption, IOwnState> = (props: IOwnOption): IOwnState => ({
  isAddOpen: false,
  categoryUid: undefined
});

const stateUpdaters: StateUpdaters<MarkdownCategoryProps, IOwnState, IOwnStateUpdater> = {
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const handlerCreators: HandleCreators<MarkdownCategoryProps, IOwnHandler> = {
  handleAddOpen: (props: MarkdownCategoryProps) => () => {
    props.stateUpdate({
      isAddOpen: !props.isAddOpen
    });
  },
  handleChangeCategoryUid: (props: MarkdownCategoryProps) => (categoryUid: string | undefined) => {
    props.stateUpdate({
      categoryUid
    });
  }
};

const lifeCycles: ReactLifeCycleFunctions<MarkdownCategoryProps, IOwnState> = {
  componentDidMount() {
    console.log('component did mount');
  },
  componentWillUpdate() {
    console.log('component will update');
  },
  componentDidUpdate() {
    console.log('component did update');
  }
};

export const MarkdownCategory = compose<MarkdownCategoryProps, IOwnOption>(
  setDisplayName('MarkdownCategory'),
  injectIntl,
  withStyles(styles),
  withUser,
  withMarkdownCategory,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycles)
)(MarkdownCategoryView);