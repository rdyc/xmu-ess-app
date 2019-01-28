import { InputFile } from '@layout/components/input/file';
import { Submission } from '@layout/components/submission/Submission';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithOidc, withOidc } from '@layout/hoc/withOidc';
import { Card, CardContent, CardHeader, Grid } from '@material-ui/core';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose, HandleCreators, lifecycle, ReactLifeCycleFunctions, withHandlers } from 'recompose';
import { Dispatch } from 'redux';
import { Field, FormErrors, getFormValues, InjectedFormProps, reduxForm } from 'redux-form';
import { isNullOrUndefined, isObject } from 'util';

// function getBase64(file: Blob) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();

//     reader.readAsDataURL(file);
    
//     reader.onload = () => {
//       const test = reader.result;

//       if (test) {
//         resolve(test);
//       }
//     };

//     reader.onerror = error => reject(error);
//   });
// }

// ----------------------------------------------------------------------------
// Form.tsx
// ----------------------------------------------------------------------------

const uploadView: React.SFC<UploadFormProps> = props => (
  <form onSubmit={props.handleSubmit}>
    <Grid container spacing={16}>
      <Grid item xs={12} md={8}>
        <Grid container spacing={16}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader 
                title="ASOE Form"
                subheader="Upload file redux form"
              />
              <CardContent>
                <Field 
                  name="fileTest" 
                  label="File Test"
                  required={true}
                  component={InputFile}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Submission 
              valid={props.valid}
              reset={props.reset}
              submitting={props.submitting}
            />
          </Grid>
        </Grid>
      </Grid>   
      <Grid item xs={12} md={4}>
        <Card>
          <CardHeader 
            title="Values"
            subheader="form values as object"
          />
          <CardContent>
            <pre>{JSON.stringify(props.formValues, null, 2)}</pre>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </form>
);

// ----------------------------------------------------------------------------
// Form.ts
// ----------------------------------------------------------------------------

interface UploadFormData {
  fileTest?: FileList;
}

interface FormValueProps {
  formValues: UploadFormData;
}

type UploadFormProps 
  = InjectedFormProps<UploadFormData>
  & InjectedIntlProps
  & FormValueProps;

const mapStateToProps = (state: any): FormValueProps => ({
  formValues: getFormValues('formUpload')(state) as UploadFormData
});

const enhance = compose<UploadFormProps, InjectedFormProps<UploadFormData>>(
  connect(mapStateToProps),
  injectIntl
)(uploadView);

const UploadForm = reduxForm<UploadFormData>({
  form: 'formUpload',
  touchOnChange: true,
  touchOnBlur: true,
})(enhance);

// ----------------------------------------------------------------------------
// Editor.tsx
// ----------------------------------------------------------------------------

const UploadEditorView: React.SFC<UploadEditorProps> = props => (
  <UploadForm
    validate={props.handleValidate}
    onSubmit={props.handleSubmit}
    onSubmitSuccess={props.handleSubmitSuccess}
    onSubmitFail={props.handleSubmitFail}
  />
);

// ----------------------------------------------------------------------------
// Editor.ts
// ----------------------------------------------------------------------------

interface OwnHandlers {
  handleValidate: (values: UploadFormData) => any;
  handleSubmit: (values: UploadFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

type UploadEditorProps 
  = OwnHandlers
  & WithLayout
  & WithAppBar
  & WithOidc;

const handlerCreators: HandleCreators<UploadEditorProps, OwnHandlers> = {
  handleValidate: (props: UploadEditorProps) => (values: UploadFormData) => { 
    const errors = {};
  
    const requiredFields = ['fileTest'];
  
    requiredFields.forEach(field => {
      if (!values[field] || isNullOrUndefined(values[field])) {
        Object.assign(errors, {[field]: 'Required'});
      }
    });

    console.log(errors);
    
    return errors;
  },
  handleSubmit: (props: UploadEditorProps) => async (formData: UploadFormData) => { 
    console.log(formData);

    if (props.oidcState.user && formData.fileTest) {
      // if (formData.fileTest && formData.fileTest[0]) {
      //   const test = await getBase64(formData.fileTest[0]);
        
      //   // console.log(test);
      // }
    
      const headers = new Headers();
    
      headers.append('Accept', 'application/json');
      headers.append('Authorization',  `Bearer ${props.oidcState.user.access_token}`);

      const data = new FormData();
      
      data.append('file', formData.fileTest[0]);
      data.append('name', 'test');

      return fetch('http://api-dev.tessa.equine.co.id:9001/v1/infor/reports', {
        headers,
        method: 'POST',
        body: data
      })
      .then(response => console.log(response))
      .catch((error: TypeError) => {
        switch (error.message) {
          case 'Failed to fetch':
            throw TypeError(`${error.message}, please check your network connection`);

          default:
            throw error;
        }
      });
    }
  },
  handleSubmitSuccess: (props: UploadEditorProps) => (response: boolean) => {
    const { alertAdd } = props.layoutDispatch;
    
    alertAdd({
      message: 'Ok',
      time: new Date()
    });
  },
  handleSubmitFail: (props: UploadEditorProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
    const { alertAdd } = props.layoutDispatch;
    
    if (errors) {
      // validation errors from server (400: Bad Request)
      alertAdd({
        time: new Date(),
        message: isObject(submitError) ? submitError.message : submitError
      });
    } else {
      // another errors from server
      alertAdd({
        message: 'Gatot',
        time: new Date(),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

const lifecycles: ReactLifeCycleFunctions<UploadEditorProps, {}> = {
  componentDidMount() {
    const { layoutDispatch } = this.props;

    layoutDispatch.changeView({
      uid: 'DUMMY',
      parentUid: 'PARENT_DUMMY',
      title: 'Upload Form',
      subTitle: 'Upload Form Demo'
    });
  },
  componentWillUnmount() {
    const { layoutDispatch, appBarDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();

    appBarDispatch.dispose();
  }
};

export const UploadEditor = compose<UploadEditorProps, {}>(
  withOidc,
  withLayout,
  withAppBar,
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(UploadEditorView);