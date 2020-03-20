const express=require('express')
const app=express()
const bodyParser = require('body-parser')
const morgan=require('morgan')

const connection=require('./db')
const productRouter=require('./api/routes/product.route')
const userRouter=require('./api/routes/user.route')

// set up database
connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('--> Connected with mysql as id ' + connection.threadId);
  });
// set up body

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


//set morgan

app.use(morgan('dev'))
//set up routes
app.use('/product',productRouter)
app.use('/user',userRouter)


// set for not found route
app.use((req,res,next)=>{
    const error=new Error('Not found')
    error.status=404
    next(error);
})
app.use((err,req,res,next)=>{
    res.status(err.status||5000)
    res.json({
        message: err.message
    })
})

//   

const port=process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`Server is runing at  ${port}`)
})