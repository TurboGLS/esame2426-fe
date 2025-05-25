import { User } from "./user.entity";

export type Classroom = {
    name: string;
    students: string[];
    studentsCount: number;
    createdBy: User;
}