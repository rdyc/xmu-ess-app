import { FormMode } from '@generic/types';
import { layoutMessage } from '@layout/locales/messages';
import { Button, Card, CardHeader, Grid, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, WithStyles } from '@material-ui/core';
import { DeleteForever, GroupAdd, KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import { Field, FieldArray, FieldArrayRenderProps, FieldProps, FormikProps, getIn } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';

import { MeasurementType } from '@common/classes/types';
import { IKPICategoryGetListFilter } from '@kpi/classes/filter/category';
import { IKPIMeasurementGetListFilter } from '@kpi/classes/filter/measurement';
import { KPICategoryGroupType } from '@kpi/classes/types/category/KPICategoryGroupType';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import * as classNames from 'classnames';
import { IKPIAssignFormValue, IKPIAssignItemFormValue } from '../KPIAssignForm';
import KPIAssignSingleItemPartialForm from './KPIAssignSingleItemPartialForm';

interface KPIHRInputItemPartialFormProps {
  formMode: FormMode; 
  formikBag: FormikProps<IKPIAssignFormValue>;
  intl: InjectedIntl;
  filterKPICategory: IKPICategoryGetListFilter;
  filterKPIMeasurement: IKPIMeasurementGetListFilter;
  isDialogFullScreen: boolean;
  loadItem: boolean;
  listItem: IKPIAssignItemFormValue[];
  templateNotes: string;
  handleSetLoadItem: () => void;
}

type AllProps
 = KPIHRInputItemPartialFormProps
 & WithStyles;

const KPIHRInputItemPartialForm: React.ComponentType<AllProps> = props => {
  const setItemValue = () => {
    props.formikBag.setValues({
      uid: props.formikBag.values.uid,
      employeeUid: props.formikBag.values.employeeUid,
      employeeName: props.formikBag.values.employeeName,
      companyUid: props.formikBag.values.companyUid,
      positionUid: props.formikBag.values.positionUid,
      positionName: props.formikBag.values.positionName,
      templateUid: props.formikBag.values.templateUid,
      year: props.formikBag.values.year,
      totalWeight: props.listItem.map(i => i.weight).reduce((a, b) => a + b, 0),
      isFinal: props.formikBag.values.isFinal,
      isFirst: props.formikBag.values.isFirst,
      revision: props.formikBag.values.revision,
      note: props.templateNotes,
      items: props.listItem,
    });

    props.handleSetLoadItem();
  };

  return (
    <Card square>
      <CardHeader 
        title={props.intl.formatMessage(kpiMessage.employee.section.itemTitle)}
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
        <div
          className={classNames(props.classes.reportContentScrollable)}
        >
          <Table
            className={classNames(props.classes.reportTable)}
            padding="dense"
          >
            <TableHead>
              <TableRow>
                <TableCell className={classNames(props.classes.cellWidthSm, props.classes.ultraDense)}>
                  {props.intl.formatMessage(kpiMessage.employee.field.categoryName)}
                </TableCell>
                <TableCell className={classNames(props.classes.cellWidthMd, props.classes.ultraDense)}>
                  {props.intl.formatMessage(kpiMessage.employee.field.measurementDescription)}
                </TableCell>
                <TableCell className={classNames(props.classes.cellWidthMd, props.classes.ultraDense)}>
                  {props.intl.formatMessage(kpiMessage.employee.field.target)}
                </TableCell>
                <TableCell className={classNames(props.classes.cellWidthXXS, props.classes.ultraDense)}>
                  {props.intl.formatMessage(kpiMessage.employee.field.weight)}
                </TableCell>
                <TableCell className={classNames(props.classes.cellWidthXXS, props.classes.ultraDense)}>
                  {props.intl.formatMessage(kpiMessage.employee.field.threshold)}
                </TableCell>
                <TableCell className={classNames(props.classes.cellWidthXXS, props.classes.ultraDense)}>
                  {props.intl.formatMessage(kpiMessage.employee.field.amount)}
                </TableCell>
                <TableCell className={classNames(props.classes.cellWidthSm, props.classes.ultraDense)}>
                  {props.intl.formatMessage(kpiMessage.template.action.actions)}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <FieldArray
                name="items"
                render={(fields: FieldArrayRenderProps) => (
                  <React.Fragment>
                    {
                      props.formikBag.values.items.length > 0 &&
                      props.formikBag.values.items.map((item, index) =>
                      <Tooltip key={index} title={props.intl.formatMessage(kpiMessage.measurement.field.tooltip)}>
                        <TableRow key={index}>
                          <Field
                            name={`items.${index}.categoryName`}
                            render={({ form }: FieldProps<IKPIAssignFormValue>) => {
                              const error = getIn(form.errors, `items.${index}.categoryName`);
                              const touch = getIn(form.touched, `items.${index}.categoryName`);

                              return (
                                <Tooltip
                                  title={touch && error || ''}
                                >
                                  <TableCell 
                                    style={{ verticalAlign: 'top' }} className={classNames(props.classes.ultraDense, touch && Boolean(error) && props.classes.backgroundColorError)}
                                    onClick={() => props.formikBag.setFieldValue(`items.${index}.isOpen`, true)}
                                  >
                                    {props.formikBag.values.items[index].categoryName}
                                  </TableCell>
                                </Tooltip>
                              );
                            }}
                          />

                          <Field
                            name={`items.${index}.measurementDescription`}
                            render={({ form }: FieldProps<IKPIAssignFormValue>) => {
                              const error = getIn(form.errors, `items.${index}.measurementDescription`);
                              const touch = getIn(form.touched, `items.${index}.measurementDescription`);

                              return (
                                <Tooltip
                                  title={touch && error || ''}
                                >
                                  <TableCell 
                                    style={{ verticalAlign: 'top', whiteSpace: 'pre-line' }} className={classNames(props.classes.ultraDense, touch && Boolean(error) && props.classes.backgroundColorError)}
                                    onClick={() => props.formikBag.setFieldValue(`items.${index}.isOpen`, true)}
                                  >
                                    {props.formikBag.values.items[index].measurementDescription}
                                  </TableCell>
                                </Tooltip>
                              );
                            }}
                          />

                          <Field
                            name={`items.${index}.target`}
                            render={({ form }: FieldProps<IKPIAssignFormValue>) => {
                              const error = getIn(form.errors, `items.${index}.target`);
                              const touch = getIn(form.touched, `items.${index}.target`);

                              return (
                                <Tooltip
                                  title={touch && error || ''}
                                >
                                  <TableCell 
                                    style={{ verticalAlign: 'top', whiteSpace: 'pre-line' }} className={classNames(props.classes.ultraDense, touch && Boolean(error) && props.classes.backgroundColorError)}
                                    onClick={() => props.formikBag.setFieldValue(`items.${index}.isOpen`, true)}
                                  >
                                    {props.formikBag.values.items[index].target}
                                  </TableCell>
                                </Tooltip>
                              );
                            }}
                          />

                          <Field
                            name={`items.${index}.weight`}
                            render={({ form }: FieldProps<IKPIAssignFormValue>) => {
                              const error = getIn(form.errors, `items.${index}.weight`);
                              const touch = getIn(form.touched, `items.${index}.weight`);

                              return (
                                <Tooltip
                                  title={touch && error || ''}
                                >
                                  <TableCell 
                                    numeric 
                                    style={{ verticalAlign: 'top' }} className={classNames(props.classes.ultraDense, touch && Boolean(error) && props.classes.backgroundColorError)}
                                    onClick={() => props.formikBag.setFieldValue(`items.${index}.isOpen`, true)}
                                  >
                                    {
                                      props.formikBag.values.items[index].categoryGroup === KPICategoryGroupType.KPI &&
                                      `${props.intl.formatNumber(props.formikBag.values.items[index].weight)} %` ||
                                      '-'
                                    }
                                  </TableCell>
                                </Tooltip>
                              );
                            }}
                          />

                          <Field
                            name={`items.${index}.threshold`}
                            render={({ form }: FieldProps<IKPIAssignFormValue>) => {
                              const error = getIn(form.errors, `items.${index}.threshold`);
                              const touch = getIn(form.touched, `items.${index}.threshold`);

                              return (
                                <Tooltip
                                  title={touch && error || ''}
                                >
                                <TableCell 
                                  numeric 
                                  style={{ verticalAlign: 'top' }} className={classNames(props.classes.ultraDense, touch && Boolean(error) && props.classes.backgroundColorError)}
                                  onClick={() => props.formikBag.setFieldValue(`items.${index}.isOpen`, true)}
                                >
                                  {
                                    props.formikBag.values.items[index].categoryGroup === KPICategoryGroupType.KPI &&
                                    props.formikBag.values.items[index].measurementType === MeasurementType.Minimum  &&
                                    props.intl.formatNumber(item.threshold || 0) ||
                                    '-'
                                  }
                                </TableCell>
                                </Tooltip>
                              );
                            }}
                          />

                          <Field
                            name={`items.${index}.amount`}
                            render={({ form }: FieldProps<IKPIAssignFormValue>) => {
                              const error = getIn(form.errors, `items.${index}.amount`);
                              const touch = getIn(form.touched, `items.${index}.amount`);

                              return (
                                <Tooltip
                                  title={touch && error || ''}
                                >
                                  <TableCell 
                                    numeric 
                                    style={{ verticalAlign: 'top' }} className={classNames(props.classes.ultraDense, touch && Boolean(error) && props.classes.backgroundColorError)}
                                    onClick={() => props.formikBag.setFieldValue(`items.${index}.isOpen`, true)}
                                  >
                                    {
                                      props.formikBag.values.items[index].categoryGroup === KPICategoryGroupType.KPI &&
                                      (props.formikBag.values.items[index].measurementType === MeasurementType.Minimum ||
                                        props.formikBag.values.items[index].measurementType === MeasurementType.Proporsional) &&
                                      props.intl.formatNumber(item.amount) ||
                                      '-'
                                    }
                                  </TableCell>
                                </Tooltip>
                              );
                            }}
                          />

                          <KPIAssignSingleItemPartialForm
                            formikBag={props.formikBag}
                            formMode={props.formMode}
                            intl={props.intl}
                            classes={props.classes}
                            filterKPICategory={props.filterKPICategory}
                            filterKPIMeasurement={props.filterKPIMeasurement}
                            itemDialogIndex={index}
                            fieldArray={fields}
                            isDialogFullScreen={props.isDialogFullScreen}
                          />
                          <TableCell className={classNames(props.classes.ultraDense)}>
                            <Grid container>
                              <Grid item xs={4}>
                                <Tooltip title={props.intl.formatMessage(layoutMessage.action.delete)}>
                                  <IconButton 
                                    onClick={() => {
                                      // remove current
                                      fields.remove(index);

                                      // calculate total requested
                                      let totalRequest = 0;
                                      props.formikBag.values.items.forEach((requestItem, indexItem) => {
                                        if (index !== indexItem) {
                                          totalRequest = totalRequest + requestItem.weight;
                                        } 
                                      });

                                      // set request
                                      props.formikBag.setFieldValue('totalWeight', totalRequest);
                                    }}
                                  >
                                    <DeleteForever fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              </Grid>
                              <Grid item xs={8}>
                                <Tooltip title={props.intl.formatMessage(kpiMessage.employee.action.moveUp)}>
                                  <IconButton 
                                    disabled={index <= 0} 
                                    onClick={() => {
                                      const currentRow = props.formikBag.values.items[index];

                                      props.formikBag.setFieldValue(`items.${index}`, props.formikBag.values.items[index - 1]);
                                      props.formikBag.setFieldValue(`items.${index - 1}`, currentRow);
                                    }}
                                  >
                                    <KeyboardArrowUp fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title={props.intl.formatMessage(kpiMessage.employee.action.moveDown)}>
                                  <IconButton 
                                    disabled={index >= (props.formikBag.values.items.length - 1)} 
                                    onClick={() => {                                
                                      const currentRow = props.formikBag.values.items[index];

                                      props.formikBag.setFieldValue(`items.${index}`, props.formikBag.values.items[index + 1]);
                                      props.formikBag.setFieldValue(`items.${index + 1}`, currentRow);
                                    }}
                                  >
                                    <KeyboardArrowDown fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              </Grid>
                            </Grid>
                          </TableCell>
                        </TableRow>
                      </Tooltip>
                    )}
                    <TableRow>
                      <TableCell colSpan={13}>
                        <Button
                          fullWidth
                          color="primary" 
                          disabled={props.formikBag.isSubmitting}
                          onClick={() => fields.push({
                            uid: '',
                            isAssignInUse: false,
                            isOpen: true,
                            categoryUid: '',
                            categoryName: '',
                            measurementUid: '',
                            measurementDescription: '',
                            target: '',
                            weight: 0,
                            threshold: 0,
                            amount: 0,
                          })}
                        >
                          <GroupAdd className={props.classes.marginFarRight}/>

                          {props.intl.formatMessage(layoutMessage.action.add)}
                        </Button>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                )}
              />
            </TableBody>
          </Table>
        </div>
      {
        props.loadItem &&
        setItemValue()
      }
    </Card>
  );
};

export default KPIHRInputItemPartialForm;