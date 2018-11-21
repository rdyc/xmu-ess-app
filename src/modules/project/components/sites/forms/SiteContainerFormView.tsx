import * as React from 'react';
import { BaseFieldsProps, Fields, FormSection } from 'redux-form';

import { SiteContainerFormProps } from './SiteContainerForm';
import { SiteDetailForm } from './SiteDetailForm';

export const SiteContainerFormView: React.SFC<SiteContainerFormProps> = props => {
  const { formAction, initialValues } = props;
  const fields = Object.getOwnPropertyNames(initialValues.information);

  const componentInformation = (context: BaseFieldsProps) => (
    <SiteDetailForm 
      disabledControls={formAction === 'delete'}
      context={context}
    />
  );
  
  const render = (
    <form onSubmit={props.handleSubmit}>
      <FormSection name="information">
        <Fields 
          names={fields}
          component={componentInformation}
        />
      </FormSection>
    </form>
  );

  return render;
};