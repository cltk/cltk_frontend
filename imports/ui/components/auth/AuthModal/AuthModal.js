import React from 'react';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import classnames from 'classnames';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Accounts } from 'meteor/accounts-base';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

import AuthForm from '/imports/ui/components/auth/AuthForm';
import OAuthButtons from '/imports/ui/components/auth/OAuthButtons';

const ESCAPE_KEY = 27;

export default class AuthModal extends React.Component {
  static propTypes = {
    authAction: PropTypes.oneOf(['login', 'signup']),
    history: PropTypes.shape({
      goBack: PropTypes.func.isRequired,
      length: PropTypes.number.isRequired,
    }).isRequired,
    lowered: PropTypes.bool,
    closeModal: PropTypes.func,
  }

  static childContextTypes = {
    muiTheme: PropTypes.object.isRequired,
  }

  static defaultProps = {
    lowered: false
  }

  constructor(props) {
    super(props)

    this.state = {
      errorMessage: '',
      errorSocial: ''
    }

    this.handleClose = this.handleClose.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  componentWillMount() {
    document.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  handleClose(e) {
    e.preventDefault()

    const { history } = this.props

    if (history.length > 1) {
      return history.goBack()
    }

    history.replace('/')
  }

  handleKeyDown(event) {
    event.keyCode === ESCAPE_KEY && this.props.closeModal()
  }

  handleSubmit(values) {
    console.log(values)
    if (this.props.authAction === 'login') {
      return this.handleLogin(values.email, values.password)
    }

    this.handleSignup(values.email, values.password, values.passwordRepeat)
  }

  handleLogin(email, password) {
    Meteor.loginWithPassword(email, password, err => {
      if (err) {
        return this.setState({
          errorMessage: err.message
        })
      }

      this.props.closeModal()
    })
  }

  handleSignup(email, password, passwordRepeat) {
    if (password !== passwordRepeat) {
      // QUESTION: Why was this check throwing a Meteor.Error previously?
      return this.setState({
        errorMessage: 'Passwords do not match.',
      })
    }

    const checkPassword = Accounts._hashPassword(password)

    Meteor.call('createAccount', { email, checkPassword }, (err, result) => {
      console.log(err, result)
      if (err) {
        return this.setState({
          errorMessage: err.message,
        })
      }

      Meteor.loginWithToken(result.stampedToken.token, err => {
        if (err) {
          return this.setState({
            errorMessage: err.message
          })
        }

        const domain = Utils.getEnvDomain()

        if (domain) {
          Cookies.set('userId', Meteor.userId(), { domain })
          Cookies.set('loginToken', token, { domain })
        } else {
          Cookies.set('userId', Meteor.userId())
          Cookies.set('loginToken', token)
        }

        this.props.closeModal()
      })
    })
  }

  render() {
    if (!Meteor.userId()) {
      const { authAction, lowered } = this.props
      const className = classnames('cltk-modal cltk-login-signup', {
        'cltk-modal-login': authAction === 'login',
        'cltk-modal-signup': authAction === 'signup',
        lowered
      })
      let title, pwdForm, alternateAction
      let termsNotice = null

      if (authAction === 'login') {
        title = 'Sign in'
        alternateAction = (
          <p>
            Don't have an account? <Link to="sign-up" id="at-signUp" className="at-link at-signup">Register</Link>.
          </p>
        )
      } else if (authAction === 'signup') {
        title = 'Create an account'
        pwdForm = (
          <AuthForm
            authAction={authAction}
            onSubmit={this.handleSignup}
            errorMessage={this.state.errorMessage}
          />
        )
        termsNotice = (
          <p>
            By clicking register, you agree to our <a href="/terms" className="at-link at-link--terms at-resend-verification-email">Terms and Privacy Policy.</a>
          </p>
        )
        alternateAction = (
          <p>
            Already have an account? <Link to="sign-in" id="at-signUp" className="at-link at-signup">Sign in.</Link>
          </p>
        )
      }

      return (
        <div className={className}>
          <div
            className="close-modal paper-shadow"
            onClick={this.handleClose}
          >
            <i className="mdi mdi-close" />
          </div>
          <div className="modal-inner">
            <div className="at-form">

              <div className="at-title">
                <h3>{title}</h3>
              </div>

              <span className="error-text">
                {this.state.errorSocial}
              </span>

              <OAuthButtons />

              <div className="at-sep">
                <strong>OR</strong>
              </div>

              <AuthForm
                authAction={authAction}
                onSubmit={this.handleSubmit}
                errorMsg={this.state.errorMessage}
              />

              <div className="at-signup-link">

              </div>
              <div className="at-resend-verification-email-link at-wrap">
                {termsNotice}
                {alternateAction}
                <p>
                  Verification email lost? <a href="/send-again" id="at-resend-verification-email" className="at-link at-resend-verification-email">Send again.</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return null
  }
}
