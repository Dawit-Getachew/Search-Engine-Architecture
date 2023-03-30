'use strict'

import { createServer } from 'http';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config()
import errorHandler from './middleware/errorHandler.mjs';


const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use('/api/search', require('./routes/search-route.mjs'));
app.use(errorHandler);


const server = createServer( app );
async function startServer(){
    server.listen( PORT, () => {
        console.log( `Server listening on port ${PORT}` )
    } );
}





startServer()
    .then( () => {
        console.log( 'Server Started' )
    } )
    .catch( error => {
        console.error( error );
    } );










// async function run(){
//
// // Let's search using the search API
// //     const result = await client.search( {
// //         index: 'sample-search-engine',
// //         body: {
// //             from: 0,
// //             size: 200,
// //             query: {
// //                 fuzzy: {
// //                     title: {
// //                         value: 'circu',
// //                         fuzziness: "AUTO",
// //                         max_expansions: 50,
// //                         prefix_length: 0,
// //                         transpositions: true,
// //                         rewrite: "constant_score",
// //                     },
// //                 },
// //             },
// //             sort: {
// //                 position: "asc"
// //             }
// //         }
// //     } )
// //         console.log( `fuzzy: ${result.hits.hits.length}` )
// //
// //     const matchResult = await client.search( {
// //         index: 'sample-search-engine',
// //         body: {
// //             from: 0,
// //             size: 200,
// //             query: {
// //                 match: {
// //                     title: "circu"
// //                 },
// //             },
// //             sort: {
// //                 position: "asc"
// //             }
// //         }
// //     } )
// //     console.log( `match: ${matchResult.hits.hits.length}` )
// //
// //
// //     const prefixResult = await client.search( {
// //         index: 'sample-search-engine',
// //         body: {
// //             from: 0,
// //             size: 200,
// //                 query: {
// //                     prefix : { title: "digital" }
// //                 }
// //             }
// //         })
// //     let test = Object.values(prefixResult.hits.hits[0])
// //     console.log( `prefix: ${prefixResult.hits.hits[0]}` )
// //
// //
// //
// //
// //     const reqexpResult = await client.search( {
// //         index: 'sample-search-engine',
// //         body: {
// //             query: {
// //                 regexp: {
// //                     title: {
// //                         value: "circu.*",
// //                         flags: "ALL",
// //                         case_insensitive: true,
// //                         max_determinized_states: 10000,
// //                         rewrite: "constant_score"
// //                     }
// //                 }
// //             }
// //         }
// //     })
// //     console.log( `regexp: ${reqexpResult.hits.hits}` )
// //
// //     const matchPhrasePrefix = await client.search( {
// //         index: 'sample-search-engine',
// //         body: {
// //             query: {
// //                 match_phrase_prefix: {
// //                     title: "circu.*"
// //                 }
// //             }
// //         }
// //     })
// //     console.log( `matchPrasePrefix: ${matchPhrasePrefix.hits.hits}` )
//
//
//
// }

// run().catch( console.log )
