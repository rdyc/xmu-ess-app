import { InjectedFormProps, reduxForm } from 'redux-form';

import { SiteContainerFormView } from './SiteContainerFormView';

export type ProjectSiteFormData = {
  information: {
    name: string | null | undefined;
    siteType: string | null | undefined;
    value: number | null | undefined;
  }
};

interface OwnProps {
  formAction: 'update' | 'delete';
}

export type SiteContainerFormProps 
  = InjectedFormProps<ProjectSiteFormData, OwnProps>
  & OwnProps;

export const SiteContainerForm = reduxForm<ProjectSiteFormData, OwnProps>({
  form: 'projectSite',
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true,
  destroyOnUnmount: true,
})(SiteContainerFormView);