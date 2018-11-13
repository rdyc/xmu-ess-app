import { withWidth } from '@material-ui/core';
import { WithWidth } from '@material-ui/core/withWidth';
import { IProjectSiteGetRequest } from '@project/classes/queries/site';
import { IProjectSite } from '@project/classes/response';
import { WithProjectSite, withProjectSite } from '@project/hoc/withProjectSite';
import { compose, HandleCreators, lifecycle, ReactLifeCycleFunctions, withHandlers } from 'recompose';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';

import { SelectProjectSiteView } from './SelectProjectSiteView';

interface OwnProps extends  IProjectSiteGetRequest, WrappedFieldProps, BaseFieldProps { 
  placeholder?: string;
  required?: boolean;
  label?: string; 
  disabled?: boolean;
  onSelected?: (site: IProjectSite | undefined) => void | undefined;
}

interface OwnHandlers {
  handleOnChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export type SelectProjectSiteProps 
  = WithProjectSite
  & WithWidth
  & OwnProps
  & OwnHandlers;
  
const handlerCreators: HandleCreators<SelectProjectSiteProps, OwnHandlers> = {
  handleOnChange: (props: SelectProjectSiteProps) => (e: React.ChangeEvent<HTMLSelectElement>) => { 
    const { input, onSelected } = props;
    const { response } = props.projectSiteState;

    const value = e.target.value;
    
    input.onChange(value);

    if (response && response.data) {
      const site = response.data.filter(item => item.uid === value)[0];

      if (onSelected) {
        onSelected(site);
      }
    }
  }
};

const lifecycles: ReactLifeCycleFunctions<SelectProjectSiteProps, {}> = {
  componentDidMount() {
    const { companyUid, projectUid } = this.props;
    const { isLoading, response } = this.props.projectSiteState;
    const { loadRequest } = this.props.projectSiteDispatch;

    if (!isLoading && !response) {
      loadRequest({
        companyUid,
        projectUid
      });
    }
  },
  componentWillReceiveProps(nextProps: SelectProjectSiteProps) {
    if (nextProps.projectUid !== this.props.projectUid) {
      const { loadDispose, loadRequest } = this.props.projectSiteDispatch;
      const { companyUid, projectUid } = nextProps;
      
      loadDispose();
      loadRequest({companyUid, projectUid});
    }
  },
  componentWillUnmount() {
    const { loadDispose } = this.props.projectSiteDispatch;
    loadDispose();
  }
};

export const SelectProjectSite = compose<SelectProjectSiteProps, OwnProps>(
  withProjectSite,
  withWidth(),
  withHandlers<SelectProjectSiteProps, OwnHandlers>(handlerCreators),
  lifecycle<SelectProjectSiteProps, {}>(lifecycles)
)(SelectProjectSiteView);