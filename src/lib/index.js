// @flow

export const concatStartAndEnd = ({
	start,
	startOffset,
	end,
	endOffset,
}) => (`${start}-${startOffset}-${end}-${endOffset}`);

export const splitStartAndEnd = ({ startAndEnd }) => {
	const split = startAndEnd.split('-');

	return {
		start: split[0],
		startOffset: split[1],
		end: split[2],
		endOffset: split[3],
	};
};
