const http = require('http')
const https = require('https')
const average = require('./modules.js')

const server = http.createServer((req, res) => {
    const { method } = req

    switch(method) {
        case 'GET':
            const path = req.url
            console.log(path)
                if (path === '/') {
                    return res.end('Append crag name to url path to see data (HINT: try curbar)')
                } else if (path === '/curbar') {
                    let lat = 53.27711236171354
                    let lon = -1.6191784593379612
                    let cragDirection = 'W'
                    return handleTheRequest(req, res, lat, lon, cragDirection)
                } else if (path === '/burbage-s') {
                    let lat = 53.32460624273914
                    let lon = -1.6031993150783697
                    let cragDirection = 'NW'
                    return handleTheRequest(req, res, lat, lon, cragDirection)
                } else if (path === '/burbage-n') {
                    let lat = 53.340149572785705
                    let lon = -1.6035211347456175
                    let cragDirection = 'NW'
                    return handleTheRequest(req, res, lat, lon, cragDirection)
                } else if (path === '/stanage-popular') {
                    let lat = 53.34902123584321
                    let lon = -1.6346858919609624
                    let cragDirection = 'SW'
                    return handleTheRequest(req, res, lat, lon, cragDirection)
                } else if (path === '/stanage-n') {
                    let lat = 53.370307598035275
                    let lon = -1.6535330675373738
                    let cragDirection = 'W'
                    return handleTheRequest(req, res, lat, lon, cragDirection)
                } else if (path === '/hen-cloud') {
                    let lat = 53.152096523967884
                    let lon = -1.9889193685050515
                    let cragDirection = 'SW'
                    return handleTheRequest(req, res, lat, lon, cragDirection)
                } else if (path === '/upper-tier') {
                    let lat = 53.171354296361784
                    let lon = -1.9980062979875806
                    let cragDirection = 'SW'
                    return handleTheRequest(req, res, lat, lon, cragDirection)
                }
            
            
    }
})

const PORT = process.env.PORT || 8080

server.listen(PORT, () => {
    const { address, port } = server.address()
    console.log(`Server listening on http://${address}:${port}`)
})


function handleTheRequest(req, res, latitude, longitude, cragDir) {
        const part = 'minutely'
        const units = 'metric'
        const key = process.env.MY_VAR
        const cragFaces = cragDir

        const options = {
            hostname: 'api.openweathermap.org', 
            path: `/data/3.0/onecall?lat=${latitude}&lon=${longitude}&units=${units}&exclude=${part}&appid=${key}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }

        //making the request

        const request = https.request(options, response => {
            let data = ''
            response.on('data', (chunk) => {
                data += chunk
            })

        //handling the response - upon response ending, set headers and pass data to client

        response.on('end', () => {
            
            //parsing the response from Openweather as JSON and extracting the first 6 hours of data
            
            const JSONdata = JSON.parse(data)
            const first6elements = JSONdata.hourly.slice(0, 6)
            const totalWind = average.windDegrees(first6elements)
            

            //creating an object of results to return to client - uses modules imported from ./modules
            data = JSON.stringify({
                'averageHumidity': average.humidity(first6elements),
                'averageRainfall': average.rainfall(first6elements),
                'averageTemp': average.temp(first6elements),
                'averageFeelsLike': average.feelsLike(first6elements),
                'averageWindSpeed': average.windSpeed(first6elements),
                'averageGust': average.gust(first6elements),
                'windDirection': average.cardinalDirection(totalWind),
                'cragDirection': cragFaces,
            }) 

            //adding headers to the response to client and returning data
            res.writeHead(200, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            })
            return res.end(data)
            })
        }) 

        //ending the request
        request.end()

}
