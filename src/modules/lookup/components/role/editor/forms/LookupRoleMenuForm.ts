import { WithLookupMenu, withLookupMenu } from '@lookup/hoc/withLookupMenu';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, lifecycle, mapper, ReactLifeCycleFunctions, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { WrappedFieldArrayProps } from 'redux-form';
import { LookupRoleMenuFormData } from './LookupRoleForm';
import { LookupRoleMenuFormView } from './LookupRoleMenuFormView';

interface OwnProps {
  context: WrappedFieldArrayProps<LookupRoleMenuFormData>;
}

interface OwnState {
  active: string | undefined;
  isExpanded: boolean;
}

interface OwnStateHandler extends StateHandlerMap<OwnState> {
  handleToggle: (type: string) => OwnState;
}

interface OwnHandlers {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  isChecked: (type: string) => boolean;
}

export type LookupRoleMenuFormProps
  = OwnProps
  & OwnState
  & OwnStateHandler
  & OwnHandlers
  & WithLookupMenu
  & WithStyles<typeof styles>
  & InjectedIntlProps;

const createProps: mapper<LookupRoleMenuFormProps, OwnState> = (props: LookupRoleMenuFormProps): OwnState => ({
  active: undefined,
  isExpanded: false
});

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateHandler> = {
  handleToggle: (state: OwnState) => (type: string) => ({
    active: type,
    isExpanded: state.active === type ? !state.isExpanded : true
  })
};

const handlerCreators: HandleCreators<LookupRoleMenuFormProps, OwnHandlers> = {
  handleChange: (props: LookupRoleMenuFormProps) => (event: React.ChangeEvent<HTMLInputElement>, checked: boolean): void => {
    // 
  },
  isChecked: (props: LookupRoleMenuFormProps) => (type: string): boolean => {
    const result: boolean = false;

    return result;
  }
};

const lifecycles: ReactLifeCycleFunctions<LookupRoleMenuFormProps, {}> = {
  componentDidMount() {
    const { lookupMenuState, lookupMenuDispatch } = this.props;

    if (!lookupMenuState.list.isLoading && !lookupMenuState.list.response) {
      lookupMenuDispatch.loadListRequest({
        filter: {
          orderBy: 'uid',
          direction: 'ascending'
        }
      });
    }
  }
};

export const LookupRoleMenuForm = compose<LookupRoleMenuFormProps, OwnProps>(
  withLookupMenu,
  injectIntl,
  withStyles(styles),
  withHandlers<LookupRoleMenuFormProps, OwnHandlers>(handlerCreators),
  lifecycle<LookupRoleMenuFormProps, {}>(lifecycles),
  withStateHandlers<OwnState, OwnStateHandler>(createProps, stateUpdaters)
)(LookupRoleMenuFormView);
