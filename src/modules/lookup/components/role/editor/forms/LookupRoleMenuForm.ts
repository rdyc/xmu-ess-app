import { FormMode } from '@generic/types';
import { Menus } from '@lookup/classes/types';
import { SubmitMenu } from '@lookup/classes/types/role/SubmitMenu';
import { WithLookupMenu, withLookupMenu } from '@lookup/hoc/withLookupMenu';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, lifecycle, mapper, ReactLifeCycleFunctions, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { InjectedFormProps, WrappedFieldArrayProps } from 'redux-form';
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
  // handleCheckParent: (event: React.ChangeEvent<HTMLInputElement>, uid: string) => void;
  // handleCheckChild: (uid: string, parentUid: string | undefined) => void;
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
  // handleCheckParent: (props: LookupRoleMenuFormProps) => (event: React.ChangeEvent<HTMLInputElement>, uid: string) => {
  //   const { menuUids, onCheckValue } = props;
  //   const { response } = props.lookupMenuState.list;
  //   // found and submit is used for add data to redux
  //   let found: number = 0;
  //   let submit: SubmitMenu;
  //   // find is used for finding data on the list (counter) menuUids
  //   let find: number = 0;

  //   // if parent is not found, then add to the list
  //   find = menuUids.findIndex(item => item.uid === uid);
  //   if (find === -1) {
  //     menuUids.push({uid, parentUid: undefined});
  //     found = props.menus.indexOf(uid);
  //     submit = {uid, index: found, check: true};

  //     onCheckValue(submit);
  //   } else {
  //     // if the parent is found on the list, then splice(remove) it from the list
  //     menuUids.map((item, index) => {
  //         if (item.uid === uid) {
  //           menuUids.splice(index, 1);
  //           found = props.menus.indexOf(uid);
  //           submit = {uid, index: found, check: false};
    
  //           onCheckValue(submit);
  //         }
  //       }
  //     );
  //   }

  //   // we have to find the parent again on the list after we just add the parent before, so we get the different value
  //   find = menuUids.findIndex(item => item.uid === uid);
  //   if (response && response.data) {
  //     response.data.map(item => {
  //       // find the child is exist on the list, if no then add, need to create a new const for compairing it with the parent later
  //       const findChild: number = menuUids.findIndex(child => child.uid === item.uid);
  //       if (item.parentUid && item.parentUid === uid) {
  //         // if the parent is found then execute to add his childs
  //         if (find !== -1) {
  //           // add parent's childs
  //           if (findChild === -1) {
  //             menuUids.push({uid: item.uid, parentUid: item.parentUid});
  //             found = props.menus.indexOf(item.uid);
  //             submit = {uid: item.uid, index: found, check: true};
      
  //             onCheckValue(submit);
  //           }
  //           // if parent is not found and the child is on the list, then splice(remove) the child from the list
  //         } else if (find === -1 && findChild !== -1) {
  //           menuUids.map((child, index) => {
  //             if (child.uid === item.uid) {
  //               menuUids.splice(index, 1);
  //               found = props.menus.indexOf(child.uid);
  //               submit = {uid: item.uid, index: found, check: false};
        
  //               onCheckValue(submit);
  //             }
  //             }
  //           );
  //         }
  //       }
  //     });
  //   }
  // },
  // handleCheckChild: (props: LookupRoleMenuFormProps) => (uid: string, parentUid: string | undefined) => {
  //   const { menuUids, onCheckValue } = props;
  //   // found and submit is used for add data to redux
  //   let found: number = 0;
  //   let submit: SubmitMenu;
  //   // find is used for finding data on the list (counter)
  //   let find: number = 0;

  //   if (parentUid) {
  //     // add child when not found on the list
  //     find = menuUids.findIndex(item => item.uid === uid);
  //     if (find === -1) {
  //       menuUids.push({uid, parentUid});
  //       found = props.menus.indexOf(uid);
  //       submit = {uid, index: found, check: true};
  
  //       onCheckValue(submit);
  //       // add parent when not found on the list
  //       find = menuUids.findIndex(parent => parent.uid === parentUid);
  //       if (find === -1) {
  //         menuUids.push({uid: parentUid, parentUid: undefined});
  //         found = props.menus.indexOf(parentUid);
  //         submit = {uid: parentUid, index: found, check: true};
    
  //         onCheckValue(submit);
  //       }
  //     } else {
  //       // if the child is exist, splice(remove) it from the list
  //       menuUids.map((item, index) => {
  //           if (item.uid === uid) {
  //             menuUids.splice(index, 1);
  //             found = props.menus.indexOf(uid);
  //             submit = {uid, index: found, check: false};
        
  //             onCheckValue(submit);
  //           }
  //         }
  //       );
  //       // if there's no more child, then splice(remove) the parent
  //       find = menuUids.findIndex(child => child.parentUid === parentUid);
  //       if (find === -1) {
  //         menuUids.map((item, index) => {
  //             if (item.uid === parentUid) {
  //               menuUids.splice(index, 1);
  //               found = props.menus.indexOf(parentUid);
  //               submit = {uid: parentUid, index: found, check: false};
          
  //               onCheckValue(submit);
  //             }
  //           }
  //         );
  //       }
  //     }
  //   } 
  // },
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
    // if (formMode === FormMode.Edit) {
    //   if (this.props.isCheckedMenus) {
    //     this.props.isCheckedMenus.map(item => {
    //       this.props.menuUids.push({uid: item.uid, parentUid: item.parentUid});
    //     });
    //   }
    // }
  },
  componentDidUpdate(prevProps: LookupRoleMenuFormProps) {
    const { response } = this.props.lookupMenuState.list;
    // for counter menus index array
    if ((this.props.menus === undefined || this.props.menus === null) || this.props.menus.length === 0) {
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
