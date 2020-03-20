db=require('../../db')
const table='product'
const Product={
    findAll: ()=>{
        return new  Promise((resolve,reject)=>{
            const sql=`select * from ${table}`
            db.query(sql,  (error, results)=> {
                if(error){
                    reject(error)
                }
                else{
                    resolve(results)
                }
            })
        })
    },
    findById:(id)=>{
        return new Promise((resolve,reject)=>{
            const sql=`select * from ${table} where id=?`
            db.query(sql,[id] , (error, result)=> {
                if(error){
                    reject(error)
                }
                else{
                    resolve(result)
                }
            })
        })
    },
    add:(body)=>new Promise((resolve,reject)=>{
        {
            const sql=`insert into ${table} set ?`
            db.query(sql,body , (error, result)=> {
                if(error){
                    reject(error)
                }
                else{
                    resolve(result)
                }
            })
    
        }
    }),
    remove: (id)=>{
        return new Promise((resolve,reject)=>{
            const sql=`delete from ${table} where id=?`
            db.query(sql,[id] , (error, result)=> {
                if(error){
                    reject(error)
                }
                else{
                    resolve(result)
                }
            })
        })
    },
    update: (id,body)=>{
        return new Promise((resolve,reject)=>{
            const sql=`update  ${table} set ? where id=?`
            db.query(sql,[body,id] , (error, result)=> {
                if(error){
                    reject(error)
                }
                else{
                    resolve(result)
                }
            })
        })


    }
}
module.exports=Product