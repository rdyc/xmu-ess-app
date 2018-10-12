import * as React from 'react';
import { Dispatch } from 'redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';

interface TestFormData {
  foo: string;
}

interface TestFormComponentProps {
  baz: string;
}

type InjectedProps = InjectedFormProps<TestFormData, TestFormComponentProps>;

// class TestFormComponent extends React.Component<TestFormComponentProps & InjectedProps> {
//   render() {
//       // const { form, initialValues, error } = this.props;
//       // const foo = initialValues.foo;
//       // const errorIsString = error + 'test';
      
//       return (
//         <div>
//           <Field
//             name="foo"
//             type="email"
//             component="input"
//           />
//         </div>
//       );
//   }
// }

const sleep = (ms: any) => new Promise(resolve => setTimeout(resolve, ms));

const asyncValidateForm = (values: TestFormData /*, dispatch */) => {
  return sleep(1000).then(() => {
    // throw { foo: 'Foo already Exists' };

    if (values.foo === '1234567890') {
      throw { foo: 'Foo already Exists' };
    }
  });
};

// tslint:disable-next-line:no-empty
const handleSubmitForm = (values: Partial<TestFormData>, dispatch: Dispatch<any>, props: { }) => { 
  return sleep(1000).then(() => { alert(values.foo); });
};

const renderField = ({ input, label, type, meta: { touched, error, warning }}: any) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      <div>
        {touched &&
          ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    </div>
  </div>
);

// tslint:disable-next-line:max-line-length
const TestFormStatelessComponent: React.StatelessComponent<TestFormComponentProps & InjectedProps> = ({ form, initialValues, handleSubmit, valid, submitting }) => {  
  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <Field
        name="foo"
        type="text"
        component={renderField}
        label="Foo"
      />
      <button type="submit" disabled={!valid || submitting}>
        {submitting ? 'Processing' : 'Submit' }
      </button>
    </form>
  );
};

const validateForm = (values: TestFormData) => {
  const errors = {};

  const requiredFields = [
    'foo',
    'firstName',
    'lastName',
    'email',
    'favoriteColor',
    'notes'
  ];

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  
  return errors;
};

const validateWarn = (values: TestFormData) => {
  const warnings = {};

  if (values.foo.length <= 10) {
    // tslint:disable-next-line:no-string-literal
    warnings['foo'] = 'text length must be greater than 10';
  }

  return warnings;
};

// const TestForm = reduxForm<TestFormData, TestFormComponentProps>({ form : 'test' })(TestFormComponent);
// const TestFormStatelessRequired = reduxForm<TestFormData, TestFormComponentProps>({})(TestFormStatelessComponent);
// tslint:disable-next-line:max-line-length
const TestFormStateless = reduxForm<TestFormData, TestFormComponentProps>({ 
  form : 'test', 
  validate: validateForm,
  asyncValidate: asyncValidateForm,
  warn: validateWarn
})(TestFormStatelessComponent);

const accountProfilePage: React.StatelessComponent = () => {
  const data = {
    foo: 'tooos'
  }; 

  return (
    <div>
      {/* <TestForm initialValues={data} baz="bazoke" /> */}
      <TestFormStateless initialValues={data} baz="bazoke" />
      {/* <TestFormStatelessRequired form="test" initialValues={data} baz="bazoke" /> */}
    </div>
  );
};

export default accountProfilePage;