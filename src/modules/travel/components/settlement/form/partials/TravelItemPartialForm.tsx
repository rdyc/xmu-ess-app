import { FormMode } from '@generic/types';
import { NumberFormatter } from '@layout/components/fields/NumberFormatter';
import { Card, CardContent, CardHeader, Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import { Field, FieldArray, FieldProps, FormikProps, getIn } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';

import { ISystemListFilter } from '@common/classes/filters';
import { CommonSystemOption } from '@common/components/options/CommonSystemOption';
import { ISelectFieldOption, SelectField } from '@layout/components/fields/SelectField';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { AccessTime, ChevronLeft, ChevronRight, DateRange } from '@material-ui/icons';
import { travelMessage } from '@travel/locales/messages/travelMessage';
import { DateTimePicker } from 'material-ui-pickers';
import * as moment from 'moment';
import { ITravelSettlementFormValue } from '../TravelSettlementForm';

type TravelItemPartialFormProps = {
  formMode: FormMode; 
  formikBag: FormikProps<ITravelSettlementFormValue>;
  intl: InjectedIntl;
  filterCommonSystem: ISystemListFilter;
  classes: {
    flexContent: string;
    marginFarRight: string;
  };
};

const calculateDiem = (start: string, end: string, index: number, props: TravelItemPartialFormProps) => {
  let result: number = 0;

  if (start !== '' && end !== '') {
    const startDate = moment(start);
    const endDate = moment(end);
    const diffHours = endDate.diff(startDate, 'hours');
    const diffDays = startDate.isSame(endDate, 'years') ?
      endDate.dayOfYear() - startDate.dayOfYear() :
      endDate.diff(startDate, 'days');

    if (startDate.isSame(endDate, 'days')) {
      result = diffHours >= 8 ? 1 : 0;
    } else if (!startDate.isSame(endDate, 'days') && endDate.hours() >= 17) {
      result = diffDays + 1;
    } else {
      result = diffDays;
    }
  }

  // calculate amount
  const thisAmount = result * props.formikBag.values.items[index].diemValue * props.formikBag.values.items[index].currencyRate;
  let totalValue = 0;

  // set duration & amount
  props.formikBag.setFieldValue(`items.${index}.duration`, result);
  props.formikBag.setFieldValue(`items.${index}.amount`, thisAmount);

  // calculate total requested
  totalValue = thisAmount;
  props.formikBag.values.items.forEach((requestItem, indexItem) => {
    if (index !== indexItem) {
      totalValue = totalValue + requestItem.costTransport + requestItem.costHotel + requestItem.amount;
    } else {
      totalValue = totalValue + requestItem.costHotel + requestItem.costTransport;
    }                              
  });

  // set ttoal
  props.formikBag.setFieldValue('total', totalValue);
};

const TravelItemPartialForm: React.ComponentType<TravelItemPartialFormProps> = props => (
  <FieldArray
    name="items"
    render={() => (
      <React.Fragment>
        {
          props.formikBag.values.items.length > 0 &&
          props.formikBag.values.items.map((item, index) =>
            <div className={props.classes.flexContent} key={index}>
              <Card square>
                <CardHeader 
                  title={`#${index + 1} - ${item.uid || 'Draft'}`}
                />
                <CardContent>
                  <Field 
                    name={`items.${index}.fullName`}
                    render={({ field, form }: FieldProps<ITravelSettlementFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.fullName`);
                      const touch = getIn(form.touched, `items.${index}.fullName`);

                      return (
                        <TextField 
                          {...GlobalStyle.TextField.ReadOnly}
                          {...field}
                          fullWidth
                          label={props.intl.formatMessage(travelMessage.request.field.fullName)}
                          placeholder={props.intl.formatMessage(travelMessage.request.field.fullName)}
                          helperText={touch && error}
                          error={touch && Boolean(error)}
                        />
                      );
                    }}
                  />

                  <Field
                    name="transportType"
                    render={({ field, form }: FieldProps<ITravelSettlementFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.transportType`);
                      const touch = getIn(form.touched, `items.${index}.transportType`);

                      return (
                        <React.Fragment>
                          <CommonSystemOption category="transportation" filter={props.filterCommonSystem}>
                            <SelectField
                              isSearchable
                              isDisabled={props.formikBag.isSubmitting}
                              isClearable={props.formikBag.values.items[index].transportType !== ''}
                              escapeClearsValue={true}
                              valueString={props.formikBag.values.items[index].transportType}
                              textFieldProps={{
                                label: props.intl.formatMessage(travelMessage.request.field.transportType),
                                required: true,
                                helperText: touch && error,
                                error: touch && Boolean(error)
                              }}
                              onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
                              onChange={(selected: ISelectFieldOption) => props.formikBag.setFieldValue(`items.${index}.transportType`, selected && selected.value || '')}
                            />
                          </CommonSystemOption>
                        </React.Fragment>
                      );
                    }}
                  />
                  
                  <Field
                    key={index}
                    name={`items.${index}.isRoundTrip`}
                    render={({ field, form }: FieldProps<ITravelSettlementFormValue>) => (
                      <FormControlLabel
                        label={props.intl.formatMessage(travelMessage.request.field.isRoundTrip)}
                        control={
                          <Checkbox 
                            {...field} 
                            value={field.value}
                            checked={props.formikBag.values.items[index].isRoundTrip}
                          />
                        }
                        style={{width: '100%'}}
                      />
                    )}
                  />

                  <Field 
                    name={`items.${index}.from`}
                    render={({ field, form }: FieldProps<ITravelSettlementFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.from`);
                      const touch = getIn(form.touched, `items.${index}.from`);

                      return (
                        <TextField 
                          {...field}
                          fullWidth
                          required
                          margin="normal"
                          autoComplete="off"
                          disabled={form.isSubmitting}
                          label={props.intl.formatMessage(travelMessage.request.field.from)}
                          placeholder={props.intl.formatMessage(travelMessage.request.field.from)}
                          helperText={touch && error}
                          error={touch && Boolean(error)}
                        />
                      );
                    }}
                  />

                  <Field 
                    name={`items.${index}.destination`}
                    render={({ field, form }: FieldProps<ITravelSettlementFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.destination`);
                      const touch = getIn(form.touched, `items.${index}.destination`);

                      return (
                        <TextField 
                          {...field}
                          fullWidth
                          required
                          margin="normal"
                          autoComplete="off"
                          disabled={form.isSubmitting}
                          label={props.intl.formatMessage(travelMessage.request.field.destination)}
                          placeholder={props.intl.formatMessage(travelMessage.request.field.destination)}
                          helperText={touch && error}
                          error={touch && Boolean(error)}
                        />
                      );
                    }}
                  />

                  <Field 
                    name={`items.${index}.departureDate`}
                    render={({ field, form }: FieldProps<ITravelSettlementFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.departureDate`);
                      const touch = getIn(form.touched, `items.${index}.departureDate`);

                      return (
                        <DateTimePicker
                          {...field}
                          fullWidth
                          required={true}
                          margin="normal"
                          minDate={props.formikBag.values.start}
                          maxDate={props.formikBag.values.end}
                          disabled={form.isSubmitting}
                          timeIcon={<AccessTime />}
                          dateRangeIcon={<DateRange />}
                          ampm={false}
                          showTodayButton
                          label={props.intl.formatMessage(travelMessage.request.field.itemStart)}
                          placeholder={props.intl.formatMessage(travelMessage.request.field.itemStart)}
                          value={moment(props.formikBag.values.items[index].departureDate).format('YYYY-MM-DD HH:mm')}
                          leftArrowIcon={<ChevronLeft />}
                          rightArrowIcon={<ChevronRight />}
                          format="MMMM DD, YYYY HH:mm" 
                          helperText={touch && error}
                          error={touch && Boolean(error)}
                          onChange={(momentDate: moment.Moment) => {
                            // set value
                            props.formikBag.setFieldValue(`items.${index}.departureDate`, momentDate.format('YYYY-MM-DD HH:mm'));

                            // set diem duration
                            calculateDiem(momentDate.format('YYYY-MM-DD HH:mm'), props.formikBag.values.items[index].returnDate, index, props);
                          }}
                          invalidLabel=""
                        />
                      );
                    }}
                  />

                  <Field 
                    name={`items.${index}.returnDate`}
                    render={({ field, form }: FieldProps<ITravelSettlementFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.returnDate`);
                      const touch = getIn(form.touched, `items.${index}.returnDate`);

                      return (
                        <DateTimePicker
                          {...field}
                          fullWidth
                          required={true}
                          margin="normal"
                          minDate={props.formikBag.values.start}
                          maxDate={props.formikBag.values.end}
                          disabled={form.isSubmitting}
                          timeIcon={<AccessTime />}
                          dateRangeIcon={<DateRange />}
                          ampm={false}
                          showTodayButton
                          label={props.intl.formatMessage(travelMessage.request.field.itemEnd)}
                          placeholder={props.intl.formatMessage(travelMessage.request.field.itemEnd)}
                          leftArrowIcon={<ChevronLeft />}
                          rightArrowIcon={<ChevronRight />}
                          format="MMMM DD, YYYY HH:mm"
                          helperText={touch && error}
                          error={touch && Boolean(error)}
                          onChange={(momentDate: moment.Moment) => {
                            // set value
                            props.formikBag.setFieldValue(`items.${index}.returnDate`, momentDate.format('YYYY-MM-DD HH:mm'));

                            // set diem duration
                            calculateDiem(props.formikBag.values.items[index].departureDate, momentDate.format('YYYY-MM-DD HH:mm'), index, props);
                          }}
                          invalidLabel=""
                        />
                      );
                    }}
                  />
                  
                  <Field
                    name={`items.${index}.costTransport`}
                    render={({ field, form }: FieldProps<ITravelSettlementFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.costTransport`);
                      const touch = getIn(form.touched, `items.${index}.costTransport`);

                      return (
                        <TextField
                          {...field}
                          fullWidth
                          required
                          disabled={form.isSubmitting}
                          margin="normal"
                          autoComplete="off"
                          label={props.intl.formatMessage(travelMessage.request.field.transportCost)}
                          placeholder={props.intl.formatMessage(travelMessage.request.field.transportCost)}
                          helperText={touch && error}
                          error={touch && Boolean(error)}
                          InputProps={{
                            inputComponent: NumberFormatter,
                          }}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            let thisCost = 0;
                            let totalValue = 0;

                            if (e.target.value === '') {
                              // set current field
                              props.formikBag.setFieldValue(field.name, 0);
                            } else {
                              thisCost = parseFloat(e.target.value);

                              // set current field
                              props.formikBag.setFieldValue(field.name, thisCost);
                            }

                            // set cost field
                            props.formikBag.setFieldValue(`items.${index}.costTransport`, thisCost);

                            // calculate total requested
                            totalValue = thisCost;
                            props.formikBag.values.items.forEach((requestItem, indexItem) => {
                              if (index !== indexItem) {
                                totalValue = totalValue + requestItem.costTransport + requestItem.costHotel + requestItem.amount;
                              } else {
                                totalValue = totalValue + requestItem.costHotel + requestItem.amount;
                              }                         
                            });

                            // set total
                            props.formikBag.setFieldValue('total', totalValue);
                          }}
                        />
                      );
                    }}
                  />
                  
                  <Field
                    key={index}
                    name={`items.${index}.isTransportByCompany`}
                    render={({ field, form }: FieldProps<ITravelSettlementFormValue>) => (
                      <FormControlLabel
                        label={props.intl.formatMessage(travelMessage.request.field.isTransportByCompany)}
                        control={
                          <Checkbox 
                            {...field} 
                            value={field.value}
                            checked={props.formikBag.values.items[index].isTransportByCompany}
                          />
                        }
                        style={{width: '100%'}}
                      />
                    )}
                  />

                  <Field 
                    name={`items.${index}.hotel`}
                    render={({ field, form }: FieldProps<ITravelSettlementFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.hotel`);
                      const touch = getIn(form.touched, `items.${index}.hotel`);

                      return (
                        <TextField 
                          {...field}
                          fullWidth
                          required
                          margin="normal"
                          autoComplete="off"
                          disabled={form.isSubmitting}
                          label={props.intl.formatMessage(travelMessage.request.field.hotel)}
                          placeholder={props.intl.formatMessage(travelMessage.request.field.hotel)}
                          helperText={touch && error}
                          error={touch && Boolean(error)}
                        />
                      );
                    }}
                  />
                  
                  <Field
                    name={`items.${index}.costHotel`}
                    render={({ field, form }: FieldProps<ITravelSettlementFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.costHotel`);
                      const touch = getIn(form.touched, `items.${index}.costHotel`);

                      return (
                        <TextField
                          {...field}
                          fullWidth
                          required
                          disabled={form.isSubmitting}
                          margin="normal"
                          autoComplete="off"
                          label={props.intl.formatMessage(travelMessage.request.field.hotelCost)}
                          placeholder={props.intl.formatMessage(travelMessage.request.field.hotelCost)}
                          helperText={touch && error}
                          error={touch && Boolean(error)}
                          InputProps={{
                            inputComponent: NumberFormatter,
                          }}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            let thisCost = 0;
                            let totalValue = 0;

                            if (e.target.value === '') {
                              // set current field
                              props.formikBag.setFieldValue(field.name, 0);
                            } else {
                              thisCost = parseFloat(e.target.value);

                              // set current field
                              props.formikBag.setFieldValue(field.name, thisCost);
                            }

                            // set cost field
                            props.formikBag.setFieldValue(`items.${index}.costHotel`, thisCost);

                            // calculate total requested
                            totalValue = thisCost;
                            props.formikBag.values.items.forEach((requestItem, indexItem) => {
                              if (index !== indexItem) {
                                totalValue = totalValue + requestItem.costTransport + requestItem.costHotel + requestItem.amount;
                              } else {
                                totalValue = totalValue + requestItem.costTransport + requestItem.amount;
                              }                         
                            });

                            // set total
                            props.formikBag.setFieldValue('total', totalValue);
                          }}
                        />
                      );
                    }}
                  />
                  
                  <Field
                    key={index}
                    name={`items.${index}.isHotelByCompany`}
                    render={({ field, form }: FieldProps<ITravelSettlementFormValue>) => (
                      <FormControlLabel
                        label={props.intl.formatMessage(travelMessage.request.field.isHotelByCompany)}
                        control={
                          <Checkbox 
                            {...field} 
                            value={field.value}
                            checked={props.formikBag.values.items[index].isHotelByCompany}
                          />
                        }
                        style={{width: '100%'}}
                      />
                    )}
                  />

                  <Field 
                    name={`items.${index}.notes`}
                    render={({ field, form }: FieldProps<ITravelSettlementFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.notes`);
                      const touch = getIn(form.touched, `items.${index}.notes`);

                      return (
                        <TextField 
                          {...field}
                          fullWidth
                          required
                          margin="normal"
                          autoComplete="off"
                          disabled={form.isSubmitting}
                          label={props.intl.formatMessage(travelMessage.request.field.note)}
                          placeholder={props.intl.formatMessage(travelMessage.request.field.note)}
                          helperText={touch && error}
                          error={touch && Boolean(error)}
                        />
                      );
                    }}
                  />
                  
                  <Field 
                    name={`items.${index}.duration`}
                    render={({ field, form }: FieldProps<ITravelSettlementFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.duration`);
                      const touch = getIn(form.touched, `items.${index}.duration`);

                      return (
                        <TextField 
                          {...GlobalStyle.TextField.ReadOnly}
                          {...field}
                          fullWidth
                          label={props.intl.formatMessage(travelMessage.request.field.duration)}
                          placeholder={props.intl.formatMessage(travelMessage.request.field.duration)}
                          helperText={touch && error}
                          error={touch && Boolean(error)}
                        />
                      );
                    }}
                  />
                  
                  <Field 
                    name={`items.${index}.amount`}
                    render={({ field, form }: FieldProps<ITravelSettlementFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.amount`);
                      const touch = getIn(form.touched, `items.${index}.amount`);

                      return (
                        <TextField 
                          {...GlobalStyle.TextField.ReadOnly}
                          {...field}
                          fullWidth
                          label={props.intl.formatMessage(travelMessage.request.field.amount)}
                          placeholder={props.intl.formatMessage(travelMessage.request.field.amount)}
                          helperText={touch && error}
                          error={touch && Boolean(error)}
                        />
                      );
                    }}
                  />
                  
                  <Field 
                    name={`items.${index}.currencyUid`}
                    render={({ field, form }: FieldProps<ITravelSettlementFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.currencyUid`);
                      const touch = getIn(form.touched, `items.${index}.currencyUid`);

                      return (
                        <TextField 
                          {...GlobalStyle.TextField.ReadOnly}
                          {...field}
                          fullWidth
                          label={props.intl.formatMessage(travelMessage.request.field.currencyUid)}
                          placeholder={props.intl.formatMessage(travelMessage.request.field.currencyUid)}
                          helperText={touch && error}
                          error={touch && Boolean(error)}
                        />
                      );
                    }}
                  />
                  
                  <Field 
                    name={`items.${index}.currencyRate`}
                    render={({ field, form }: FieldProps<ITravelSettlementFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.currencyRate`);
                      const touch = getIn(form.touched, `items.${index}.currencyRate`);

                      return (
                        <TextField 
                          {...GlobalStyle.TextField.ReadOnly}
                          {...field}
                          fullWidth
                          label={props.intl.formatMessage(travelMessage.request.field.currencyRate)}
                          placeholder={props.intl.formatMessage(travelMessage.request.field.currencyRate)}
                          helperText={touch && error}
                          error={touch && Boolean(error)}
                        />
                      );
                    }}
                  />
                  
                  <Field 
                    name={`items.${index}.diemValue`}
                    render={({ field, form }: FieldProps<ITravelSettlementFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.diemValue`);
                      const touch = getIn(form.touched, `items.${index}.diemValue`);

                      return (
                        <TextField 
                          {...GlobalStyle.TextField.ReadOnly}
                          {...field}
                          fullWidth
                          label={props.intl.formatMessage(travelMessage.request.field.diemValue)}
                          placeholder={props.intl.formatMessage(travelMessage.request.field.diemValue)}
                          helperText={touch && error}
                          error={touch && Boolean(error)}
                        />
                      );
                    }}
                  />
                </CardContent>
              </Card>
            </div>
          )
        }
      </React.Fragment>
    )}
  />
);

export default TravelItemPartialForm;