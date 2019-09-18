import { IEmployeeListFilter } from '@account/classes/filters';
import { AccountEmployeeAllOption } from '@account/components/options/AccountAllEmployeeOption';
import { FormMode } from '@generic/types';
import { IHrCompetencyAssessmentDetail } from '@hr/classes/response';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { ISelectFieldOption, SelectField } from '@layout/components/fields/SelectField';
import { layoutMessage } from '@layout/locales/messages';
import { Button, Card, CardActions, CardContent, CardHeader, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import { DeleteForever, GroupAdd } from '@material-ui/icons';
import { Field, FieldArray, FieldArrayRenderProps, FieldProps, FormikProps, getIn } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { ICompetencyAssessmentFormValue } from './CompetencyAssessmentForm';

type CompetencyAssessmentResponderProps = {
  formMode: FormMode; 
  formikBag: FormikProps<ICompetencyAssessmentFormValue>;
  intl: InjectedIntl;
  classes: {
    marginWideTop: string;
    marginFarRight: string;
  };
  filterAccountEmployee?: IEmployeeListFilter;
  data?: IHrCompetencyAssessmentDetail;
  creator: string | undefined;
};

const CompetencyAssessmentResponder: React.ComponentType<CompetencyAssessmentResponderProps> = props => {

  const isDeleteAble = (employeeUid: string) => {
    if (props.data) {
      const employeeData = props.data.responders.find(item => item.employeeUid === employeeUid);

      if (employeeData) {
        if (employeeData.isExpired) {
          return false;
        }
        if (employeeData.isRespond) {
          return false;
        }
      }
      return true;
    }
    return true;
  };

  const render = (
    <Card square>
      <CardHeader 
        title={props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Assessment Responder'})}
        subheader={
          props.formikBag.submitCount > 0 &&
          typeof props.formikBag.errors.responder === 'string' &&
          props.formikBag.errors.responder
        }
        subheaderTypographyProps={{
          color: 'error',
          variant: 'body1'
        }}
      />
      <FieldArray
          name="responder"
          render={(fields: FieldArrayRenderProps) => (
            <React.Fragment>
              {
                props.formikBag.values.responder.length > 0 &&
                <CardContent>
                  <List disablePadding>
                  {
                    props.formikBag.values.responder.length > 0 &&
                    props.formikBag.values.responder.map((item, index) => 
                      <Field
                        key={index}
                        name={`responder.${index}.employeeUid`}
                        render={({ field, form }: FieldProps<ICompetencyAssessmentFormValue>) => {
                          const error = getIn(form.errors, `responder.${index}.employeeUid`);
                          const touch = getIn(form.touched, `responder.${index}.employeeUid`);
                          
                          return (
                            <React.Fragment>
                              <ListItem disableGutters>
                                <ListItemText>
                                  <AccountEmployeeAllOption filter={props.filterAccountEmployee}>
                                    <SelectField
                                      autoFocus
                                      isSearchable
                                      isClearable={field.value !== ''}
                                      isDisabled={props.formikBag.isSubmitting || !isDeleteAble(item.employeeUid)}
                                      escapeClearsValue={true} 
                                      menuPlacement="auto"
                                      menuPosition="fixed"
                                      valueString={item.employeeUid}
                                      textFieldProps={{
                                        label: props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Employee'}),
                                        placeholder: props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Employee'}),
                                        required: true,
                                        helperText: touch && error,
                                        error: touch && Boolean(error)
                                      }}
                                      onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
                                      onChange={(selected: ISelectFieldOption) => {
                                        const value = selected && selected.value || '';

                                        // prevent duplicate
                                        if (value !== '') {
                                          const isExist = props.formikBag.values.responder.findIndex(responder => responder.employeeUid === value);
                                          const isCreator = Boolean(props.creator && props.creator === value);
                                          const isAssessment = Boolean(props.formikBag.values.employeeUid === value);

                                          if (isExist === -1 && !isCreator && !isAssessment) {
                                            props.formikBag.setFieldValue(field.name, value);
                                          }
                                        } else {
                                          props.formikBag.setFieldValue(field.name, value);
                                        }
                                      }}
                                    />
                                  </AccountEmployeeAllOption>
                                </ListItemText>
                                {
                                  isDeleteAble(item.employeeUid) &&
                                  <ListItemSecondaryAction className={props.classes.marginWideTop}>
                                    <IconButton 
                                      disabled={props.formikBag.isSubmitting}
                                      onClick={() => fields.remove(index)}
                                    >
                                      <DeleteForever color="action" />
                                    </IconButton>
                                  </ListItemSecondaryAction>
                                }
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

  return render;
};

export default CompetencyAssessmentResponder;