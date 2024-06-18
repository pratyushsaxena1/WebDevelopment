const express = require('express');
const https = require('https');
const app = express();
const port = 3000;

app.use(express.static(__dirname + '/css'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('weatherForm');
});

app.get('/getweather/results', async (req, res, next) => {
    try {
        const forecastURL = "https://api.weather.gov/points/" + req.query.lat + "," + req.query.long;
        res.locals.forecastURL = forecastURL;
        next();
    } catch (error) {
        next(error);
    }
});

app.use('/getweather/results', async (req, res, next) => {
    try {
        const forecastData = res.locals.forecastURL;
        const options = {
            headers: {
                'User-Agent': 'header'
            }
        };
        https.get(forecastData, options, (response) => {
            let data = '';
            response.on('data', (chunk) => {
                data += chunk;
            });
            response.on('end', () => {
                try {
                    const forecastResult = JSON.parse(data);
                    if (forecastResult.properties && forecastResult.properties.forecastHourly) {
                        res.locals.finalURL = forecastResult.properties.forecastHourly;
                        next();
                    } else {
                        throw new Error('Invalid forecast data format');
                    }
                } catch (error) {
                    next(error);
                }
            });
        }).on('error', (error) => {
            next(error);
        });
    } catch (error) {
        next(error);
    }
});

app.use('/getweather/results', async (req, res) => {
    try {
        const hourlyForecastURL = res.locals.finalURL;
        const options = {
            headers: {
                'User-Agent': 'header'
            }
        };
        https.get(hourlyForecastURL, options, (response) => {
            let data = '';
            response.on('data', (chunk) => {
                data += chunk;
            });
            response.on('end', () => {
                try {
                    const hourlyForecastResult = JSON.parse(data);
                    res.render('weatherResults', { myResult: hourlyForecastResult });
                } catch (error) {
                    next(error);
                }
            });
        }).on('error', (error) => {
            next(error);
        });
    } catch (error) {
        next(error);
    }
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('errorPage');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
