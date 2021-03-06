const request = require("request")
const fs = require("fs")
const path = require("path")
const process = require("process");
const currentPath = process.cwd();
const spinner = require("./spinner")
const os = require("os")
const { deletePath , unzipFile } = require("./io");
const { exec } = require("child_process")

exports.downloadTemplate = function (templateName,projectName,callBack){

    // const url = `https://github.com/gaolinxiong/vueComponentsTemplate/archive/master.zip`;
    const url = `git clone git@codeup.aliyun.com:5ef854182c41c1ea2703aeea/boka-frontend/VueComponentsTemplate.git`;

    const currentPath = process.cwd();
    exec(url, {cwd:currentPath}, function (error, stdout, stderr) {
        if (error !== null) {
            console.log('exec error: ' + error);
            callBack(error)
        } else {
            console.log(stdout, stderr)
            fs.rename(`${currentPath}/VueComponentsTemplate`, `${currentPath}/${projectName}`,function (err){
                if (err) throw err;
                console.log('Successful modification,');
                callBack(undefined)
            });
        }
    })
    // // 压缩包下载的目录，这里是在系统临时文件目录创建一个目录
    // const tempProjectPath = fs.mkdtempSync(path.join(os.tmpdir(), `${projectName}-`));
    //
    // // 压缩包保存的路径
    // const file = path.join(tempProjectPath,`${templateName}.zip`);
    //
    // // 判断压缩包在系统中是否存在
    // if(fs.existsSync(file)){
    //     fs.unlinkSync(file); // 删除本地系统已存在的压缩包
    // }
    //
    //
    // spinner.logWithSpinner("下载模板中...")
    // let stream = fs.createWriteStream(file);
    // request(url).pipe(stream).on("close",function(err){
    //     spinner.stopSpinner(false)
    //
    //     if(err){
    //         callBack(err);
    //         return;
    //     }
    //
    //     // 获取解压的目录
    //     const destPath = path.join(currentPath,`${projectName}`);
    //
    //     // 解压已下载的模板压缩包
    //     unzipFile(file,destPath,(error)=>{
    //         // 删除创建的临时文件夹
    //         console.log(file, destPath, error, tempProjectPath)
    //         deletePath(tempProjectPath);
    //         callBack(error);
    //     });
    // })
}
