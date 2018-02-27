import React from 'react';
import PropTypes from 'prop-types';
import Headroom from 'react-headroom';
import { Link } from 'react-router';

// components
import NavBarHeader from './NavBarHeader';
import UserAvatarContainer from '../../../../modules/users/containers/UserAvatarContainer';

// styles
import './NavBar.css';


const NavBar = ({ toggleAuthModal, toggleLeftMenu, userId, logout }) => (
	<Headroom className="navbar">
		<NavBarHeader toggleLeftMenu={toggleLeftMenu} />
		<ul className="nav">
			<li>
				<Link to={'/browse'}>
					Browse
				</Link>
			</li>
			<li>
				<Link to={'/#build'}>
					Build
				</Link>
			</li>
			<li>
				<a href="http://cltk.org" target="_blank" rel="noopener noreferrer">
					cltk.org
				</a>
			</li>
			<li>
				<Link to={'/about'}>
					About
				</Link>
			</li>
			<li>
				{ userId ?
					<Link
						to={'/profile'}
						className="userAvatarLink"
					>
						<UserAvatarContainer />
					</Link>
				: '' }
			</li>
			<li>
				{!userId ?
					<Link
						to={'/'}
						className="login-button"
						onClick={toggleAuthModal}
					>
						Sign Up / In
					</Link>
				: '' }
			</li>
		</ul>
	</Headroom>
);

NavBar.propTypes = {
	toggleAuthModal: PropTypes.func.isRequired,
	userId: PropTypes.string,
};

export default NavBar;
