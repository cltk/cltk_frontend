import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RichUtils, EditorState } from 'draft-js';
import unionClassNames from 'union-class-names';
import { debounce } from 'throttle-debounce';

// components:
import LinkButtonDialog from './LinkButtonDialog';

// helpers:
import linkDecorator from './linkDecorator';

/*
 *	helper
 */
const preventBubblingUp = (event) => { event.preventDefault(); };



class LinkButton extends Component {

	static propTypes = {
		getEditorState: PropTypes.func.isRequired,
		setEditorState: PropTypes.func.isRequired,
		theme: PropTypes.shape({
			button: PropTypes.string,
			active: PropTypes.string,
			buttonWrapper: PropTypes.string
		}).isRequired,
	}

	constructor(props) {
		super(props);

		this.state = {
			linkModalOpen: false,
			linkValue: null,
		};

		// methods:
		this.showLinkModal = this.showLinkModal.bind(this);
		this.hideLinkModal = this.hideLinkModal.bind(this);
		this.handleAddLink = this.handleAddLink.bind(this);
		this.styleIsActive = this.styleIsActive.bind(this);
		this.handleRemoveLink = this.handleRemoveLink.bind(this);
		this.onValueChange = debounce(500, this.onValueChange.bind(this));
	}

	showLinkModal(event) {
		event.preventDefault();

		const { getEditorState } = this.props;


		const editorState = getEditorState();
		const contentState = editorState.getCurrentContent();
		const selection = editorState.getSelection();

		if (!selection.isCollapsed()) {

			const startKey = editorState.getSelection().getStartKey();
			const startOffset = editorState.getSelection().getStartOffset();
			const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
			const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);

			let url = '';
			if (linkKey) {
				const linkInstance = contentState.getEntity(linkKey);
				url = linkInstance.data.link;
			}

			this.setState({
				linkModalOpen: true,
				linkValue: url,
			});
		}
	}

	hideLinkModal(event) {
		if (event) event.preventDefault();
		this.setState({
			linkModalOpen: false,
			linkValue: null,
		});
	}

	handleAddLink() {
		const { getEditorState, setEditorState } = this.props;
		const { linkValue } = this.state;

		const editorState = getEditorState();
		const contentState = editorState.getCurrentContent();
		const contentStateWithEntity = contentState.createEntity(
			'LINK',
			'MUTABLE', {
				// don't use url, as it will cause redirect on click
				link: linkValue
			}
		);
		const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

		const newEditorState = EditorState.set(editorState, {
			currentContent: contentStateWithEntity,
			decorator: linkDecorator,
		});

		setEditorState(RichUtils.toggleLink(
			newEditorState,
			newEditorState.getSelection(),
			entityKey
		));

		this.hideLinkModal();
	}

	handleRemoveLink() {
		const { getEditorState, setEditorState } = this.props;

		const editorState = getEditorState();
		const selection = editorState.getSelection();

		if (!selection.isCollapsed()) {
			setEditorState(RichUtils.toggleLink(editorState, selection, null));
		}

		this.hideLinkModal();
	}

	onValueChange(event, newValue) {
		this.setState({
			linkValue: newValue,
		});
	}

	styleIsActive() {
		const { getEditorState } = this.props;

		const editorState = getEditorState();
		const contentState = editorState.getCurrentContent();
		const selection = editorState.getSelection();

		if (!selection.isCollapsed()) {

			const startKey = editorState.getSelection().getStartKey();
			const startOffset = editorState.getSelection().getStartOffset();
			const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
			const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);

			let url = '';
			if (linkKey) {
				const linkInstance = contentState.getEntity(linkKey);
				url = linkInstance.data.link;
				if (url) return true;
			}
		}
		return false;
	}

	render() {

		const { theme } = this.props;
		const { linkModalOpen, linkValue } = this.state;

		const className = this.styleIsActive() ? unionClassNames(theme.button, theme.active) : theme.button;

		return (
			<div
				className={theme.buttonWrapper}
				onMouseDown={preventBubblingUp}
			>
				<button
					className={className}
					onClick={this.showLinkModal}
					type="button"
				>
					<svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
						<g>
							<path
								d="M18.101,10.747l-3.771,3.771c-1.042,1.042-2.729,1.042-3.771,0l-1.257-1.257l1.257-1.257l1.257,1.257
								c0.347,0.347,0.911,0.347,1.257,0l3.771-3.771c0.346-0.347,0.346-0.911,0-1.258l-1.257-1.257c-0.347-0.346-0.911-0.346-1.257,0
								l-1.346,1.347c-0.624-0.367-1.333-0.525-2.036-0.478l2.125-2.126c1.042-1.041,2.73-1.041,3.771,0l1.257,1.257
								C19.143,8.017,19.143,9.706,18.101,10.747z M10.648,15.686l-1.346,1.345c-0.347,0.347-0.911,0.346-1.257,0l-1.257-1.257
								c-0.347-0.347-0.347-0.91,0-1.257l3.771-3.771c0.346-0.346,0.911-0.346,1.257,0l1.257,1.257l1.257-1.257L13.073,9.49
								c-1.042-1.041-2.729-1.041-3.771,0l-3.771,3.771c-1.042,1.042-1.042,2.73,0,3.771l1.257,1.257c1.041,1.042,2.729,1.042,3.771,0
								l2.125-2.125C11.982,16.211,11.275,16.053,10.648,15.686z"
							/>
						</g>
					</svg>
				</button>
				<LinkButtonDialog
					open={linkModalOpen}
					linkValue={linkValue}
					handleClose={this.hideLinkModal}
					handleAddLink={this.handleAddLink}
					handleRemoveLink={this.handleRemoveLink}
					onValueChange={this.onValueChange}
				/>
			</div>
		);
	}
}

export default LinkButton;
export { LinkButtonDialog };
