
const fs = require("fs");
const path = require("path");
const config = require("../util/config");
const withErrorHandling = require("../middlewares/withErrorHandling");
const multer = require("multer");

const folderPath = path.join(__dirname, "..", config.landFilesFolder);

if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, {recursive:true});
}

const storage = multer.diskStorage({
    destination:(req, file, cb) =>{
        const dist = path.join(folderPath, req.params.idLand);
        if(!fs.existsSync(dist)) {
            fs.mkdirSync(dist, {recursive:true});
        }
        cb(null, dist)
    },
    filename:(req, file, cb) => {
        cb(null, path.parse(file.originalname).name + path.extname(file.originalname))
    }
});


const upload = multer({
    storage:storage,
    fileFilter: (req, file, cb) => {
        if (req.headers['content-length'] > config.fileMaxSize) {
            cb(null, false);
        } else {
            cb(null, true);
        }
  }
});

exports.upload = upload;

exports.getFile = withErrorHandling(async (req, res) => {
    const {idLand, filename} = req.params;
    const folder = path.join(folderPath, idLand);
    fs.readdir(folder, (err, files) => {
        if(err) {
            return res.status(500).json({error:"Błąd w trakcie czytania plików"})
        }
        const file = files.find(file => path.parse(file).base === filename);
        if(file) {
            res.status(200).sendFile(path.join(folder, file));
        } else {
            return res.status(404).json({error:"pliku nie znaleziono"})
        }
    });
})

exports.confirmUpload = withErrorHandling(async (req, res) => {
    if(req.files) {
        res.status(200).json({success:true, message:"Pliki zostały poprawnie wgrane", files:req.files})
    } else {
        res.status(400).json({success:false, message:"Pliki zostały odrzucony"})
    }
});

exports.deleteFile = withErrorHandling(async (req, res) => {
    const {idLand, filename} = req.body;
    fs.unlinkSync(path.join(folderPath, String(idLand), filename));
    res.status(200).json({success:true, message:"Pomyślnie usunięto plik"})
});