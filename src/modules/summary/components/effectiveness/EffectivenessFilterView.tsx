import { layoutMessage } from '@layout/locales/messages';
import { Badge, IconButton, Toolbar, Tooltip, Typography } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import SyncIcon from '@material-ui/icons/Sync';
import TuneIcon from '@material-ui/icons/Tune';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { EffectivenessFilterProps } from './EffectivenessFilter';

export const EffectivenessFilterView: React.SFC<EffectivenessFilterProps> = props => {
  const showBadgeWhen = (): boolean => {
    return props.employeeUidValue !== undefined ||
      props.projectUidValue !== undefined;
  };

  return (
    <Toolbar disableGutters>
      <Typography
        noWrap
        variant="body2"
        className={props.className}
      >
        {
          props.isLoading &&
          <FormattedMessage {...layoutMessage.text.loading} />
        }

        {/* {
          !props.isLoading &&
          props.metadata &&
          <FormattedMessage {...layoutMessage.text.dataInfo} values={{
            total: props.metadata.total
          }} />
        } */}
      </Typography>
      
      <Tooltip
        placement="bottom"
        title={props.intl.formatMessage(layoutMessage.tooltip.filter)}
      >
        <IconButton
          disabled={props.isLoading}
          // onClick={item.onClick} 
        >
          <Badge
            invisible={!showBadgeWhen()}
            badgeContent={<CheckCircleIcon color="primary" />}
          >
            <TuneIcon />
          </Badge>
        </IconButton>
      </Tooltip>

      <Tooltip
        placement="bottom"
        title={props.intl.formatMessage(layoutMessage.tooltip.refresh)}
      >
        <IconButton 
          id="option-sync"
          disabled={props.isLoading}
          onClick={props.onClickSync}
        >
          <SyncIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};