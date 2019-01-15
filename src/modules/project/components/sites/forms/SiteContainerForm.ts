import { InjectedFormProps, reduxForm } from 'redux-form';

import { SiteContainerFormView } from './SiteContainerFormView';

export type ProjectSiteFormData = {
  information: {
    name: string | null | undefined;
    siteType: string | null | undefined;
    value: number | null | undefined;
  }
};

interface IOwnProps {
  formAction: 'update' | 'delete';
}

export type SiteContainerFormProps 
  = InjectedFormProps<ProjectSiteFormData, IOwnProps>
  & IOwnProps;

export const SiteContainerForm = reduxForm<ProjectSiteFormData, IOwnProps>({
  form: 'projectSite',
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true,
  destroyOnUnmount: true,
})(SiteContainerFormView);