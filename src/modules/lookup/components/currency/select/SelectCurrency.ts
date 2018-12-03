import { ICurrencyListFilter } from '@lookup/classes/filters';
import { ICurrencyList } from '@lookup/classes/response';
import { WithLookupCurrency, withLookupCurrency } from '@lookup/hoc/currency/withLookupCurrency';
import { withWidth } from '@material-ui/core';
import { WithWidth } from '@material-ui/core/withWidth';
import { compose, HandleCreators, lifecycle, ReactLifeCycleFunctions, withHandlers } from 'recompose';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';
import { SelectCurrencyView } from './SelectCurrencyView';

interface OwnProps extends WrappedFieldProps, BaseFieldProps {
  type?: string;
  placeholder?: string;
  required?: boolean;
  label?: string;
  disabled?: boolean;
  filter?: ICurrencyListFilter | undefined;
  onSelected?: (currency: ICurrencyList | undefined) => void | undefined;
}

interface OwnHandlers {
  handleOnChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export type SelectCurrencyProps
  = WithLookupCurrency
  & WithWidth
  & OwnProps
  & OwnHandlers;

const handlerCreators: HandleCreators<SelectCurrencyProps, OwnHandlers> = {
  handleOnChange: (props: SelectCurrencyProps) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { input, onSelected } = props;
    const { response } = props.lookupCurrencyState.list;

    const value = e.target.value;

    input.onChange(value);

    if (response && response.data) {
      const currency = response.data.filter(item => item.uid === value)[0];

      if (onSelected) {
        onSelected(currency);
      }
    }
  }
};

const lifecycles: ReactLifeCycleFunctions<SelectCurrencyProps, {}> = {
  componentDidMount() {
    const { filter } = this.props;
    const { isLoading, response } = this.props.lookupCurrencyState.list;
    const { loadListRequest } = this.props.lookupCurrencyDispatch;

    if (!isLoading && !response) {
      loadListRequest({ filter });
    }
  },
  componentWillReceiveProps(nextProps: SelectCurrencyProps) {
    if (nextProps.filter !== this.props.filter) {
      const { loadListDispose, loadListRequest } = this.props.lookupCurrencyDispatch;
      const { filter } = nextProps;

      loadListDispose();
      loadListRequest({ filter });
    }
  },
  componentWillUnmount() {
    const { loadListDispose } = this.props.lookupCurrencyDispatch;
    loadListDispose();
  }
};

export const SelectCurrency = compose<SelectCurrencyProps, OwnProps>(
  withLookupCurrency,
  withWidth(),
  withHandlers<SelectCurrencyProps, OwnHandlers>(handlerCreators),
  lifecycle<SelectCurrencyProps, {}>(lifecycles)
)(SelectCurrencyView);