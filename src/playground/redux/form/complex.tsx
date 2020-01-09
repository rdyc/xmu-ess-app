import { InputNumber } from '@layout/components/input/number';
import { InputText } from '@layout/components/input/text';
import { InputTextArea } from '@layout/components/input/textArea';
import { Submission } from '@layout/components/submission/Submission';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { Button, Card, CardContent, CardHeader, Grid, IconButton } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose, HandleCreators, lifecycle, ReactLifeCycleFunctions, withHandlers } from 'recompose';
import { Dispatch } from 'redux';
import {
  Field,
  FieldArray,
  FormErrors,
  getFormValues,
  InjectedFormProps,
  reduxForm,
  WrappedFieldArrayProps,
} from 'redux-form';

// ----------------------------------------------------------------------------
// Form.tsx
// ----------------------------------------------------------------------------

const complexItemsView: React.SFC<WrappedFieldArrayProps<ComplexItemFormData>> = props => (
  <Grid container spacing={16}>
    {
      props.fields.map((field, index) => 
        <Grid key={index} item>
          <Card>
            <CardHeader title={`#${index + 1}`}
              action={
                <IconButton onClick={() => props.fields.remove(index)}>
                  <DeleteForeverIcon />
                </IconButton>
              }
            />
            <CardContent>
              <div>
                <Field 
                  type="text"
                  name={`${field}.employeeUid`}
                  label="Employee"
                  required={true}
                  component={InputText}
                />
                <Field 
                  type="text"
                  name={`${field}.role`}
                  label="Role"
                  required={true}
                  component={InputText}
                />
                <Field 
                  type="text"
                  name={`${field}.jobDescription`}
                  label="Desc"
                  component={InputTextArea}
                />
                <Field 
                  type="number"
                  name={`${field}.mandays`}
                  label="Mandays"
                  required={true}
                  component={InputNumber}
                />
              </div>
            </CardContent>
          </Card>
        </Grid>
      )
    }

    <Button onClick={() => props.fields.push({
      employeeUid: '',
      role: '',
      mandays: ''
    })}>
      Add
    </Button>
  </Grid>
);

const complexView: React.SFC<ComplexFormProps> = props => (
  <form onSubmit={props.handleSubmit}>
    <Grid container spacing={16}>
      <Grid item xs={12} md={8}>
        <Grid container spacing={16}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader 
                title="Form"
                subheader="Build with redux form"
              />
              <CardContent>
                <Field 
                  name="projectUid" 
                  label="Project ID"
                  required={true}
                  component={InputText}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={16}>
              <Grid item>
                <FieldArray name="items" component={complexItemsView} />
              </Grid>
              <Grid item>
                <Submission 
                  valid={props.valid}
                  reset={props.reset}
                  submitting={props.submitting}
                />
              </Grid>
            </Grid>
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

interface ComplexFormData {
  projectUid: string;
  items: ComplexItemFormData[] | undefined;
}

interface ComplexItemFormData {
  employeeUid: string;
  role: string;
  mandays: string;
}

interface FormValueProps {
  formValues: ComplexFormData;
}

type ComplexFormProps 
  = InjectedFormProps<ComplexFormData>
  & InjectedIntlProps
  & FormValueProps;

const mapStateToProps = (state: any): FormValueProps => ({
  formValues: getFormValues('formArray')(state) as ComplexFormData
});

const enhance = compose<ComplexFormProps, InjectedFormProps<ComplexFormData>>(
  connect(mapStateToProps),
  injectIntl
)(complexView);

const ReduxFormArray = reduxForm<ComplexFormData>({
  form: 'formArray',
  touchOnChange: true,
  touchOnBlur: true,
})(enhance);

// ----------------------------------------------------------------------------
// Editor.tsx
// ----------------------------------------------------------------------------

const complexEditorView: React.SFC<ComplexEditorProps> = props => (
  <ReduxFormArray 
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
  handleValidate: (values: ComplexFormData) => any;
  handleSubmit: (values: ComplexFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

type ComplexEditorProps 
  = OwnHandlers
  & WithLayout
  & WithAppBar;

const handlerCreators: HandleCreators<ComplexEditorProps, OwnHandlers> = {
  handleValidate: (props: ComplexEditorProps) => (values: ComplexFormData) => { 
    const errors = {};
  
    const requiredFields = ['projectUid'];
  
    requiredFields.forEach(field => {
      if (!values[field] || (values[field] === undefined || values[field] === null)) {
        Object.assign(errors, {[field]: 'Required'});
      }
    });

    if (values.items) {
      const requiredItemFields = ['employeeUid', 'role', 'mandays'];
      
      const itemErrors: any[] = [];
      
      values.items.forEach((item, index) => {
        const itemError: any = {};
        
        if (!item) { return ; }

        requiredItemFields.forEach(field => {
          if (!item[field] || (item[field] === undefined || item[field] === null)) {
            Object.assign(itemError, {[`${field}`]: 'Required'});
          }
        });

        itemErrors.push(itemError);
      });

      if (itemErrors.length) {
        Object.assign(errors, {
          items: itemErrors
        });
      }
    }

    console.log(errors);
    
    return errors;
  },
  handleSubmit: (props: ComplexEditorProps) => (formData: ComplexFormData) => { 
    // 
  },
  handleSubmitSuccess: (props: ComplexEditorProps) => (response: boolean) => {
    //
  },
  handleSubmitFail: (props: ComplexEditorProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
    //
  }
};

const lifecycles: ReactLifeCycleFunctions<ComplexEditorProps, {}> = {
  componentDidMount() {
    const { layoutDispatch } = this.props;

    layoutDispatch.changeView({
      uid: 'DUMMY',
      parentUid: 'PARENT_DUMMY',
      title: 'Complex Form',
      subTitle: 'Complex Form Demo'
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

export const ComplexEditor = compose<ComplexEditorProps, {}>(
  withLayout,
  withAppBar,
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(complexEditorView);