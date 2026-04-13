import { Controller, Post,Get,Put,Param,Patch,Delete, UseInterceptors, BadRequestException, UploadedFile ,Body} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('course')
export class CourseController {

    constructor(private readonly courseService:CourseService){}


    @Get()
    getAllCourses(){
        return this.courseService.getAllCourses();
    }

    @Get(':id')
    getCourseById(@Param('id') id:string){
        return this.courseService.getCourseById(id);
    }

    @Post()
    createCourse(@Body() dto :CreateCourseDto){
        return this.courseService.createCourse(dto);
    }

    @Put(':id')
    updateCourse(@Param('id') id:string, @Body() dto:UpdateCourseDto){
      return this.courseService.updateCourse(id,dto);
    }

    @Patch(':id')
    patchCourse(@Param('id') id:string,@Body() dto:UpdateCourseDto){
        return this.courseService.patchCourse(id,dto);
    }

    @Delete(':id')
    deleteCourse(@Param('id') id:string){
        return this.courseService.deleteCourse(id);
    }

 @Post(':id/upload')
  @UseInterceptors(FileInterceptor('file', {
      storage: diskStorage({
 destination: './src/uploads',
        filename: (req, file, cb)=>{
          const fileName = Date.now() + '-' + file.originalname;
          cb(null, fileName);
        },
      }),
      limits:{
        fileSize:2*1024*1024,
      },
      fileFilter:(req, file, cb)=>{
        if (file.originalname.match(/^.*\.(jpg|jpeg|png|pdf)$/)) {
          cb(null, true);
        } else {
          cb(
            new BadRequestException('Only jpg, jpeg, png and pdf files are allowed', ), false,
          );
}
     },
}),
  )
  uploadCourseMaterial(@Param('id') id: string,@UploadedFile() file: Express.Multer.File,
  ){
    return this.courseService.uploadCourseMaterial(id, file);
  }



}
