import React from 'react';
import { Field, reduxForm } from 'redux-form';

import './SearchTools.css';


const SearchTools = props => {
	const { handleSubmit, pristine, submitting } = props
	return (
		<form
			className="searchTools"
			onSubmit={handleSubmit}
		>
			<Field
				name="textsearch"
				component="input"
				type="text"
				placeholder="Search . . ."
				/>
			<div className="searchSelect">
				<label>
						Language
				</label>
				<Field
					name="language"
					component="select"
					>
					<option />
					{props.languages.map(language => (
						<option
							key={language.id}
							value={language.slug}
							>
							{language.title}
						</option>
						))}

				</Field>
			</div>
			<button
				type="submit"
				disabled={pristine || submitting}
				>
          Submit
			</button>
		</form>
	);
}

export default reduxForm({
	form: 'SearchTools',
})(SearchTools);
