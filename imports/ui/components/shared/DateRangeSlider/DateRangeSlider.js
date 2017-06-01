import React from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'throttle-debounce';

class DateRangeSlider extends React.Component {

	componentDidMount() {
		$('#date-range').ionRangeSlider({
			type: 'double',
			min: this.props.min,
			max: this.props.max,
			grid: true,
			postfix: '',
			values_separator: ' to ',
			onChange: debounce(500, this.props.handleChangeDate),

		});
	}

	render() {
		return (
			<div id="date-range" />
		);
	}
}

DateRangeSlider.propTypes = {
	handleChangeDate: PropTypes.func.isRequired,
	min: PropTypes.number,
	max: PropTypes.number,
};

export default DateRangeSlider;
