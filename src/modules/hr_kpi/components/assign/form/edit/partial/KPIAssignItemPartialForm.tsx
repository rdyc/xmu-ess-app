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
  handleSetLoadItem: () => void;
}

type AllProps
 = KPIHRInputItemPartialFormProps
 & WithStyles;

const KPIHRInputItemPartialForm: React.ComponentType<AllProps> = props => {
  const setItemValue = () => {
    props.formikBag.setValues({
      uid: props.formikBag.values.uid,
      isAssignInUse: props.formikBag.values.isAssignInUse,
      employeeUid: props.formikBag.values.employeeUid,
      employeeName: props.formikBag.values.employeeName,
      companyUid: props.formikBag.values.companyUid,
      positionUid: props.formikBag.values.positionUid,
      templateUid: props.formikBag.values.templateUid,
      year: props.formikBag.values.year,
      totalWeight: props.formikBag.values.totalWeight,
      isFinal: props.formikBag.values.isFinal,
      isFirst: props.formikBag.values.isFirst,
      revision: props.formikBag.values.revision,
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
                  {props.intl.formatMessage(kpiMessage.employee.field.categoryUid)}
                </TableCell>
                <TableCell className={classNames(props.classes.cellWidthMd)}>
                  {props.intl.formatMessage(kpiMessage.employee.field.categoryName)}
                </TableCell>
                <TableCell className={classNames(props.classes.cellWidthMd)}>
                  {props.intl.formatMessage(kpiMessage.employee.field.measurementUid)}
                </TableCell>
                <TableCell className={classNames(props.classes.cellWidthMd)}>
                  {props.intl.formatMessage(kpiMessage.employee.field.measurementDescription)}
                </TableCell>
                <TableCell className={classNames(props.classes.cellWidthMd)}>
                  {props.intl.formatMessage(kpiMessage.employee.field.target)}
                </TableCell>
                <TableCell className={classNames(props.classes.cellWidthXS)}>
                  {props.intl.formatMessage(kpiMessage.employee.field.weight)}
                </TableCell>
                <TableCell className={classNames(props.classes.cellWidthXS)}>
                  {props.intl.formatMessage(kpiMessage.employee.field.threshold)}
                </TableCell>
                <TableCell className={classNames(props.classes.cellWidthXS)}>
                  {props.intl.formatMessage(kpiMessage.employee.field.amount)}
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
                          <TableCell 
                            style={{ verticalAlign: 'top' }}
                            onClick={() => props.formikBag.setFieldValue(`items.${index}.isOpen`, true)}
                          >
                            {props.formikBag.values.items[index].categoryValue}
                          </TableCell>
                          <TableCell 
                            style={{ verticalAlign: 'top' }}
                            onClick={() => props.formikBag.setFieldValue(`items.${index}.isOpen`, true)}
                          >
                            {props.formikBag.values.items[index].categoryName}
                          </TableCell>
                          <TableCell 
                            style={{ verticalAlign: 'top' }}
                            onClick={() => props.formikBag.setFieldValue(`items.${index}.isOpen`, true)}
                          >
                            {props.formikBag.values.items[index].measurementValue}
                          </TableCell>
                          <TableCell 
                            style={{ verticalAlign: 'top' }}
                            onClick={() => props.formikBag.setFieldValue(`items.${index}.isOpen`, true)}
                          >
                            {props.formikBag.values.items[index].measurementDescription}
                          </TableCell>
                          <TableCell 
                            style={{ verticalAlign: 'top' }}
                            onClick={() => props.formikBag.setFieldValue(`items.${index}.isOpen`, true)}
                          >
                            {props.formikBag.values.items[index].target}
                          </TableCell>
                          <TableCell 
                            numeric 
                            style={{ verticalAlign: 'top' }}
                            onClick={() => props.formikBag.setFieldValue(`items.${index}.isOpen`, true)}
                          >
                            {`${props.intl.formatNumber(props.formikBag.values.items[index].weight)} %`}
                          </TableCell>
                          <TableCell 
                            numeric 
                            style={{ verticalAlign: 'top' }}
                            onClick={() => props.formikBag.setFieldValue(`items.${index}.isOpen`, true)}
                          >
                            {
                              props.formikBag.values.items[index].measurementType === MeasurementType.Scoring  &&
                              props.intl.formatNumber(item.threshold || 0) ||
                              '-'
                            }
                          </TableCell>
                          <TableCell 
                            numeric 
                            style={{ verticalAlign: 'top' }}
                            onClick={() => props.formikBag.setFieldValue(`items.${index}.isOpen`, true)}
                          >
                            {
                              (props.formikBag.values.items[index].measurementType === MeasurementType.Scoring ||
                                props.formikBag.values.items[index].measurementType === MeasurementType.Attendance) &&
                              props.intl.formatNumber(item.amount) ||
                              '-'
                            }
                          </TableCell>

                          <KPIAssignSingleItemPartialForm
                            formikBag={props.formikBag}
                            formMode={props.formMode}
                            intl={props.intl}
                            classes={props.classes}
                            filterKPICategory={props.filterKPICategory}
                            filterKPIMeasurement={props.filterKPIMeasurement}
                            itemDialogIndex={index}
                            isDialogFullScreen={props.isDialogFullScreen}
                          />
                          <TableCell>
                            <IconButton 
                              disabled={props.formikBag.values.items[index].isAssignItemInUse}
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
                        </TableRow>
                      </Tooltip>
                    )}
                    <TableRow>
                      <TableCell colSpan={12}>
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
      </CardContent>
      {
        props.loadItem &&
        setItemValue()
      }
    </Card>
  );
};

export default KPIHRInputItemPartialForm;