import { InputFile } from '@layout/components/input/file';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid
} from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';
import { GalleryFormProps } from './GalleryForm';

export const GalleryFormView: React.SFC<GalleryFormProps> = props => (
  <form onSubmit={props.handleSubmit}>
    <Grid container spacing={16}>
      <Grid item xs={12} md={4}>
        <Card>
          <CardHeader
            title={props.intl.formatMessage(lookupMessage.gallery.page.newTitle)}
          />
          <CardContent>
            <Field
              name="file"
              label={props.intl.formatMessage(lookupMessage.gallery.field.file)}
              required={true}
              accept=".jpg, .jpeg, .png"
              component={InputFile}
            />
          </CardContent>
          <CardActions>
            <Button
              type="submit"
              color="secondary"
              disabled={!props.valid || props.submitting}
            >
              <FormattedMessage
                id={
                  props.submitting
                    ? 'global.processing'
                    : 'global.action.submit'
                }
              />
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  </form>
);
