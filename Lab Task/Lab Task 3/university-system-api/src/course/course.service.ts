import { Injectable } from '@nestjs/common';

@Injectable()
export class CourseService {


    getAllCourses(){
        return {
            messsage:'All courses fetched',
            data:[],
        }
    };


    getCourseById(id:string){
        return {
            message:'Course fetched',
            id:id,
        }
    }

    createCourse(name:string,code:string){
        return {
            message:'Course created',
            data:{
                name,code
            },
        }
    };
}
