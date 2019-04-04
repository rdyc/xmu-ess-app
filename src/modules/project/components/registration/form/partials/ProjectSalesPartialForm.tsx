import { IEmployeeListFilter } from '@account/classes/filters';
import { AccountEmployeeOption } from '@account/components/options/AccountEmployeeOption';
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

import { IProjectRegistrationFormValue } from '../ProjectRegistrationForm';

type ProjectSalesPartialFormProps = {
  formMode: FormMode; 
  formikBag: FormikProps<IProjectRegistrationFormValue>;
  intl: InjectedIntl;
  classes: {
    marginWideTop: string;
    marginFarRight: string;
  };
  filterAccountEmployee?: IEmployeeListFilter;
};

const ProjectSalesPartialForm: React.ComponentType<ProjectSalesPartialFormProps> = props => (
  <Card square>
    <CardHeader 
      title={props.intl.formatMessage(projectMessage.registration.section.salesTitle)}
      subheader={
        props.formikBag.submitCount > 0 &&
        typeof props.formikBag.errors.sales === 'string' &&
        props.formikBag.errors.sales
      }
      subheaderTypographyProps={{
        color: 'error',
        variant: 'body1'
      }}
    />
      <FieldArray
        name="sales"
        render={(fields: FieldArrayRenderProps) => (
          <React.Fragment>
            {
              props.formikBag.values.sales.length > 0 &&
              <CardContent>
                <List disablePadding>
                {
                  props.formikBag.values.sales.length > 0 &&
                  props.formikBag.values.sales.map((item, index) => 
                    <Field
                      key={index}
                      name={`sales.${index}.employeeUid`}
                      render={({ field, form }: FieldProps<IProjectRegistrationFormValue>) => {
                        const error = getIn(form.errors, `sales.${index}.employeeUid`);
                        const touch = getIn(form.touched, `sales.${index}.employeeUid`);
                        
                        return (
                          <React.Fragment>
                            <ListItem disableGutters>
                              <ListItemText>
                                <AccountEmployeeOption filter={props.filterAccountEmployee}>
                                  <SelectField
                                    autoFocus
                                    isSearchable
                                    isClearable={field.value !== ''}
                                    isDisabled={props.formikBag.isSubmitting}
                                    escapeClearsValue={true} 
                                    menuPlacement="auto"
                                    menuPosition="fixed"
                                    valueString={item.employeeUid}
                                    textFieldProps={{
                                      label: props.intl.formatMessage(projectMessage.registration.field.salesEmployeeUid),
                                      placeholder: props.intl.formatMessage(projectMessage.registration.fieldFor('salesEmployeeUid', 'fieldPlaceholder')),
                                      required: true,
                                      helperText: touch && error,
                                      error: touch && Boolean(error)
                                    }}
                                    onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
                                    onChange={(selected: ISelectFieldOption) => {
                                      const value = selected && selected.value || '';

                                      // prevent duplicate
                                      if (value !== '') {
                                        const isExist = props.formikBag.values.sales.findIndex(sales => sales.employeeUid === value);

                                        if (isExist === -1) {
                                          props.formikBag.setFieldValue(field.name, value);
                                        }
                                      } else {
                                        props.formikBag.setFieldValue(field.name, value);
                                      }
                                    }}
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
                onClick={() => fields.push({ employeeUid: '' })}
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

export default ProjectSalesPartialForm;