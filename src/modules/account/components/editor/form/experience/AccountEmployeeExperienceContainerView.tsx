import * as React from 'react';
import { BaseFieldsProps, Fields, FormSection } from 'redux-form';
import { AccountEmployeeExperienceContainerProps } from './AccountEmployeeExperienceContainer';
import { AccountEmployeeExperienceDetail } from './AccountEmployeeExperienceDetail';

export const AccountEmployeeExperienceContainerView: React.SFC<AccountEmployeeExperienceContainerProps> = props => {
  const { initialValues, formAction, formMode } = props;

  const fields = Object.getOwnPropertyNames(initialValues.experience);

  const componentExperience = (context: BaseFieldsProps) => (
    <AccountEmployeeExperienceDetail formMode={formMode} context={context} disabledControls={formAction === 'delete'}/>
  );

  const render = (
    <form onSubmit={props.handleSubmit}>
      <FormSection name="experience">
        <Fields names={fields} component={componentExperience} />
      </FormSection>
    </form>
  );

  return render;
};