import { v2 as cloudinary } from 'cloudinary';
async function uploadFile(files) {
    const uploadedFiles = [];
    for (const file of files) {
        const reslut = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({
                folder: "marketplace",
                allowed_formats: ["jpg", "png", "webp",],

            }, (erro, data) => {
                if (erro) reject(erro)
                resolve(data)
            }).end(file.buffer);
        })

        uploadedFiles.push(reslut.url)
    }

    return uploadedFiles;

}

export default uploadFile;