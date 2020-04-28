const {
    BigQuery
} = require('@google-cloud/bigquery');




const executeQuery = async (queryString) => {
        try {
            const bigquery = new BigQuery();
            const options = {
                query: queryString,
                location: 'EU',
            };
            // Run the query as a job
            const [job] = await bigquery.createQueryJob(options);
            // Wait for the query to finish
            const [rows] = await job.getQueryResults();
            return rows;
    
        } catch (e) {
            console.error(e);
            throw ("Error executing query in bq");
        }
}

const getNewEvents = async () => {
    const queryNewEvents = `SELECT offerId,eventType, count(distinct messageId ) as eventCount, max(createdAt) as timeLastClick 
        FROM \`${process.env.PROJECT_ID}.bcio_event_data.events\` as t1
        GROUP BY offerId, eventType
        HAVING max(createdAt) > cast(DATETIME_SUB(CURRENT_DATETIME(), INTERVAL 60 MINUTE) as datetime)
        `;
    try {
        return await executeQuery(queryNewEvents);
    } catch (error) {
        throw ("Error refreshing campaigns");
    }
}

const getNewErrors = async () => {
    const queryNewErrors = `
        SELECT count(campaignId) as count, campaignId FROM \`${process.env.PROJECT_ID}.bcio_error_data.errors\`
        WHERE _PARTITIONTIME BETWEEN TIMESTAMP_TRUNC(TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 1 MINUTE), DAY)
        AND TIMESTAMP_TRUNC(CURRENT_TIMESTAMP(), DAY)
        AND createdAt >= DATETIME_SUB(CURRENT_DATETIME(), INTERVAL 2 MINUTE) 
        GROUP BY campaignId
        `;
    try {
        return await executeQuery(queryNewErrors);
    } catch (error) {
        throw ("Error refreshing campaigns.");
    }
}

module.exports = {
    getNewEvents,
    getNewErrors
}
