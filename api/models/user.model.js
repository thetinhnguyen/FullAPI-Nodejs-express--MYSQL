const db=require('../../db')
const table='user'
const User={
    add:(body)=>{
        return new Promise((resolve,reject)=>{
            const sql=`insert into ${table} set ?`
            db.query(sql,body,(err,result)=>{
                if(err){
                    return reject(err)
                }
                return resolve(result)
            })
        })
    },
    checkEmail:(email)=>{
        return new Promise((resolve,reject)=>{
            const sql=`select * from ${table} where email=?`
            db.query(sql,[email],(err,result)=>{
                if(err){
                    return reject(err)
                }
                return resolve(result)
            })
        })
    }
}
module.exports=User