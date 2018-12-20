import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithVariables, withVariables } from '@layout/hoc/withVariables';
import { WithStyles, withStyles } from '@material-ui/core';
import withWidth, { WithWidth } from '@material-ui/core/withWidth';
import { IOrganizationHierarchyListFilter } from '@organization/classes/filters/hierarchy';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, mapper, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { WrappedFieldArrayProps } from 'redux-form';
import { WorkflowHierarchyFormData } from './OrganizationWorkflowForm';
import { OrganizationWorkflowHierarchyFormView } from './OrganizationWorkflowHierarchyFormView';

interface OwnProps {
  context: WrappedFieldArrayProps<WorkflowHierarchyFormData>;
  filter: IOrganizationHierarchyListFilter | undefined;
}

interface OwnState {
  isOpenMenu: boolean;
  hierarchyIndex: number; 
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

interface OwnHandlers {
  handleMenuOpen: (site: WorkflowHierarchyFormData, index: number) => void;
  handleMenuClose: () => void;
}

const createProps: mapper<OrganizationWorkflowHierarchyFormProps, OwnState> = (props: OrganizationWorkflowHierarchyFormProps): OwnState => {
  
  return { 
    isOpenMenu: false,
    hierarchyIndex: 0
  };
};

const handlerCreators: HandleCreators<OrganizationWorkflowHierarchyFormProps, OwnHandlers> = {
  handleMenuOpen: (props: OrganizationWorkflowHierarchyFormProps) => (site: WorkflowHierarchyFormData, index: number) => { 
    const { stateUpdate } = props;

    stateUpdate({
      isOpenMenu: true,
      hierarchyIndex: index,
    });
  },

  handleMenuClose: (props: OrganizationWorkflowHierarchyFormProps) => () => { 
    const { stateUpdate } = props;

    stateUpdate({
      isOpenMenu: false,
      // siteItemIndex: undefined,
    });
  }  
};

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

export type OrganizationWorkflowHierarchyFormProps
  = OwnProps
  & WithUser
  & WithLayout
  & WithStyles
  & WithWidth
  & WithVariables
  & InjectedIntlProps
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

export const OrganizationWorkflowHierarchyForm = compose<OrganizationWorkflowHierarchyFormProps, OwnProps>(
  withUser,
  withLayout,
  withStyles(styles),
  withWidth(),
  withVariables,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<OrganizationWorkflowHierarchyFormProps, OwnHandlers>(handlerCreators),
)(OrganizationWorkflowHierarchyFormView);