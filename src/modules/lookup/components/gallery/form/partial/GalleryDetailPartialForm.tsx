import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Card, CardContent, CardHeader, Typography } from '@material-ui/core';
import { Field, FieldProps, FormikProps } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { IGalleryFormValue } from '../LookupGalleryForm';

type GalleryDetailPartialFormProps = {
  formikBag: FormikProps<IGalleryFormValue>;
  intl: InjectedIntl;
};

const GalleryDetailPartialForm: React.ComponentType<GalleryDetailPartialFormProps> = props => (
  <Card square>
    <CardHeader 
      title={props.intl.formatMessage(lookupMessage.gallery.section.infoTitle)}
    />
    <CardContent>
      <Field
        name="file"
        render={({ field, form }: FieldProps<IGalleryFormValue>) => (
          <div>
            <Typography>
              {props.intl.formatMessage(lookupMessage.gallery.field.file)}
            </Typography>
            <input 
              id={field.name} 
              name={field.name} 
              type={field.name} 
              accept=".jpg, .jpeg, .png"
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

export default GalleryDetailPartialForm;