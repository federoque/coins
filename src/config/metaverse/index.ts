// import fs from 'fs';

// const fsPromise = fs.promises;

// async function readMetaverseData() {
//     try {
//         const data = await fsPromise.readFile(
//             __dirname + '../../../../metaverse_data.json',
//             'utf8'
//         );
//         const metaverseData = JSON.parse(data);
//         return metaverseData;
//     } catch (error) {
//         console.error('Error while reading data:', error);
//         throw error;
//     }
// }

// export default readMetaverseData;

import path from 'path';
import fs from 'fs';

const fsPromise = fs.promises;

async function readMetaverseData() {
    try {
        const filePath = path.join(__dirname, '../../../metaverse_data.json');
        const data = await fsPromise.readFile(filePath, 'utf8');
        const metaverseData = JSON.parse(data);
        return metaverseData;
    } catch (error) {
        console.error('Error while reading data:', error);
        throw error;
    }
}

export default readMetaverseData;
