import { FormMode } from '@generic/types';
import { ISelectFieldOption, SelectField } from '@layout/components/fields/SelectField';
import FormikJsonValues from '@layout/components/formik/FormikJsonValues';
import { SubmissionForm } from '@layout/components/submission/SubmissionForm';
import { layoutMessage } from '@layout/locales/messages';
import { Button, Card, CardContent, CardHeader, Grid, TextField } from '@material-ui/core';
import { Field, FieldProps, Form, Formik, FormikProps } from 'formik';
import * as React from 'react';
import * as ReactMarkdown from 'react-markdown';
import '../MarkdownStyle.css';
import { MarkdownCategoryOption } from '../options/MarkdownCategoryOption';
import { IMarkdownFormValue, MarkdownFormProps } from './MarkdownForm';

export const MarkdownFormView: React.SFC<MarkdownFormProps> = props => { 
  
  return (
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
                    <Button 
                      color="primary"
                      variant="outlined" 
                      onClick={() => formikBag.setFieldValue('content', props.demo)}>
                      Demo
                    </Button>}
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

                  {/* <Field
                    name="categoryUid"
                    render={({ field, form }: FieldProps<IMarkdownFormValue>) => (
                      <TextField
                        {...field}
                        fullWidth
                        required
                        disabled={form.isSubmitting}
                        margin="normal"
                        autoComplete="off"
                        label={'Category'}
                        placeholder={'Type any category'}
                        helperText={form.touched.categoryUid && form.errors.categoryUid}
                        error={form.touched.categoryUid && Boolean(form.errors.categoryUid)}
                      />
                    )}
                  /> */}
                
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
                        {/* <IconButton
                          aria-label="More"
                          aria-owns="simple-menu"
                          aria-haspopup="true"
                          onClick={props.handleCategoryMore}
                        >
                          <MoreVertIcon/>
                        </IconButton>
                        <Menu id="simple-menu" anchorEl={props.anchor} open={props.catMoreIsOpen} onClose={props.handleCategoryMore}>
                          <MenuItem onClick={() => console.log('menu 1')}>Profile</MenuItem>
                          <MenuItem onClick={() => console.log('menu 2')}>My account</MenuItem>
                        </Menu> */}
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
  );
};