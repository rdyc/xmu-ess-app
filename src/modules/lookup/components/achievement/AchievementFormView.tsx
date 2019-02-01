import { InputFile } from '@layout/components/input/file';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Button, Card, CardActions, CardContent, CardHeader, Grid } from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';
import { AchievementFormProps } from './AchievementForm';

export const AchievementFormView: React.SFC<AchievementFormProps> = props => (
  <form onSubmit={props.handleSubmit}>
    <Grid container spacing={16}>
      <Grid item xs={12} md={4}>
        <Card>
          <CardHeader 
            title={props.intl.formatMessage(lookupMessage.achievement.section.infoTitle)}
          />
          <CardContent>
            <Field 
              name="file" 
              label={props.intl.formatMessage(lookupMessage.achievement.field.file)}
              required={true}
              accept=".xls,.xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
              component={InputFile}
            />
          </CardContent>
          <CardActions>
            <Button
              type="submit"
              color="secondary"
              disabled={!props.valid || props.submitting}
            >
              <FormattedMessage id={props.submitting ? 'global.processing' 
                : 'global.action.submit' } 
              />
            </Button>
          </CardActions>
        </Card>
      </Grid>   
    </Grid>
  </form>
);