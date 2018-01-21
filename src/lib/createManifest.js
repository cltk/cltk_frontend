const createManifest = async (manifest) => {
	try {
		const res = await fetch(`${process.env.REACT_APP_SERVER}/createManifest`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(manifest)
		});
		return await res.json();
	} catch (err) {
		throw err;
	}
};

export default createManifest;
