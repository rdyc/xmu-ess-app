import { SelectEmployee } from '@account/components/select';
import { isMemberOfPMO } from '@account/helper/isMemberOfPMO';
import { isMemberOfSales } from '@account/helper/isMemberOfSales';
import { WithAccountPMORoles, withAccountPMORoles } from '@account/hoc/withAccountPMORoles';
import { WithAccountPMRoles, withAccountPMRoles } from '@account/hoc/withAccountPMRoles';
import { WithAccountSalesRoles, withAccountSalesRoles } from '@account/hoc/withAccountSalesRoles';
import { SelectSystem, SelectSystemOption } from '@common/components/select';
import { FormMode } from '@generic/types';
import { InputText } from '@layout/components/input/text';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithAllowedProjectType, withAllowedProjectType } from '@project/hoc/withAllowedProjectType';
import { projectMessage } from '@project/locales/messages/projectMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, withHandlers } from 'recompose';
import { BaseFieldsProps } from 'redux-form';

import { OwnerDetailFormView } from './OwnerDetailFormView';

interface OwnProps {
  formMode: FormMode;
  context: BaseFieldsProps;
}

interface OwnHandlers {
  generateFieldProps: (name: string) => any;
}

export type OwnerDetailFormProps 
  = OwnProps
  & OwnHandlers
  & WithUser
  & WithAccountPMORoles
  & WithAccountPMRoles
  & WithAccountSalesRoles
  & WithAllowedProjectType
  & InjectedIntlProps;

const handlerCreators: HandleCreators<OwnerDetailFormProps, OwnHandlers> = {
  generateFieldProps: (props: OwnerDetailFormProps) => (name: string) => { 
    const { rolePmUids, roleSalesUids, allowedProjectTypes, intl } = props;
    const { user } = props.userState;

    let _roleUids: string[] | undefined = undefined;

    // check roles
    if (user) {
      if (isMemberOfSales(user.role.uid)) {
        _roleUids = roleSalesUids;
      }

      if (isMemberOfPMO(user.role.uid)) {
        _roleUids = rolePmUids;
      } 
    }
      
    let fieldProps: SelectSystemOption & any = {};
  
    switch (name) {
      case 'employeeUid':
        fieldProps = {
          required: true,
          label: intl.formatMessage(projectMessage.registration.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(projectMessage.registration.fieldFor(name, 'fieldPlaceholder')),
          component: SelectEmployee,
          companyUids: user && [user.company.uid],
          roleUids: _roleUids
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

export const OwnerDetailForm = compose<OwnerDetailFormProps, OwnProps>(
  withUser,
  withAccountPMORoles,
  withAccountPMRoles,
  withAccountSalesRoles,
  withAllowedProjectType,
  injectIntl,
  withHandlers<OwnerDetailFormProps, OwnHandlers>(handlerCreators),
)(OwnerDetailFormView);