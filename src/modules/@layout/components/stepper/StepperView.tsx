import { CardMedia, Dialog, IconButton } from '@material-ui/core';
import MobileStepper from '@material-ui/core/MobileStepper';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';

import { StepperProps } from './Stepper';

export const StepperView: React.SFC<StepperProps> = props => {
  const fullImagesDialog = () => (
    <Dialog
      open={props.isDialogOpen}
      onClose={props.handleCloseImage}
      // fullWidth
      // maxWidth={'xl'}
    >
      <CardMedia
        component="img"
        image={props.currentImages && props.currentImages.imgPathFull}
        title={props.currentImages && props.currentImages.label}
        onClick={props.handleCloseImage}
      />
    </Dialog>
  );
  return (
    <React.Fragment>
      <SwipeableViews 
        enableMouseEvents
        index={props.activeStep}
        onChangeIndex={props.setChange}
      >
        {props.source.map((step, index) => (
          <div key={step.label} className={props.classes.stepper} onClick={() => props.showFull && props.handleOpenImage(step)}>
            {Math.abs(props.activeStep - index) <= 2 ? (
              <img 
                className={props.classes.stepperImg} 
                src={step.imgPath} 
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </SwipeableViews>

      {fullImagesDialog()}

      <MobileStepper
        steps={props.source.length}
        position="static"
        activeStep={props.activeStep}
        nextButton={
          <IconButton onClick={props.setNext}>
            <ChevronRightIcon/>
          </IconButton>
        }
        backButton={
          <IconButton onClick={props.setBack}>
            <ChevronLeftIcon/>
          </IconButton>
        }
      />
    </React.Fragment>
  );
};