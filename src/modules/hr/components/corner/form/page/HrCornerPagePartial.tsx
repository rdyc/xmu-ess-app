import { FormMode } from '@generic/types';
import { IHrCornerCategoryGetListFilter } from '@hr/classes/filters';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { ISelectFieldOption, SelectField } from '@layout/components/fields/SelectField';
import { Card, CardContent, CardHeader, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Menu, MenuItem, TextField, WithStyles, withStyles } from '@material-ui/core';
import { AddCircle, ChevronLeft, ChevronRight } from '@material-ui/icons';
import MoreVertIcon from '@material-ui/icons/MoreVert';
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
  demo: string;
  moreOpen: boolean;
  isCategoryOpen: boolean;
  anchor: any;
}

interface IOwnStateHandler extends StateHandlerMap<IOwnState> {
  stateUpdate: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleMoreOption: (event: React.MouseEvent<HTMLElement>) => void;
  handleCategoryVisibility: () => void;
}

type AllProps
  = IOwnState
  & IOwnHandler
  & IOwnOption
  & IOwnStateHandler
  & WithStyles<typeof styles>;

const createProps: mapper<AllProps, IOwnState> = (): IOwnState => ({
  // tslint:disable-next-line:max-line-length
  demo: '# Live demo\n\nChanges are automatically rendered as you type.\n\n* List can be implemented by * or -\n* hash(#) for header, from 1# to 5#(#####)\n\n## HTML block below\n\n<blockquote>\n  This blockquote will change based on the HTML settings above.\n</blockquote>\n\n```\ncan even doing this kind of stuff\n```\n\nPretty neat, eh?\n\n## Tables?\n\n| Feature   | Support |\n| - | - |\n| tables    | ✔ |\n| alignment | ✔ |\n| wewt      | ✔ |\n\n---------------\n\nA component by [Tessa Team](https://put-some-link-here/)\n\n![alternate image if the image doesnt show](https://mdx-logo.now.sh)',

  moreOpen: false,
  isCategoryOpen: false,
  anchor: '',
});

const stateUpdaters: StateUpdaters<{}, IOwnState, IOwnStateHandler> = {
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const handlerCreators: HandleCreators<AllProps, IOwnHandler> = {
  handleMoreOption: (props: AllProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.stateUpdate({
      moreOpen: !props.moreOpen,
    });
    if (event) {
      props.stateUpdate({
        anchor: event.currentTarget
      });
    } else {
      props.stateUpdate({
        anchor: undefined
      });
    }
  },
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
          action={
            props.formMode === FormMode.New &&
            <React.Fragment>
              <IconButton
                aria-label="More"
                aria-owns="simple-menu"
                aria-haspopup="true"
                onClick={props.handleMoreOption}
              >
                <MoreVertIcon/>
              </IconButton>
              <Menu id="simple-menu" anchorEl={props.anchor} open={props.moreOpen} onClose={props.handleMoreOption}>
                <MenuItem onClick={e => {
                  props.formikBag.setFieldValue('content', props.demo);
                  props.handleMoreOption(e);
                }}>Demo</MenuItem>
              </Menu>
            </React.Fragment>
          }
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
                required
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