import { Module } from '@nestjs/common';
import { CvController } from './controller/cv.controller';
import { CvService } from './service/cv.service';

@Module({
    controllers: [CvController],
    providers: [CvService]
})
export class CvModule { }
