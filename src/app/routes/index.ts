import {Router} from "express";
import {UserRoutes} from "../modules/user/user.route";
import {StudentRoutes} from "../modules/student/student.route";
import {AcademicSemesterRoutes} from "../modules/academicSemester/academicSemester.route";
import {AcademicFacultyRoutes} from "../modules/academicFaculty/academicFaculty.route";
import {academicDepartmentRoutes} from "../modules/academicDepartment/academicDepartment.route";
import {facultyRoutes} from "../modules/Faculty/faculty.route";
import {adminRoutes} from "../modules/Admin/admin.route";
import {CourseRoutes} from "../modules/Course/couse.route";
import {SemesterRegistrationRoutes} from "../modules/semesterRegistration/semesterRegistration.route";
import {OfferedCourseRoutes} from "../modules/OfferedCourse/OfferedCourse.route";
import {AuthRoutes} from "../modules/Auth/auth.route";
import {EnrolledCourseRoutes} from "../modules/EnrolledCourse/enrolledCourse.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/faculties",
    route: facultyRoutes,
  },
  {
    path: "/admins",
    route: adminRoutes,
  },
  {
    path: "/students",
    route: StudentRoutes,
  },
  {
    path: "/academic-semesters",
    route: AcademicSemesterRoutes,
  },
  {
    path: "/academic-faculties",
    route: AcademicFacultyRoutes,
  },
  {
    path: "/academic-departments",
    route: academicDepartmentRoutes,
  },
  {
    path: "/courses",
    route: CourseRoutes,
  },
  {
    path: "/semester-registration",
    route: SemesterRegistrationRoutes,
  },
  {
    path: "/offered-course",
    route: OfferedCourseRoutes,
  },
  {
    path: "/enrolled-courses",
    route: EnrolledCourseRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
