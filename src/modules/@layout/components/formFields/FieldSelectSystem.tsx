import { ISystemList } from '@common/classes/response';
import { CommonCategoryType } from '@common/classes/types';
import CommonSystemSelect from '@common/components/system/CommonSystemSelect';
import { WithWidth } from '@material-ui/core/withWidth';
import * as React from 'react';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';

interface FromFieldProps { 
  type: CommonCategoryType; 
  label: string; 
  disabled: boolean; 
}

type AllProps = WrappedFieldProps & BaseFieldProps & FromFieldProps & WithWidth;

export const FieldSelectSystem: React.SFC<AllProps> = props => {
  const { input, type } = props;

  const handleOnChangeValue = (system: ISystemList | null) => {
     
    input.onChange(system);
  };

  return (    
    <CommonSystemSelect
      {...props}
      onChangeValue={handleOnChangeValue}
      category={type}
    />
  );
};