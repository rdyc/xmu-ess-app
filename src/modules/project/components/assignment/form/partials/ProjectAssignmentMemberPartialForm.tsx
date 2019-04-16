import { IEmployeeListFilter } from '@account/classes/filters';
import { AccountEmployeeOption } from '@account/components/options/AccountEmployeeOption';
import { WorkflowStatusType } from '@common/classes/types';
import { FormMode } from '@generic/types';
import { NumberFormatter } from '@layout/components/fields/NumberFormatter';
import { ISelectFieldOption, SelectField } from '@layout/components/fields/SelectField';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Button, Card, CardActions, CardContent, CardHeader, IconButton, TextField } from '@material-ui/core';
import { DeleteForever, GroupAdd } from '@material-ui/icons';
import { projectMessage } from '@project/locales/messages/projectMessage';
import { Field, FieldArray, FieldArrayRenderProps, FieldProps, FormikProps, getIn } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';

import { IProjectAssignmentFormValue } from '../ProjectAssignmentForm';

type ProjectAssignmentMemberPartialFormProps = {
  formMode: FormMode; 
  formikBag: FormikProps<IProjectAssignmentFormValue>;
  intl: InjectedIntl;
  classes: {
    flexContent: string;
    marginFarRight: string;
  };
  filterAccountEmployee?: IEmployeeListFilter;
};

const ProjectAssingmentMemberPartialForm: React.ComponentType<ProjectAssignmentMemberPartialFormProps> = props => (
  <FieldArray
    name="items"
    render={(fields: FieldArrayRenderProps) => (
      <React.Fragment>
        {
          props.formikBag.values.items.length > 0 &&
          props.formikBag.values.items.map((item, index) =>
            <div className={props.classes.flexContent} key={index}>
              <Card square>
                <CardHeader 
                  title={`#${index + 1} - ${item.uid || 'Draft'}`}
                  subheader={`${item.status && item.status.value || 'Draft'} ${item.rejectedReason || ''}`}
                  titleTypographyProps={{variant: 'body2'}}
                  action={
                    <IconButton 
                      disabled={item.consumedHours && item.consumedHours >= 0 || false}
                      onClick={() => {
                        // remove current
                        fields.remove(index);

                        // calculate total allocatedHours
                        let assignedHours = 0;
                        props.formikBag.values.items.forEach((assignedItem, itemIndex) => {
                          if (itemIndex !== index && assignedItem.statusType !== WorkflowStatusType.Rejected) {
                            assignedHours = assignedHours + (assignedItem.allocatedHours || 0);
                          }
                        });

                        // set assignedHours
                        props.formikBag.setFieldValue('assignedHours', assignedHours);

                        // set unassignedHours
                        props.formikBag.setFieldValue('unassignedHours', props.formikBag.values.maxHours - assignedHours);
                      }}
                    >
                      <DeleteForever />
                    </IconButton>
                  }
                />
                <CardContent>
                  <Field
                    name={`items.${index}.employeeUid`}
                    render={({ field, form }: FieldProps<IProjectAssignmentFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.employeeUid`);
                      const touch = getIn(form.touched, `items.${index}.employeeUid`);
                      
                      return (
                        <AccountEmployeeOption filter={props.filterAccountEmployee} default={item.employee}>
                          <SelectField
                            autoFocus
                            isSearchable
                            isClearable={field.value !== ''}
                            isDisabled={item.statusType === WorkflowStatusType.Rejected || props.formikBag.isSubmitting}
                            escapeClearsValue={true} 
                            menuPlacement="auto"
                            menuPosition="fixed"
                            valueString={item.employeeUid}
                            textFieldProps={{
                              label: props.intl.formatMessage(projectMessage.assignment.field.employeeUid),
                              placeholder: props.intl.formatMessage(projectMessage.assignment.field.employeeUidPlaceholder),
                              required: true,
                              helperText: touch && error,
                              error: touch && Boolean(error)
                            }}
                            onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
                            onChange={(selected: ISelectFieldOption) => props.formikBag.setFieldValue(field.name, selected && selected.value || '')}
                          />
                        </AccountEmployeeOption>
                      );
                    }}
                  />

                  <Field 
                    name={`items.${index}.role`}
                    render={({ field, form }: FieldProps<IProjectAssignmentFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.role`);
                      const touch = getIn(form.touched, `items.${index}.role`);

                      return (
                        <TextField 
                          {...field}
                          fullWidth
                          required
                          margin="normal"
                          autoComplete="off"
                          disabled={item.statusType === WorkflowStatusType.Rejected || form.isSubmitting}
                          label={props.intl.formatMessage(projectMessage.assignment.field.role)}
                          placeholder={props.intl.formatMessage(projectMessage.assignment.field.rolePlaceholder)}
                          helperText={touch && error}
                          error={touch && Boolean(error)}
                        />
                      );
                    }}
                  />

                  <Field 
                    name={`items.${index}.jobDescription`}
                    render={({ field, form }: FieldProps<IProjectAssignmentFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.jobDescription`);
                      const touch = getIn(form.touched, `items.${index}.jobDescription`);

                      return (
                        <TextField 
                          {...field}
                          fullWidth
                          required
                          margin="normal"
                          autoComplete="off"
                          disabled={item.statusType === WorkflowStatusType.Rejected || form.isSubmitting}
                          label={props.intl.formatMessage(projectMessage.assignment.field.jobDesc)}
                          placeholder={props.intl.formatMessage(projectMessage.assignment.field.jobDescPlaceholder)}
                          helperText={touch && error}
                          error={touch && Boolean(error)}
                        />
                      );
                    }}
                  />

                  <Field
                    name={`items.${index}.mandays`}
                    render={({ field, form }: FieldProps<IProjectAssignmentFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.mandays`);
                      const touch = getIn(form.touched, `items.${index}.mandays`);

                      return (
                        <TextField
                          {...field}
                          fullWidth
                          required
                          disabled={item.statusType === WorkflowStatusType.Rejected || form.isSubmitting}
                          margin="normal"
                          autoComplete="off"
                          label={props.intl.formatMessage(projectMessage.assignment.field.mandays)}
                          placeholder={props.intl.formatMessage(projectMessage.assignment.field.mandaysPlaceholder)}
                          helperText={touch && error}
                          error={touch && Boolean(error)}
                          InputProps={{
                            inputComponent: NumberFormatter,
                          }}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            let allocatedHours = 0;

                            if (e.target.value === '') {
                              // set current field
                              props.formikBag.setFieldValue(field.name, 0);
                            } else {
                              const value = parseFloat(e.target.value);

                              // set current field
                              props.formikBag.setFieldValue(field.name, value);

                              // define allocated hours
                              allocatedHours = value * 8;
                            }

                            // set allocatedHours field
                            props.formikBag.setFieldValue(`items.${index}.allocatedHours`, allocatedHours);

                            // calculate total allocatedHours
                            let assignedHours = allocatedHours;
                            props.formikBag.values.items.forEach((assignedItem, itemIndex) => {
                              if (itemIndex !== index && assignedItem.statusType !== WorkflowStatusType.Rejected) {
                                assignedHours = assignedHours + (assignedItem.allocatedHours || 0);
                              }
                            });

                            // set assignedHours
                            props.formikBag.setFieldValue('assignedHours', assignedHours);

                            // set unassignedHours
                            props.formikBag.setFieldValue('unassignedHours', props.formikBag.values.maxHours - assignedHours);
                          }}
                        />
                      );
                    }}
                  />

                  <Field
                    name={`items.${index}.allocatedHours`}
                    render={({ field, form }: FieldProps<IProjectAssignmentFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.allocatedHours`);

                      return (
                        <TextField
                          {...GlobalStyle.TextField.ReadOnly}
                          {...field}
                          label={props.intl.formatMessage(projectMessage.assignment.field.allocatedHours)}
                          value={props.intl.formatNumber(field.value)}
                          helperText={error}
                          error={Boolean(error)}
                        />
                      );
                    }}
                  />

                  <Field
                    name={`items.${index}.consumedHours`}
                    render={({ field, form }: FieldProps<IProjectAssignmentFormValue>) => (
                      <TextField
                        {...GlobalStyle.TextField.ReadOnly}
                        {...field}
                        label={props.intl.formatMessage(projectMessage.assignment.field.consumedHours)}
                        value={props.intl.formatNumber(field.value)}
                      />
                    )}
                  />
                </CardContent>
              </Card>
            </div>
          )
        }

        <div className={props.classes.flexContent}>
          <Card square>
            <CardHeader 
              title={props.intl.formatMessage(projectMessage.assignment.section.itemTitle)}
              subheader={
                props.formikBag.submitCount > 0 &&
                typeof props.formikBag.errors.items === 'string' &&
                props.formikBag.errors.items
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
                  employeeUid: '',
                  role: '',
                  jobDescription: '',
                  mandays: 0,
                  allocatedHours: 0,
                  consumedHours: 0,
                  statusType: ''
                })}
              >
                <GroupAdd className={props.classes.marginFarRight}/>

                {props.intl.formatMessage(layoutMessage.action.add)}
              </Button>
            </CardActions>
          </Card>
          
        </div>
      </React.Fragment>
    )}
  />
);

export default ProjectAssingmentMemberPartialForm;