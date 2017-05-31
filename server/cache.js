export class Cache {
	constructor(name, ttl = 1800) {
		this.collection = new Mongo.Collection(name);
		this.collection._ensureIndex({ key: 1 });
		this.collection._ensureIndex({ createdAt: 1 }, { expireAfterSeconds: ttl });
	}

	get(key) {
		const result = this.collection.findOne({ key }, {
			_id: false,
			value: true,
		}) || {};

		return result.value;
	}

	set(key, value) {
		this.collection.insert({
			createdAt: new Date(),
			key,
			value,
		});
	}

	unset(key) {
		this.collection.remove({ key });
	}
}

const cache = new Cache(process.env.CACHE_NAME || 'cache');

export default cache;
