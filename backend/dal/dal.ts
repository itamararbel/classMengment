import mysql from 'mysql';
import config from '../config'

const connection = mysql.createPool({
host: config.mySqlHost,
user: config.mySqlUser,
database : config.mySqlDatabase,
password : config.mySqlPassword
})

const execute = (sql:string ): Promise<any> =>{
    return new Promise<any>((resolve, reject) => {
         connection.query(sql, (err, result) =>{
            if (err){
                reject(err);
                return 
            }
            resolve(result)
         })
    })
}
export default {
    execute,
}
