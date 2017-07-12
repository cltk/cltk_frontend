import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import { Blaze } from 'meteor/blaze';
import { Template  } from 'meteor/templating';
import { createContainer } from 'meteor/react-meteor-data';

class BlazeToReactComponent extends React.Component {
  renderBlaze() {
    this.removeBlaze();
    this.view = Blaze.renderWithData(
      Template[this.props.blazeTemplate],
      _.omit(this.props, 'blazeTemplate'),
      ReactDOM.findDOMNode(this.c)
    );
  }

  removeBlaze() {
    if (this.view) Blaze.remove(this.view);
  }

  componentDidUpdate() {
    // Needed when used with a conditional show, like {condition ? <BlazeToCreact ../> : null}
    this.renderBlaze();
  }

  componentDidMount() {
    this.renderBlaze();
  }

  componentWillUnmount() {
    this.removeBlaze();
  }

  render() {
    return <div ref={c => { this.c = c; }} />
  }
}

export const BlazeToReact = createContainer(props => props, BlazeToReactComponent);

if (typeof window !== 'undefined') {
  window.BlazeToReact = BlazeToReact;
}

export default BlazeToReact;
