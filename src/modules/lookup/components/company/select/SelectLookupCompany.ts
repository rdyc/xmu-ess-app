import { ILookupCompanyGetListFilter } from '@lookup/classes/filters/company';
import { ICompanyList } from '@lookup/classes/response';
import { WithLookupCompany, withLookupCompany } from '@lookup/hoc/withLookupCompany';
import withWidth, { WithWidth } from '@material-ui/core/withWidth';
import { compose, HandleCreators, lifecycle, ReactLifeCycleFunctions, withHandlers } from 'recompose';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';
import { SelectLookupCompanyView } from './SelectLookupCompanyView';

interface OwnProps extends WrappedFieldProps, BaseFieldProps {
  type?: string;
  placeholder?: string;
  required?: boolean;
  label?: string;
  disabled?: boolean;
  _filter?: ILookupCompanyGetListFilter | undefined;
  onSelected?: (project: ICompanyList | undefined) => void | undefined;
}

interface OwnHandlers {
  handleOnChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export type SelectLookupCompanyProps
  = WithLookupCompany
  & WithWidth
  & OwnProps
  & OwnHandlers;

const handlerCreators: HandleCreators<SelectLookupCompanyProps, OwnHandlers> = {
  handleOnChange: (props: SelectLookupCompanyProps) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { input, onSelected } = props;
    const { response } = props.lookupCompanyState.list;

    const value = e.target.value;

    input.onChange(value);

    if (response && response.data) {
      const company = response.data.filter(item => item.uid === value)[0];

      if (onSelected) {
        onSelected(company);
      }
    }
  }
};

const lifecycles: ReactLifeCycleFunctions<SelectLookupCompanyProps, {}> = {
  componentDidMount() {
    const { _filter } = this.props;
    const { isLoading, response } = this.props.lookupCompanyState.list;
    const { loadListRequest } = this.props.lookupCompanyDispatch;

    if (!isLoading && !response) {
      loadListRequest({ filter: _filter});
    }
  }
};

export const SelectLookupCompany = compose<SelectLookupCompanyProps, OwnProps>(
  withLookupCompany,
  withWidth(),
  withHandlers<SelectLookupCompanyProps, OwnHandlers>(handlerCreators),
  lifecycle<SelectLookupCompanyProps, {}>(lifecycles)
)(SelectLookupCompanyView);