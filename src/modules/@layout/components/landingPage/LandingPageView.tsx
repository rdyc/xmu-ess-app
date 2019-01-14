import { GlobalFormat } from '@layout/types';
import { CardActionArea } from '@material-ui/core';
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

import { LandingPageProps } from './LandingPage';

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
            <Typography
              variant="h3"
              color="inherit"
              gutterBottom
            >
              All New Tessa
            </Typography>

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
                  color="primary"
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