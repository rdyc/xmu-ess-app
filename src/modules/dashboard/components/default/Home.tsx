import { Card, CardContent, Typography } from '@material-ui/core';
import * as React from 'react';

export const Home: React.SFC = props => (
  <Card square elevation={0}>
    <CardContent>
      <Typography>
        Welcome
      </Typography>
    </CardContent>
  </Card>
);