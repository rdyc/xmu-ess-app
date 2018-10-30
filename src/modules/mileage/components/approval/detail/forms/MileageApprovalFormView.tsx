import { Card, CardContent, CardHeader } from '@material-ui/core';
import { MileageFormProps } from '@mileage/components/approval/detail/forms/MileageApprovalForm';
import { MileageItem } from '@mileage/components/approval/detail/forms/MileageItem';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { FieldArray, FormSection, WrappedFieldArrayProps } from 'redux-form';

export const MileageApprovalFormView: React.SFC<MileageFormProps> = props => {
  const componentItem = (context: WrappedFieldArrayProps<any>) => (
    <MileageItem context={context} />
  );

  const render = (
    <Card square>
      <CardHeader
        title={<FormattedMessage id={`mileage.item.Title`} />}
        subheader={<FormattedMessage id={`mileage.item.SubTitle`} />}
      />
      <CardContent>
        <form>
          <FormSection name="mileage">
            <FieldArray name="item" component={componentItem} />
          </FormSection>
        </form>
      </CardContent>
    </Card>
  );

  return render;
};
