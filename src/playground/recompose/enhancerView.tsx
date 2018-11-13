import * as React from 'react';

import { EnhancerProps } from './Enhancer';

export const enhancerView: React.SFC<EnhancerProps> = props => (
  <div>
    <h1>React Recompose</h1>
    
    <hr/>
    
    <div style={{marginBottom: 10}}>
      <h4>Counter from state</h4>
      <span>{props.counter}</span>
    </div>

    <div>
      <h4>Counter changer</h4>
      
      <button onClick={(e) => {
        e.preventDefault();
        props.setIncrement(2);
      }}>
        increment
      </button>
      
      <button onClick={(e) => {
        e.preventDefault();
        props.setDecrement(1);
      }}>
        decrement
      </button>
    </div>
    
    <h4>Value from state</h4>
    <p>{props.value}</p>

    <h4>Input for state (value)</h4>
    <input 
      type="text" 
      value={props.value} 
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.setValue(e.currentTarget.value)}
    />

    <div style={{marginBottom: 10}}>
      <h4>Handler void</h4>
      
      <button onClick={(e) => {
        e.preventDefault();
        props.handleVoid();
      }}>
        call void
      </button>
    </div>
    
    <div style={{marginBottom: 10}}>
      <h4>Handler params</h4>

      <button onClick={(e) => {
        e.preventDefault();
        props.handleParams('1');
      }}>
        call w/ param: '1'
      </button>

      <button onClick={(e) => {
        e.preventDefault();
        props.handleParams('2');
      }}>
        call w/ param: '2'
      </button>
    </div>
</div>
);