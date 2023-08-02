const test = require('tape');
const fs = require('fs');

const IMDB_regex = /^(tt)\d{7}$/;

function isJsonString(str) {
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        return false;
    }
}

function checkFileExists(filePath, t, callback) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            t.fail(`The file ${filePath} should exist`);
            t.end();
        } else {
            callback(data);
        }
    });
}

function checkValidJson(data, t, callback) {
    t.ok(isJsonString(data), `The file should be a valid JSON file`);
    if (isJsonString(data)) {
        callback(JSON.parse(data));
    } else {
        t.end(); // Early return if the JSON is not valid
    }
}

function checkMeta(jsonData = [], t) {
    t.ok(Array.isArray(jsonData), 'JSON data should be an array');

    const errors = [];

    jsonData.forEach((element, index) => {
        let isValidResult = false;
        if (typeof element === 'string') {
            isValidResult = IMDB_regex.test(element);
        } else if (typeof element === 'object') {
            isValidResult = IMDB_regex.test(element.imdb_id) || IMDB_regex.test(element.id);
        }

        if (!isValidResult) {
            errors.push(index);
        }
    });

    if (errors.length > 0) {
        t.fail(`Invalid IMDb ID at index(s) ${errors.join(', ')}`);
    } else {
        t.ok(!errors.length, 'Each element in JSON should contain a valid IMDb ID');
    }

}

function checkStreams(jsonData, t) {
    t.ok(Array.isArray(jsonData), 'JSON data should be an array');

    const regex = /^(tt)\d{7}$/; // Replace with your actual regex pattern
    const errors = [];
    jsonData.forEach((element, index) => {
        let isValidResult = false;
        if (typeof element === 'object') {
            isValidResult = regex.test(element.imdb_id) || regex.test(element.id);
        } else {
            errors.push(`Element is not an Object at index ${index}`);
            return;
        }

        if (!IMDB_regex.test(element.id)) {
            errors.push(`Element id should be a valid IMDB ID at index ${index}`);
            return;
        }
        if (!element.url && !element.infoHash && !element.ytId && !element.externalUrl) {
            errors.push(`Element doesn't not contain a stream source at index ${index}`);
            return;
        }

        if (!isValidResult) {
            errors.push(`Invalid IMDb ID at index ${index}`);
        }

    });

    if (errors.length > 0) {
        t.fail(errors.join('\n'));
    } else {
        t.ok(!errors.length, 'Each element in JSON should contain a stream object');
    }
}

function JsonTest(filePath, t, type) {
    t.test(`Checking ${filePath}`, (fileTest) => {
        checkFileExists(filePath, fileTest, (data) => {
            checkValidJson(data, fileTest, (jsonData) => {
                if (type == 'meta') checkMeta(jsonData, fileTest);
                if (type == 'stream') checkStreams(jsonData, fileTest)
                fileTest.end();
            });
        });
    });
}


test('Test JSON files', (t) => {
    const includeMetaFile = 'include/meta.json';
    const includeStreamsFile = 'include/streams.json';
    const excludeMetaFile = 'exclude/meta.json';

    JsonTest(excludeMetaFile, t, 'meta');
    JsonTest(includeMetaFile, t, 'meta');
    JsonTest(includeStreamsFile, t, 'stream');

    t.end();
});
