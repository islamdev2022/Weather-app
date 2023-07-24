document.addEventListener('DOMContentLoaded',()=>{
const image=document.getElementById('e404')
const oops=document.querySelector('.oops')
const condition=document.querySelector('.weather-details')
oops.style.display='none'
image.style.display='none'

const btn = document.getElementById('sub')

btn.addEventListener('click',()=>{
    const city=document.getElementById('search').value
   const container=document.querySelector('.container')
    if(city==''){
        oops.style.display='block'
image.style.display='block'
container.style.height='200px'
    }else{
        apikey='53c05f04a9910909c873d33f925086f6'
        api=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
        fetch (api).then(Response => Response.json())
        .then(data => {
            
            container.style.cssText='height:fit-content;overflow:visible'
            condition.style.display="block"
            image.style.display='block'
            switch (data.weather[0].main){
                case 'Clear': 
                    image.src='images/clear.png';
                    break;

                case 'Rain': 
                    image.src='images/rain.png';
                    break;

                case 'Snow': 
                    image.src='images/snow.png';
                    break;

                case 'Haze': 
                    image.src='images/mist.png';
                    break;

                case 'Clouds':
                    
                    image.src='images/cloud.png';
                    break;

                default:
                    image.src='';
            }
            // for the main temperature
            const mainTemp=document.getElementById('temp');
            const inKelvin= data.main.temp;
            const inCelsius=(inKelvin-273.15).toFixed(0);
          
            mainTemp.innerText=inCelsius;
        //    END
            // min and max and feel like
            const min=document.getElementById('min')
            const max=document.getElementById('max')
            const feels=document.getElementById('feels')

            min.innerText=(data.main.temp_min - 273.15).toFixed(0)
            max.innerText=(data.main.temp_max -273.15).toFixed(0)
            feels.innerText=(data.main.feels_like - 273.15).toFixed(0)
            // END
            // now for the wond and humidty
            const hum= document.getElementById('hum')
            const wind=document.getElementById('wind')
            const clouds=document.getElementById('cloud')
            hum.innerText=(data.main.humidity).toFixed(2)
            wind.innerText=(data.wind.speed).toFixed(2)
            clouds.innerText=data.clouds.all
            
            const timeset=document.getElementById('timeset')
            timeset.innerText=new Date (data.sys.sunset *1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const timerise=document.getElementById('timerise')
            timerise.innerText=new Date (data.sys.sunrise *1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            const lastUpdate=document.getElementById('last')
            lastUpdate.innerText=new Date (data.dt *1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

        }).catch(error =>{
            container.style.cssText='overflow:hidden'
            oops.style.display='block'
            image.src="images/404.png"
image.style.display='block'
container.style.height='200px'
            console.error(error);
        })
    }
})
})