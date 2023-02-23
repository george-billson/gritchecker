function getCragName() {
    return document.getElementById('crag-name').value
}

const getWeather = async () => {
    const cragName = getCragName()
    const endpoint = `https://gritchecker-node-server.nw.r.appspot.com/${cragName}`
    try {
        const response = await fetch(endpoint)
        if (!response.ok) {
            console.log('node server response not ok')
        } else {
            const nodeResponse = await response.json()
            
            console.log(nodeResponse)

            const averageHumidity = nodeResponse.averageHumidity
            const averageRainfall = nodeResponse.averageRainfall
            const averageTemp = nodeResponse.averageTemp
            const averageFeelsLike = nodeResponse.averageFeelsLike
            const averageWindSpeed = nodeResponse.averageWindSpeed
            const averageGust = nodeResponse.averageGust
            const windDirection = nodeResponse.windDirection
            const cragDirection = nodeResponse.cragDirection
            

            function insertWeatherData(crag, rain, humidity, windspeed, gust, windDirection, cragFaces, actualTemp, feelsLikeTemp) {
                if (averageRainfall > 0) {
                    document.getElementById('text-insert').innerHTML = `For the next 6 hours, there is ${rain}mm of rain forecast at ${crag}. Humidity will be around ${humidity}%. 
                                            <br>
                                            <br>
                                            Average windspeed will be ${windspeed}m/sec with gusts of around ${gust}m/sec in the direction ${windDirection} - the crag faces ${cragFaces}.
                                            <br>
                                            <br>
                                            Currently, it's ${actualTemp} but feels more like ${feelsLikeTemp}.`
                } else {
                    document.getElementById('text-insert').innerHTML = `There is no rain forecast in the next 6 hours at ${crag}. Humidity will be around ${humidity}%. 
                                            <br>
                                            <br>
                                            Average windspeed will be ${windspeed}m/sec with gusts of around ${gust}m/sec in the direction ${windDirection} - the crag faces ${cragFaces}.
                                            <br>
                                            <br>
                                            Currently, it's ${actualTemp}°C but feels more like ${feelsLikeTemp}°C.`
                }
            }
            
            insertWeatherData(
                cragName, 
                averageRainfall, 
                averageHumidity,
                averageWindSpeed,
                averageGust, 
                windDirection,
                cragDirection,
                averageTemp,
                averageFeelsLike )

        }
    }
    
    catch(error) {
        console.log(error)
    }
}