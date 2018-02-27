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
                © Classical Language Toolkit {year}
							</span>
							<span className="footerBuiltBy">
								<a
									href="https://github.com/cltk/cltk/blob/master/LICENSE"
									target="_blank"
									rel="noopener noreferrer"
                >
                  License
								</a>.
								<a
									href="https://github.com/cltk/"
									target="_blank"
									rel="noopener noreferrer"
                >
                  Texts and Contributors
								</a>.
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
								<Link href="mailto:classical-language-toolkit@googlegroups.com">
									Contact
								</Link>
								<a
									href="https://gitter.im/cltk/cltk"
									target="_blank"
									rel="noopener noreferrer"
                >
                  Gitter Chat
								</a>
							</div>
						</Col>
					</Row>
				</Grid>
			</section>
		);
	}
}
