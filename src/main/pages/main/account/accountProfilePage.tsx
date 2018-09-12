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
import { EmployeeProfileFetchRequest, EmployeeProfileCommandRequest } from '../../../store/account/actions/employeeProfileActions';
import { EmployeeFormType } from '../../../store/account/types/EmployeeFormType';
import { EmployeeQueryType, EmployeeCommandType } from '../../../store/account/types/EmployeeParameterType';
import { AppUser } from '../../../store/@layout';
import { CommandType } from '../../../constants/commandType';

interface PropsFromState extends RouteComponentProps<void>, WithStyles<typeof styles> {
  user: AppUser;
  response: SingleResponseType<EmployeeProfileType>;
  errors?: string;
  loading: boolean;
}

interface PropsFromDispatch {
  fetchRequest: typeof EmployeeProfileFetchRequest;
  commandRequest: typeof EmployeeProfileCommandRequest;
}

type AllProps = PropsFromState & PropsFromDispatch & ConnectedReduxProps;
  
class AccountProfilePage extends React.Component<AllProps> {
  componentWillReceiveProps(nextProps: AllProps) {
    // wait until user loaded and it's not loaded yet
    if (!this.props.user && !this.props.loading && !nextProps.loading) {
      nextProps.fetchRequest({
        uid: nextProps.user.uid
      });
    }
  }

  transform = (data: EmployeeProfileType): EmployeeFormType => { 
    return {
      uid: data.uid,
      employmentNumber: data.employmentNumber,
      email: data.email,
      emailPersonal: data.emailPersonal,
      fullName: data.fullName,
      address: data.address,
      addressAdditional: data.addressAdditional,
      birthPlace: data.birthPlace,
      dateOfBirth: data.dateOfBirth,
      phone: data.phone,
      mobilePhone: data.mobilePhone
    };
  };

  // sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  handleSubmit = (payload: EmployeeProfileType) => { 
    this.props.commandRequest({
      uid: this.props.user.uid,
      method: CommandType.PUT,
      data: this.transform(payload)
    });

    // return this.sleep(1000).then(() => { 
    //   alert(JSON.stringify(values, null, 2)); 
    // });
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
              initialValues={response.data} 
              validate={this.validate}
              onSubmit={this.handleSubmit} 
            />
          )}
        </CardContent>
      </Card>
    );
  }
}

const mapStateToProps = ({ layout, profileQuery }: AppState) => ({
  user: layout.user,
  response: profileQuery.response,
  errors: profileQuery.errors,
  loading: profileQuery.loading
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchRequest: (params: EmployeeQueryType) => dispatch(EmployeeProfileFetchRequest(params)),
  commandRequest: (params: EmployeeCommandType) => dispatch(EmployeeProfileCommandRequest(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountProfilePage);