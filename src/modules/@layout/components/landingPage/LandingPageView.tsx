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

interface INews {
  source: string;
  date: string;
  url: string;
  image: string;
  title: string;
  subHeader: string;
}

const news: INews[] = [
  {
    source: 'Instagram - equineglobal',
    date: '2018-12-31',
    url: 'https://www.instagram.com/p/BsCuJSqjrQW/',
    image: 'https://scontent-sin6-2.cdninstagram.com/vp/1517ac38aff300b65b736c95c40a820e/5CC5BD88/t51.2885-15/sh0.08/e35/s750x750/47690400_1187119848111763_6320383304818229248_n.jpg?_nc_ht=scontent-sin6-2.cdninstagram.com',
    title: 'Happy New Year 2019',
    subHeader: 'May the New Year bring to you warmth of love, and a light to guide your path towards a positive destination. Happy New Year 2019.'
  },
  {
    source: 'Instagram - equineglobal',
    date: '2018-12-24',
    url: 'https://swa.co.id/swa/listed-articles/gandeng-equine-global-kpei-raih-iso-bidang-keamanan-informasi',
    image: 'https://scontent-sin6-1.cdninstagram.com/vp/d918b1dff38c3267469ca9c2d2b19830/5CC74E3B/t51.2885-15/sh0.08/e35/s640x640/47691260_475783666278840_7722909191769161728_n.jpg?_nc_ht=scontent-sin6-1.cdninstagram.com',
    title: 'Merry Christmas 2018',
    subHeader: 'Wishing you a very Merry Christmas and Prosperous New Year. May Peace be your gift at Christmas and your blessing all year through.'
  },
  {
    source: 'Instagram - equineglobal',
    date: '2018-12-21',
    url: 'https://www.instagram.com/p/BrpSzepD_P9/',
    image: 'https://scontent-sin6-1.cdninstagram.com/vp/8355ec017b6afa1e7e7e9a9c2fdcb8e9/5CC82A75/t51.2885-15/sh0.08/e35/s640x640/47320332_1973338742748281_5437556900294033408_n.jpg?_nc_ht=scontent-sin6-1.cdninstagram.com',
    title: 'Friday Inspiring Presentation (FIP)',
    subHeader: 'Friday Inspiring Presentation (FIP) hari ini dibawakan oleh Antonius Bambang Saputro dengan judul “Aquascape”. Antonius menceritakan mengenai seni yg mengatur tanaman, air, batu, karang, kayu dan lain...'
  },
  {
    source: 'SWA - Business Update',
    date: '2018-11-29',
    url: 'https://swa.co.id/swa/business-update/equine-technologies-group-menjadi-icon-di-industri-ti-melalui-pengelolaan-sumber-daya-manusia-dan-teknologi',
    image: 'https://s3-ap-southeast-1.amazonaws.com/swa.co.id/wp-content/uploads/2018/11/29140648/equine-4541.gif',
    title: 'EQUINE TECHNOLOGIES GROUP Menjadi Icon di Industri TI melalui Pengelolaan Sumber Daya Manusia dan Teknologi',
    subHeader: 'Lahirnya revolusi Industry 4.0 ditandai dengan penggunaan teknologi secara masif. Era ini memaksa perusahaan untuk berinovasi sejalan dengan perkembangan teknologi agar dapat bersaing dan bertumbuh....'
  },
  {
    source: 'SWA - Listed Articles',
    date: '2017-05-05',
    url: 'https://swa.co.id/swa/listed-articles/gandeng-equine-global-kpei-raih-iso-bidang-keamanan-informasi',
    image: 'https://s3-ap-southeast-1.amazonaws.com/swa.co.id/wp-content/uploads/2017/05/KPEI-.jpg',
    title: 'Gandeng Equine Global, KPEI Raih ISO Bidang Keamanan Informasi',
    subHeader: 'Keberadaan dan keberlangsungan pasar modal kini semakin vital bagi perekonoman Indonesia. Alhasil, semua infrastruktur dan sistem pendukung pasar modal mesti dijaga dan dikelola sebaik-baiknya agar...'
  },
  {
    source: 'SWA - Profile',
    date: '2014-09-30',
    url: 'https://swa.co.id/swa/profile/eko-heryanto-tidak-ingin-berhenti-hanya-di-industri-ti',
    image: 'https://s3-ap-southeast-1.amazonaws.com/swa.co.id/wp-content/uploads/2014/09/Eko-Heryanto.jpg.jpg',
    title: 'Eko Heryanto, Tidak Ingin Berhenti Hanya di Industri TI',
    subHeader: 'Sebagai seorang yang sudah kawakan di dunia IT, Eko Heryanto, CEO Equine Technologies Group, merasakan bahwa perbedaan era di dalam dunia kerja semakin signifikan. Dengan...'
  }
];

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

      <Paper square elevation={2} className={props.classes.heroSummary}>
        <img src={EquineLogo} className={props.classes.heroSummaryImage}/>
        
        <Grid container spacing={16} alignItems="center">
          <Grid item xs={12} md={4} className={props.classes.heroSummaryContent}>
            <Link to="/#news" target="_self" className={props.classes.heroSummaryContentLink}>
              <img src={NewsIcon} className={props.classes.heroSummaryImage}/>
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
          {news.map((item, index) => (
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
          ))}
        </Grid>
      </div>
    
      <div id="achievements" className={classNames(props.classes.layout, props.classes.cardGrid)}>
        <Typography id="news" variant="h4" align="center" className={props.classes.title}>Achievements</Typography>

        <Chart />
      </div>

      <div id="events" className={classNames(props.classes.layout, props.classes.cardGrid)}>
        <Typography variant="h4" align="center" className={props.classes.title}>Events</Typography>
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