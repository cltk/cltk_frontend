import React from 'react';
import { Link } from 'react-router';
import { Grid, Row, Col } from 'react-bootstrap';

import ProfileNav from '../ProfileNav';

import './ProfileProjects.css';

const ProfileProjects = ({ projects }) => (
	<div className="profileProjects">
		<ProfileNav />
		<Grid>
			<Row>
				<div className="profileProjectList">
					{projects.map(project => (
						<Col key={project._id}>
							<a
								className="profileProjectListItem"
								href={`//${project.hostname}`}
							>
								<span>
									{project.title}
								</span>
								<hr />
							</a>
						</Col>
					))}
				</div>
				{projects && !projects.length ?
					<div className="profileProjectListNoResults">
						<p>
							You don&apos;t belong to any projects. <Link to="/create">Create one.</Link>
						</p>
					</div>
				: ''}
			</Row>
		</Grid>
	</div>
);


export default ProfileProjects;
