import { FormMode } from '@generic/types';
import { layoutMessage } from '@layout/locales/messages';
import { Button, Card, CardContent, CardHeader, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, WithStyles } from '@material-ui/core';
import { DeleteForever, GroupAdd } from '@material-ui/icons';
import { FieldArray, FieldArrayRenderProps, FormikProps } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';

import { MeasurementType } from '@common/classes/types';
import { IKPICategoryGetListFilter } from '@kpi/classes/filter/category';
import { IKPIMeasurementGetListFilter } from '@kpi/classes/filter/measurement';
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
    <CardContent>
      <div
        className={classNames(props.classes.reportContentScrollable)}
      >
        <Table
          className={classNames(props.classes.reportTable)}
          padding="dense"
        >
          <TableHead>
            <TableRow>
              <TableCell className={classNames(props.classes.cellWidthMd)}>
                {props.intl.formatMessage(kpiMessage.template.field.categoryUid)}
              </TableCell>
              <TableCell className={classNames(props.classes.cellWidthMd)}>
                {props.intl.formatMessage(kpiMessage.template.field.categoryName)}
              </TableCell>
              <TableCell className={classNames(props.classes.cellWidthMd)}>
                {props.intl.formatMessage(kpiMessage.template.field.measurementUid)}
              </TableCell>
              <TableCell className={classNames(props.classes.cellWidthMd)}>
                {props.intl.formatMessage(kpiMessage.template.field.target)}
              </TableCell>
              <TableCell className={classNames(props.classes.cellWidthXS)}>
                {props.intl.formatMessage(kpiMessage.template.field.weight)}
              </TableCell>
              <TableCell className={classNames(props.classes.cellWidthXS)}>
                {props.intl.formatMessage(kpiMessage.template.field.threshold)}
              </TableCell>
              <TableCell className={classNames(props.classes.cellWidthXS)}>
                {props.intl.formatMessage(kpiMessage.template.field.amount)}
              </TableCell>
              <TableCell className={classNames(props.classes.cellWidthXSS)}>
                {props.intl.formatMessage(layoutMessage.action.delete)}
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
                        <TableCell onClick={() => props.formikBag.setFieldValue(`items.${index}.isOpen`, true)}>
                          {props.formikBag.values.items[index].categoryValue}
                        </TableCell>
                        <TableCell onClick={() => props.formikBag.setFieldValue(`items.${index}.isOpen`, true)}>
                          {props.formikBag.values.items[index].categoryName}
                        </TableCell>
                        <TableCell onClick={() => props.formikBag.setFieldValue(`items.${index}.isOpen`, true)}>
                          {props.formikBag.values.items[index].measurementValue}
                        </TableCell>
                        <TableCell onClick={() => props.formikBag.setFieldValue(`items.${index}.isOpen`, true)}>
                          {props.formikBag.values.items[index].target}
                        </TableCell>
                        <TableCell numeric onClick={() => props.formikBag.setFieldValue(`items.${index}.isOpen`, true)}>
                          {`${props.intl.formatNumber(props.formikBag.values.items[index].weight)} %`}
                        </TableCell>
                        <TableCell numeric onClick={() => props.formikBag.setFieldValue(`items.${index}.isOpen`, true)}>
                          {
                            props.formikBag.values.items[index].measurementType === MeasurementType.Scoring  &&
                            props.intl.formatNumber(item.threshold || 0) ||
                            '-'
                          }
                        </TableCell>
                        <TableCell numeric onClick={() => props.formikBag.setFieldValue(`items.${index}.isOpen`, true)}>
                          {
                            (props.formikBag.values.items[index].measurementType === MeasurementType.Scoring ||
                              props.formikBag.values.items[index].measurementType === MeasurementType.Attendance) &&
                            props.intl.formatNumber(item.amount) ||
                            '-'
                          }
                        </TableCell>
                        <TableCell>
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
                            <DeleteForever />
                        </IconButton>
                      </TableCell>
                        <KPITemplateSingleItemPartialForm
                          formikBag={props.formikBag}
                          formMode={props.formMode}
                          intl={props.intl}
                          classes={props.classes}
                          filterKPICategory={props.filterKPICategory}
                          filterKPIMeasurement={props.filterKPIMeasurement}
                          itemDialogIndex={index}
                          isDialogFullScreen={props.isDialogFullScreen}
                        />
                      </TableRow>
                    </Tooltip>
                  )}
                  <TableRow>
                    <TableCell colSpan={8}>
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
    </CardContent>
  </Card>
);

export default KPITemplateItemPartialForm;