import { SelectEmployee } from '@account/components/select';
import { isMemberOfPMO } from '@account/helper/isMemberOfPMO';
import { isMemberOfSales } from '@account/helper/isMemberOfSales';
import { WithAccountPMORoles, withAccountPMORoles } from '@account/hoc/withAccountPMORoles';
import { WithAccountPMRoles, withAccountPMRoles } from '@account/hoc/withAccountPMRoles';
import { WithAccountSalesRoles, withAccountSalesRoles } from '@account/hoc/withAccountSalesRoles';
import { SelectSystem, SelectSystemOption } from '@common/components/select';
import { AppRole } from '@constants/AppRole';
import { FormMode } from '@generic/types';
import { InputText } from '@layout/components/input/text';
import { WithOidc, withOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithAllowedProjectType, withAllowedProjectType } from '@project/hoc/withAllowedProjectType';
import { projectMessage } from '@project/locales/messages/projectMessage';
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
import { BaseFieldsProps } from 'redux-form';

import { OwnerDetailFormView } from './OwnerDetailFormView';

interface IOwnProps {
  formMode: FormMode;
  context: BaseFieldsProps;
}

interface IOwnState {
  isAdmin: boolean;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  setAdmin: StateHandler<IOwnState>;
}

interface IOwnHandlers {
  generateFieldProps: (name: string) => any;
}

export type OwnerDetailFormProps 
  = IOwnProps
  & IOwnState
  & IOwnStateUpdaters
  & IOwnHandlers
  & WithOidc
  & WithUser
  & WithAccountPMORoles
  & WithAccountPMRoles
  & WithAccountSalesRoles
  & WithAllowedProjectType
  & InjectedIntlProps;

const createProps: mapper<OwnerDetailFormProps, IOwnState> = (props: OwnerDetailFormProps): IOwnState => ({ 
  isAdmin: false
});

const stateUpdaters: StateUpdaters<{}, IOwnState, IOwnStateUpdaters> = {
  setAdmin: (prevState: IOwnState) => (newState: any): Partial<IOwnState> => ({
    isAdmin: !prevState.isAdmin
  })
};

const handlerCreators: HandleCreators<OwnerDetailFormProps, IOwnHandlers> = {
  generateFieldProps: (props: OwnerDetailFormProps) => (name: string) => { 
    const { isAdmin, rolePmoUids, rolePmUids, roleSalesUids, allowedProjectTypes, intl } = props;
    const { user } = props.userState;

    let _roleUids = undefined;

    // checking roles, when admin then show all employees
    if (user && !isAdmin) {
      if (isMemberOfSales(user.role.uid)) {
        if (rolePmoUids && roleSalesUids) {
          _roleUids = rolePmoUids.concat(roleSalesUids).join(',');
        } else {
          _roleUids = roleSalesUids && roleSalesUids.join(',');
        }
      }

      if (isMemberOfPMO(user.role.uid)) {
        _roleUids = rolePmUids && rolePmUids.join(',');
      }
    }
      
    let fieldProps: SelectSystemOption & any = {};
  
    switch (name) {
      case 'employeeUid':
        fieldProps = {
          required: true,
          label: intl.formatMessage(projectMessage.registration.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(projectMessage.registration.fieldFor(name, 'fieldPlaceholder')),
          filter: {
            companyUids: user && user.company.uid,
            roleUids: _roleUids,
            useAccess: true,
            orderBy: 'fullName'
          },
          component: SelectEmployee
        };
        break;

      case 'projectType':
        fieldProps = {
          required: true,
          category: 'project',
          label: intl.formatMessage(projectMessage.registration.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(projectMessage.registration.fieldFor(name, 'fieldPlaceholder')),
          component: SelectSystem,
          onlyForTypes: allowedProjectTypes
        };
        break;
    
      default:
        fieldProps = {
          disabled: true,
          label: intl.formatMessage(projectMessage.registration.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(projectMessage.registration.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;
    }

    return fieldProps;
  }
};

const lifecycles: ReactLifeCycleFunctions<OwnerDetailFormProps, {}> = {
  componentDidMount () {
    // checking admin status
    const { user: oidc } = this.props.oidcState;

    let result: boolean = false;
    
    if (oidc) {
      const role: string | string[] | undefined = oidc.profile.role;

      if (role) {
        if (Array.isArray(role)) {
          result = role.indexOf(AppRole.Admin) !== -1;
        } else {
          result = role === AppRole.Admin;
        }
      }

      if (result) {
        this.props.setAdmin();
      }
    }
  }
};

export const OwnerDetailForm = compose<OwnerDetailFormProps, IOwnProps>(
  setDisplayName('OwnerDetailForm'),
  withOidc,
  withUser,
  withAccountPMORoles,
  withAccountPMRoles,
  withAccountSalesRoles,
  withAllowedProjectType,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(OwnerDetailFormView);