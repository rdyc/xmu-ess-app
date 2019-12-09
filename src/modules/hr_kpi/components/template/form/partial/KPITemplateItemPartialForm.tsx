import { FormMode } from '@generic/types';
import { layoutMessage } from '@layout/locales/messages';
import { Button, Card, CardHeader, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, WithStyles } from '@material-ui/core';
import { ArrowDownward, ArrowUpward, DeleteForever, GroupAdd } from '@material-ui/icons';
import { Field, FieldArray, FieldArrayRenderProps, FieldProps, FormikProps, getIn } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';

import { MeasurementType } from '@common/classes/types';
import { IKPICategoryGetListFilter } from '@kpi/classes/filter/category';
import { IKPIMeasurementGetListFilter } from '@kpi/classes/filter/measurement';
import { KPICategoryGroupType } from '@kpi/classes/types';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import * as classNames from 'classnames';
import { IKPITemplateFormValue } from '../KPITemplateForm';
import KPITemplateSingleItemPartialForm from './KPITemplateSingleItemPartialForm';

interface KPITemplateItemPartialFormProps {
  formMode: FormMode; 
  formikBag: FormikProps<IKPITemplateFormValue>;
  intl: InjectedIntl;
  filterKPICategory: IKPICategoryGetListFilter;
  filterKPIMeasurement: IKPIMeasurementGetListFilter;
  isDialogFullScreen: boolean;
}

type AllProps
 = KPITemplateItemPartialFormProps
 & WithStyles;

const KPITemplateItemPartialForm: React.ComponentType<AllProps> = props => (
  <Card square>
    <CardHeader 
      title={props.intl.formatMessage(kpiMessage.template.section.itemTitle)}
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
              <TableCell className={classNames(props.classes.cellWidthMd, props.classes.ultraDense)}>
                {props.intl.formatMessage(kpiMessage.template.field.categoryUid)}
              </TableCell>
              <TableCell className={classNames(props.classes.cellWidthMd, props.classes.ultraDense)}>
                {props.intl.formatMessage(kpiMessage.template.field.categoryName)}
              </TableCell>
              <TableCell className={classNames(props.classes.cellWidthMd, props.classes.ultraDense)}>
                {props.intl.formatMessage(kpiMessage.template.field.measurementUid)}
              </TableCell>
              <TableCell className={classNames(props.classes.cellWidthMd, props.classes.ultraDense)}>
                {props.intl.formatMessage(kpiMessage.template.field.target)}
              </TableCell>
              <TableCell className={classNames(props.classes.cellWidthXS, props.classes.ultraDense)}>
                {props.intl.formatMessage(kpiMessage.template.field.weight)}
              </TableCell>
              <TableCell className={classNames(props.classes.cellWidthXS, props.classes.ultraDense)}>
                {props.intl.formatMessage(kpiMessage.template.field.threshold)}
              </TableCell>
              <TableCell className={classNames(props.classes.cellWidthXS, props.classes.ultraDense)}>
                {props.intl.formatMessage(kpiMessage.template.field.amount)}
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
                          name={`items.${index}.categoryUid`}
                          render={({ form }: FieldProps<IKPITemplateFormValue>) => {
                            const error = getIn(form.errors, `items.${index}.categoryUid`);
                            const touch = getIn(form.touched, `items.${index}.categoryUid`);

                            return (
                              <Tooltip
                                title={touch && error || ''}
                              >
                                <TableCell 
                                  style={{ verticalAlign: 'top' }} className={classNames(props.classes.ultraDense, touch && Boolean(error) && props.classes.backgroundColorError)}
                                  onClick={() => props.formikBag.setFieldValue(`items.${index}.isOpen`, true)}
                                >
                                  {props.formikBag.values.items[index].categoryValue}
                                </TableCell>
                              </Tooltip>
                            );  
                          }} 
                        />

                        <Field
                          name={`items.${index}.categoryName`}
                          render={({ field, form }: FieldProps<IKPITemplateFormValue>) => {
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
                          name={`items.${index}.measurementUid`}
                          render={({ field, form }: FieldProps<IKPITemplateFormValue>) => {
                            const error = getIn(form.errors, `items.${index}.measurementUid`);
                            const touch = getIn(form.touched, `items.${index}.measurementUid`);

                            return (
                              <Tooltip
                                title={touch && error || ''}
                              >
                                <TableCell 
                                  style={{ verticalAlign: 'top', whiteSpace: 'pre-line' }} className={classNames(props.classes.ultraDense, touch && Boolean(error) && props.classes.backgroundColorError)}
                                  onClick={() => props.formikBag.setFieldValue(`items.${index}.isOpen`, true)}
                                >
                                  {props.formikBag.values.items[index].measurementValue}
                                </TableCell>
                              </Tooltip>
                            );
                          }}
                        />

                        <Field
                          name={`items.${index}.target`}
                          render={({ field, form }: FieldProps<IKPITemplateFormValue>) => {
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
                          render={({ field, form }: FieldProps<IKPITemplateFormValue>) => {
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
                          render={({ field, form }: FieldProps<IKPITemplateFormValue>) => {
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
                          render={({ field, form }: FieldProps<IKPITemplateFormValue>) => {
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

                        <TableCell>
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
                          <Tooltip title={props.intl.formatMessage(kpiMessage.template.action.moveUp)}>
                            <IconButton 
                              disabled={index <= 0} 
                              onClick={() => {
                                const currentRow = props.formikBag.values.items[index];

                                props.formikBag.setFieldValue(`items.${index}`, props.formikBag.values.items[index - 1]);
                                props.formikBag.setFieldValue(`items.${index - 1}`, currentRow);
                              }}
                            >
                              <ArrowUpward fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title={props.intl.formatMessage(kpiMessage.template.action.moveDown)}>
                            <IconButton 
                              disabled={index >= (props.formikBag.values.items.length - 1)} 
                              onClick={() => {                                
                                const currentRow = props.formikBag.values.items[index];

                                props.formikBag.setFieldValue(`items.${index}`, props.formikBag.values.items[index + 1]);
                                props.formikBag.setFieldValue(`items.${index + 1}`, currentRow);
                              }}
                            >
                              <ArrowDownward fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                        <KPITemplateSingleItemPartialForm
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
                      </TableRow>
                    </Tooltip>
                  )}
                  <TableRow>
                    <TableCell colSpan={9}>
                      <Button
                        fullWidth
                        color="primary" 
                        disabled={props.formikBag.isSubmitting}
                        onClick={() => fields.push({
                          uid: '',
                          categoryUid: '',
                          categoryName: '',
                          measurementUid: '',
                          target: '',
                          weight: 0,
                          threshold: 0,
                          amount: 0,
                          isOpen: true,
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
  </Card>
);

export default KPITemplateItemPartialForm;