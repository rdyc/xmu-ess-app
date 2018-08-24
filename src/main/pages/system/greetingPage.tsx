// tslint:disable-next-line:max-line-length
import { Toolbar, Typography, withStyles, WithStyles, AppBar, Button, Paper, Stepper, Step, StepLabel, StepContent } from '@material-ui/core';
import * as React from 'react';
import withRoot from '../../withRoot';
import styles from '../../styles';
import { connect } from 'react-redux';
import { AppState } from '../../store';
import { RouteComponentProps } from 'react-router';
import { Dispatch } from 'redux';
import { ConnectedReduxProps } from '../../store';
import { AppUserResponse } from '../../store/user/types';
import { fetchRequest } from '../../store/user/actions';
import userManager from '../../utils/userManager';
import AddressForm from './userInfo';
import { GreetingCompany } from './greetingCompany';

interface PropsFromState extends RouteComponentProps<void>, WithStyles<typeof styles> {
  response: AppUserResponse;
  errors?: string;
  loading: boolean;
}

interface PropsFromDispatch {
  fetchRequest: typeof fetchRequest;
}

type AllProps = PropsFromState &
  PropsFromDispatch &
  ConnectedReduxProps;

class GreetingPage extends React.Component<AllProps> {
  public componentDidMount() {
    this.props.fetchRequest();
  }

  public state = {
    activeStep: 0,
  };

  public handleNext = () => {
    this.setState(state => ({
      activeStep: this.state.activeStep + 1,
    }));
  };

  public handleBack = () => {
    this.setState(state => ({
      activeStep: this.state.activeStep - 1,
    }));
  };

  public handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  public render() {
    const { classes, response, loading } = this.props;
    const { activeStep } = this.state;
    
    const getSteps = () => {
      return ['My Account', 'Select company', 'Select position', 'Access review'];
    };
    
    const steps = getSteps();
      
    const getStepContent = (step: number) => {
      switch (step) {
        case 0:
          return <AddressForm {...response} />;
        case 1:
          return <GreetingCompany {...response} />;
        case 2:
          return `Try out different ad text to see what brings in the most customers,
                  and learn how to enhance your ads using features like ad extensions.
                  If you run into any problems with your ads, find out how to tell if
                  they're running and how to resolve approval issues.`;
        default:
          return 'Unknown step';
      }
    };

    const onLogout = (event: any) => {
      event.preventDefault();
      userManager.signoutRedirect();
    };
    
    return (
      <React.Fragment>
        <AppBar color="default" className={classes.appBar}>
          <Toolbar>
            <Typography variant="title" color="inherit" noWrap className={classes.toolbarTitle}>
              Select Access
            </Typography>
          </Toolbar>
        </AppBar>
        {!loading && (
        <main className={classes.layout}>
          {/* <div className={classes.appBarSpacer} />
          <Paper className={classes.paper} elevation={1}>
          <Typography variant="headline" component="h3">
          This is a sheet of paper.
          </Typography>
          <Typography component="p">
          Paper can be used to build surface or other elements for your application.
          </Typography>
        </Paper> */}
          <div className={classes.appBarSpacer} />
          <div className={classes.appBarSpacer} />
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => {
              return (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                  <StepContent>
                    {getStepContent(index)}
                    <div className={classes.spacer}>
                      <div>
                        {activeStep === 0 ? (
                          <Button onClick={onLogout}>
                            Sign Out
                          </Button>
                        ) : 
                        (
                          <Button onClick={this.handleBack}>
                            Back
                          </Button>
                        )}
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={this.handleNext}
                        >
                          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                      </div>
                    </div>
                  </StepContent>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length && (
            <Paper className={classes.paper} elevation={0}>
              <Typography>All steps completed - you&quot;re finished</Typography>
              <Button onClick={this.handleReset}>
                Reset
              </Button>
            </Paper>
          )}
        </main>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ user }: AppState) => ({
  response: user.response,
  errors: user.errors,
  loading: user.loading
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchRequest: () => dispatch(fetchRequest())
});

export default (withRoot(withStyles(styles)<{}>(connect(mapStateToProps, mapDispatchToProps)(GreetingPage))));