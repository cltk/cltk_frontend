import React from 'react';
import {
  Grid,
  Row,
  Col,
} from 'react-bootstrap';
import { Link } from 'react-router';

import './Footer.css';

export default class Footer extends React.Component {
	render() {
		const now = new Date();
		const year = now.getFullYear();
		return (
			<section id="footer">
				<Grid>
					<Row>
						<Col lg={4}>
							<span className="footerCopyright">
                © cltk {year}
							</span>
							<span className="footerBuiltBy">
                See more at
								<a
									href="http://cltk.org"
									target="_blank"
									rel="noopener noreferrer"
								>
                  cltk.org
								</a>
								.
							</span>
						</Col>
						<Col lg={8}>
							<div className="footerLinks">
								<Link href="mailto:contact@cltk.org">
									Contact
								</Link>
							</div>
						</Col>
					</Row>
				</Grid>
			</section>
		);
	}
}
