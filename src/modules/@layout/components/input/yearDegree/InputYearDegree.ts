import { withWidth } from '@material-ui/core';
import { WithWidth } from '@material-ui/core/withWidth';
import { InjectedIntlProps, injectIntl } from 'react-intl';

import { compose } from 'recompose';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';

import { InputYearDegreeView } from './InputYearDegreeView';

interface OwnProps extends WrappedFieldProps, BaseFieldProps {
  type?: string;
  placeholder?: string;
  required?: boolean;
  label: string;
  disabled: boolean;
}

export type InputYearDegreeProps = OwnProps & InjectedIntlProps & WithWidth;

export const InputYearDegree = compose<InputYearDegreeProps, OwnProps>(injectIntl, withWidth())(
  InputYearDegreeView
);