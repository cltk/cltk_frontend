import React from 'react';
import PropTypes from 'prop-types';
import Headroom from 'react-headroom';
import { Link } from 'react-router';
import { connect } from 'react-redux';

// components
import UserAvatarContainer from '../../../../modules/users/containers/UserAvatarContainer';

// actions
import { toggleLeftMenu } from '../../../../actions/leftMenu';
import * as authActions from '../../../auth/actions';

// styles
import './ReadingHeaderNavBar.css';


const ReadingHeaderNavBar = ({
  dispatchToggleLeftMenu, dispatchToggleAuthModal, leftMenuOpen, userId, logout, work
}) => (
	<Headroom className="navbar readingNavbar">
		<div className="navbarLeft">
			<i
				className="mdi mdi-menu left-menu-toggle-icon"
				onClick={dispatchToggleLeftMenu.bind(this, !leftMenuOpen)}
  		/>
			<Link to={`/texts/${work.id}/${work.slug}/`}>
				<h2 className="site-title">
					{work ? work.english_title : ''}
				</h2>
			</Link>
		</div>
		<div className="navbarRight">
			<ul className="nav">
				<li>
					<button>
            Commentary
					</button>
				</li>
				<li>
					<button>
            Translation
					</button>
				</li>
				<li>
					<Link
						to="/browse"
						className="readingBrowseLink"
  				>
            Browse
					</Link>
				</li>
				{userId ?
					<li>
						<Link
							to={'/profile'}
							className="userAvatarLink"
    				>
							<UserAvatarContainer />
						</Link>
					</li>
        :
					<li>
						<Link
							to={'/'}
							className="login-button"
							onClick={dispatchToggleAuthModal}
    				>
    					Sign Up / In
						</Link>
					</li>
        }
			</ul>
		</div>
	</Headroom>
);

ReadingHeaderNavBar.propTypes = {
	userId: PropTypes.string,
};

const mapStateToProps = state => ({
	userId: state.auth.userId,
	leftMenuOpen: state.leftMenu.open,
});

const mapDispatchToProps = dispatch => ({
	dispatchToggleLeftMenu: (open) => {
		dispatch(toggleLeftMenu(open));
	},
	dispatchToggleAuthModal: (e) => {
		e.preventDefault();
		dispatch(authActions.toggleAuthModal());
	},
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ReadingHeaderNavBar);
