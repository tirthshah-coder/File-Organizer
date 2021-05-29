// Organize Implementation
const fs = require("fs");
const path = require("path");

let types = {
    media: ["mp4", "mkv"],
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    documents: ["docx", "doc", "pdf", "xlsx", "xls", "odt", "ods", "odp", "odg", "odf", "txt", "ps", "tex"],
    app: ["exe", "dmg", "pkg", "deb"]
}

function organizeFn(dirPath){
    let destPath;

    if(dirPath == undefined){
        console.log("Enter the dir path");
        destPath = process.cwd();
        return;
    }else{
        let doesExist = fs.existsSync(dirPath);
        if(doesExist){
            // Dir path given is valid so create folder named organized_files
            destPath = path.join(dirPath, "organized_files");
            
            // Check that organized_files folder is not already created
            if(fs.existsSync(destPath) == false){
                fs.mkdirSync(destPath);
            }
        }else{
            console.log("Enter correct dir path");
            return;
        }
    }

    organizeHelper(dirPath, destPath);
}

function organizeHelper(src, dest){
    // identify which type of category that our file belongs so read all files
    let childNames = fs.readdirSync(src);
    for(let i = 0; i < childNames.length; i++){
        let childAddress = path.join(src, childNames[i]);
        // We have to only deal with file so check that in src folder 
        let isFile = fs.lstatSync(childAddress).isFile();
        
        // Now check which category our file belongs
        if(isFile){
            let category = getCategory(childNames[i]);
            console.log(childNames[i], "belongs to --> ", category);

            // copy / cut files to organized dir inside of any category folder
            sendFiles(childAddress, dest, category);
        }
    }
}

function getCategory(name){
    let ext = path.extname(name);
    ext = ext.slice(1);  // If .js then see only js bcoz we have types without '.'
    for(let type in types){
        let categoryArr = types[type];
        for(let i = 0; i < categoryArr.length; i++){
            if(ext == categoryArr[i])
                return type;
        }
    }

    return "others";
}

function sendFiles(srcFilePath, dest, category){
    let categoryPath = path.join(dest, category);
    if(fs.existsSync(categoryPath) == false){
        fs.mkdirSync(categoryPath);  // make folder of category inside organize dir
    }

    // Copy file
    let fileName = path.basename(srcFilePath);  
    let destFilePath = path.join(categoryPath, fileName);
    fs.copyFileSync(srcFilePath, destFilePath);
    fs.unlinkSync(srcFilePath);  // cut files from src folder
    console.log(fileName, "copied to ", category);
}

module.exports = organizeFn;