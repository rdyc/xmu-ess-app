import { FormMode } from '@generic/types';
import { ISelectFieldOption, SelectField } from '@layout/components/fields/SelectField';
import { layoutMessage } from '@layout/locales/messages';
import { Button, Card, CardActions, CardContent, CardHeader, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import { DeleteForever, GroupAdd } from '@material-ui/icons';
import { IOrganizationHierarchyListFilter } from '@organization/classes/filters/hierarchy';
import { OrganizationHierarchyOption } from '@organization/components/hierarchy/option/OrganizationHierarchyOption';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import { Field, FieldArray, FieldArrayRenderProps, FieldProps, FormikProps, getIn } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { IOrganizationWorkflowFormValue } from '../OrganizationWorkFlowForm';

type WorkflowHiewrarchyPartialFormProps = {
  formMode: FormMode;
  formikBag: FormikProps<IOrganizationWorkflowFormValue>;
  intl: InjectedIntl;
  classes: {
    marginWideTop: string;
    marginFarRight: string;
  };
  filterOrganizationHierarchy?: IOrganizationHierarchyListFilter
};

const WorkflowHierarchyPartialForm: React.ComponentType<WorkflowHiewrarchyPartialFormProps> = props => (
  <Card square>
    <CardHeader
      title={props.intl.formatMessage(organizationMessage.workflowSetup.section.hierarchyTitle)}
      subheader={`Menu : ${props.formikBag.values.menu.name}`}
    />
    <FieldArray
      name="hierarchies"
      render={(fields: FieldArrayRenderProps) => (
        <React.Fragment>
          {
            props.formikBag.values.hierarchies.length > 0 &&
            <CardContent>
              <List disablePadding>
                {
                  props.formikBag.values.hierarchies.length > 0 &&
                  props.formikBag.values.hierarchies.map((item, index) =>
                    <Field
                      name={`hierarchies.${index}.hierarchyUid`}
                      render={({ field, form }: FieldProps<IOrganizationWorkflowFormValue>) => {
                        const error = getIn(form.errors, `hierarchies.${index}.hierarchyUid`);
                        const touch = getIn(form.touched, `hierarchies.${index}.hierarchyUid`);

                        return (
                          <React.Fragment>
                            <ListItem disableGutters>
                              {/* <ListItemText primary={index + 1} /> */}
                              <ListItemText>
                                <OrganizationHierarchyOption filter={props.filterOrganizationHierarchy}>
                                  <SelectField
                                    autoFocus
                                    isSearchable
                                    isClearable={field.value !== ''}
                                    isDisabled={props.formikBag.isSubmitting}
                                    escapeClearsValue={true}
                                    menuPlacement="auto"
                                    menuPosition="fixed"
                                    valueString={item.hierarchyUid}
                                    textFieldProps={{
                                      label: props.intl.formatMessage(organizationMessage.workflowSetup.field.hierarchyUid),
                                      placeholder: props.intl.formatMessage(organizationMessage.workflowSetup.field.hierarchyUidPlaceholder),
                                      required: true,
                                      helperText: touch && error,
                                      error: touch && Boolean(error)
                                    }}
                                    onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
                                    onChange={(selected: ISelectFieldOption) => {
                                      props.formikBag.setFieldValue(field.name, selected && selected.value || '');
                                      props.formikBag.setFieldValue(`hierarchies.${index}.priority`, index + 1);
                                    }}
                                  />
                                </OrganizationHierarchyOption>
                              </ListItemText>

                              <ListItemSecondaryAction className={props.classes.marginWideTop}>
                                <IconButton
                                  disabled={props.formikBag.isSubmitting}
                                  onClick={() => {
                                    // remove current
                                    fields.remove(index);
                                  }}
                                  
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
                hierarchyUid: '',
                priority: 0
              })}
            >
              <GroupAdd className={props.classes.marginFarRight} />

              {props.intl.formatMessage(layoutMessage.action.add)}
            </Button>
          </CardActions>
        </React.Fragment>
      )}
    />
  </Card>
);

export default WorkflowHierarchyPartialForm;