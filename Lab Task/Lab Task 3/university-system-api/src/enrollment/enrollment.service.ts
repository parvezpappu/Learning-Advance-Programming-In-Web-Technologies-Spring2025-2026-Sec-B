import { forwardRef, Injectable,Inject } from '@nestjs/common';
import { CourseService } from 'src/course/course.service';
import { NotificationService } from 'src/notification/notification.service';

@Injectable()
export class EnrollmentService {

    constructor(private courseService:CourseService, @Inject(forwardRef(()=>NotificationService) )private notificationService:NotificationService)
{}

  enrollStudent(studentName:string, courseId:string){
    const course=this.courseService.getCourseById(courseId);
    const notification =this.notificationService.sendNotification (
        studentName,
        `Enrollment succesful`
,    )
    return {
        message:'Student enrolled successfully',
        student:studentName,
        course:course,
        notification
    };
  }

  getEnrollments(){
    return {
        message:`All enrollments fetched`,
        data:[],
    }
  }



}
