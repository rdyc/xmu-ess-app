import * as React from 'react';
import { BaseFieldsProps, Fields, FormSection } from 'redux-form';

import { SiteContainerFormProps } from './SiteContainerForm';
import { SiteDetailForm } from './SiteDetailForm';

export const SiteContainerFormView: React.SFC<SiteContainerFormProps> = props => {
  const { formMode, initialValues } = props;
  const fields = Object.getOwnPropertyNames(initialValues.information);

  const componentInformation = (context: BaseFieldsProps) => (
    <SiteDetailForm 
      formMode={formMode}
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

      {/* <div>
        
        <Button 
          type="button"
          color="default"
          disabled={props.submitting}
          onClick={props.reset}
        >
          <FormattedMessage id={'global.action.reset' }/>
        </Button>
        
        <Button 
          type="submit"
          color="secondary"
          disabled={!props.valid || props.submitting}
        >
          <FormattedMessage id={props.submitting ? 'global.processing' : 'global.action.submit' }/>
        </Button>
      </div> */}
    </form>
  );

  return render;
};