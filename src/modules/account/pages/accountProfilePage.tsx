import { Card, CardContent, WithStyles } from '@material-ui/core';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Dispatch } from 'redux';

import { IAppState } from '../../../generic/interfaces';
import { IResponseSingle } from '../../../generic/interfaces/IResponseSingle';
import { Command, ConnectedReduxProps } from '../../../generic/types';
import styles from '../../../styles';
import { IAppUser } from '../../@layout/interfaces';
import { IEmployee } from '../interfaces/IEmployee';
import { IEmployeeCommand } from '../interfaces/IEmployeeCommand';
import { IEmployeeCommandData } from '../interfaces/IEmployeeCommandData';
import { IEmployeeQuery } from '../interfaces/IEmployeeQuery';
import { EmployeeProfileCommandRequest, EmployeeProfileFetchRequest } from '../stores/actionCreators/employeeProfileActions';
import ProfileForm from './profileForm';

interface PropsFromState extends RouteComponentProps<void>, WithStyles<typeof styles> {
  user: IAppUser;
  response: IResponseSingle<IEmployee>;
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

  transform = (data: IEmployee): IEmployeeCommandData => { 
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

  handleSubmit = (payload: IEmployee) => { 
    this.props.commandRequest({
      uid: this.props.user.uid,
      method: Command.PUT,
      data: this.transform(payload)
    });

    // return this.sleep(1000).then(() => { 
    //   alert(JSON.stringify(values, null, 2)); 
    // });
  };

  validate = (values: IEmployeeCommandData) => {
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

const mapStateToProps = ({ layout, profileQuery }: IAppState) => ({
  user: layout.user,
  response: profileQuery.response,
  errors: profileQuery.errors,
  loading: profileQuery.loading
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchRequest: (params: IEmployeeQuery) => dispatch(EmployeeProfileFetchRequest(params)),
  commandRequest: (params: IEmployeeCommand) => dispatch(EmployeeProfileCommandRequest(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountProfilePage);