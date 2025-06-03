import { Injectable } from '@nestjs/common';import * as path from 'path';
import * as fs from 'fs';

import { v4 } from 'uuid';

@Injectable()
export class FileService {

  async saveImage(image:any){
    const fileName=v4()+'.jpg';
    const dirpath = path.resolve(__dirname, "..","..","src","public",'images')

    if(!fs.existsSync(dirpath)){
      fs.mkdirSync(dirpath,{recursive:true})
    }
    fs.writeFileSync(path.join(dirpath,fileName),image)
    return `${fileName}`;
  }
}
