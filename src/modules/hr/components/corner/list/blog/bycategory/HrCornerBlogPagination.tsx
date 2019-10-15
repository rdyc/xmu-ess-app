import { IBaseMetadata } from '@generic/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { IconButton, Toolbar, Tooltip, Typography, WithStyles, withStyles } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import styles from '@styles';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  page?: number;
  metadata?: IBaseMetadata;
  isLoading: boolean;
  onClickNext: (event: React.MouseEvent<HTMLElement>) => void;
  onClickPrevious: (event: React.MouseEvent<HTMLElement>) => void;
}

type AllProps
  = OwnProps
  & InjectedIntlProps
  & WithStyles<typeof styles>;

const hrCornerBlogPagination: React.SFC<AllProps> = props => (
  <React.Fragment>
    {
      !props.isLoading &&
      props.metadata &&
      props.metadata.paginate &&
      <Toolbar
        disableGutters
      >
        <Tooltip
          placement="right"
          title={props.intl.formatMessage(layoutMessage.tooltip.prevPage)}
        >
          <div>
            <IconButton
              disabled={props.isLoading || !props.metadata.paginate.previous}
              onClick={props.onClickPrevious}
            >
              <ChevronLeftIcon />
            </IconButton>
          </div>
        </Tooltip>

        <Typography
          noWrap
          variant="body2"
          align="center"
          className={props.classes.flex}
        >
          {props.intl.formatMessage(layoutMessage.text.pagingInfo, { 
            current: props.metadata.paginate.current,
            total: props.metadata.paginate.total}
          )}
        </Typography>

        <Tooltip
          placement="left"
          title={props.intl.formatMessage(layoutMessage.tooltip.nextPage)}
        >
          <div>
            <IconButton 
              disabled={props.isLoading || !props.metadata.paginate.next}
              onClick={props.onClickNext}
            >
              <ChevronRightIcon />
            </IconButton>
          </div>
        </Tooltip>
      </Toolbar>
    }
  </React.Fragment>
);

export const HrCornerBlogPagination = compose<AllProps, OwnProps>(
  injectIntl,
  withStyles(styles)
  )(hrCornerBlogPagination);