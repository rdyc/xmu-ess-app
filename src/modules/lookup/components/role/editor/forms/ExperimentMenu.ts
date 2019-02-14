import { Menus } from '@lookup/classes/types';
import { WithLookupMenu, withLookupMenu } from '@lookup/hoc/withLookupMenu';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { 
  compose, 
  HandleCreators, 
  lifecycle, 
  mapper, 
  ReactLifeCycleFunctions, 
  StateHandler, 
  StateHandlerMap, 
  StateUpdaters, 
  withHandlers, 
  withStateHandlers 
} from 'recompose';
import { isNullOrUndefined } from 'util';
import { ExperimentMenuView } from './ExperimentMenuView';

interface OwnState {
  menuUids: Menus[];
  isExpanded: boolean;
  active: string | undefined;
  check: string[];
}

interface OwnHandler {
  handleCheckbox: (uid: string, parentUid: string | undefined) => void;
  handleToggle: (parentUid: string) => void;
  handleCheckParent: (uid: string) => void;
  handleCheckChild: (uid: string, parentUid: string | undefined) => void;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  // stateCheckbox: StateHandler<OwnState>;
  stateUpdate: StateHandler<OwnState>;
}

export type ExperimentMenuProps
  = OwnState
  & OwnHandler
  & OwnStateUpdaters
  & WithLookupMenu
  & WithStyles<typeof styles>
  & InjectedIntlProps;

const createProps: mapper<ExperimentMenuProps, OwnState> = (props: ExperimentMenuProps): OwnState => ({
  menuUids: [],
  active: undefined,
  isExpanded: false,
  check: []
});

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  // stateCheckbox: (prevState: OwnState) => (menuUids: string[]) => ({
  //   menuUids
  // }),
  stateUpdate: (prevState: OwnState) => (newState: OwnState) => ({
    ...prevState,
    ...newState
  })
};

const handlerCreators: HandleCreators<ExperimentMenuProps, OwnHandler> = {
  handleCheckbox: (props: ExperimentMenuProps) => (uid: string, parentUid: string | undefined) => {
    const { menuUids, stateUpdate } = props;
    const { response } = props.lookupMenuState.list;
    const _check: string[] = [];

    if (menuUids.length >= 0) {
      const findIdx: number = menuUids.findIndex(item => item.uid === uid);
      if (findIdx === -1) {
        menuUids.push({uid, parentUid});
      } else {
        menuUids.map((item, index) => {
            if (item.uid === uid) {
              menuUids.splice(index, 1);
            }
          }
        );
      }

      if (response && response.data && isNullOrUndefined(parentUid)) {
        response.data.map(item => {
          if (item.parentUid && item.parentUid === uid) {
            const findChild: number = menuUids.findIndex(child => child.uid === item.uid);
            if (findChild === -1) {
              menuUids.push({uid: item.uid, parentUid: item.parentUid});
            } else {
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
      menuUids.push({uid, parentUid});
    }

    menuUids.map(item => 
      _check.push(item.uid) 
    );

    stateUpdate({
      check: _check
    });
  },
  handleCheckParent: (props: ExperimentMenuProps) => (uid: string) => {
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
  handleCheckChild: (props: ExperimentMenuProps) => (uid: string, parentUid: string | undefined) => {
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
  handleToggle: (props: ExperimentMenuProps) => (parentUid: string) => {
    props.stateUpdate({
      active: parentUid,
      isExpanded: props.active ===  parentUid ? !props.isExpanded : true
    });
  }
};

const lifecycles: ReactLifeCycleFunctions<ExperimentMenuProps, {}> = {
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
  // componentWillUpdate(prevProps: ExperimentMenuProps) {
  //   if (prevProps.menuUids !== this.props.menuUids) {
  //     const { menuUids, check, stateUpdate } = this.props;
  //     const _check = new Set(check);

  //     menuUids.map(item => 
  //       _check.has(item.uid) ? _check.delete(item.uid) : _check.add(item.uid)  
  //     );

  //     stateUpdate({
  //       check: Array.from(_check)
  //     });
  //   }
  // }
};

export const ExperimentMenu = compose<ExperimentMenuProps, {}>(
  withLookupMenu,
  withStyles(styles),
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<ExperimentMenuProps, OwnHandler>(handlerCreators),
  lifecycle<ExperimentMenuProps, {}>(lifecycles),
)(ExperimentMenuView);