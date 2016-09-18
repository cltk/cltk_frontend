import { debounce } from 'throttle-debounce';
import 'ion-rangeslider/js/ion.rangeSlider.js';
import 'ion-rangeslider/css/ion.rangeSlider.css';
import 'ion-rangeslider/css/ion.rangeSlider.skinNice.css';

DateRangeSlider = React.createClass({

	propTypes: {
		handleChangeDate: React.PropTypes.func.isRequired,
		min: React.PropTypes.number,
		max: React.PropTypes.number,
	},

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
	},

	render() {
		return (
			<div id="date-range" />
		);
	},

});
