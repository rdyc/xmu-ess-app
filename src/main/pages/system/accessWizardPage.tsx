// tslint:disable-next-line:max-line-length
import { Typography, withStyles, WithStyles, Button, Stepper, Step, StepLabel, StepContent, Grid, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Card, CardContent, CardActions, Divider, CardHeader, Checkbox } from '@material-ui/core';
import * as React from 'react';
import withRoot from '../../withRoot';
import { connect } from 'react-redux';
import { AppState } from '../../store';
import { RouteComponentProps } from 'react-router';
import { Dispatch } from 'redux';
import { ConnectedReduxProps } from '../../store';
import { accountEmployeeFetchRequest } from '../../store/account/accountEmployeeActions';
import userManager from '../../utils/userManager';
import removeDuplicates from '../../utils/arrayHelper';
import styles from '../../styles';
import { SingleResponseType } from '../../store/@base/SingleResponseType';
import { AccountEmployeeMyType } from '../../store/account/types/AccountEmployeeMyType';
import { EmployeeAccessListType } from '../../store/account/types/EmployeeAccessListType';
import { setMenuItems } from '../../store/@layout';
import { LookupRoleMenuListType } from '../../store/lookup/types/LookupRoleMenuListType';

interface PropsFromState extends RouteComponentProps<void>, WithStyles<typeof styles> {
  response: SingleResponseType<AccountEmployeeMyType>;
  errors?: string;
  loading: boolean;
}

interface PropsFromDispatch {
  fetchRequest: typeof accountEmployeeFetchRequest;
  setMenuItems: typeof setMenuItems;
}

type AllProps = PropsFromState &
  PropsFromDispatch &
  ConnectedReduxProps;

class AccessWizardPage extends React.Component<AllProps> {
  public componentDidMount() {
    this.props.fetchRequest();
  }

  public state = {
    activeStep: 0,
    companyUid: '',
    positionUid: '',
    isAgreed: false
  };

  public handleNext = () => {
    this.setState(() => ({
      activeStep: this.state.activeStep + 1,
    }));
  };

  public handleBack = () => {
    this.setState(() => ({
      activeStep: this.state.activeStep - 1,
    }));
  };

  public handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  public handleChange = (event: any) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  public handleChangeCheckbox = (name: string) => (event: any) => {
    this.setState({ [name]: event.target.checked });
  };

  public render() {
    const { response, loading } = this.props;
    const { activeStep } = this.state;

    const getCompanyAccess = () => {
      return removeDuplicates(response.data.access, 'companyUid') as EmployeeAccessListType[];
    };
    
    const getAccessByCompany = () => {
      return response.data.access.filter(item => item.companyUid === this.state.companyUid);
    };

    const getSelectedAccess = () => {
      if (!response) { return null; }

      return response.data.access.filter(item => 
        item.company !== null && 
        item.position !== null &&
        item.company.uid === this.state.companyUid && 
        item.position.uid === this.state.positionUid
      )[0];
    };

    const selected = getSelectedAccess();

    const getSteps = () => {
      return ['Your profile', 'Select company', 'Select position', 'Access review'];
    };
    
    const steps = getSteps();
      
    const getStepContent = (step: number) => {
      switch (step) {
        case 0:
          return profileForm();
        case 1:
          return companyForm();
        case 2:
          return positionForm();
        case 3:
          return reviewForm();
        default:
          return 'Unknown step';
      }
    };

    const onLogout = (event: any) => {
      event.preventDefault();
      userManager.signoutRedirect();
    };

    const profileForm = () => (
      <div>
        {response && (
          
          <Grid container spacing={24}>
            <Grid item xs={12} sm={6}>
              <TextField
                disabled
                fullWidth
                id="fullName"
                name="fullName"
                label="Full name"
                value={response.data.fullName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                disabled
                fullWidth
                id="empNumber"
                name="empNumber"
                label="Employment number"
                value={response.data.employmentNumber}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={response.data.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled
                fullWidth
                id="address"
                name="address"
                label="Address"
                value={response.data.address || ''}
              />
            </Grid>
          </Grid>
        )}
      </div>
    );

    const companyForm = () => (
      <div>
        {response && (
          <FormControl component="fieldset">
            <FormLabel component="legend">Available companies</FormLabel>
            <RadioGroup
              aria-label="Available companies"
              name="companyUid"
              value={this.state.companyUid}
              onChange={this.handleChange}
            >
              {getCompanyAccess().map(item => (
                <FormControlLabel 
                  key={item.company && item.company.uid || ''}
                  value={item.company && item.company.uid || ''} 
                  label={item.company && item.company.name || ''}
                  control={<Radio color="primary" />}
                />
              ))}
            </RadioGroup>
          </FormControl>
        )}
      </div>
    );

    const positionForm = () => (
      <div>
        {response && (
          <FormControl component="fieldset">
            <FormLabel component="legend">Available positions</FormLabel>
            <RadioGroup
              aria-label="Available positions"
              name="positionUid"
              value={this.state.positionUid}
              onChange={this.handleChange}
            >
              {getAccessByCompany().map(item => (
                <FormControlLabel 
                  key={item.position && item.position.uid || ''}
                  value={item.position && item.position.uid || ''} 
                  label={item.position && item.position.name}
                  control={<Radio color="primary" />}
                />
              ))}
            </RadioGroup>
          </FormControl>
        )}
      </div>
    );

    const reviewForm = () => (
      <div>
        {response &&  selected && (
          <Grid container spacing={24}>
            <Grid item xs={12} sm={6}>
              <TextField
                disabled
                fullWidth
                label="Full name"
                value={response.data.fullName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                disabled
                fullWidth
                label="Email"
                value={response.data.email}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                disabled
                fullWidth
                label="Company"
                value={selected.company && selected.company.name || ''}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                disabled
                fullWidth
                label="Position"
                value={selected.position && selected.position.name || ''}
              />
            </Grid>
          </Grid>
        )}
      </div>
    );

    const handleStart = () => {
      // set menu items
      this.props.setMenuItems(selected && selected.menus || []);

      // redirect to home page
      this.props.history.push('/home');
    };

    return (
      <div className={this.props.classes.root}>
        <div className={this.props.classes.marginFar}>
          <Grid container spacing={16} justify="center">
            <Grid item lg={8} xs={12}>
              <Card>
                <CardHeader 
                  title="Access Wizard"
                  subheader="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
                  ut labore et dolore magna aliqua."
                />
                {!loading && (
                <CardContent>
                  <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((label, index) => {
                      return (
                        <Step key={index}>
                          <StepLabel>{label}</StepLabel>
                          <StepContent>
                            {getStepContent(index)}
                          </StepContent>
                        </Step>
                      );
                    })}
                  </Stepper>
                  {activeStep === steps.length && (
                    <div>
                      <Divider/>
                      <div className={this.props.classes.marginFarTop}/>
                      <Typography variant="caption" gutterBottom align="center">
                        Terms of Use
                      </Typography>
                      <Typography variant="body1" paragraph>
                        {`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
                        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit 
                        in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat 
                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`}
                      </Typography>
                      <FormControlLabel
                        label="I have read and agree the terms"
                        control={
                          <Checkbox
                            color="primary"
                            checked={this.state.isAgreed}
                            onChange={this.handleChangeCheckbox('isAgreed')}
                            value="isAgreed"/>}
                      />
                    </div>
                  )}
                </CardContent>
                )}
                <CardActions className={this.props.classes.forceRight}>
                  {activeStep === 0 && (
                    <Button 
                      size="small" 
                      color="primary" 
                      onClick={onLogout}>
                      Sign Out
                    </Button>
                  )}
                  {activeStep !== 0 && (
                    <Button 
                      size="small" 
                      color="primary" 
                      onClick={this.handleBack}>
                      Back
                    </Button>
                  )}
                  {(activeStep === 0 || activeStep === 3) && (
                    <Button 
                      size="small" 
                      color="primary" 
                      onClick={this.handleNext}>
                      Next
                    </Button>
                  )}
                  {activeStep === 1 && (
                    <Button 
                      size="small" 
                      color="primary" 
                      disabled={this.state.companyUid === ''} 
                      onClick={this.handleNext}>
                      Next
                    </Button>
                  )}
                  {activeStep === 2 && (
                    <Button 
                      size="small" 
                      color="primary" 
                      disabled={this.state.positionUid === ''} 
                      onClick={this.handleNext}>
                      Next
                    </Button>
                  )}
                  {activeStep === 4 && (
                    <Button 
                      size="small" 
                      color="primary" 
                      disabled={!this.state.isAgreed}
                      onClick={handleStart}>
                      Start
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ account }: AppState) => ({
  response: account.employee,
  errors: account.errors,
  loading: account.loading
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchRequest: () => dispatch(accountEmployeeFetchRequest()),
  setMenuItems: (items: LookupRoleMenuListType[]) => dispatch(setMenuItems(items))
});

const redux = connect(mapStateToProps, mapDispatchToProps)(AccessWizardPage);

export default withRoot(withStyles(styles)<{}>(redux));