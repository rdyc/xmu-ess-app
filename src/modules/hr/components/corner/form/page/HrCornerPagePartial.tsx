import { FormMode } from '@generic/types';
import { IHrCornerCategoryGetListFilter } from '@hr/classes/filters';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { ISelectFieldOption, SelectField } from '@layout/components/fields/SelectField';
import { Card, CardContent, CardHeader, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, TextField, WithStyles, withStyles } from '@material-ui/core';
import { AddCircle, ChevronLeft, ChevronRight } from '@material-ui/icons';
import styles from '@styles';
import { Field, FieldProps, FormikProps } from 'formik';
import { DatePicker } from 'material-ui-pickers';
import { Moment } from 'moment';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { compose, HandleCreators, mapper, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { HrCornerCategoryList } from '../../list/category/HrCornerCategoryList';
import { HrCornerCategoryOption } from '../../options/HrCornerCategoryOption';
import { ICornerPageFormValue } from './HrCornerPageForm';

interface IOwnOption {
  formMode: FormMode; 
  formikBag: FormikProps<ICornerPageFormValue>;
  intl: InjectedIntl;
  filterCategory?: IHrCornerCategoryGetListFilter;
}

interface IOwnState {
  isCategoryOpen: boolean;
}

interface IOwnStateHandler extends StateHandlerMap<IOwnState> {
  stateUpdate: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleCategoryVisibility: () => void;
}

type AllProps
  = IOwnState
  & IOwnHandler
  & IOwnOption
  & IOwnStateHandler
  & WithStyles<typeof styles>;

const createProps: mapper<AllProps, IOwnState> = (): IOwnState => ({
  isCategoryOpen: false,
});

const stateUpdaters: StateUpdaters<{}, IOwnState, IOwnStateHandler> = {
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const handlerCreators: HandleCreators<AllProps, IOwnHandler> = {
  handleCategoryVisibility: (props: AllProps) => () => {
    props.stateUpdate({
      isCategoryOpen: !props.isCategoryOpen
    });
  }
};

const hrCornerPagePartial: React.ComponentType<AllProps> = props => {

  const render = (
    <React.Fragment>
      <Card square>
        <CardHeader 
          title={props.intl.formatMessage(hrMessage.shared.section.infoTitle, {state: 'Corner Page'})}
        />

        <CardContent>
          <List disablePadding>
          <ListItem disableGutters>
            <ListItemText>
              <Field
                name="category"
                render={({ field, form }: FieldProps<ICornerPageFormValue>) => (
                  <HrCornerCategoryOption filter={props.filterCategory}>
                    <SelectField
                      isSearchable
                      isDisabled={props.formikBag.isSubmitting}
                      isClearable={field.value !== ''}
                      escapeClearsValue={true}
                      valueString={field.value}
                      textFieldProps={{
                        label: props.intl.formatMessage(hrMessage.corner.fieldFor(field.name, 'fieldName')),
                        required: true,
                        helperText: form.touched.category && form.errors.category,
                        error: form.touched.category && Boolean(form.errors.category)
                      }}
                      onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
                      onChange={(selected: ISelectFieldOption) => {
                        props.formikBag.setFieldValue(field.name, selected && selected.value || '');
                      }}
                    />
                  </HrCornerCategoryOption>
                )}
              />
            </ListItemText>
            <ListItemSecondaryAction className={props.classes.marginWideTop}>
              <IconButton 
                disabled={props.formikBag.isSubmitting}
                onClick={() => {
                  props.handleCategoryVisibility();
                }}
              >
                <AddCircle />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>

          <Field
            name="title"
            render={({ field, form }: FieldProps<ICornerPageFormValue>) => (
              <TextField
                {...field}
                fullWidth
                required
                multiline
                disabled={form.isSubmitting}
                margin="normal"
                autoComplete="off"
                label={props.intl.formatMessage(hrMessage.corner.fieldFor(field.name, 'fieldName'))}
                placeholder={props.intl.formatMessage(hrMessage.corner.fieldFor(field.name, 'fieldPlaceholder'))}
                helperText={form.touched.title && form.errors.title}
                error={form.touched.title && Boolean(form.errors.title)}
              />
            )}
          />

          <Field
            name="headline"
            render={({ field, form }: FieldProps<ICornerPageFormValue>) => (
              <TextField
                {...field}
                fullWidth
                required
                multiline
                disabled={form.isSubmitting}
                margin="normal"
                autoComplete="off"
                label={props.intl.formatMessage(hrMessage.corner.fieldFor(field.name, 'fieldName'))}
                placeholder={props.intl.formatMessage(hrMessage.corner.fieldFor(field.name, 'fieldPlaceholder'))}
                helperText={form.touched.headline && form.errors.headline}
                error={form.touched.headline && Boolean(form.errors.headline)}
              />
            )}
          />

          <Field
            name="start"
            render={({ field, form }: FieldProps<ICornerPageFormValue>) => (
              <DatePicker
                {...field}
                fullWidth
                required
                margin="normal"
                disabled={form.isSubmitting}
                showTodayButton
                label={props.intl.formatMessage(hrMessage.corner.fieldFor(field.name, 'fieldName'))}
                placeholder={props.intl.formatMessage(hrMessage.corner.fieldFor(field.name, 'fieldPlaceholder'))}
                leftArrowIcon={<ChevronLeft />}
                rightArrowIcon={<ChevronRight />}
                format="MMMM DD, YYYY"
                helperText={form.touched.start && form.errors.start}
                error={form.touched.start && Boolean(form.errors.start)}
                onChange={(moment: Moment) => props.formikBag.setFieldValue('start', moment.format('YYYY-MM-DD'))}
                invalidLabel=""
              />
            )}
          />

          <Field
            name="end"
            render={({ field, form }: FieldProps<ICornerPageFormValue>) => (
              <DatePicker
                {...field}
                fullWidth
                showTodayButton
                margin="normal"
                disabled={props.formikBag.values.start === '' || form.isSubmitting}
                label={props.intl.formatMessage(hrMessage.corner.fieldFor(field.name, 'fieldName'))}
                placeholder={props.intl.formatMessage(hrMessage.corner.fieldFor(field.name, 'fieldPlaceholder'))}
                leftArrowIcon={<ChevronLeft />}
                rightArrowIcon={<ChevronRight />}
                format="MMMM DD, YYYY"
                helperText={form.touched.end && form.errors.end}
                error={form.touched.end && Boolean(form.errors.end)}
                onChange={(moment: Moment) => props.formikBag.setFieldValue(field.name, moment.format('YYYY-MM-DD'))}
                invalidLabel=""
                minDate={props.formikBag.values.start}
              />
            )}
          />
          </List>
        </CardContent>
      </Card>
      <HrCornerCategoryList 
        isOpen={props.isCategoryOpen}
        onClose={props.handleCategoryVisibility}
      />
    </React.Fragment>
  );

  return render;
};

export const HrCornerPagePartial = compose<AllProps, IOwnOption>(
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
)(hrCornerPagePartial);