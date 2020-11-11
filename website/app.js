/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1) + '/'+ d.getDate() +'/'+ d.getFullYear();
const urlHeader = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const urlFooter = ',us&units=metric&appid=';
const apiKey = '37b36ce4000c7679e923282b82a94786';

function ini(){
    const button = document.getElementById('generate')
    button.addEventListener('click', () => {
        const zipCode = document.getElementById('zip');
        const zipCodeValue = zipCode.value;
        const feelings = document.getElementById('feelings')
        let feelingsValue = feelings.value;
        console.log('Feeling ' + feelingsValue)
        if (!isNaN(zipCodeValue) && !isNaN(parseInt(zipCodeValue)) && zipCodeValue.length == 5){
            zipCode.classList.remove('textError')
            if (typeof feelingsValue == 'undefined' || feelingsValue == "")
                feelingsValue = 'Not in a sharing mood'
            const url = urlHeader+zipCodeValue+urlFooter+apiKey;
            console.log(feelingsValue)
            getWeather(url).then((weatherData) => {
                console.log(weatherData);
                postData('/addEntry', {
                    date: newDate,
                    zip: zipCodeValue,
                    weatherData: weatherData,
                    content: feelingsValue
                }).then(()=>{getData('/latest')});
            });  
        }

        else{
            zipCode.classList.add('textError')
            if (isNaN(zipCodeValue)){
                zipCode.value = '';
                zipCode.placeholder = "Zipcode Must Be Numeric!"
            }
            else if (isNaN(parseInt(zipCodeValue))){
                zipCode.placeholder = "Required Field!"
            }
            else if (zipCodeValue.length != 5){
                zipCode.value = ''
                zipCode.placeholder = "Zipcode Must Be Five Characters Long!"
            }
        }
    });

}

const getWeather = async(url, feelings, zip) => {
    const res = await fetch(url);
    try{
        const data = await res.json();
        //const temp = data.main.temp + '°C - ' + data.weather[0].description;
        return data
    } catch(error){
        console.log('Error: ' , error);
    }
}

function populate(temp, content){
    document.getElementById('date').textContent = newDate;
    document.getElementById('temp').textContent = temp;
    document.getElementById('content').textContent = content; 
}

const postData = async ( url = '', data = {})=>{

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), 
  });

    try {
      const newData = await response.json();
      return newData
    }catch(error) {
    console.log("error", error);
    }
}

//This function will access all get routes on teh server. 
//It defaults to the get all route, otherwise it will get the latest entry and populate the page with it
const getData = async (url = '/all') => {
    const request = await fetch(url);
    try{
        const data = await request.json();
        console.log(data)
        if (url == '/latest'){
            console.log(data);
            document.getElementById('date').textContent = "Date: " + data.date;
            document.getElementById('temp').textContent = "Weather: " + data.temp + "°C - " + data.climate;
            document.getElementById('content').textContent = "Feelings: " + data.content; 
        } 
    }catch(error){
        console.log("Error: ", error);
    }
}



ini();