/*
this.AdminConfig = {
	name: Config.name,
	collections: {
		Authors: {
			color: 'blue',
			icon: 'users',
			tableColumns: [
				{
					label: 'English Name',
					name: 'english_name',
				},
			],
		},
		Editors: {
			color: 'blue',
			icon: 'user-secret',
			tableColumns: [
				{
					label: 'English Name',
					name: 'english_name',
				},
			],
		},
		Corpora: {
			color: 'blue',
			icon: 'university',
			tableColumns: [
				{
					label: 'Title',
					name: 'title',
				},
				{
					label: 'Language',
					name: 'language',
				},
			],
		},
		Languages: {
			color: 'blue',
			icon: 'university',
			tableColumns: [
				{
					label: 'Title',
					name: 'title',
				},
			],
		},
		Works: {
			color: 'blue',
			icon: 'book',
			extraFields: ['authors', 'editors'],
			tableColumns: [
				{
					label: 'Title',
					name: 'english_title',
				},
			],
			routes: {
				new: {
					waitOn() {
						return (
							Meteor.subscribe('authors')
							&& Meteor.subscribe('editors')
						);
					},
				},
				edit: {
					waitOn() {
						return (
							Meteor.subscribe('authors')
							&& Meteor.subscribe('editors')
						);
					},
				},
			},
		},
		Annotations: {
			color: 'blue',
			icon: 'pencil',
			tableColumns: [
				{
					label: 'User',
					name: 'user',
				},
				{
					label: 'Work',
					name: 'work',
				},
			],
		},

		Commentary: {
			color: 'blue',
			icon: 'comments-o',
			tableColumns: [
				{
					label: 'Work',
					name: 'work',
				},
				{
					label: 'N1',
					name: 'n1',
				},
				{
					label: 'N2',
					name: 'n2',
				},
				{
					label: 'N3',
					name: 'n3',
				},
			],
		},

		Translations: {
			color: 'blue',
			icon: 'globe',
			tableColumns: [
				{
					label: 'Work',
					name: 'work',
				},
				{
					label: 'N1',
					name: 'n1',
				},
				{
					label: 'N2',
					name: 'n2',
				},
				{
					label: 'N3',
					name: 'n3',
				},
			],
		},


		Entities: {
			color: 'blue',
			icon: 'users',
			tableColumns: [
				{
					label: 'English Name',
					name: 'english_name',
				},
			],
		},
	},
	dashboard: {
		homeUrl: '/admin',
	},
};
*/
