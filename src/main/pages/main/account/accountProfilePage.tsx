import * as React from 'react';
import ProfileForm from './profileForm';
import { AppState, ConnectedReduxProps } from '../../../store';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { WithStyles, Card, CardContent } from '@material-ui/core';
import styles from '../../../styles';
import { EmployeeProfileType } from '../../../store/account/types/EmployeeProfileType';
import { SingleResponseType } from '../../../store/@base/SingleResponseType';
import { EmployeeProfileFetchRequest } from '../../../store/account/actions/employeeProfileActions';
import { EmployeeFormType } from '../../../store/account/types/EmployeeFormType';
import { EmployeeParameterType } from '../../../store/account/types/EmployeeParameterType';
import { AppUser } from '../../../store/@layout';

interface PropsFromState extends RouteComponentProps<void>, WithStyles<typeof styles> {
  user: AppUser;
  response: SingleResponseType<EmployeeProfileType>;
  errors?: string;
  loading: boolean;
}

interface PropsFromDispatch {
  fetchRequest: typeof EmployeeProfileFetchRequest;
}

type AllProps = PropsFromState & PropsFromDispatch & ConnectedReduxProps;
  
class AccountProfilePage extends React.Component<AllProps> {
  componentWillReceiveProps(nextProps: AllProps) {
    if (!this.props.loading && !nextProps.loading) {
      nextProps.fetchRequest({
        uid: nextProps.user.uid
      });
    }
  }

  transform = (data: EmployeeProfileType): EmployeeFormType => { 
    return {
      fullName: data.fullName,
      email: data.email,
      address: data.address,
    };
  };

  sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  handleSubmit = (values: Partial<EmployeeFormType>) => { 
    return this.sleep(1000).then(() => { 
      alert(JSON.stringify(values, null, 2)); 
    });
  };

  validate = (values: EmployeeFormType) => {
    const errors = {};
  
    const requiredFields = [
      'fullName',
      'email',
      'address'
    ];
  
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = 'Required';
      }
    });
    
    return errors;
  }

  render() {
    const { loading, response } = this.props;
    
    return (
      <Card square elevation={0}>
        <CardContent>
          {!loading && response && (
            <ProfileForm 
              form="profileForm"
              title="Profile"  
              initialValues={this.transform(response.data)} 
              validate={this.validate}
              onSubmit={this.handleSubmit} 
            />
          )}
        </CardContent>
      </Card>
    );
  }
}

const mapStateToProps = ({ layout, profile }: AppState) => ({
  user: layout.user,
  response: profile.response,
  errors: profile.errors,
  loading: profile.loading
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchRequest: (params: EmployeeParameterType) => dispatch(EmployeeProfileFetchRequest(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountProfilePage);