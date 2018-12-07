import { ILookupRoleGetListFilter } from '@lookup/classes/filters/role';
import { IRoleList } from '@lookup/classes/response';
import { WithLookupRole, withLookupRole } from '@lookup/hoc/withLookupRole';
import withWidth, { WithWidth } from '@material-ui/core/withWidth';
import { compose, HandleCreators, lifecycle, ReactLifeCycleFunctions, withHandlers } from 'recompose';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';
import { SelectLookupRoleView } from './SelectLookupRoleView';

interface OwnProps extends WrappedFieldProps, BaseFieldProps {
  type?: string;
  placeholder?: string;
  required?: boolean;
  label?: string;
  disabled?: boolean;
  filter?: ILookupRoleGetListFilter | undefined;
  onSelected?: (project: IRoleList | undefined) => void | undefined;
}

interface OwnHandlers {
  handleOnChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export type SelectLookupRoleProps
  = WithLookupRole
  & WithWidth
  & OwnProps
  & OwnHandlers;

const handlerCreators: HandleCreators<SelectLookupRoleProps, OwnHandlers> = {
  handleOnChange: (props: SelectLookupRoleProps) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { input, onSelected } = props;
    const { response } = props.lookupRoleState.list;

    const value = e.target.value;

    input.onChange(value);

    if (response && response.data) {
      const role = response.data.filter(item => item.uid === value)[0];

      if (onSelected) {
        onSelected(role);
      }
    }
  }
};

const lifecycles: ReactLifeCycleFunctions<SelectLookupRoleProps, {}> = {
  componentDidMount() {
    const { filter } = this.props;
    const { isLoading, response } = this.props.lookupRoleState.list;
    const { loadListRequest } = this.props.lookupRoleDispatch;

    if (!isLoading && !response) {
      loadListRequest({ filter });
    }
  },
  componentWillReceiveProps(nextProps: SelectLookupRoleProps) {
    if (nextProps.filter !== this.props.filter) {
    const { loadListRequest } = this.props.lookupRoleDispatch;
    const { filter } = nextProps;

    loadListRequest({ filter });
    }
  },
  componentWillUnmount() {
    const { loadListDispose } = this.props.lookupRoleDispatch;
    loadListDispose();
  }
};

export const SelectLookupRole = compose<SelectLookupRoleProps, OwnProps>(
  withLookupRole,
  withWidth(),
  withHandlers<SelectLookupRoleProps, OwnHandlers>(handlerCreators),
  lifecycle<SelectLookupRoleProps, {}>(lifecycles)
)(SelectLookupRoleView);