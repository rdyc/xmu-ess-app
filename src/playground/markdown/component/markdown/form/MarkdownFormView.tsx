import { FormMode } from '@generic/types';
import { ISelectFieldOption, SelectField } from '@layout/components/fields/SelectField';
import FormikJsonValues from '@layout/components/formik/FormikJsonValues';
import { SubmissionForm } from '@layout/components/submission/SubmissionForm';
import { layoutMessage } from '@layout/locales/messages';
import { Card, CardContent, CardHeader, Grid, IconButton, Menu, MenuItem, TextField } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Field, FieldProps, Form, Formik, FormikProps } from 'formik';
import { MarkdownCategoryOption } from 'playground/markdown/options/MarkdownCategoryOption';
import * as React from 'react';
import * as ReactMarkdown from 'react-markdown';
import '../../../style/MarkdownStyle.css';
import { MarkdownCategory } from '../../category/list/MarkdownCategory';
import { IMarkdownFormValue, MarkdownFormProps } from './MarkdownForm';

export const MarkdownFormView: React.SFC<MarkdownFormProps> = props => { 
  
  return (
    <React.Fragment>
      <Formik 
        enableReinitialize
        initialValues={props.initialValues}
        validationSchema={props.validationSchema}
        onSubmit={props.handleOnSubmit}
        render={(formikBag: FormikProps<IMarkdownFormValue>) => (
          <Form>
            <Grid container spacing={8}>
              <Grid item xs={6}>
                <Card square>
                  <CardHeader 
                    action={
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
                              formikBag.setFieldValue('content', props.demo);
                              props.handleMoreOption(e);
                            }}>Demo</MenuItem>
                            <MenuItem onClick={e => {
                              props.handleCategoryVisibility(e);
                              props.handleMoreOption(e);
                            }}>Manage Category</MenuItem>
                          </Menu>
                      </React.Fragment>
                    }
                    title={'Markdown information'}/>
                  <CardContent>
                    <Field
                      name="title"
                      render={({ field, form }: FieldProps<IMarkdownFormValue>) => (
                        <TextField
                          {...field}
                          fullWidth
                          required
                          disabled={form.isSubmitting}
                          margin="normal"
                          autoComplete="off"
                          label={'Title'}
                          placeholder={'Type any title'}
                          helperText={form.touched.title && form.errors.title}
                          error={form.touched.title && Boolean(form.errors.title)}
                          
                        />
                      )}
                    />
                  
                    <Field
                      name="categoryUid"
                      render={({ field, form }: FieldProps<IMarkdownFormValue>) => (
                        <React.Fragment>
                          <MarkdownCategoryOption filter={props.filterCategory}>
                            <SelectField 
                              isSearchable
                              menuPlacement="auto"
                              menuPosition="fixed"
                              isDisabled={formikBag.isSubmitting}
                              isClearable={field.value !== ''}
                              escapeClearsValue={true}
                              valueString={field.value}
                              textFieldProps={{
                                label: 'Category',
                                required: true,
                                helperText: form.touched.categoryUid && form.errors.categoryUid,
                                error: form.touched.categoryUid && Boolean(form.errors.categoryUid)
                              }}
                              onMenuClose={() => formikBag.setFieldTouched(field.name)}
                              onChange={(selected: ISelectFieldOption) => {
                                formikBag.setFieldValue(field.name, selected && selected.value || '');
                              }}
                            />
                          </MarkdownCategoryOption>
                          
                        </React.Fragment>
                      )}
                    />
  
                    <Field
                      name="content"
                      render={({ field, form }: FieldProps<IMarkdownFormValue>) => (
                        <TextField
                          {...field}
                          fullWidth
                          required
                          multiline
                          disabled={form.isSubmitting}
                          margin="normal"
                          autoComplete="off"
                          label={'Content'}
                          placeholder={'Type any content'}
                          helperText={form.touched.content && form.errors.content}
                          error={form.touched.content && Boolean(form.errors.content)}
                        />
                      )}
                    />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} style={{minHeight: '300px'}}>
                <Card square>
                  <CardHeader title={'Markdown preview'} />
                  <CardContent>
                    <ReactMarkdown source={formikBag.values.content} escapeHtml={false} />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <SubmissionForm 
                  title={'Submit markdown'}
                  className={props.classes.flexContent}
                  formikProps={formikBag}
                  buttonLabelProps={{
                    reset: props.intl.formatMessage(layoutMessage.action.reset),
                    submit: props.intl.formatMessage(layoutMessage.action.submit),
                    processing: props.intl.formatMessage(layoutMessage.text.processing)
                  }}
                  confirmationDialogProps={{
                    title: props.formMode === FormMode.New ? 'New Markdown' : 'Modify Markdown',
                    message: props.formMode === FormMode.New ? 'Markdown new desc' : 'Markdown modify desc',
                    labelCancel: props.intl.formatMessage(layoutMessage.action.discard),
                    labelConfirm: props.intl.formatMessage(layoutMessage.action.continue)
                  }} 
                />
              </Grid>
              <Grid item xs={6}>
                <FormikJsonValues formikBag={formikBag} />
              </Grid>
            </Grid>
          </Form>
        )}
      />
      <MarkdownCategory 
        isOpen={props.isCategoryOpen}
        onClose={props.handleCategoryVisibility}
      />
    </React.Fragment>
  );
};