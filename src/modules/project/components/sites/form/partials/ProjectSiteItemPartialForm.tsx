import { AccountEmployeeOption } from '@account/components/options/AccountEmployeeOption';
import { ISystemListFilter } from '@common/classes/filters';
import { FormMode } from '@generic/types';
import { ISelectFieldOption, SelectField } from '@layout/components/fields/SelectField';
import { layoutMessage } from '@layout/locales/messages';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import { DeleteForever, GroupAdd } from '@material-ui/icons';
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
    marginWideTop: string;
    marginFarRight: string;
  };
  filterCommonSystem?: ISystemListFilter;
};

const ProjectSiteItemPartialForm: React.ComponentType<ProjectSalesPartialFormProps> = props => (
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
      <FieldArray
        name="sites"
        render={(fields: FieldArrayRenderProps) => (
          <React.Fragment>
            {
              props.formikBag.values.sites.length > 0 &&
              <CardContent>
                <List disablePadding>
                {
                  props.formikBag.values.sites.length > 0 &&
                  props.formikBag.values.sites.map((item, index) => 
                    <Field
                      key={index}
                      name={`sites.${index}.employeeUid`}
                      render={({ field, form }: FieldProps<IProjectSiteFormValue>) => {
                        const error = getIn(form.errors, `sites.${index}.employeeUid`);
                        const touch = getIn(form.touched, `sites.${index}.employeeUid`);
                        
                        return (
                          <React.Fragment>
                            <ListItem disableGutters>
                              <ListItemText>
                                <AccountEmployeeOption >
                                  <SelectField
                                    autoFocus
                                    isSearchable
                                    isClearable={field.value !== ''}
                                    isDisabled={props.formikBag.isSubmitting}
                                    escapeClearsValue={true} 
                                    menuPlacement="auto"
                                    menuPosition="fixed"
                                    valueString={item.siteType}
                                    textFieldProps={{
                                      label: props.intl.formatMessage(projectMessage.registration.field.salesEmployeeUid),
                                      placeholder: props.intl.formatMessage(projectMessage.registration.fieldFor('salesEmployeeUid', 'fieldPlaceholder')),
                                      required: true,
                                      helperText: touch && error,
                                      error: touch && Boolean(error)
                                    }}
                                    onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
                                    onChange={(selected: ISelectFieldOption) => props.formikBag.setFieldValue(field.name, selected && selected.value || '')}
                                  />
                                </AccountEmployeeOption>
                              </ListItemText>

                              <ListItemSecondaryAction className={props.classes.marginWideTop}>
                                <IconButton 
                                  disabled={props.formikBag.isSubmitting}
                                  onClick={() => fields.remove(index)}
                                >
                                  <DeleteForever color="action" />
                                </IconButton>
                              </ListItemSecondaryAction>
                            </ListItem>
                          </React.Fragment>
                        );
                      }}
                    />
                  )
                }
                </List>
              </CardContent>
            }
            <CardActions>
              <Button
                fullWidth
                color="primary" 
                disabled={props.formikBag.isSubmitting}
                onClick={() => fields.push({ 
                  uid: '',
                  siteType: '',
                  name: '',
                  value: 0
                })}
              >
                <GroupAdd className={props.classes.marginFarRight}/>

                {props.intl.formatMessage(layoutMessage.action.add)}
              </Button>
            </CardActions>
          </React.Fragment>
        )}
      />
  </Card>
);

export default ProjectSiteItemPartialForm;