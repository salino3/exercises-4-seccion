import React, { Fragment } from "react";

import { from } from "rxjs";
import { delay, filter, map, mergeMap } from "rxjs/operators";

let numberObservable = from([1, 2, 3, 4, 5]);
let squareNumbers = numberObservable.pipe(
  filter((val: number) => val > 2),
  mergeMap((val) => from([val]).pipe(delay(1000 * val))),
  map((val: number) => val * val)
);

// primer tipado 'props', segundo tipado 'state'
class CopyNewComponent extends React.Component <any, any> {
  subscription: any;
  constructor(props: any) {
    super(props);
    this.state = { currentNumber: 0 };
  }

  componentDidMount() {
    this.subscription = squareNumbers.subscribe((result) => {
      this.setState({ currentNumber: result });
    });
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  render() {
    return (
      <Fragment>
        <div>First Component</div>
        <p>Current number is: {this.state.currentNumber} </p>
      </Fragment>
    );
  }
}

export default CopyNewComponent;
