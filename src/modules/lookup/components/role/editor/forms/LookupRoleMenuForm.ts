import { FormMode } from '@generic/types';
import { Menus } from '@lookup/classes/types';
import { SubmitMenu } from '@lookup/classes/types/role/SubmitMenu';
import { WithLookupMenu, withLookupMenu } from '@lookup/hoc/withLookupMenu';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, lifecycle, mapper, ReactLifeCycleFunctions, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { InjectedFormProps, WrappedFieldArrayProps } from 'redux-form';
import { isNullOrUndefined } from 'util';
import { LookupRoleFormData, LookupRoleMenuFormData } from './LookupRoleForm';
import { LookupRoleMenuFormView } from './LookupRoleMenuFormView';

interface OwnProps {
  context: WrappedFieldArrayProps<LookupRoleMenuFormData>;
  onCheckValue: (newValue: SubmitMenu) => void;
  formMode: FormMode;
  isCheckedMenus: Menus[];
}

interface OwnState {
  active: string | undefined;
  isExpanded: boolean;
  menuUids: Menus[];
  menus: string[];
}

interface OwnHandler {
  handleToggle: (parentUid: string) => void;
  handleCheckParent: (event: React.ChangeEvent<HTMLInputElement>, uid: string) => void;
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
  & InjectedFormProps<LookupRoleFormData>
  & InjectedIntlProps;

const createProps: mapper<LookupRoleMenuFormProps, OwnState> = (props: LookupRoleMenuFormProps): OwnState => ({
  active: undefined,
  isExpanded: false,
  menuUids: [],
  menus: [],
});

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: OwnState) => ({
    ...prevState,
    ...newState
  })
};

const handlerCreators: HandleCreators<LookupRoleMenuFormProps, OwnHandler> = {
  handleCheckParent: (props: LookupRoleMenuFormProps) => (event: React.ChangeEvent<HTMLInputElement>, uid: string) => {
    const { menuUids, onCheckValue } = props;
    const { response } = props.lookupMenuState.list;

    if (menuUids.length >= 0) {
      const findIdx: number = menuUids.findIndex(item => item.uid === uid);
      if (findIdx === -1) {
        menuUids.push({uid, parentUid: undefined});
        const found: number = props.menus.indexOf(uid);
        const submit: SubmitMenu = {uid, index: found, check: true};

        onCheckValue(submit);
      } else {
        menuUids.map((item, index) => {
            if (item.uid === uid) {
              menuUids.splice(index, 1);
              const found: number = props.menus.indexOf(uid);
              const submit: SubmitMenu = {uid, index: found, check: false};
      
              onCheckValue(submit);
            }
          }
        );
      }

      const findParent: number = menuUids.findIndex(parent => parent.uid === uid);
      if (response && response.data) {
        response.data.map(item => {
          if (item.parentUid && item.parentUid === uid) {
            const findChild: number = menuUids.findIndex(child => child.uid === item.uid);
            if (findParent !== -1) {
              if (findChild === -1) {
                menuUids.push({uid: item.uid, parentUid: item.parentUid});
                const found: number = props.menus.indexOf(item.uid);
                const submit: SubmitMenu = {uid: item.uid, index: found, check: true};
        
                onCheckValue(submit);
              }
            } else if (findParent === -1 && findChild !== -1) {
              menuUids.map((child, index) => {
                if (child.uid === item.uid) {
                  menuUids.splice(index, 1);
                  const found: number = props.menus.indexOf(child.uid);
                  const submit: SubmitMenu = {uid: item.uid, index: found, check: false};
          
                  onCheckValue(submit);
                }
                }
              );
            }
          }
        });
      }
    } else {
      menuUids.push({uid, parentUid: undefined});
      const found: number = props.menus.indexOf(uid);
      const submit: SubmitMenu = {uid, index: found, check: true};

      onCheckValue(submit);
    }
  },
  handleCheckChild: (props: LookupRoleMenuFormProps) => (uid: string, parentUid: string | undefined) => {
    const { menuUids, onCheckValue } = props;

    if (menuUids.length >= 0 && parentUid) {
      const findIdx: number = menuUids.findIndex(item => item.uid === uid);
      const findParent: number = menuUids.findIndex(parent => parent.uid === parentUid);
      if (findIdx === -1) {
        menuUids.push({uid, parentUid});
        const found: number = props.menus.indexOf(uid);
        const submit: SubmitMenu = {uid, index: found, check: true};
  
        onCheckValue(submit);
        if (findParent === -1) {
          menuUids.push({uid: parentUid, parentUid: undefined});
          const foundParent: number = props.menus.indexOf(parentUid);
          const submitParent: SubmitMenu = {uid: parentUid, index: foundParent, check: true};
    
          onCheckValue(submitParent);
        }
      } else {
        menuUids.map((item, index) => {
            if (item.uid === uid) {
              menuUids.splice(index, 1);
              const found: number = props.menus.indexOf(uid);
              const submit: SubmitMenu = {uid, index: found, check: false};
        
              onCheckValue(submit);
            }
          }
        );
        const findChild: number = menuUids.findIndex(child => child.parentUid === parentUid);
        if (findChild === -1) {
          menuUids.map((item, index) => {
              if (item.uid === parentUid) {
                menuUids.splice(index, 1);
                const found: number = props.menus.indexOf(parentUid);
                const submit: SubmitMenu = {uid: parentUid, index: found, check: false};
          
                onCheckValue(submit);
              }
            }
          );
        }
      }
    } else {
      menuUids.push({uid, parentUid});
      const found: number = props.menus.indexOf(uid);
      const submit: SubmitMenu = {uid, index: found, check: true};

      onCheckValue(submit);
      if (parentUid) {
        menuUids.push({uid: parentUid, parentUid: undefined});
        const foundParent: number = props.menus.indexOf(parentUid);
        const submitParent: SubmitMenu = {uid: parentUid, index: foundParent, check: true};
  
        onCheckValue(submitParent);
      }
    }
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
    const { lookupMenuState, lookupMenuDispatch, formMode } = this.props;

    if (!lookupMenuState.list.isLoading && !lookupMenuState.list.response) {
      lookupMenuDispatch.loadListRequest({
        filter: {
          orderBy: 'uid',
          direction: 'ascending'
        }
      });
    }
    if (formMode === FormMode.Edit) {
      if (this.props.isCheckedMenus) {
        this.props.isCheckedMenus.map(item => {
          this.props.menuUids.push({uid: item.uid, parentUid: item.parentUid});
        });
      }
    }
  },
  componentDidUpdate(prevProps: LookupRoleMenuFormProps) {
    const { response } = this.props.lookupMenuState.list;
    if (isNullOrUndefined(this.props.menus) || this.props.menus.length === 0) {
      if (response && response.data) {
        response.data.map((item, index) => {
          this.props.menus.push(item.uid);
          }
        );
      }
    }
  }
};

export const LookupRoleMenuForm = compose<LookupRoleMenuFormProps, OwnProps>(
  withLookupMenu,
  injectIntl,
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
)(LookupRoleMenuFormView);
