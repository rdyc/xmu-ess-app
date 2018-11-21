import { SelectEmployee } from '@account/components/select';
import { isMemberOfSales } from '@account/helper/isMemberOfSales';
import { WithAccountPMORoles, withAccountPMORoles } from '@account/hoc/withAccountPMORoles';
import { WithAccountPMRoles, withAccountPMRoles } from '@account/hoc/withAccountPMRoles';
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
  & WithAllowedProjectType
  & InjectedIntlProps;

const handlerCreators: HandleCreators<OwnerDetailFormProps, OwnHandlers> = {
  generateFieldProps: (props: OwnerDetailFormProps) => (name: string) => { 
    const { rolePmoUids, rolePmUids, allowedProjectTypes, intl } = props;
    const { user } = props.userState;
      
    let fieldProps: SelectSystemOption & any = {};
  
    switch (name) {
      case 'employeeUid':
        fieldProps = {
          required: true,
          label: intl.formatMessage(projectMessage.registration.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(projectMessage.registration.fieldFor(name, 'fieldPlaceholder')),
          component: SelectEmployee,
          companyUids: user && [user.company.uid],
          roleUids: user && isMemberOfSales(user.role.uid) ? rolePmoUids : rolePmUids
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
  withAllowedProjectType,
  injectIntl,
  withHandlers<OwnerDetailFormProps, OwnHandlers>(handlerCreators),
)(OwnerDetailFormView);