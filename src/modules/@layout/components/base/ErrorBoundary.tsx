import * as React from 'react';

type HocState = {
  readonly hasError: boolean;
};

export class ErrorBoundary extends React.Component {
  public readonly state: HocState = {
    hasError: false
  };
  
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  public componentDidCatch(error: any, info: any) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info);
    console.log(error);
    console.log(info);
  }

  public render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    
    return this.props.children;
  }
}