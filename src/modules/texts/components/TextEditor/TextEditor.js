import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';


import TextSelectorContainer from '../../containers/TextSelectorContainer';


import './TextEditor.css';


class TextEditor extends React.Component {

	render() {
		const { text, collection, textGroup, work } = this.props;

		return (
			<div className="textEditor">

				<h1>{text ? 'Edit this Text included with your project' : 'Add a Text to your project'}</h1>

				<form
					className="textEditorForm"
					onSubmit={this.props.handleSubmit}
				>

					<TextSelectorContainer
						collectionId={collection}
						textGroupUrn={textGroup}
						workUrn={work}
						handleSelectCollection={this.props.handleSelectCollection}
						handleSelectTextGroup={this.props.handleSelectTextGroup}
						handleSelectWork={this.props.handleSelectWork}
					/>

					<button
						type="submit"
						className={`
							textEditorButton
						`}
					>
						Save
					</button>
				</form>
			</div>
		);
	}
}

TextEditor.propTypes = {
	text: PropTypes.object,
};

TextEditor.defaultProps = {
	text: null,
};

export default reduxForm({
	form: 'TextEditor',
})(TextEditor);
