function averageHumidity(weatherObject) {
   const totalHumidity6 = weatherObject.reduce((total, element) => {
    return total + element.humidity
   }, 0)

   const avgHumidity6 = (totalHumidity6 / 6).toFixed(2)
   return avgHumidity6
}

//extracting rainfall values to generate average for next 6 hours
function averageRainfall(weatherObject) {
    const totalRainfall6 = weatherObject.reduce((total, element) => {
        return total + element.rain
    }, 0)
    
    const avgRainfall6 = (totalRainfall6 / 6).toFixed(2)
    return avgRainfall6 
}


//extracting temperature values to generate average for next 6 hours
function averageTemp(weatherObject) {
    const totalTemp6 = weatherObject.reduce((total, element) => {
        return total + element.temp
    }, 0)            
    
    const avgTemp6 = (totalTemp6 / 6).toFixed(2)
    return avgTemp6
}

//extracting 'feels like' temperature values to generate average for next 6 hours
function averageFeelsLike(weatherObject) {
    const totalFeelsLike6 = weatherObject.reduce((total, element) => {
        return total + element.feels_like
    }, 0)
    
    const avgFeelsLike6 = (totalFeelsLike6 / 6).toFixed(2)
    return avgFeelsLike6
}

//extracting windspeed values to generate average for next 6 hours
function averageWindSpeed(weatherObject) {
    const totalWindSpeed6 = weatherObject.reduce((total, element) => {
        return total + element.wind_speed
    }, 0)
    const avgWindSpeed6 = (totalWindSpeed6 / 6).toFixed(2)
    return avgWindSpeed6
}

//extracting gust values to generate average for next 6 hours
function averageGust(weatherObject) {
    const totalGust6 = weatherObject.reduce((total, element) => {
        return total + element.wind_gust
    }, 0)
    const avgGust6 = (totalGust6 / 6).toFixed(2)  
    return avgGust6
}

//getting average wind direction in meteorological degrees
function totalWindDegrees(weatherObject) {
    const totalWindDeg6 = weatherObject.reduce((total, element) => {
        return total + element.wind_deg
    }, 0)
    return totalWindDeg6
}

//function to convert average meteorological degrees into a cardinal direction
function degToCardinal(deg) {
    const val =  Math.floor((deg / 45) + 0.5);
    const arr = ["N","NE","E", "SE","S","SW","W","NW"];
    return arr[(val % 8)]
}

module.exports.humidity = averageHumidity
module.exports.rainfall = averageRainfall
module.exports.temp = averageTemp
module.exports.feelsLike = averageFeelsLike
module.exports.windSpeed = averageFeelsLike
module.exports.gust = averageGust
module.exports.windDegrees = totalWindDegrees
module.exports.cardinalDirection = degToCardinal