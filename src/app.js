const path=require('path')
const express=require('express')
const hbs=require('hbs')
const forecast=require('./utils/forecast.js')
const geocode=require('./utils/geocode.js')
const port=process.env.PORT||3000



const app=express()

//define path for Express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)


//setup static directiory to serve
app.use(express.static(publicDirectoryPath))
//app.use(express.static(viewPath))

app.get('',(req,res)=>{
res.render('index',{
    'title':'weather app',
    'name':'reshmavathi'
    
})
})




app.get('/weather',(req,res)=>{
    console.log(req.query.address)
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        console.log("error",error,latitude)
        if(error){
            return res.send({error})
        }
        // return res.send({
        //     location:location,
        //     latitude:latitude
        // })
        forecast(latitude,longitude,(error,forecastData)=>{
            return res.send({
                location:location,
                forecastData:forecastData,
                address:req.query.address
            })
        })
    })
    
    
//    if(!req.query.address) {
//        return res.send({
//            error:'You must provide address'
//        })
//    }
//    res.send({
//            forecast:'It is snowing',
//            location:'philadelphia',
//            address:req.query.address
//     })
   

    
    
    
    // res.send({
    //     forecast:'sss',
    //     loaction:'New Jersey'
        
    // })
})
app.get('/about',(req,res)=>{
   res.render('about',{
       'title':'About Me',
       'name':'reshmavathi'
   })
 })
 app.get('/help',(req,res)=>{
   res.render('help',{
       'title':'Help',
       'message':'How can we help you',
       'name':'Reshma'
   })
 })


app.get('/update',(req,res)=>{
    res.send("Weather update page")
})
app.get('/help/*',(req,res)=>{
    res.render('404e',{
        'title':'404help',
        'error_message':'Help article not found',
        'name':'reshma'
    })
   
})
// app.get('*',(req,res)=>{
//    res.render('404e',{
//     'title':'404',
//     'error_message':'Page not found',
//     'name':'Reshma'
//    })
// })
app.get('/products',(req,res)=>{
    res.send({
        product:[]
    })
})



app.listen(port,()=>{//starting server is synchronous process
console.log('Server is up at port 3000')
})