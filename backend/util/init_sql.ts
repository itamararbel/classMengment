import dal from "../dal/dal"
const classes = "CREATE TABLE IF NOT EXISTS `classes`.`classes` (`id` INT NOT NULL AUTO_INCREMENT,`number_of_class` INT NULL,`max_student` INT NULL,`frontal` TINYINT NULL,`circle` TINYINT NULL,`auditorium` TINYINT NULL, PRIMARY KEY (`id`), UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);"
const lessons = "CREATE TABLE IF NOT EXISTS `classes`.`lessons` ( `id` INT NOT NULL AUTO_INCREMENT, `lesson_name` VARCHAR(45) ,`number_of_student` INT NULL, `date` DATE NULL, `sitting` VARCHAR(45) NULL, PRIMARY KEY (`id`), UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);"  
const sqlInit = ()=>{
  dal.execute(classes);
  dal.execute(lessons);
}

export default sqlInit;