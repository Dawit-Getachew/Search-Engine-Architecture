'use strict'

import fs from 'fs';
import { Client } from '@elastic/elasticsearch';
import config from 'config';
const elasticConfig = config.get('elastic');

const client = new Client({
    cloud: { id: elasticConfig.cloudID },
    auth: {
        username: elasticConfig.username,
        password: elasticConfig.password
    }
})
client.info()
    .then( response => console.log( response ) )
    .catch( error => console.error( error ) )

let documents = JSON.parse(fs.readFileSync('./db.json', 'utf8'));
documents = documents.data;
async function run () {
    // Let's start by indexing some data in bulk
    console.log("Indexing data... might take time")
    for (const document of documents){
        await client.index( {
            index: 'sample-search-engine',
            document: document
        })
    }

    await client.indices.refresh({ index: 'sample-search-engine' })
}

run().catch(console.log)