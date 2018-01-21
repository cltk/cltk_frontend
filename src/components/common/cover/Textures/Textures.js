import React from 'react';
import * as d3 from 'd3';
import textures from 'textures';



class Textures extends React.Component {

	componentDidMount() {
		let width = window.innerWidth * 1.2;
		let height = window.innerHeight * 1.2;
		if (height < 500) {
			height = 500;
		}

		const svg = d3
			.select('#textures')
			.append('svg')
			.attr('width', width)
			.attr('height', height)
			;

		const texture = textures
			.lines()
			.thinner()
			.lighter()
			.orientation('vertical')
			.stroke('#ddd')
			;

		svg.call(texture);

		svg
			.append('rect')
			.attr('width', width)
			.attr('height', height)
			.style('fill', texture.url());
	}

	render() {
		return (
			<div
				id="textures"
			/>
		);
	}
}

export default Textures;
