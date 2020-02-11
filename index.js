import config from './config.json';
import * as uuid from 'uuid';
import fs from 'fs';
import path from 'path';
import readline from 'readline';

const readFile = (filePath) => {
    try {
        return JSON.parse(fs.readFileSync(filePath, (error) => {
            if (error) {
                console.error('An error occured', error);
            } else {
                console.log('New Json file made!');
            }
        }))
    } catch (e) {
        throw e;
    }
}

const ensureDirectoryExistence = (filePath) => {
    const dirname = path.dirname(filePath);
    console.log(dirname);
    if (fs.existsSync(dirname)) {
        return true;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
}

const createFile = (filePath, fileContent) => {
    fs.writeFile(filePath, fileContent, (error) => {
        if (error) {
            console.error('An error occured', error);
        } else {
            console.log('New Json file made!');
        }
    })
}

const updateUUID = (jsonRealm) => {
    try {
        return JSON
            .stringify(jsonRealm)
            .replace(
                new RegExp('(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}', 'g'),
                () => uuid.default.v4()
            );
    } catch (e) {
        throw e;
    }
}

const updateRealId = (jsonReal, newRealmId) => {
    try {
        jsonReal.id = newRealmId;
    } catch (e) {
        throw e;
    }
}

const updateRealName = (jsonReal, newRealmName) => {
    try {
        jsonReal.realm = newRealmName;
    } catch (e) {
        throw e;
    }
}



const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Quel est le nom du nouveau royaume ? ', (answer) => {
    var newRealm = answer;
    if(newRealm === "") {
        newRealm = config.defaultRealId + Date.now();
    }

    console.log('Create new setting for realm id: ' + newRealm);
    console.log('Create new setting for realm name: ' + newRealm);

    const originalJsonRealm = readFile(config.originalFilePath);

    updateRealId(originalJsonRealm, newRealm);

    updateRealName(originalJsonRealm, newRealm);

    ensureDirectoryExistence(config.defaultDestionationFilePath);

    createFile(config.defaultDestionationFilePath, updateUUID(originalJsonRealm));
    rl.close()

});