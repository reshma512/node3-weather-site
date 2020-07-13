const request=require('request')



//callback abstraction
const geocode=(address,callback)=>{
   // console.log("sssssss",address)
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?limit=2&access_token=pk.eyJ1IjoicmVzaG1hMjIyIiwiYSI6ImNrYmlyOXd0OTBoejQycW1samZ3YXk4dmQifQ.Sx8i_p4B4UAN13CmXUYzOw&limit=1'
   request({url,json:true},(error,{body})=>{
     //  console.log("body",body)
   if(error){
       callback('unable to connect to location services')
   }else if(body.features.length===0){
    callback('unable to find location,Try another')

   }else{
       callback(undefined,
        {latitude:body.features[0].center[0],
        longitude:body.features[0].center[1],
    location:body.features[0].place_name   })
   }
   })
}

module.exports=geocode
