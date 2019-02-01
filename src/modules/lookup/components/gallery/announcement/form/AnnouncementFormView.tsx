import { layoutMessage } from '@layout/locales/messages';
import {
  Button } from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { GalleryFormProps } from './AnnouncementForm';

export const GalleryFormView: React.SFC<GalleryFormProps> = props => (
  <form onSubmit={props.handleSubmit}>
    <Button
      type="submit"
      color="secondary"
      disabled={!props.valid || props.submitting}
    >
      <FormattedMessage
        id={props.submitting ? props.intl.formatMessage(layoutMessage.text.processing) : props.intl.formatMessage(layoutMessage.action.submit)}
      />
    </Button>
  </form>
);
