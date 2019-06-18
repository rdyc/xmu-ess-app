import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Card, CardContent, CardHeader, Typography } from '@material-ui/core';
import { Field, FieldProps, FormikProps } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { ICOGSFormValue } from '../COGSUploadForm';

type COGSDetailPartialFormProps = {
  formikBag: FormikProps<ICOGSFormValue>;
  intl: InjectedIntl;
};

const COGSDetailPartialForm: React.ComponentType<COGSDetailPartialFormProps> = props => (
  <Card square>
    <CardHeader 
      title={props.intl.formatMessage(lookupMessage.cogsUpload.section.infoTitle)}
    />
    <CardContent>
      <Field
        name="file"
        render={({ field, form }: FieldProps<ICOGSFormValue>) => (
          <div>
            <Typography>
              {props.intl.formatMessage(lookupMessage.cogsUpload.fieldFor(field.name, 'fieldName'))}
            </Typography>
            <input 
              id={field.name} 
              name={field.name} 
              type={field.name} 
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .xlsx, .xls, .csv"
              onChange={(event) => {
                const files = event.target.files && event.target.files;

                props.formikBag.setFieldValue(field.name, files);

                props.formikBag.setFieldValue('fileName', files && files[0].name);
                props.formikBag.setFieldValue('fileType', files && files[0].type);
                props.formikBag.setFieldValue('fileSize', files && files[0].size);
              }} 
              className="form-control" 
            />
          </div>
        )}
      />
    </CardContent>
  </Card>
);

export default COGSDetailPartialForm;