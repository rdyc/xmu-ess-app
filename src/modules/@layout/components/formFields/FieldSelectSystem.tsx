import SystemSelect from '@common/components/controls/SystemSelect';
import { ISystemList } from '@common/interfaces/response';
import { CommonCategoryType } from '@common/types';
import { rootStore } from '@generic/roots';
import * as React from 'react';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';

interface FromFieldProps { 
  type: CommonCategoryType; 
  label: string; 
  disabled: boolean; 
}

type AllProps = WrappedFieldProps & BaseFieldProps & FromFieldProps;

export const FieldSelectSystem: React.StatelessComponent<AllProps> = props => {
  const { input, type } = props;

  const handleOnChangeValue = (system: ISystemList | null) => {
     
    input.onChange(system);
  };

  return (    
    <SystemSelect 
      {...rootStore}
      {...props}
      onChangeValue={handleOnChangeValue}
      category={type}
    />
  );
};