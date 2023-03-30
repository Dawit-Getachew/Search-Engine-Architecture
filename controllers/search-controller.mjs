import client from "../services/elasticsearch.mjs";
import translate from "translate";
await client.info()

async function run(term){
    const search = await client.search( {
        index: 'sample-search-engine',
        body: {
            from: 0,
            size: 1000,
            query: {
                bool: {
                    should: [
                        {match_phrase_prefix: {title: `${term}`}},
                        {prefix: {title: `${term}.*`}},
                        {match: {title: `${term}`}},
                        {fuzzy: { title: { value: `${term}`, "fuzziness": 2, "prefix_length": 0 } } },
                        {match_phrase_prefix: {"tags": `${term}`}},
                        {regexp: {tags: {value:`${term}.`} } },
                        {match: {tags: `${term}`}},
                        {fuzzy: { tags: { value: `${term}`, "fuzziness": "auto", "prefix_length": 0 } } },
                    ]
                }
            }
        }
    })
    return search.hits.hits
}








//@desc Get All Contact
//@route GET /api/contacts
//@access private
const searchFunction = async (req, res) => {
    const {query} = req.body;
    console.log(query)
    if(!query){
        res.status(400);
        throw new Error("Query field is mandatory!")
    }

    const search = run(query.toString()).catch(console.log)
    let searchValues = await Promise.resolve(search)

    if(searchValues){
        res.status(201).json({success: true, data: searchValues})
    }else{
        res.status(400)
        throw new Error("Search query is not found!")
    }
};



// @desc delete Contact
// @route DELETE /api/contacts:id
// @access private
//
const sortResult = async (req, res) => {
    const {query} = req.body;
    console.log(query)
    if(!query){
        res.status(400);
        throw new Error("Query field is mandatory!")
    }
    const search = run(query.toString()).catch(console.log)
    let searchValues = await Promise.resolve(search)

    if(searchValues){
        searchValues.sort((a, b) => (a._source.position > b._source.position) ? 1 : -1)
        res.status(201).json({success: true, data: searchValues})
    }else{
        res.status(400)
        throw new Error("Search query is not found!")
    }

};




//@desc Update Contact
//@route PUT /api/contacts:id
//@access private

const translateLanguage = async (req, res) => {
    const {query} = req.body;
    console.log(query)
    if(!query){
        res.status(400);
        throw new Error("Query field is mandatory!")
    }

    const text = await translate(query, {from: "es", to:"en"});
    const search = run(text).catch(console.log)
    console.log(text)
    let searchValues = await Promise.resolve(search)

    if(searchValues){
        res.status(201).json({success: true, data: searchValues})
    }else{
        res.status(400)
        throw new Error("Search query is not found!")
    }
}



export { searchFunction, sortResult, translateLanguage }