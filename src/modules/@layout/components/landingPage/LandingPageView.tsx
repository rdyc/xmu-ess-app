import { Chart } from '@home/components/dashboard';
import { GlobalFormat } from '@layout/types';
import { CardActionArea, Paper } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import { LandingPageProps } from './LandingPage';
import AchievementIcon from '/image/icons/achievement.png';
import EventIcon from '/image/icons/event.png';
import NewsIcon from '/image/icons/news.png';
import EquineLogo from '/image/logo/equine-logo.png';
import TessaLogo from '/image/logo/tessa-logo.png';

export const LandingPageView: React.SFC<LandingPageProps> = props => (
  <React.Fragment>
    <CssBaseline />

    <header className={props.classes.header}>
      <Typography variant="subheading" color="inherit" className={props.classes.flex}>
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
            {/* <Typography
              variant="h3"
              color="inherit"
              gutterBottom
            >
              All New Tessa
            </Typography> */}
            <img src={TessaLogo} />

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
                  className={props.classes.button}
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

      <div className={classNames(props.classes.layout, props.classes.cardGrid)}>
        <Paper square elevation={2} className={props.classes.heroSummary}>
          <img src={EquineLogo} className={props.classes.heroSummaryImage} />

          <Grid container spacing={16} alignItems="center">
            <Grid item xs={12} md={4} className={props.classes.heroSummaryContent}>
              <Link to="/#news" target="_self" className={props.classes.heroSummaryContentLink}>
                <img src={NewsIcon} className={props.classes.heroSummaryImage} />
                <Typography variant="headline" align="center">NEWS</Typography>
                <Typography variant="subheading" align="center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Typography>
              </Link>
            </Grid>
            <Grid item xs={12} md={4} className={props.classes.heroSummaryContent}>
              <Link to="/#achievements" target="_self" className={props.classes.heroSummaryContentLink}>
                <img src={AchievementIcon} className={props.classes.heroSummaryImage} />
                <Typography variant="headline" align="center">ACHIEVEMENTS</Typography>
                <Typography variant="subheading" align="center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Typography>
              </Link>
            </Grid>
            <Grid item xs={12} md={4} className={props.classes.heroSummaryContent}>
              <Link to="/#events" target="_self" className={props.classes.heroSummaryContentLink}>
                <img src={EventIcon} className={props.classes.heroSummaryImage} />
                <Typography variant="headline" align="center">EVENTS</Typography>
                <Typography variant="subheading" align="center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Typography>
              </Link>
            </Grid>
          </Grid>
        </Paper>

        <div id="news" className={classNames(props.classes.layout, props.classes.cardGrid)}>
          <Typography variant="h4" align="center" className={props.classes.title}>News</Typography>

          <Grid container spacing={16}>
            {
              props.landingPageState.all.response &&
              props.landingPageState.all.response.data.news.map((item, index) => (
                <Grid item key={index} sm={12} md={4} lg={4}>
                  <Card square elevation={1} className={props.classes.card}>
                    <CardActionArea href={item.url} target="_blank" disableRipple disableTouchRipple>
                      <CardMedia
                        className={props.classes.cardMedia}
                        image={item.image}
                        title={item.title}
                      />
                      <CardContent className={props.classes.cardContent}>
                        <Typography variant="caption">
                          {props.intl.formatDate(item.date, GlobalFormat.Date)} | {item.source}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="h2" noWrap title={item.title}>
                          {item.title}
                        </Typography>
                        <Typography component="p">
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

        <div id="achievements" className={classNames(props.classes.layout, props.classes.cardGrid)}>
          <Typography id="news" variant="h4" align="center" className={props.classes.title}>Achievements</Typography>

          <Chart />
        </div>

        <div id="events" className={classNames(props.classes.layout, props.classes.cardGrid)}>
          <Typography variant="h4" align="center" className={props.classes.title}>Events</Typography>
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
  </React.Fragment>
);