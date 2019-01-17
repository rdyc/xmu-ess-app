import { withWidth } from '@material-ui/core';
import { WithWidth } from '@material-ui/core/withWidth';
import { IOrganizationHierarchyListFilter } from '@organization/classes/filters/hierarchy';
import { IHierarchyList } from '@organization/classes/response/hierarchy';
import { WithOrganizationHierarchy, withOrganizationHierarchy } from '@organization/hoc/withOrganizationHierarchy';
import { compose, HandleCreators, lifecycle, ReactLifeCycleFunctions, withHandlers } from 'recompose';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';
import { SelectHierarchyView } from './SelectHierarchyView';

interface OwnProps extends WrappedFieldProps, BaseFieldProps {
  type?: string;
  placeholder?: string;
  required?: boolean;
  label?: string;
  disabled?: boolean;
  filter?: IOrganizationHierarchyListFilter | undefined;
  onSelected?: (project: IHierarchyList | undefined) => void | undefined;
}

interface OwnHandlers {
  handleOnChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export type SelectHierarchyProps
  = WithOrganizationHierarchy
  & WithWidth
  & OwnProps
  & OwnHandlers;

const handlerCreators: HandleCreators<SelectHierarchyProps, OwnHandlers> = {
  handleOnChange: (props: SelectHierarchyProps) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { input, onSelected } = props;
    const { response } = props.organizationHierarchyState.list;

    const value = e.target.value;

    input.onChange(value);

    if (response && response.data) {
      const hierarchy = response.data.filter(item => item.uid === value)[0];

      if (onSelected) {
        onSelected(hierarchy);
      }
    }
  }
};

const lifecycles: ReactLifeCycleFunctions<SelectHierarchyProps, {}> = {
  componentDidMount() {
    const { filter } = this.props;
    const { isLoading, response } = this.props.organizationHierarchyState.list;
    const { loadListRequest } = this.props.organizationHierarchyDispatch;

    if (!isLoading && !response) {
      loadListRequest({filter});
    }
  },
  componentWillReceiveProps(nextProps: SelectHierarchyProps) {
    if (nextProps.filter !== this.props.filter) {
      const { loadListRequest } = this.props.organizationHierarchyDispatch;
      const { filter } = nextProps;
      
      loadListRequest({filter});
    }
  },
  componentWillUnmount() {
    const { loadListDispose } = this.props.organizationHierarchyDispatch;
    loadListDispose();
  }
};

export const SelectHierarchy = compose<SelectHierarchyProps, OwnProps>(
  withOrganizationHierarchy,
  withWidth(),
  withHandlers<SelectHierarchyProps, OwnHandlers>(handlerCreators),
  lifecycle<SelectHierarchyProps, {}>(lifecycles)
)(SelectHierarchyView);