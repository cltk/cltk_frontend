import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Editor from 'draft-js-plugins-editor';
import createInlineToolbarPlugin, { Separator } from 'draft-js-inline-toolbar-plugin';
import createMentionPlugin from 'draft-js-mention-plugin';
import createSingleLinePlugin from 'draft-js-single-line-plugin';
import createVideoPlugin from 'draft-js-video-plugin';
import createImagePlugin from 'draft-js-image-plugin';
import LinkButton from '/imports/ui/components/editor/addComment/LinkButton';

import {
	ItalicButton,
	BoldButton,
	UnderlineButton,
	UnorderedListButton,
	OrderedListButton,
	BlockquoteButton,
} from 'draft-js-buttons';

import VideoAdd from './AddButton/VideoAdd';
import ImageAdd from './AddButton/ImageAdd';
import Suggestions from './Suggestions/Suggestions';


import './DraftEditorInput.css';


const singleLinePlugin = createSingleLinePlugin();
const inlineToolbarPlugin = createInlineToolbarPlugin({
	structure: [
		BoldButton,
		ItalicButton,
		UnderlineButton,
		Separator,
		UnorderedListButton,
		OrderedListButton,
		BlockquoteButton,
		LinkButton,
	]
});

class DraftEditorInput extends Component {

	static propTypes = {
		// props recieved from formsy HOC:
		onChange: PropTypes.func.isRequired,
		spellcheck: PropTypes.bool,
		placeholder: PropTypes.string.isRequired,
		keywordsMention: PropTypes.bool,
		singleLine: PropTypes.bool,
		stripPastedStyles: PropTypes.bool,
		mediaOn: PropTypes.bool,
		disableMentions: PropTypes.bool,
		plugins: PropTypes.array,
		label: PropTypes.string,
		editorState: PropTypes.object.isRequired,
		InlineToolbar: PropTypes.func // Remember that if you want use InlineToolbar, you also need plugin for it
	};
	constructor(props) {
		super(props);

		this.mentionPlugin = createMentionPlugin();
		this.keywordPlugin = createMentionPlugin({mentionPrefix: '#', mentionTrigger: '#'});
		this.videoPlugin = createVideoPlugin();
		this.imagePlugin = createImagePlugin();
		this.onEditorChange = this.onEditorChange.bind(this);
	}
	onEditorChange(editorState) {
		this.props.onChange(editorState);
	}
	getPlugins() {
		let ret = this.props.disableMentions ? [] : [this.mentionPlugin, this.keywordPlugin];
		if (this.props.plugins)			{ ret = ret.concat(this.props.plugins); }
		ret = !this.props.InlineToolbar ? [inlineToolbarPlugin].concat(ret) : ret; // Is there any custom InlineToolbar
		ret = this.props.singleLine ? ret.concat([singleLinePlugin]) : ret;
		ret = this.props.mediaOn ? ret.concat([this.videoPlugin, this.imagePlugin]) : ret;
		return ret;
	}
	getPlainAttributes() {
		const ret = {
			spellCheck: this.props.spellcheck === true,
			stripPastedStyles: this.props.stripPastedStyles === true
		};
		if (this.props.singleLine) {
			ret.blockRenderMap = singleLinePlugin.blockRenderMap;
		}
		return ret;
	}
	render() {
		const plugins = this.getPlugins();
		const InlineToolbar = this.props.singleLine ? undefined : (this.props.InlineToolbar || inlineToolbarPlugin.InlineToolbar);
		const plainAttributes = this.getPlainAttributes();
		return (
			<div>
				{this.props.label !== undefined ? (<div >{this.props.label}</div>) : ''}
				<div className="draft-editor-input">
					<Editor
						editorState={this.props.editorState}
						onChange={this.onEditorChange}
						plugins={plugins}
						{...plainAttributes}
						placeholder={this.props.placeholder}
					/>
					{ this.props.disableMentions === true ? '' :
					(<Suggestions
						mentionPlugin={this.mentionPlugin}
						keywordPlugin={this.keywordPlugin}
					/>)
					}
				</div>
				{ InlineToolbar !== undefined ?
					(<div className="inline-toolbar-wrap">
						<InlineToolbar />
					</div>) : ''
				}
				{ this.props.mediaOn ?
					(<div className="draft-button-container">
						<ImageAdd
							editorState={this.props.editorState}
							onChange={this.onEditorChange}
							label="Add image"
							modifier={this.imagePlugin.addImage}
						/>
						<VideoAdd
							editorState={this.props.editorState}
							onChange={this.onEditorChange}
							label="Add video"
							modifier={this.videoPlugin.addVideo}
						/>
					</div>) : ''
				}
			</div>
		);
	}
}

export default DraftEditorInput;
