
const { Storage } = require('@google-cloud/storage');
const uuid = require('uuid');

const getSignedUrl = async (imageInfo) => {
    if (!imageInfo.filetype){
        imageInfo.filetype='png';
    }
    const SECONDS = 1000; 
    const URL_VALID_DURATION = 30000 * SECONDS;

    let gcs = new Storage();

    let filename = imageInfo.uuid;
    let extension = imageInfo.filetype.split('/').pop();
    if (imageInfo.height&&imageInfo.width){
        filename = `${filename}__${imageInfo.height}__${imageInfo.width}.${extension}`
    }else{
        filename = `${filename}.${extension}`
    }

    var file = gcs.bucket(process.env.BUCKET_NAME).file(filename);
    //TODO Save uuid to have a registry of the pictures than can be upload for delete

    var url = await file.getSignedUrl({
        action: 'write',
        expires: Date.now() + URL_VALID_DURATION,
        contentType: `${imageInfo.filetype}`
    });
    let responseObj = {};
    responseObj.putUrl = url[0];
    
    responseObj.getUrl = `https://storage.googleapis.com/${process.env.BUCKET_NAME}/${filename}`
    return responseObj;    
}

module.exports = {
    getSignedUrl
}


