import { Chart } from '@home/components/dashboard';
import { LayoutTheme } from '@layout/hoc/withRoot';
import { GlobalFormat } from '@layout/types';
import { CardActionArea, Paper } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

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

    <main>
      <div className={props.classes.heroUnit}>
        <div className={props.classes.heroContent}>
          <div className={props.classes.heroText}>
            <div className={props.classes.logoTessa} />

            <Typography
              variant="h6"
              color="inherit"
              paragraph
            >
              Every landing page needs a small description after the big bold title, that's why we added this text here. Add here all the information that can make you or your product create the first impression.
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
          <div className={props.classes.logoEquine} />

          <Grid container spacing={16} alignItems="center">
            <Grid item xs={12} md={4} className={props.classes.heroSummaryContent}>
              <Link to="/#news" target="_self" className={props.classes.heroSummaryContentLink}>
                <div className={props.classes.iconNews} />
                <Typography variant="headline" align="center" color="default">NEWS</Typography>
                <Typography variant="subheading" align="center" className={props.classes.paddingFar}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Typography>
              </Link>
            </Grid>

            <Grid item xs={12} md={4} className={props.classes.heroSummaryContent}>
              <Link to="/#achievements" target="_self" className={props.classes.heroSummaryContentLink}>
                <div className={props.classes.iconAchievement} />
                <Typography variant="headline" align="center">ACHIEVEMENTS</Typography>
                <Typography variant="subheading" align="center" className={props.classes.paddingFar}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Typography>
              </Link>
            </Grid>

            <Grid item xs={12} md={4} className={props.classes.heroSummaryContent}>
              <Link to="/#events" target="_self" className={props.classes.heroSummaryContentLink}>
                <div className={props.classes.iconEvent} />
                <Typography variant="headline" align="center">EVENTS</Typography>
                <Typography variant="subheading" align="center" className={props.classes.paddingFar}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Typography>
              </Link>
            </Grid>
          </Grid>
        </Paper>

        <div id="news" className={props.classes.heroSection}>
          <Typography variant="h4" align="center" className={props.classes.paddingFar}>News</Typography>

          <Grid container spacing={16}>
            {
              props.landingPageState.all.response &&
              props.landingPageState.all.response.data.news.map((item, index) => (
                <Grid item key={index} sm={12} md={4} lg={4}>
                  <Card square elevation={1}>
                    <CardActionArea href={item.url} target="_blank" disableRipple disableTouchRipple>
                      <CardMedia
                        component="img"
                        image={item.image}
                        title={item.title}
                        style={{height: 200}}
                      />
                      <CardContent className={props.classes.marginWideBottom} style={{height: 200, overflow: 'hidden'}}>
                        <Typography variant="caption">
                          {props.intl.formatDate(item.date, GlobalFormat.Date)} | {item.source}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="h2" title={item.title}>
                          {item.title}
                        </Typography>
                        <Typography variant="body2">
                          {item.subHeader}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))
            }
          </Grid>
        </div>

        <div id="achievements" className={props.classes.heroSection}>
          <Typography id="news" variant="h4" align="center" className={props.classes.paddingFar}>Achievements</Typography>

          <Chart />
        </div>

        <div id="events" className={props.classes.heroSection}>
          <Typography variant="h4" align="center" className={props.classes.paddingFar}>Events</Typography>
        </div>
      </div>
    </main>

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
  </LayoutTheme>
);