const redis = require("redis");
const bluebird = require("bluebird");
bluebird.config({
    longStackTraces: true
})

bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

let client;

const openConnection = async () => {
	await new Promise((resolve, reject) => {
        client = redis.createClient({
			db: process.env.REDIS_DB,
			host: process.env.REDIS_HOST,
			port: process.env.REDIS_PORT,
		});
		client.on("error", function (err) {
			console.log("Error " + err);
			reject('Connection error')
		});
		client.on("connect", function (err) {
			resolve();
		});
    });
}

const closeConnection = async () => {
    await new Promise((resolve) => {
        client.quit(() => {
            resolve();
        });
    });
}

const getPrefix = () => {
	return (process.env.NODE_ENV !== 'pro') ? process.env.NODE_ENV + ':' : '';
}

const setCampaignData = async(pageId, campaignData) => {
    let ttl = 1200;
    try{
       ttl =  Number(process.env.REDIS_TTL)
    }catch (error){
        console.error("error in REDIS_TTL env var, use defatul value")
    }
    await client.setAsync(getPrefix() + 'ActiveCampaignsByPage:' + pageId, JSON.stringify(campaignData), 'EX', ttl)
    return "ok";
}

module.exports = {
    setCampaignData,
    closeConnection,
    openConnection
}