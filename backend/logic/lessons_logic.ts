import { OkPacket } from "mysql"
import dal from "../dal/dal"
import {lessonsModal} from "../modal/classesModal"


const getAllLessons =async (): Promise<lessonsModal[]>=> {
   const sql = `SELECT lessons.*, classes.number_of_class as class_number, timediff(lesson_end, lesson_start) as length
   from lessons
   join classes on lessons.classId=classes.id `
    return dal.execute(sql)
}

const addLesson = async (newLesson:lessonsModal): Promise<lessonsModal>=>{
    const sql = `insert into lessons VALUES(default, '${newLesson.lesson_name}', ${newLesson.number_of_student} ,'${newLesson.sitting}', '${newLesson.date}' , '${newLesson.lesson_start}' ,'${newLesson.lesson_end}',  ${newLesson.classId})`
    const result : OkPacket = await dal.execute(sql)
    newLesson.id = result.insertId;
    return newLesson
}

const editLesson = async (newLesson : lessonsModal): Promise<void>=>{
    const sql = `UPDATE lessons set lesson_name = '${newLesson.lesson_name}', number_of_student =  ${newLesson.number_of_student}, date=  '${newLesson.date}', sitting = '${newLesson.sitting}' WHERE id=${newLesson.id} `
    await dal.execute(sql);
}

const deleteLesson = async (id:number):Promise<void> => { 
    const sql = `delete from lessons where id =${id}`
    dal.execute(sql);
}

const lessonsBetween = async (lessonsFrom:string,lessonsTo:string):Promise<lessonsModal[]>=>{
    const sql = `select * from lessons where date between '${lessonsFrom}' and '${lessonsTo}'`
    return await dal.execute(sql);
}

const addMultipleLessons= async(lessons:lessonsModal[]):Promise<lessonsModal[]>=>{
    console.log(lessons)
    let sql = `insert into lessons VALUES`
     lessons.map((newLesson)=>{
     sql += `(default, '${newLesson.lesson_name}', ${newLesson.number_of_student} ,'${newLesson.sitting}', '${newLesson.date}' , '${newLesson.lesson_start}' ,'${newLesson.lesson_end}',  ${newLesson.classId}),`
    })
    try{
        sql = sql.slice(0, sql.length - 1) ;
        dal.execute(sql);
     }catch(err){
        console.log(err);

     }
    return(lessons)
}

export default {
    deleteLesson,
    lessonsBetween,
    editLesson,
    addLesson,
    getAllLessons,
    addMultipleLessons
}
