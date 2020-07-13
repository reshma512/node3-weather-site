const request=require('request')

const forecast=(latitude,longitude,callback)=>{
     const url='http://api.weatherstack.com/current?access_key=14f923b6385062f4eff7d37b40678087&query=' + latitude + ',' + longitude + '&units=f'

  //  const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?limit=2&access_token=pk.eyJ1IjoicmVzaG1hMjIyIiwiYSI6ImNrYmlyOXd0OTBoejQycW1samZ3YXk4dmQifQ.Sx8i_p4B4UAN13CmXUYzOw&limit=1'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback("unable to connect to weather service",undefined)
        }else if(body.error){
            console.log("errr",body)
            callback("unable to fing location",undefined)
        }else{
  //console.log("hhhhhhhhhh",response.body.current)   
               callback(undefined,body.current.weather_descriptions+ " It is currently  " +body.current.temperature+ " mmmm.there is a " +body.current.precip+ " %chance of rain")
              // callback(undefined,'It is currently'+response.body.features[1].text+'degrees out there.Feels like '+response.body.current.features[1].place_type+'degress out')

            }
    })
      

}
module.exports=forecast