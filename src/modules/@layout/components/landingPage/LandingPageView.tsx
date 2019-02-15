import { NewsFeed } from '@home/components/newsFeed/NewsFeed';
import { LayoutTheme } from '@layout/hoc/withRoot';
import { Paper } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import { LandingPageProps } from './LandingPage';

export const LandingPageView: React.SFC<LandingPageProps> = props => (
  <LayoutTheme>
    <header className={props.classes.heroHeader}>
      <Typography variant="headline" color="inherit" className={props.classes.flex}>
        {props.title}
      </Typography>

      {
        !props.oidcState.isLoadingUser &&
        !props.oidcState.user &&
        <Button
          color="inherit"
          size="small"
          onClick={() => props.handleOnClickLogin()}
        >
          Login
        </Button>
      }

      {
        !props.oidcState.isLoadingUser &&
        props.oidcState.user &&
        props.userState.user &&
        <React.Fragment>
          <Button
            color="inherit"
            size="small"
            onClick={() => props.handleOnClickLogin()}
          >
            Start
          </Button>
          <Button
            color="inherit"
            size="small"
            onClick={() => props.handleOnClickLogout()}
          >
            Logout
          </Button>
        </React.Fragment>
      }
    </header>

    <main className={props.classes.landingPage}>
      <div className={props.classes.heroUnit}>
        <div className={props.classes.heroContent}>
          <div className={props.classes.heroText}>
            <div className={props.classes.logoTessa} />

            <Typography
              variant="h6"
              color="inherit"
              paragraph
            >
              Manage and collaborate your daily professional activities through the Employee Self Service application
            </Typography>

            {
              props.oidcState.isLoadingUser &&
              <Typography variant="body2">
                <FormattedMessage id="layout.text.loading" />
              </Typography>
            }

            {
              !props.oidcState.isLoadingUser &&
              props.oidcState.user &&
              props.userState.user &&
              <React.Fragment>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={() => props.handleOnClickLogin()}
                >
                  {`Hi ${props.userState.user && props.userState.user.fullName}, Let's start!`}
                </Button>
              </React.Fragment>
            }

            {
              !props.oidcState.isLoadingUser &&
              !props.oidcState.user &&
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={() => props.handleOnClickLogin()}
              >
                Let me in
              </Button>
            }
          </div>
        </div>
      </div>

      <div className={props.classes.heroSection}>
        <Paper square elevation={2} className={props.classes.heroSummary}>
          <div id="logo" className={props.classes.paddingFar}>
            <div className={props.classes.logoEquine} />
          </div>

          <div id="news">
            <Typography 
              variant="h5" 
              align="center"
              color="textSecondary"
              className={props.classes.paddingFar}
            >
              News
            </Typography>

            <NewsFeed />
          </div>

          {/* <div id="achievements">
            <Typography 
              variant="h4" 
              align="center" 
              className={props.classes.paddingFar}
            >
              Achievements
            </Typography>

            <NewsFeed />
          </div> */}
        </Paper>
      </div>

      <footer className={props.classes.footer}>
        <Typography
          variant="body2"
          color="inherit"
          align="center"
          gutterBottom
        >
          {props.description}
        </Typography>
        <Typography
          variant="body2"
          align="center"
          color="inherit"
          component="p"
        >
          {props.footer}
        </Typography>
      </footer>
    </main>
  </LayoutTheme>
);