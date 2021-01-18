const request = require('postman-request')

const accessKey = '1fa534301bfae0e9c2331d3a8c1c7fb4'

const forecast = (city, callback) => {
    let url = 'http://api.weatherstack.com/current?access_key=' + encodeURIComponent(accessKey)+ '&query=' + encodeURIComponent(city)
    
    request({
        url,
        json: true
    }, (error, response, body) => {
        if(error) {
            callback('unable to connect weather service!')
        } else if(response.body.error) {
            callback('unable to find city')
        } else {
            let {current} = response.body;
            let desc = current.weather_descriptions[0]
            let temp = current.temperature
            let feelslike = current.feelslike
            callback(undefined, desc + '. It is currently ' + temp + ' degrees out, but feels like ' + feelslike + ' degrees.')
        }
    })
}

module.exports = forecast