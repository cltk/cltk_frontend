import React from 'react';
import { compose } from 'react-apollo';
import autoBind from 'react-autobind';

import TextEditor from '../../components/TextEditor';
import textDetailQuery from '../../graphql/queries/detail';
import textCreateMutation from '../../graphql/mutations/create';
import textUpdateMutation from '../../graphql/mutations/update';
import textRemoveMutation from '../../graphql/mutations/remove';


class TextEditorContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			collection: null,
			textGroup: '',
			work: '',
		};
		autoBind(this);
	}

	componentWillReceiveProps(nextProps) {
		let text = null;
		if (
				!this.state.collection
			&& nextProps.textQuery
			&& nextProps.textQuery.project
			&& nextProps.textQuery.project.text
		) {
			text = nextProps.textQuery.project.text;
			this.setState({
				collection: parseInt(text.ctsNamespace, 10),
				textGroup: text.textGroup,
				work: text.work,
			});
		}
	}

	handleSelectCollection(event, index, value) {
		this.setState({
			collection: value,
		});
	}

	handleSelectTextGroup(event, index, value) {
		this.setState({
			textGroup: value,
		});
	}

	handleSelectWork(event, index, value) {
		this.setState({
			work: value,
		});
	}

	handleSubmit(_values) {
		const values = {}; // Object.assign({}, _values);
		const { textCreate, textUpdate, router } = this.props;
		const { collection, textGroup, work } = this.state;


		values.ctsNamespace = collection;
		values.textGroup = textGroup;
		values.work = work;
		// remove unused values
		delete values.__typename;

		// create or update
		if ('_id' in _values) {
			values._id = _values._id;
			textUpdate(values)
				.then((response) => {
					router.replace(`/texts/${values._id}`);
				})
				.catch((err) => {
					console.error(err);
				});
		} else {
			textCreate(values)
				.then((response) => {
					router.replace('/texts/');
				})
				.catch((err) => {
					console.error(err);
				});
		}
	}

	handleRemove(textId) {
		const { textRemove, router } = this.props;

		textRemove(textId)
			.then((response) => {
				router.replace('/texts');
			})
			.catch((err) => {
				console.error(err);
			});
	}

	changeImageValue(coverImage) {
		this.setState({
			coverImage
		});
	}

	toggleSelectedItem(item) {
		const selectedItems = this.state.selectedItems.slice();

		if (selectedItems.some(selectedItem => selectedItem._id === item._id)) {
			selectedItems.splice(
				selectedItems.findIndex(selectedItem => selectedItem._id === item._id),
				1
			);
		} else {
			selectedItems.push(item);
		}

		this.setState({
			selectedItems,
		});
	}

	render() {
		const { collection, textGroup, work } = this.state;

		// Get text from query
		let text;
		if (
			this.props.textQuery
			&& this.props.textQuery.project
		) {
			text = this.props.textQuery.project.text;
		}

		return (
			<TextEditor
				onSubmit={this.handleSubmit}
				onRemove={this.handleRemove}
				initialValues={text}
				text={text}
				handleSelectCollection={this.handleSelectCollection}
				handleSelectTextGroup={this.handleSelectTextGroup}
				handleSelectWork={this.handleSelectWork}
				collection={collection}
				textGroup={textGroup}
				work={work}
			/>
		);
	}
}

export default compose(
	textCreateMutation, textUpdateMutation, textRemoveMutation,
	textDetailQuery,
)(TextEditorContainer);
