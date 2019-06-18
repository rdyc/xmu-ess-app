import { IEmployeeListFilter } from '@account/classes/filters';
import { AccountEmployeeOption } from '@account/components/options/AccountEmployeeOption';
import { ISystemListFilter } from '@common/classes/filters';
import { CommonSystemOption } from '@common/components/options/CommonSystemOption';
import { FormMode } from '@generic/types';
import { NumberFormatter } from '@layout/components/fields/NumberFormatter';
import { ISelectFieldOption, SelectField } from '@layout/components/fields/SelectField';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Button, Card, CardActions, CardContent, CardHeader, Checkbox, FormControlLabel, IconButton, TextField } from '@material-ui/core';
import { AccessTime, ChevronLeft, ChevronRight, DateRange, DeleteForever, GroupAdd } from '@material-ui/icons';
import { travelMessage } from '@travel/locales/messages/travelMessage';
import { Field, FieldArray, FieldArrayRenderProps, FieldProps, FormikProps, getIn } from 'formik';
import { DateTimePicker } from 'material-ui-pickers';
import * as moment from 'moment';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { ITravelRequestFormValue } from '../TravelRequestForm';

type TravelRequestItemPartialFormProps = {
  formMode: FormMode;
  formikBag: FormikProps<ITravelRequestFormValue>;
  intl: InjectedIntl;
  classes: {
    flexContent: string;
    marginFarRight: string;
  };
  filterAccountEmployee?: IEmployeeListFilter;
  filterCommonSystem?: ISystemListFilter;
};

const calculateDiem = (start: string, end: string, index: number, props: TravelRequestItemPartialFormProps) => {
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

const TravelRequestItemPartialForm: React.ComponentType<TravelRequestItemPartialFormProps> = props => (
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
                  titleTypographyProps={{ variant: 'body2' }}
                  action={
                    <IconButton
                      onClick={() => {
                        // remove current
                        fields.remove(index);

                        // calculate total cost 
                        let totalCost = 0;
                        props.formikBag.values.items.forEach((travelItem, itemIndex) => {
                          if (index !== itemIndex) {
                            totalCost = travelItem.costTransport + travelItem.costHotel + travelItem.amount;
                          }
                        });

                        // set totalCost 
                        props.formikBag.setFieldValue('total', totalCost);
                      }}
                    >
                      <DeleteForever />
                    </IconButton>
                  }
                />
                <CardContent>
                  <Field
                    name={`items.${index}.employeeUid`}
                    render={({ field, form }: FieldProps<ITravelRequestFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.employeeUid`);
                      const touch = getIn(form.touched, `items.${index}.employeeUid`);

                      return (
                        <AccountEmployeeOption filter={props.filterAccountEmployee} default={item.employee}>
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
                              label: props.intl.formatMessage(travelMessage.request.field.itemEmployeeUid),
                              placeholder: props.intl.formatMessage(travelMessage.request.field.itemEmployeeUidPlaceholder),
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
                    name="transportType"
                    render={({ field, form }: FieldProps<ITravelRequestFormValue>) => {
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
                    render={({ field, form }: FieldProps<ITravelRequestFormValue>) => (
                      <FormControlLabel
                        label={props.intl.formatMessage(travelMessage.request.field.isRoundTrip)}
                        control={
                          <Checkbox
                            {...field}
                            value={field.value}
                            checked={props.formikBag.values.items[index].isRoundTrip}
                          />
                        }
                        style={{ width: '100%' }}
                      />
                    )}
                  />

                  <Field
                    name={`items.${index}.from`}
                    render={({ field, form }: FieldProps<ITravelRequestFormValue>) => {
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
                          placeholder={props.intl.formatMessage(travelMessage.request.field.fromPlaceholder)}
                          helperText={touch && error}
                          error={touch && Boolean(error)}
                        />
                      );
                    }}
                  />

                  <Field
                    name={`items.${index}.destination`}
                    render={({ field, form }: FieldProps<ITravelRequestFormValue>) => {
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
                          placeholder={props.intl.formatMessage(travelMessage.request.field.destinationPlaceholder)}
                          helperText={touch && error}
                          error={touch && Boolean(error)}
                        />
                      );
                    }}
                  />

                  <Field
                    name={`items.${index}.departureDate`}
                    render={({ field, form }: FieldProps<ITravelRequestFormValue>) => {
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
                    render={({ field, form }: FieldProps<ITravelRequestFormValue>) => {
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
                    render={({ field, form }: FieldProps<ITravelRequestFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.costTransport`);
                      const touch = getIn(form.touched, `items.${index}.costTransport`);

                      return (
                        <TextField
                          {...field}
                          fullWidth
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
                    render={({ field, form }: FieldProps<ITravelRequestFormValue>) => (
                      <FormControlLabel
                        label={props.intl.formatMessage(travelMessage.request.field.isTransportByCompany)}
                        control={
                          <Checkbox
                            {...field}
                            value={field.value}
                            checked={props.formikBag.values.items[index].isTransportByCompany}
                          />
                        }
                        style={{ width: '100%' }}
                      />
                    )}
                  />

                  <Field
                    name={`items.${index}.costHotel`}
                    render={({ field, form }: FieldProps<ITravelRequestFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.costHotel`);
                      const touch = getIn(form.touched, `items.${index}.costHotel`);

                      return (
                        <TextField
                          {...field}
                          fullWidth
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
                    render={({ field, form }: FieldProps<ITravelRequestFormValue>) => (
                      <FormControlLabel
                        label={props.intl.formatMessage(travelMessage.request.field.isHotelByCompany)}
                        control={
                          <Checkbox
                            {...field}
                            value={field.value}
                            checked={props.formikBag.values.items[index].isHotelByCompany}
                          />
                        }
                        style={{ width: '100%' }}
                      />
                    )}
                  />

                  <Field
                    name={`items.${index}.hotel`}
                    render={({ field, form }: FieldProps<ITravelRequestFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.hotel`);
                      const touch = getIn(form.touched, `items.${index}.hotel`);

                      return (
                        <TextField
                          {...field}
                          fullWidth
                          margin="normal"
                          autoComplete="off"
                          disabled={form.isSubmitting}
                          label={props.intl.formatMessage(travelMessage.request.field.hotel)}
                          placeholder={props.intl.formatMessage(travelMessage.request.field.hotelPlaceholder)}
                          helperText={touch && error}
                          error={touch && Boolean(error)}
                        />
                      );
                    }}
                  />

                  <Field
                    name={`items.${index}.notes`}
                    render={({ field, form }: FieldProps<ITravelRequestFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.notes`);
                      const touch = getIn(form.touched, `items.${index}.notes`);

                      return (
                        <TextField
                          {...field}
                          fullWidth
                          margin="normal"
                          autoComplete="off"
                          disabled={form.isSubmitting}
                          label={props.intl.formatMessage(travelMessage.request.field.note)}
                          placeholder={props.intl.formatMessage(travelMessage.request.field.notePlaceholder)}
                          helperText={touch && error}
                          error={touch && Boolean(error)}
                        />
                      );
                    }}
                  />

                  <Field
                    name={`items.${index}.duration`}
                    render={({ field, form }: FieldProps<ITravelRequestFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.duration`);
                      const touch = getIn(form.touched, `items.${index}.duration`);

                      return (
                        <TextField
                          {...field}
                          {...GlobalStyle.TextField.ReadOnly}
                          fullWidth
                          disabled={form.isSubmitting}
                          margin="normal"
                          autoComplete="off"
                          label={props.intl.formatMessage(travelMessage.request.field.duration)}
                          placeholder={props.intl.formatMessage(travelMessage.request.field.durationPlaceholder)}
                          helperText={touch && error}
                          error={touch && Boolean(error)}
                          InputProps={{
                            inputComponent: NumberFormatter,
                          }}
                        />
                      );
                    }}
                  />

                  <Field
                    name={`items.${index}.diemValue`}
                    render={({ field, form }: FieldProps<ITravelRequestFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.diemValue`);
                      const touch = getIn(form.touched, `items.${index}.diemValue`);

                      return (
                        <TextField
                          {...field}
                          {...GlobalStyle.TextField.ReadOnly}
                          fullWidth
                          disabled={form.isSubmitting}
                          margin="normal"
                          autoComplete="off"
                          label={props.intl.formatMessage(travelMessage.request.field.diemValue)}
                          placeholder={props.intl.formatMessage(travelMessage.request.field.diemValuePlaceholder)}
                          helperText={touch && error}
                          error={touch && Boolean(error)}
                        />
                      );
                    }}
                  />

                  <Field
                    name={`items.${index}.currencyUid`}
                    render={({ field, form }: FieldProps<ITravelRequestFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.currencyUid`);
                      const touch = getIn(form.touched, `items.${index}.currencyUid`);

                      return (
                        <TextField
                          {...field}
                          {...GlobalStyle.TextField.ReadOnly}
                          fullWidth
                          margin="normal"
                          autoComplete="off"
                          disabled={form.isSubmitting}
                          label={props.intl.formatMessage(travelMessage.request.field.currencyUid)}
                          placeholder={props.intl.formatMessage(travelMessage.request.field.currencyUidPlaceholder)}
                          helperText={touch && error}
                          error={touch && Boolean(error)}
                        />
                      );
                    }}
                  />

                  <Field
                    name={`items.${index}.currencyRate`}
                    render={({ field, form }: FieldProps<ITravelRequestFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.currencyRate`);
                      const touch = getIn(form.touched, `items.${index}.currencyRate`);

                      return (
                        <TextField
                          {...field}
                          {...GlobalStyle.TextField.ReadOnly}
                          fullWidth
                          disabled={form.isSubmitting}
                          margin="normal"
                          autoComplete="off"
                          label={props.intl.formatMessage(travelMessage.request.field.currencyRate)}
                          placeholder={props.intl.formatMessage(travelMessage.request.field.currencyRatePlaceholder)}
                          helperText={touch && error}
                          error={touch && Boolean(error)}
                        />
                      );
                    }}
                  />

                  <Field
                    name={`items.${index}.amount`}
                    render={({ field, form }: FieldProps<ITravelRequestFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.amount`);
                      const touch = getIn(form.touched, `items.${index}.amount`);

                      return (
                        <TextField
                          {...field}
                          {...GlobalStyle.TextField.ReadOnly}
                          fullWidth
                          disabled={form.isSubmitting}
                          margin="normal"
                          autoComplete="off"
                          label={props.intl.formatMessage(travelMessage.request.field.amount)}
                          placeholder={props.intl.formatMessage(travelMessage.request.field.amountPlaceholder)}
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

        <div className={props.classes.flexContent}>
          <Card square>
            <CardHeader
              title={props.intl.formatMessage(travelMessage.request.section.itemTitle)}
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
                  transportType: '',
                  isRoundTrip: false,
                  from: '',
                  destination: '',
                  departureDate: '',
                  returnDate: '',
                  costTransport: 0,
                  isTransportByCompany: false,
                  hotel: '',
                  costHotel: 0,
                  isHotelByCompany: false,
                  notes: '',
                  duration: 0,
                  amount: 0,
                  currencyUid: props.formikBag.values.currency,
                  currencyRate: props.formikBag.values.currencyRate,
                  diemValue: props.formikBag.values.diemValue,
                })}
              >
                <GroupAdd className={props.classes.marginFarRight} />

                {props.intl.formatMessage(layoutMessage.action.add)}
              </Button>
            </CardActions>
          </Card>
        </div>
      </React.Fragment>
    )}
  />
);

export default TravelRequestItemPartialForm;