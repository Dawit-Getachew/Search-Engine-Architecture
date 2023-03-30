import { Client } from '@elastic/elasticsearch';
import config from 'config';
const elasticConfig = config.get('elastic');
const client = await new Client( {
    cloud: {
        id: elasticConfig.cloudID
    },
    auth: {
        username: elasticConfig.username,
        password: elasticConfig.password
    }
})
client.info()
    .then( response => console.log( response ) )
    .catch( error => console.error( error ) )

export default client;