import { IEmployeeListFilter } from '@account/classes/filters';
import { AccountEmployeeAllOption } from '@account/components/options/AccountAllEmployeeOption';
import { ISystemListFilter } from '@common/classes/filters';
import { AssessorType } from '@common/classes/types';
import { CommonSystemOption } from '@common/components/options/CommonSystemOption';
import { FormMode } from '@generic/types';
import { IHrCompetencyAssessmentDetail } from '@hr/classes/response';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { ISelectFieldOption, SelectField } from '@layout/components/fields/SelectField';
import { layoutMessage } from '@layout/locales/messages';
import { Button, Card, CardActions, CardHeader, Collapse, Divider, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, WithStyles, withStyles } from '@material-ui/core';
import { Clear, DeleteForever, ExpandLess, ExpandMore, GroupAdd } from '@material-ui/icons';
import styles from '@styles';
import { Field, FieldArray, FieldArrayRenderProps, FieldProps, FormikProps, getIn } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { compose, mapper, StateHandlerMap, StateUpdaters, withStateHandlers } from 'recompose';

import { ICompetencyAssessmentFormValue } from './CompetencyAssessmentForm';

interface IOwnProps {
  formMode: FormMode; 
  formikBag: FormikProps<ICompetencyAssessmentFormValue>;
  intl: InjectedIntl;
  filterAccountEmployee?: IEmployeeListFilter;
  data?: IHrCompetencyAssessmentDetail;
  creator: string | undefined;
  filterCommonSystem?: ISystemListFilter;
  handleOnModify?: (value: FormMode) => void;
}

interface IOwnState {
  active: number | undefined;
  isExpanded: boolean;
}

interface IOwnStateHandler extends StateHandlerMap<IOwnState> {
  handleToggle: (uid?: number) => IOwnState;
}

type AllProps
  = IOwnState
  & IOwnProps
  & IOwnStateHandler
  & WithStyles<typeof styles>;
  
const createProps: mapper<AllProps, IOwnState> = (): IOwnState => ({
  active: undefined,
  isExpanded: false
});

const stateUpdaters: StateUpdaters<{}, IOwnState, IOwnStateHandler> = {
  handleToggle: (state: IOwnState) => (uid?: number) => ({
    active: uid,
    isExpanded: state.active === uid ? !state.isExpanded : true
  })
};

const competencyAssessmentResponder: React.ComponentType<AllProps> = props => {
  const { active, isExpanded, handleToggle, formMode, handleOnModify } = props;

  const isDeleteAble = (itemUid?: string) => {
    if (formMode === FormMode.Edit) {
      if (props.data) {
        const employeeData = props.data.responders.find(item => item.uid === itemUid);
  
        if (employeeData) {
          if (employeeData.isExpired) {
            return true;
          }
          if (employeeData.isRespond) {
            return true;
          }
        }
        return false;
      }
    }
    return false;
  };

  const render = (
      <FieldArray
        name="responder"
        render={(fields: FieldArrayRenderProps) => (
          <React.Fragment>
            <Card square>
              <CardHeader 
                title={props.intl.formatMessage(hrMessage.competency.field.responder)}
                subheader={
                  props.formikBag.submitCount > 0 &&
                  typeof props.formikBag.errors.responder === 'string' &&
                  props.formikBag.errors.responder
                }
                subheaderTypographyProps={{
                  color: 'error',
                  variant: 'body1'
                }}
                action={
                  handleOnModify &&
                  <IconButton onClick={() => handleOnModify(FormMode.View)} >
                    <Clear />
                  </IconButton>
                }
              />
              <List>
                {
                  props.formikBag.values.responder.length > 0 &&
                  props.formikBag.values.responder.map((item, index) => 
                    <React.Fragment key={index}>
                      <Divider />
                      <ListItem
                        button
                        selected={index === active && isExpanded}
                        onClick={() => handleToggle(index)}
                      >
                        <ListItemText primary={`${item.assessorName || '{Type}'} - ${item.assessorType === AssessorType.Self ? props.formikBag.values.employeeName : item.employeeName || '{Name}' } `} />
                        <ListItemSecondaryAction>
                          {active === index && isExpanded ? <ExpandLess /> : <ExpandMore />}
                        </ListItemSecondaryAction>
                      </ListItem>
                      <Collapse
                        className={props.classes.marginFar}
                        in={active === index && isExpanded}
                        timeout="auto"
                        unmountOnExit
                      >
                        <Field
                          name={`responder.${index}.assessorType`}
                          render={({ field, form }: FieldProps<ICompetencyAssessmentFormValue>) => {
                            const error = getIn(form.errors, `responder.${index}.assessorType`);
                            const touch = getIn(form.touched, `responder.${index}.assessorType`);
                            
                            return (
                              <CommonSystemOption category="assessor" filter={props.filterCommonSystem}>
                                <SelectField
                                  autoFocus
                                  isSearchable
                                  // isClearable={field.value !== ''}
                                  isDisabled={props.formikBag.isSubmitting || isDeleteAble(item.uid) || props.formikBag.values.employeeUid === ''}
                                  escapeClearsValue={true} 
                                  menuPlacement="auto"
                                  menuPosition="fixed"
                                  valueString={item.assessorType}
                                  textFieldProps={{
                                    label: props.intl.formatMessage(hrMessage.competency.field.assessorType),
                                    placeholder: props.intl.formatMessage(hrMessage.competency.field.assessorType),
                                    required: true,
                                    helperText: touch && error,
                                    error: touch && Boolean(error)
                                  }}
                                  onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
                                  onChange={(selected: ISelectFieldOption) => {                                    
                                      const value = selected && selected.value || '';

                                      if (value !== '') {
                                        // Change assessor
                                        props.formikBag.setFieldValue(field.name, value);
                                        props.formikBag.setFieldValue(`responder.${index}.assessorName`, selected && selected.label || '');

                                        // Change employee
                                        if (value === AssessorType.Self) {
                                          props.formikBag.setFieldValue(`responder.${index}.employeeUid`, props.formikBag.values.employeeUid);
                                          props.formikBag.setFieldValue(`responder.${index}.employeeName`, props.formikBag.values.employeeName);
                                        } else {
                                          if (item.employeeUid === props.formikBag.values.employeeUid) {
                                            props.formikBag.setFieldValue(`responder.${index}.employeeUid`, '');
                                            props.formikBag.setFieldValue(`responder.${index}.employeeName`, '');
                                          }
                                        }
                                      } else {
                                        props.formikBag.setFieldValue(field.name, value);
                                      }
                                  }}
                                />
                              </CommonSystemOption>
                            );
                          }}
                        />

                        <Field
                          name={`responder.${index}.employeeUid`}
                          render={({ field, form }: FieldProps<ICompetencyAssessmentFormValue>) => {
                            const error = getIn(form.errors, `responder.${index}.employeeUid`);
                            const touch = getIn(form.touched, `responder.${index}.employeeUid`);
                            
                            return (
                              <AccountEmployeeAllOption filter={props.filterAccountEmployee}>
                                <SelectField
                                  isSearchable
                                  // isClearable={field.value !== ''}
                                  isDisabled={
                                    props.formikBag.isSubmitting || 
                                    props.formikBag.values.employeeUid === '' || 
                                    props.formikBag.values.responder[index].assessorType === '' || 
                                    props.formikBag.values.responder[index].assessorType === AssessorType.Self || 
                                    isDeleteAble(item.uid)}
                                  escapeClearsValue={true} 
                                  menuPlacement="auto"
                                  menuPosition="fixed"
                                  valueString={item.employeeUid}
                                  textFieldProps={{
                                    label: props.intl.formatMessage(hrMessage.competency.field.employee),
                                    placeholder: props.intl.formatMessage(hrMessage.competency.field.employee),
                                    required: true,
                                    helperText: touch && error,
                                    error: touch && Boolean(error)
                                  }}
                                  onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
                                  onChange={(selected: ISelectFieldOption) => {
                                    const value = selected && selected.value || '';

                                    if (value !== '') {
                                      if (props.formikBag.values.responder[index].assessorType !== AssessorType.Self && value !== props.formikBag.values.employeeUid) {
                                        props.formikBag.setFieldValue(field.name, value || '');
                                        props.formikBag.setFieldValue(`responder.${index}.employeeName`, selected && selected.label || '');
                                      }
                                    } else {
                                      props.formikBag.setFieldValue(field.name, value);
                                    }                                    
                                  }}
                                />
                              </AccountEmployeeAllOption>
                            );
                          }}
                        />

                        {
                          !isDeleteAble(item.uid) &&
                          <CardActions>
                            <Button
                              fullWidth
                              color="secondary" 
                              disabled={props.formikBag.isSubmitting || props.formikBag.values.employeeUid === ''}
                              onClick={() => {
                                fields.remove(index);
                                handleToggle(undefined);
                              }}
                            >
                              <DeleteForever className={props.classes.marginFarRight} />
                              {props.intl.formatMessage(hrMessage.competency.field.responder)}
                            </Button>
                          </CardActions>
                        }
                      </Collapse>
                    </React.Fragment>
                  )
                }
              </List>
            </Card>
            <div className={props.classes.flexContent}>
              <Card square>
                <CardActions>
                  <Button
                    fullWidth
                    color="primary"
                    disabled={props.formikBag.isSubmitting || props.formikBag.values.employeeUid === ''}
                    onClick={() => {
                      fields.push({
                        employeeUid: '',
                        assessorType: ''
                      });
                      handleToggle(props.formikBag.values.responder.length);
                    }}
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

  return render;
};

export const CompetencyAssessmentResponder = compose<AllProps, IOwnProps>(
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters)
)(competencyAssessmentResponder);