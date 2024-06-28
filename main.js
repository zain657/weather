var element = document.querySelector('.address');
var row = document.getElementById('row');
var TypeofthermometerBtn = document.getElementById('TypeofthermometerBtn');
var Typeofthermometer = document.getElementById('Typeofthermometer');
var fahrenheit = document.getElementById('fahrenheit');
var celsius = document.getElementById('celsius');
var langBtn = document.getElementById('langBtn');
var language = document.getElementById('language');
var ar1 = document.getElementById('ar');
var en1 = document.getElementById('en');
var search = document.getElementById('search');
var news = document.getElementById('news');
var data;


news.addEventListener('click',function(){
    document.write(`<div style="font-size: 70px; text-align: center; color:red;">Gaza is under bombardment.</div>`);
})

if (element) {
    element.textContent = 'فلسطين';
}

var navBarBtn = document.querySelectorAll('#home, #contBtn');
var contents = document.querySelectorAll('#header, #contact');

navBarBtn.forEach((navBtn, index) => {
    navBtn.addEventListener('click', function () {
        contents.forEach(content => {
            content.classList.add('d-none');
        });
        navBarBtn.forEach(btn => {
            btn.classList.remove('active');
        });
        contents[index].classList.remove('d-none');
        navBtn.classList.add('active');
    });
});


var navBarBtn1 = document.querySelectorAll('#TypeofthermometerBtn, #langBtn');
var contents1 = document.querySelectorAll('#Typeofthermometer, #language');

var currentActiveIndex = -1;

navBarBtn1.forEach((navBtn, index) => {
    navBtn.addEventListener('click', function () {
        contents1.forEach(content => {
            content.classList.add('invisible');
            content.classList.remove('visible');
        });
        navBarBtn1.forEach(btn => {
            btn.classList.remove('active');
        });
        if (currentActiveIndex === index) {
            currentActiveIndex = -1;
        } else {
            contents1[index].classList.remove('invisible');
            contents1[index].classList.add('visible');
            navBtn.classList.add('active');
            currentActiveIndex = index;
        }
    });
});


ar1.onclick = function () {
    ar1.checked = true;
    en1.checked = false;
    getApi("Jerusalem", chooseLang());
}

en1.onclick = function () {
    en1.checked = true;
    ar1.checked = false;
    getApi("Jerusalem", chooseLang());
}


fahrenheit.onclick = function () {
    fahrenheit.checked = true;
    celsius.checked = false;
    retreve(data,chooseFOrC());
}

celsius.onclick = function () {
    celsius.checked = true;
    fahrenheit.checked = false;
    retreve(data,chooseFOrC());
}



function chooseLang() {
    if (ar1.checked==true) {
        return "ar"
    }
    else {
        return "en"
    }
}
function chooseFOrC() {
    if (fahrenheit.checked==true) {
        return "f"
    }
    else {
        return "c"
    }
}



async function getApi(country, lang) {
    try {
        var response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=ec14f0933802472c9cd193136242506&q=${country}&days=3&lang=${lang}`);
        data = await response.json();
        console.log(data);
        retreve(data,chooseFOrC());
    }
    catch (error) {
        console.log(error);
    }
}
getApi("Jerusalem", chooseLang());

search.addEventListener("keyup", x => {
    getApi(x.target.value, chooseLang());
})


function retreve(arr,cOrF){
    let temp = `temp_` + cOrF;
    let maxtemp = `maxtemp_` + cOrF;
    let mintemp = `mintemp_` + cOrF;
    var htmlCont=`
    <div class="col-lg-4 p-0 m-0 border-0 cardd car-round">
                    <div class="header rounddd d-flex justify-content-between align-items-center p-2 px-2">
                        <p>${getDay1(0)}</p>
                        <p>${getMonthDay()}/${getMonth1()}</p>
                    </div>
                    <div class="body d-flex justify-content-start  flex-column p-4">
                        <h3 class='t-color1'>${arr.location.name}</h3>
                        <p class="temp fw-medium">${arr.current[temp]}<sup>o</sup>${cOrF}</p>
                        <img src="https:${arr.current.condition.icon}" width='90px' alt="#">
                        <p class='text-info'>${arr.current.condition.text}</p>
                        <div class="d-flex justify-content-start align-items-center gap-4">
                            <p class='t-color'><img src="imge/imge1.png" alt="#"> ${arr.current.precip_mm} mm</p>
                            <p class='t-color'><img src="imge/imge2.png" alt="#"> ${arr.current.wind_kph} kph</p>
                            <p class='t-color'><img src="imge/imge3.png" alt="#"> ${arr.current.wind_dir}</p>
                        </div>
                    </div>
                </div>

                <div class="col-lg-4 p-0 m-0 border-0 cardd1">
                    <div class="header1 header d-flex justify-content-center align-items-center p-2">
                        <p>${getDay1(1)}</p>
                    </div>
                    <div class="body d-flex justify-content-center align-items-center  flex-column p-4">
                        <img src="https:${arr.forecast.forecastday[1].day.condition.icon}" alt="#">
                        <p class='fs-2'>${arr.forecast.forecastday[1].day[maxtemp]}<sup>o</sup>${cOrF}</p>
                        <p>${arr.forecast.forecastday[1].day[mintemp]}<sup>o</sup>${cOrF}</p>
                        <p class='text-info'>${arr.forecast.forecastday[1].day.condition.text}</p>
                    </div>
                </div>

                <div class="col-lg-4 p-0 m-0 border-0 car-round1 cardd">
                    <div class="header d-flex justify-content-center rounddd1   align-items-center p-2">
                        <p>${getDay1(2)}</p>
                    </div>
                    <div class="body d-flex justify-content-center align-items-center  flex-column p-4">
                        <img src="https:${arr.forecast.forecastday[2].day.condition.icon}" alt="#">
                        <p class='fs-2'>${arr.forecast.forecastday[2].day[maxtemp]}<sup>o</sup>${cOrF}</p>
                        <p>${arr.forecast.forecastday[2].day[mintemp]}<sup>o</sup>${cOrF}</p>
                        <p class='text-info'>${arr.forecast.forecastday[2].day.condition.text}</p>
                    </div>
                </div>
                `
    row.innerHTML=htmlCont;
}




function getDay1(x){
    var weekDay;
    var day;
    if(en1.checked==true){
        weekDay=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    }
    else{
        weekDay=['الاحد','الاثنين','الثلاثاء','الاربعاء','الخميس','الجمعة','السبت'];
    }
    var dateNow=new Date();
    day=weekDay[dateNow.getDay()+x];

    return day
}
function getMonth1(){
    var months;
    var month;
    if(en1.checked==true){
        months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    }
    else{
        months=['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
    }
    var dateNow=new Date();
    month=months[dateNow.getMonth()];
    
    return month
}

function getMonthDay(){
    var dayMonth;
    var dateNow=new Date();
    dayMonth=dateNow.getDate();
    
    return dayMonth;
}