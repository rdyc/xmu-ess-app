import { withWidth } from '@material-ui/core';
import { WithWidth } from '@material-ui/core/withWidth';
import { IProjectRegistrationGetListFilter } from '@project/classes/filters/registration';
import { IProjectList } from '@project/classes/response';
import { WithProjectRegistration, withProjectRegistration } from '@project/hoc/withProjectRegistration';
import { compose, HandleCreators, lifecycle, ReactLifeCycleFunctions, withHandlers } from 'recompose';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';

import { SelectProjectView } from './SelectProjectView';

interface OwnProps extends WrappedFieldProps, BaseFieldProps { 
  type?: string; 
  placeholder?: string;
  required?: boolean;
  label?: string; 
  disabled?: boolean;
  filter?: IProjectRegistrationGetListFilter | undefined;
  onSelected?: (project: IProjectList | undefined) => void | undefined;
}

interface OwnHandlers {
  handleOnChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export type SelectProjectProps 
  = WithProjectRegistration
  & WithWidth
  & OwnProps
  & OwnHandlers;
  
const handlerCreators: HandleCreators<SelectProjectProps, OwnHandlers> = {
  handleOnChange: (props: SelectProjectProps) => (e: React.ChangeEvent<HTMLSelectElement>) => { 
    const { input, onSelected } = props;
    const { response } = props.projectRegisterState.list;

    const value = e.target.value;
    
    input.onChange(value);

    if (response && response.data) {
      const project = response.data.filter(item => item.uid === value)[0];

      if (onSelected) {
        onSelected(project);
      }
    }
  }
};

const lifecycles: ReactLifeCycleFunctions<SelectProjectProps, {}> = {
  componentDidMount() {
    const { filter } = this.props;
    const { isLoading, response } = this.props.projectRegisterState.list;
    const { loadListRequest } = this.props.projectRegisterDispatch;

    if (!isLoading && !response) {
      loadListRequest({filter});
    }
  }
};

export const SelectProject = compose<SelectProjectProps, OwnProps>(
  withProjectRegistration,
  withWidth(),
  withHandlers<SelectProjectProps, OwnHandlers>(handlerCreators),
  lifecycle<SelectProjectProps, {}>(lifecycles)
)(SelectProjectView);