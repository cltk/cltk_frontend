import React from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import './TextSelector.css';



class TextSelector extends React.Component {

	render() {
		const {
			collection, collections, collectionId, textGroupUrn, workUrn
		} = this.props;

		const styles = {
			selectList: {
				fontFamily: '"Freight Text W03 Book", Georgia, serif',
				fontSize: '22px',
				fontWeight: '100',
				color: '#222',
				padding: '10px',
				borderBottom: '2px solid #eee',
				lineHeight: '1.7em',
			},
			menuItem: {
				fontFamily: '"Freight Text W03 Book", Georgia, serif',
				fontSize: '22px',
				fontWeight: '100',
				color: '#222',
				padding: '10px',
				lineHeight: '1.7em',
			},
			selectedMenuItem: {
				color: '#039BE5',
			}
		};

		let textGroups = [];
		let works = [];
		if (collection) {
			if (collection.textGroups) {
				textGroups = collection.textGroups;
			}
			if (
				collection.textGroup
				&& collection.textGroup.works
			) {
				works = collection.textGroup.works;
			}
		}


		return (
			<div className="textSelector">
				<div className="textSelectorFormInputOuter">
					<div className="textSelectorSelectField">
						<SelectField
							floatingLabelText="Select Collection (CTS Namespace)."
							value={collectionId}
							onChange={this.props.handleSelectCollection}
							style={styles.selectList}
							selectedMenuItemStyle={styles.selectedMenuItem}
							fullWidth
						>
							{collections.map(collection => (
								<MenuItem
									key={collection.id}
									value={collection.id}
									primaryText={collection.title}
									style={styles.menuItem}
								/>
							))}
						</SelectField>
					</div>

					<span
						className="textSelectorFormHelp"
					>
						?
					</span>
				</div>

				<div className="textSelectorFormInputOuter">
					<div className="textSelectorSelectField">
						<SelectField
							floatingLabelText="Select Text Group."
							value={textGroupUrn}
							onChange={this.props.handleSelectTextGroup}
							style={styles.selectList}
							selectedMenuItemStyle={styles.selectedMenuItem}
							fullWidth
						>
							{textGroups.map(textGroup => (
								<MenuItem
									key={textGroup.urn}
									value={textGroup.urn}
									primaryText={textGroup.title}
									style={styles.menuItem}
								/>
							))}
						</SelectField>
					</div>

					<span
						className="textSelectorFormHelp"
					>
						?
					</span>
				</div>

				<div className="textSelectorFormInputOuter">
					<div className="textSelectorSelectField">
						<SelectField
							floatingLabelText="Select Work."
							value={workUrn}
							onChange={this.props.handleSelectWork}
							style={styles.selectList}
							selectedMenuItemStyle={styles.selectedMenuItem}
							fullWidth
						>
							{works.map(work => (
								<MenuItem
									key={work.urn}
									value={work.urn}
									primaryText={work.english_title}
									style={styles.menuItem}
								/>
							))}
						</SelectField>
					</div>

					<span
						className="textSelectorFormHelp"
					>
						?
					</span>
				</div>

			</div>
		);
	}
}

TextSelector.propTypes = {
	collection: PropTypes.object,
	collections: PropTypes.array,
};

TextSelector.defaultProps = {
	collection: null,
	collections: [],
};


export default TextSelector;
