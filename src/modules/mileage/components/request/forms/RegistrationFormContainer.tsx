import { Grid } from '@material-ui/core';
// import { MileageType } from "@mileage/classes/types";
import { InformationForm } from '@mileage/components/request/forms/InformationForm';
// import { ItemForm } from "@mileage/components/request/forms/ItemForm";
import * as React from 'react';
import { connect } from 'react-redux';
import {
  BaseFieldsProps,
  // FieldArray,
  Fields,
  FormSection,
  // formValueSelector,
  InjectedFormProps,
  reduxForm
  // WrappedFieldArrayProps,
} from 'redux-form';

export type MileageFormData = {
  information: {
    year: number | 2018;
    month: number | 1;
    amount: number | 1;
  };
};

const formName = 'mileage';

interface FormValueProps {
  formIsItem: boolean | false;
  formYear: number | 1;
  formMonth: number | 1;
  formAmount: number | 1;
}

type AllProps = InjectedFormProps<MileageFormData> & FormValueProps;

const mileageFormContainer: React.SFC<AllProps> = props => {
  // const { formIsItem, formYear, formMonth, formAmount } = props;

  // const handleChangeMonth = (event:any) => {

  // }

  // const handleChangeYear = (event:any) => {

  // }

  const fields = Object.getOwnPropertyNames(props.initialValues.information);

  const componentInformation = (context: BaseFieldsProps) => (
    <InformationForm context={context} />
  );

  // const componentItem = (context: WrappedFieldArrayProps<any>) => (
  //   <ItemForm
  //     category="item"
  //     context={context}
  //   />
  // )

  const render = (
    <form onSubmit={props.handleSubmit}>
      <Grid container spacing={24} direction="row">
        <Grid item xs={12} md={4}>
          <FormSection name="information">
            <Fields names={fields} component={componentInformation} />
          </FormSection>
        </Grid>
      </Grid>
    </form>
  );

  return render;
};

// const selector = formValueSelector(formName);

// const mapStateToProps = (state: any): FormValueProps => {
//   const year = selector(state, 'information.year');
//   // const month = selector(state, 'information.month');

//   return {
//     formYear: year === MileageType.Apr;
//   }
// }

export const MileageFormContainer = reduxForm<MileageFormData>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: false
})(connect()(mileageFormContainer));
