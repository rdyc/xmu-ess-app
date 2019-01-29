import { Button } from '@material-ui/core';
import * as React from 'react';

import { InputImageProps } from './InputImage';

export const InputImageView: React.SFC<InputImageProps> = props => (
    <React.Fragment>
      <Button 
        variant="contained"
        component="label"
      >
        Upload file
        <input 
          type="file"
          accept={'.jpg, .png, .jpeg'}
          name={props.input.name}
          onChange={(e) => props.handleImageChange(e)}
          style={{ display : 'none'}}
        />
      </Button>
      <img src={props.showImage}/>
    </React.Fragment>
);