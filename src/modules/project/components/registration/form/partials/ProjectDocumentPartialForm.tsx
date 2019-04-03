import { ProjectType } from '@common/classes/types';
import { FormMode } from '@generic/types';
import { Card, CardContent, CardHeader, Checkbox, FormControlLabel } from '@material-ui/core';
import { projectMessage } from '@project/locales/messages/projectMessage';
import { Field, FieldArray, FieldArrayRenderProps, FieldProps, FormikProps } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';

import { IProjectRegistrationFormValue } from '../ProjectRegistrationForm';

type ProjectDocumentPartialFormProps = {
  formMode: FormMode; 
  formikBag: FormikProps<IProjectRegistrationFormValue>;
  intl: InjectedIntl;
  type: 'documentProjects' | 'documentPreSales';
};

const ProjectDocumentPartialForm: React.ComponentType<ProjectDocumentPartialFormProps> = props => (
  <React.Fragment>
    {
      props.type === 'documentProjects' &&
      <Card square>
        <CardHeader title={props.intl.formatMessage(projectMessage.registration.section.documentProjectTitle)} />
        <CardContent>
          <FieldArray
            name="documentProjects"
            render={(fields: FieldArrayRenderProps) => (
              <React.Fragment>
                {
                  props.formikBag.values.documentProjects &&
                  props.formikBag.values.documentProjects.map((item, index) =>
                    <Field
                      key={index}
                      name={`documentProjects.${index}.checked`}
                      render={({ field, form }: FieldProps<IProjectRegistrationFormValue>) => (
                        <FormControlLabel
                          label={item.label}
                          control={
                            <Checkbox 
                              {...field} 
                              value={item.value}
                              checked={item.checked}
                              disabled={props.formikBag.values.projectType === '' || props.formikBag.values.projectType === ProjectType.PreSales || props.formikBag.isSubmitting} 
                            />
                          }
                          style={{width: '100%'}}
                        />
                      )}
                    />
                  )
                }
              </React.Fragment>
            )}
          />
        </CardContent>
      </Card>
    }
  
    {
      props.type === 'documentPreSales' &&
      <Card square>
        <CardHeader title={props.intl.formatMessage(projectMessage.registration.section.documentPreSalesTitle)} />
        <CardContent>
          <FieldArray
            name="documentPreSales"
            render={(fields: FieldArrayRenderProps) => (
              <React.Fragment>
                {
                  props.formikBag.values.documentPreSales &&
                  props.formikBag.values.documentPreSales.map((item, index) =>
                    <Field
                      key={index}
                      name={`documentPreSales.${index}.checked`}
                      render={({ field, form }: FieldProps<IProjectRegistrationFormValue>) => (
                        <FormControlLabel
                          label={item.label}
                          control={
                            <Checkbox 
                              {...field} 
                              value={item.value}
                              checked={item.checked}
                              disabled={props.formikBag.values.projectType === '' || props.formikBag.values.projectType !== ProjectType.PreSales || props.formikBag.isSubmitting} 
                            />
                          }
                          style={{width: '100%'}}
                        />
                      )}
                    />
                  )
                }
              </React.Fragment>
            )}
          />
        </CardContent>
      </Card>
    }
  </React.Fragment>
);

export default ProjectDocumentPartialForm;