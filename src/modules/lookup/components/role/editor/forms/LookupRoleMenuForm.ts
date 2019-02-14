import { Menus } from '@lookup/classes/types';
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
  menuUids: Menus[];
  check: string[];
}

interface OwnHandler {
  handleToggle: (parentUid: string) => void;
  handleCheckParent: (uid: string) => void;
  handleCheckChild: (uid: string, parentUid: string | undefined) => void;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type LookupRoleMenuFormProps
  = OwnProps
  & OwnState
  & OwnStateUpdaters
  & OwnHandler
  & WithLookupMenu
  & WithStyles<typeof styles>
  & InjectedIntlProps;

const createProps: mapper<LookupRoleMenuFormProps, OwnState> = (props: LookupRoleMenuFormProps): OwnState => ({
  active: undefined,
  isExpanded: false,
  menuUids: [],
  check: []
});

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: OwnState) => ({
    ...prevState,
    ...newState
  })
};

const handlerCreators: HandleCreators<LookupRoleMenuFormProps, OwnHandler> = {
  handleCheckParent: (props: LookupRoleMenuFormProps) => (uid: string) => {
    const { menuUids, stateUpdate } = props;
    const { response } = props.lookupMenuState.list;
    const _check: string[] = [];

    if (menuUids.length >= 0) {
      const findIdx: number = menuUids.findIndex(item => item.uid === uid);
      if (findIdx === -1) {
        menuUids.push({uid, parentUid: undefined});
      } else {
        menuUids.map((item, index) => {
            if (item.uid === uid) {
              menuUids.splice(index, 1);
            }
          }
        );
      }

      const findParent: number = menuUids.findIndex(parent => parent.uid === uid);
      console.log(findParent);
      if (response && response.data) {
        response.data.map(item => {
          if (item.parentUid && item.parentUid === uid) {
            const findChild: number = menuUids.findIndex(child => child.uid === item.uid);
            if (findParent !== -1) {
              if (findChild === -1) {
                menuUids.push({uid: item.uid, parentUid: item.parentUid});
              }
            } else if (findParent === -1 && findChild !== -1) {
              menuUids.map((child, index) => {
                if (child.uid === item.uid) {
                  menuUids.splice(index, 1);
                }
                }
              );
            }
          }
        });
      }
    } else {
      menuUids.push({uid, parentUid: undefined});
    }

    menuUids.map(item => 
      _check.push(item.uid) 
    );

    stateUpdate({
      check: _check
    });
  },
  handleCheckChild: (props: LookupRoleMenuFormProps) => (uid: string, parentUid: string | undefined) => {
    const { menuUids, stateUpdate } = props;
    const _check: string[] = [];

    if (menuUids.length >= 0 && parentUid) {
      const findIdx: number = menuUids.findIndex(item => item.uid === uid);
      const findParent: number = menuUids.findIndex(parent => parent.uid === parentUid);
      if (findIdx === -1) {
        menuUids.push({uid, parentUid});
        if (findParent === -1) {
          menuUids.push({uid: parentUid, parentUid: undefined});
        }
      } else {
        menuUids.map((item, index) => {
            if (item.uid === uid) {
              menuUids.splice(index, 1);
            }
          }
        );
        const findChild: number = menuUids.findIndex(child => child.parentUid === parentUid);
        if (findChild === -1) {
          menuUids.map((item, index) => {
              if (item.uid === parentUid) {
                menuUids.splice(index, 1);
              }
            }
          );
        }
      }
    } else {
      if (parentUid) {
        menuUids.push({uid, parentUid});
        menuUids.push({uid: parentUid, parentUid: undefined});
      }
    }

    menuUids.map(item => 
      _check.push(item.uid) 
    );

    stateUpdate({
      check: _check
    });
  },
  handleToggle: (props: LookupRoleMenuFormProps) => (parentUid: string) => {
    props.stateUpdate({
      active: parentUid,
      isExpanded: props.active ===  parentUid ? !props.isExpanded : true
    });
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
  },
};

export const LookupRoleMenuForm = compose<LookupRoleMenuFormProps, OwnProps>(
  withLookupMenu,
  injectIntl,
  withStyles(styles),
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<LookupRoleMenuFormProps, OwnHandler>(handlerCreators),
  lifecycle<LookupRoleMenuFormProps, {}>(lifecycles),
)(LookupRoleMenuFormView);
