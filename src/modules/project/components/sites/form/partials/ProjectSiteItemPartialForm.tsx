import { ISystemListFilter } from '@common/classes/filters';
import { CommonSystemOption } from '@common/components/options/CommonSystemOption';
import { FormMode } from '@generic/types';
import { NumberFormatter } from '@layout/components/fields/NumberFormatter';
import { ISelectFieldOption, SelectField } from '@layout/components/fields/SelectField';
import { layoutMessage } from '@layout/locales/messages';
import { Button, Card, CardActions, CardContent, CardHeader, IconButton, TextField } from '@material-ui/core';
import { DeleteForever, PlaceRounded } from '@material-ui/icons';
import { projectMessage } from '@project/locales/messages/projectMessage';
import { Field, FieldArray, FieldArrayRenderProps, FieldProps, FormikProps, getIn } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';

import { IProjectSiteFormValue } from '../ProjectSiteForm';

type ProjectSalesPartialFormProps = {
  formMode: FormMode; 
  formikBag: FormikProps<IProjectSiteFormValue>;
  intl: InjectedIntl;
  classes: {
    flexContent: string;
    marginFarRight: string;
  };
  filterCommonSystem?: ISystemListFilter;
};

const ProjectSiteItemPartialForm: React.ComponentType<ProjectSalesPartialFormProps> = props => (
  <FieldArray
    name="sites"
    render={(fields: FieldArrayRenderProps) => (
      <React.Fragment>
        {
          props.formikBag.values.sites.length > 0 &&
          props.formikBag.values.sites.map((item, index) =>
            <div className={props.classes.flexContent} key={index}>
              <Card square>
                <CardHeader 
                  title={`#${index + 1} ${item.name === '' ? 'Untitled' : item.name}`}
                  subheader={`IDR ${props.intl.formatNumber(item.value)}`}
                  action={
                    <IconButton 
                      onClick={() => fields.remove(index)}>
                      <DeleteForever />
                    </IconButton>
                  }
                />
                <CardContent>
                  <Field
                    name={`sites.${index}.uid`}
                    render={({ field, form }: FieldProps<IProjectSiteFormValue>) => {
                      const error = getIn(form.errors, `sites.${index}.uid`);

                      return(
                        <TextField
                          {...field}
                          fullWidth
                          disabled
                          margin="normal"
                          value={field.value || 'Auto Generated'}
                          label={props.intl.formatMessage(projectMessage.site.field.uid)}
                          helperText={field.value !== undefined ? error : props.intl.formatMessage(layoutMessage.text.autoField)}
                          error={Boolean(error)}
                        />
                      );
                    }}
                  />

                  <Field 
                    name={`sites.${index}.name`}
                    render={({ field, form }: FieldProps<IProjectSiteFormValue>) => {
                      const error = getIn(form.errors, `sites.${index}.name`);
                      const touch = getIn(form.touched, `sites.${index}.name`);

                      return (
                        <TextField 
                          {...field}
                          fullWidth
                          required
                          margin="normal"
                          autoComplete="off"
                          disabled={props.formikBag.isSubmitting}
                          label={props.intl.formatMessage(projectMessage.site.field.name)}
                          placeholder={props.intl.formatMessage(projectMessage.site.field.namePlaceholder)}
                          helperText={touch && error}
                          error={touch && Boolean(error)}
                        />
                      );
                    }}
                  />

                  <Field
                    name={`sites.${index}.siteType`}
                    render={({ field, form }: FieldProps<IProjectSiteFormValue>) => {
                      const error = getIn(form.errors, `sites.${index}.siteType`);
                      const touch = getIn(form.touched, `sites.${index}.siteType`);
                      
                      return (
                        <CommonSystemOption category="site" filter={props.filterCommonSystem}>
                          <SelectField
                            isSearchable
                            isClearable={field.value !== ''}
                            isDisabled={props.formikBag.isSubmitting}
                            escapeClearsValue={true} 
                            menuPlacement="auto"
                            menuPosition="fixed"
                            valueString={item.siteType}
                            textFieldProps={{
                              label: props.intl.formatMessage(projectMessage.site.field.siteType),
                              placeholder: props.intl.formatMessage(projectMessage.site.field.siteTypePlaceholder),
                              required: true,
                              helperText: touch && error,
                              error: touch && Boolean(error)
                            }}
                            onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
                            onChange={(selected: ISelectFieldOption) => props.formikBag.setFieldValue(field.name, selected && selected.value || '')}
                          />
                        </CommonSystemOption>
                      );
                    }}
                  />

                  <Field
                    name={`sites.${index}.value`}
                    render={({ field, form }: FieldProps<IProjectSiteFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.value`);
                      const touch = getIn(form.touched, `items.${index}.value`);

                      return (
                        <TextField
                          {...field}
                          fullWidth
                          required
                          margin="normal"
                          autoComplete="off"
                          disabled={props.formikBag.isSubmitting}
                          label={props.intl.formatMessage(projectMessage.site.field.value)}
                          placeholder={props.intl.formatMessage(projectMessage.site.field.valuePlaceholder)}
                          helperText={touch && error}
                          error={touch && Boolean(error)}
                          InputProps={{
                            inputComponent: NumberFormatter,
                          }}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            if (e.target.value === '') {
                              // set current field
                              props.formikBag.setFieldValue(field.name, 0);
                            } else {
                              const value = parseFloat(e.target.value);

                              // set current field
                              props.formikBag.setFieldValue(field.name, value);
                            }
                          }}
                        />
                      );
                    }}
                  />
                </CardContent>
              </Card>
            </div>
          )
        }

        <div className={props.classes.flexContent}>
          <Card square>
            <CardHeader 
              title={props.intl.formatMessage(projectMessage.site.section.itemTitle)}
              subheader={
                props.formikBag.submitCount > 0 &&
                typeof props.formikBag.errors.sites === 'string' &&
                props.formikBag.errors.sites
              }
              subheaderTypographyProps={{
                color: 'error',
                variant: 'body1'
              }}
            />
            <CardActions>
              <Button
                fullWidth
                color="primary" 
                disabled={props.formikBag.isSubmitting}
                onClick={() => fields.push({
                  uid: undefined,
                  siteType: '',
                  name: '',
                  value: 0
                })}
              >
                <PlaceRounded className={props.classes.marginFarRight}/>

                {props.intl.formatMessage(layoutMessage.action.add)}
              </Button>
            </CardActions>
          </Card>
          
        </div>
      </React.Fragment>
    )}
  />
);

export default ProjectSiteItemPartialForm;