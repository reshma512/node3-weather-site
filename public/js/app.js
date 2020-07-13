
console.log("client side java scrip file is loaded")


const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')



//messageOne.textContent='From javascript'

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    messageOne.textContent='Loading.....'
    messageTwo.textContent=''
    const location=search.value
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
            messageOne.textContent=data.error
        }else{
           
            messageOne.textContent=data.location 
            messageTwo.textContent=data.forecastData
        }
        
       
    })
})
console.log("testing",location)
})