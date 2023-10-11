import fs from 'fs';

const fsPromise = fs.promises;

async function readMetaverseData() {
    try {
        const data = await fsPromise.readFile(
            __dirname + '../../../../metaverse_data.json',
            'utf8'
        );
        const metaverseData = JSON.parse(data);
        return metaverseData;
    } catch (error) {
        console.error('Error while reading data:', error);
        throw error;
    }
}

export default readMetaverseData;
