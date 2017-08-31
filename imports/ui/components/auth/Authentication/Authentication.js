import React from 'react';

export default class Authentication extends React.Component {
  componentDidMount() {
    const {
      match: {
        provider
      }
    } = this.props
    const { public: { apiURI } } = Metero.settings
    
    window.location = `${apiURI}/auth/${provider}`
  }
  
  render() {
    return null;
  }
}
