import { CommonCategoryType } from '@common/classes/types';
import CommonSystemSelect from '@common/components/system/CommonSystemSelect';
import { WithWidth } from '@material-ui/core/withWidth';
import * as React from 'react';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';

interface FromFieldProps { 
  category: CommonCategoryType; 
  label: string; 
  disabled: boolean; 
}

type AllProps = WrappedFieldProps & BaseFieldProps & FromFieldProps & WithWidth;

export const FieldSelectSystem: React.SFC<AllProps> = props => {
  const { input, category } = props;

  const handleOnChange = (type: string | null) => {
    input.onChange(type);
  };

  return (    
    <CommonSystemSelect
      {...props}
      onChangeValue={handleOnChange}
      category={category}
    />
  );
};