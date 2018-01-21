import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// components
import NavBar from './NavBar';
import LeftMenu from '../LeftMenu';

// actions
import * as authActions from '../../../modules/auth/actions';


const Header = ({ toggleAuthModal, userId }) => (
	<div>
		<LeftMenu />
		<NavBar
			toggleAuthModal={toggleAuthModal}
			userId={userId}
		/>
	</div>
);

Header.propTypes = {
	toggleAuthModal: PropTypes.func.isRequired,
	userId: PropTypes.string,
};

Header.defaultProps = {
	userId: null
};

const mapStateToProps = state => ({
	userId: state.auth.userId,
});

const mapDispatchToProps = dispatch => ({
	toggleAuthModal: (e) => {
		e.preventDefault();
		dispatch(authActions.toggleAuthModal());
	},
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Header);
