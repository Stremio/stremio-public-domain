const meta_exclude = require('./exclude/meta.json');
const meta_include = require('./include/meta.json');
const streams_include = require('./include/streams.json');


return {
    include: {
        meta: meta_include,
        stream: streams_include
    },
    exclude: meta_exclude
}