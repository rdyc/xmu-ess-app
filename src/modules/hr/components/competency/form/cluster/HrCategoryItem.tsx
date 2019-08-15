import { FormMode } from '@generic/types';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { layoutMessage } from '@layout/locales/messages';
import { Button, Card, CardActions, CardContent, CardHeader, IconButton, TextField } from '@material-ui/core';
import { DeleteForever, PlaylistAdd } from '@material-ui/icons';
import { Field, FieldArray, FieldArrayRenderProps, FieldProps, FormikProps, getIn } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { IClusterFormValue } from './HrCompetencyClusterForm';

type HrCategoryItemProps = {
  formMode: FormMode; 
  formikBag: FormikProps<IClusterFormValue>;
  classes: {
    flexContent: string;
    marginFarRight: string;
  };
  intl: InjectedIntl;
};

const HrCategoryItem: React.ComponentType<HrCategoryItemProps> = props => (
  <FieldArray 
    name="categories"
    render={(fields: FieldArrayRenderProps) => (
      <React.Fragment>
        {
          props.formikBag.values.categories.length > 0 &&
          props.formikBag.values.categories.map((item, index) =>
            <div className={props.classes.flexContent} key={index}>
              <Card square>
                <CardHeader 
                  title={`#${index + 1} - Category`}
                  titleTypographyProps={{variant: 'body2'}}
                  action={
                    <IconButton disabled={Boolean(item.uid)} onClick={() => fields.remove(index)}>
                      <DeleteForever />
                    </IconButton>
                  }
                />
                <CardContent>
                  <Field 
                    name={`categories.${index}.name`}
                    render={({field, form}: FieldProps<IClusterFormValue>) => {
                      const error = getIn(form.errors, `categories.${index}.name`);
                      const touch = getIn(form.touched, `categories.${index}.name`);

                      return (
                        <TextField
                          {...field}
                          fullWidth
                          required
                          disabled={form.isSubmitting}
                          margin="normal"
                          autoComplete="off"
                          label={props.intl.formatMessage(hrMessage.competency.field.name)}
                          placeholder={props.intl.formatMessage(hrMessage.competency.field.namePlaceholder)}
                          helperText={error && touch}
                          error={touch && Boolean(error)}
                        />
                      );
                    }}
                  />

                  <Field 
                    name={`categories.${index}.description`}
                    render={({field, form}: FieldProps<IClusterFormValue>) => {
                      const error = getIn(form.errors, `categories.${index}.description`);
                      const touch = getIn(form.touched, `categories.${index}.description`);

                      return (
                        <TextField
                          {...field}
                          fullWidth
                          required
                          multiline
                          disabled={form.isSubmitting}
                          margin="normal"
                          autoComplete="off"
                          label={props.intl.formatMessage(hrMessage.competency.field.description)}
                          placeholder={props.intl.formatMessage(hrMessage.competency.field.descriptionPlaceholder)}
                          helperText={error && touch}
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
              title={props.intl.formatMessage(hrMessage.shared.section.infoTitle, {state: 'Category'})}
              subheader={
                props.formikBag.submitCount > 0 &&
                typeof props.formikBag.errors.categories === 'string' &&
                props.formikBag.errors.categories
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
                  name: '',
                  description: ''
                })}
              >
                <PlaylistAdd className={props.classes.marginFarRight} />
                {props.intl.formatMessage(layoutMessage.action.add)}
              </Button>
            </CardActions>
          </Card>
        </div>
      </React.Fragment>
    )}
  />
);

export default HrCategoryItem;