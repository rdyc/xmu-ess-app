import { WithLookupMenu, withLookupMenu } from '@lookup/hoc/withLookupMenu';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, lifecycle, mapper, ReactLifeCycleFunctions, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { WrappedFieldArrayProps } from 'redux-form';
import { LookupRoleMenuFormData } from './LookupRoleForm';
import { LookupRoleMenuFormView } from './LookupRoleMenuFormView';

interface OwnProps {
  context: WrappedFieldArrayProps<LookupRoleMenuFormData>;
}

interface OwnState {
  active: string | undefined;
  isExpanded: boolean;
  menus: string[];
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  handleToggle: (type: string) => OwnState;
  stateUpdate: StateHandler<OwnState>;
}

interface OwnHandlers {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  isChecked: (type: string) => boolean;
  handleCheck: (uid?: string, child?: string) => void;
}

export type LookupRoleMenuFormProps
  = OwnProps
  & OwnState
  & OwnStateUpdaters
  & OwnHandlers
  & WithLookupMenu
  & WithStyles<typeof styles>
  & InjectedIntlProps;

const createProps: mapper<LookupRoleMenuFormProps, OwnState> = (props: LookupRoleMenuFormProps): OwnState => ({
  active: undefined,
  isExpanded: false,
  menus: []
});

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  handleToggle: (state: OwnState) => (type: string) => ({
    active: type,
    isExpanded: state.active === type ? !state.isExpanded : true
  }),
  stateUpdate: (prevState: OwnState) => (nextState: any) => ({
    ...prevState,
    ...nextState
  })
};

const handlerCreators: HandleCreators<LookupRoleMenuFormProps, OwnHandlers> = {
  handleChange: (props: LookupRoleMenuFormProps) => (event: React.ChangeEvent<HTMLInputElement>, checked: boolean): void => {
    // 
  },
  isChecked: (props: LookupRoleMenuFormProps) => (type: string): boolean => {
    const result: boolean = false;

    return result;
  },
  handleCheck: (props: LookupRoleMenuFormProps) => (parent: string, child: string | undefined) => {
    const { menus, stateUpdate } = props;
    const { response } = props.lookupMenuState.list;
    const _menus = new Set(menus);
    
    if (response && response.data && child === undefined) {
      _menus.has(parent) ? _menus.delete(parent) : _menus.add(parent);  
      response.data.map(item => {
        if (item.parentUid && item.parentUid === parent) {
           _menus.has(item.uid) ? _menus.delete(item.uid) : _menus.add(item.uid);  
          } 
        }
      );
    } else if (response && response.data && child !== undefined) {
      _menus.has(child) ? _menus.delete(child) : _menus.add(child);  
    }

    stateUpdate({
      menus: Array.from(_menus)
    });
  },
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
  },
};

export const LookupRoleMenuForm = compose<LookupRoleMenuFormProps, OwnProps>(
  withLookupMenu,
  injectIntl,
  withStyles(styles),
  lifecycle<LookupRoleMenuFormProps, {}>(lifecycles),
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<LookupRoleMenuFormProps, OwnHandlers>(handlerCreators),
)(LookupRoleMenuFormView);
