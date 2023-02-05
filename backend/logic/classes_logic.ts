import { OkPacket } from "mysql"
import dal from "../dal/dal"
import classesModal, { lessonsModal } from "../modal/classesModal"


const getAllClasses = async (): Promise<classesModal[]> => {
    const sql = "SELECT * FROM classes"
    return dal.execute(sql)
}

const addClass = async (newClass: classesModal): Promise<classesModal> => {
    const sql = `insert into classes VALUES(default, ${newClass.number_of_class}, ${newClass.max_student} , ${newClass.frontal}, ${newClass.circle}, ${newClass.auditorium})`
    const result: OkPacket = await dal.execute(sql)
    newClass.id = result.insertId;
    return newClass
}

const editClass = async (newClass: classesModal): Promise<void> => {
    const sql = `UPDATE classes set number_of_class = ${newClass.number_of_class}, max_student =  ${newClass.max_student}, frontal=  ${newClass.frontal}, circle = ${newClass.circle}, auditorium= ${newClass.auditorium}  WHERE id=${newClass.id} `
    await dal.execute(sql);
}

const deleteClass = async (id: number): Promise<void> => {
    const sql = `delete from classes where id =${id}`
    dal.execute(sql);

}

const findClass = async (newLesson: lessonsModal): Promise<classesModal[]> => {
    console.log(newLesson);
    const sql = `SELECT * from classes
    where ${newLesson.sitting}=1 and max_student > ${newLesson.number_of_student} and not exists
    (select * from lessons where date='${newLesson.date}' and (lesson_start BETWEEN '${newLesson.lesson_start}:00' and '${newLesson.lesson_end}:00' or lesson_end BETWEEN '${newLesson.lesson_start}:00' and '${newLesson.lesson_end}:00' or (lesson_start<'${newLesson.lesson_start}:00' and lesson_end>'${newLesson.lesson_end}:00') )and classId = classes.id)`
    console.log(sql)
    return await dal.execute(sql)
}

const getClassesByDate =async (date:string): Promise<lessonsModal[]>=> {
    
    const sql = `select classes.*, SEC_TO_TIME(SUM(TIME_TO_SEC(timediff(lesson_end, lesson_start)))) as total_length
    from classes
    left join lessons on classes.id = lessons.classid and date = '${date}'
    group by classes.id
     `
     return dal.execute(sql)
 }
export default {
    deleteClass,
    editClass,
    addClass,
    getAllClasses,
    findClass,
    getClassesByDate
}
