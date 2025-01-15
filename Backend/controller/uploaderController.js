const { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand, ListObjectsV2Command } = require('@aws-sdk/client-s3');
const dotenv = require('dotenv');
dotenv.config();

const s3 = new S3Client({
    region: 'auto',
    endpoint: process.env.R2_ENDPOINT,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const BUCKET_NAME = process.env.R2_BUCKET_NAME;

// Helper function to convert S3 stream to string
const streamToString = async (stream) => {
    const chunks = [];
    for await (const chunk of stream) {
        chunks.push(chunk);
    }
    return Buffer.concat(chunks).toString('utf-8');
};

// 1. Create a file inside a folder
const createFile = async (req, res) => {
    const { folder, fileName, content } = req.body;

    const params = {
        Bucket: BUCKET_NAME,
        Key: `${folder}/${fileName}`,
        Body: JSON.stringify(content),
        ContentType: 'application/json',
    };

    try {
        const command = new PutObjectCommand(params);
        await s3.send(command);
        res.status(201).send({ message: 'File created successfully' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// 2. Delete a file inside a folder
const deleteFile = async (req, res) => {
    const { folder, fileName } = req.body;

    const params = {
        Bucket: BUCKET_NAME,
        Key: `${folder}/${fileName}`,
    };

    try {
        const command = new DeleteObjectCommand(params);
        await s3.send(command);
        res.status(200).send({ message: 'File deleted successfully' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// 3. Update a file inside a folder (overwrite)
const updateFile = async (req, res) => {
    const { folder, fileName, content } = req.body;

    const params = {
        Bucket: BUCKET_NAME,
        Key: `${folder}/${fileName}`,
        Body: JSON.stringify(content),
        ContentType: 'application/json',
    };

    try {
        const command = new PutObjectCommand(params);
        await s3.send(command);
        res.status(200).send({ message: 'File updated successfully' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// 4. Read a file inside a folder
const readFile = async (req, res) => {
    const { folder, fileName } = req.query;

    const params = {
        Bucket: BUCKET_NAME,
        Key: `${folder}/${fileName}`,
    };

    try {
        const command = new GetObjectCommand(params);
        const data = await s3.send(command);
        const content = await streamToString(data.Body);
        res.status(200).send(JSON.parse(content));
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// 5. List files inside a folder
const listFiles = async (req, res) => {
    const { folder } = req.query;

    const params = {
        Bucket: BUCKET_NAME,
        Prefix: `${folder}/`,
    };

    try {
        const command = new ListObjectsV2Command(params);
        const data = await s3.send(command);

        const files = data.Contents?.map((item) => item.Key) || [];
        res.status(200).send(files);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// 6. List all folders
const listFolders = async (req, res) => {
    const params = {
        Bucket: BUCKET_NAME,
        Delimiter: '/',
    };

    try {
        const command = new ListObjectsV2Command(params);
        const data = await s3.send(command);

        const folders =
            data.CommonPrefixes?.map((prefix) => prefix.Prefix) || [];
        res.status(200).send(folders);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// 7. Duplicate a folder
const duplicateFolder = async (req, res) => {
    const { sourceFolder, targetFolder } = req.body;

    const listParams = {
        Bucket: BUCKET_NAME,
        Prefix: `${sourceFolder}/`,
    };

    try {
        const listCommand = new ListObjectsV2Command(listParams);
        const listData = await s3.send(listCommand);

        if (!listData.Contents || listData.Contents.length === 0) {
            return res
                .status(404)
                .send({ message: 'Source folder is empty or not found' });
        }

        const copyPromises = listData.Contents.map(async (item) => {
            const copyParams = {
                Bucket: BUCKET_NAME,
                CopySource: `${BUCKET_NAME}/${item.Key}`,
                Key: item.Key.replace(sourceFolder, targetFolder),
            };
            const copyCommand = new PutObjectCommand(copyParams);
            return s3.send(copyCommand);
        });

        await Promise.all(copyPromises);
        res.status(201).send({ message: 'Folder duplicated successfully' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// 8. Rename a folder
const renameFolder = async (req, res) => {
    const { sourceFolder, targetFolder } = req.body;

    const listParams = {
        Bucket: BUCKET_NAME,
        Prefix: `${sourceFolder}/`,
    };

    try {
        const listCommand = new ListObjectsV2Command(listParams);
        const listData = await s3.send(listCommand);

        if (!listData.Contents || listData.Contents.length === 0) {
            return res
                .status(404)
                .send({ message: 'Source folder is empty or not found' });
        }

        const copyAndDeletePromises = listData.Contents.map(async (item) => {
            const newKey = item.Key.replace(sourceFolder, targetFolder);

            const copyParams = {
                Bucket: BUCKET_NAME,
                CopySource: `${BUCKET_NAME}/${item.Key}`,
                Key: newKey,
            };
            const copyCommand = new PutObjectCommand(copyParams);
            await s3.send(copyCommand);

            const deleteParams = {
                Bucket: BUCKET_NAME,
                Key: item.Key,
            };
            const deleteCommand = new DeleteObjectCommand(deleteParams);
            return s3.send(deleteCommand);
        });

        await Promise.all(copyAndDeletePromises);
        res.status(200).send({ message: 'Folder renamed successfully' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// 9. Upload media files
const uploadFiles = async (req, res) => {
    const folder = req.body.folder || 'uploads';
    const files = req.files;

    if (!files || files.length === 0) {
        return res.status(400).send({ message: 'No files uploaded' });
    }

    try {
        const uploadPromises = files.map((file) => {
            const params = {
                Bucket: BUCKET_NAME,
                Key: `${folder}/${file.originalname}`,
                Body: file.buffer,
                ContentType: file.mimetype,
            };

            const command = new PutObjectCommand(params);
            return s3.send(command);
        });

        await Promise.all(uploadPromises);
        res.status(201).send({
            message: 'Files uploaded successfully',
            fileNames: files.map((file) => file.originalname),
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};


module.exports = {
    createFile,
    deleteFile,
    updateFile,
    readFile,
    listFiles,
    listFolders,
    duplicateFolder,
    renameFolder,
    uploadFiles,
};
