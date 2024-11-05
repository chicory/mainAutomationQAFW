const { BigQuery } = require('@google-cloud/bigquery');
const datasetLocation = 'US';

// Creates a BigQuery client
const bigQueryClient = new BigQuery({
    keyFilename: 'bigquery-sa.json',
    projectId: 'YOUR_GCP_PROJECT_ID',
    location: datasetLocation
});

export const BigQueryManager = {
    createDataset: async (datasetName) => {
        const [dataset] = await bigQueryClient.createDataset(datasetName, location);
        console.log(`Dataset '${dataset.id}' created.`);
        return dataset.id;
    },
    getData: async (projectId, datasetId, tableId) => {
        const query = `
            SELECT * from \`${projectId}.${datasetId}.${tableId}\`
            LIMIT 100
        `;
        const options = {
            query: query,
            location,
        };

        // Run the query as a job
        const [job] = await bigQueryClient.createQueryJob(options);
        console.log(`Job '${job.id}' started.\n`);

        // Wait for the query to finish
        const [rows] = await job.getQueryResults();

        // Print the results
        console.log('Resulted Rows:');
        rows.forEach(row => console.log(row));

        return rows;
    }
};