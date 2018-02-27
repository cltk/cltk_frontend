import React from 'react';

class CoverBackground extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			transform: 'translate(0%, 0%)',
		};
	}

	translateBackground(e) {
		const { reactsToMouse } = this.props;

		if (reactsToMouse) {
			let x = e.pageX / window.innerHeight;
			x *= -2;
			let y = e.pageY / window.innerHeight;
			y *= -4;

			this.setState({
				transform: `translate(${x}%, ${y}%)`,
			});
		}
	}

	render() {
		const { transform } = this.state;

		return (
			<div
				className="cover-background"
				onMouseMove={this.translateBackground.bind(this)}
				style={{
					transform,
				}}
			>
				{this.props.children}
			</div>
		);
	}
}

export default CoverBackground;
