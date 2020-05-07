const express = require('express'); // learn this is a function
const path = require('path');
const hbs = require('hbs');
const app = express();
const forecast = require('../src/utility/forecast');
const geocode = require('../src/utility/geocode');

// console.log(path.join(__dirname, '../public'));
viewsPath = path.join(__dirname, '/templates/views');
partialsPaths = path.join(__dirname, '/templates/partials')
console.log(partialsPaths);

//use below to configure static directory -- content
app.use(express.static(path.join(__dirname, '../public')));

//setup for handlebar engine
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPaths);


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Kshitij Nirale'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Kshitij Nirale'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpMsg: 'This is help text..',
        title: 'Help',
        name: 'Kshitij Nirale'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'Please provide address.'
        })
    } else {
        geocode(req.query.address, (error, data) => {
            if (error) {
                return res.send({
                    error
                })
            }

            forecast(data.latitude, data.longitude, (err, forecastData) => {
                if (err) {
                    return res.send({
                        error: err
                    })
                }
                res.send({
                    address: req.query.address,
                    forecast: forecastData,
                    location: data.place_name
                })
            })
        })
    }
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help',
        name: 'Kshitij Nirale',
        errMessage: 'Help article not found.'
    })
})

//this should always be at last
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errMessage: 'Page not found',
        name: 'Kshitij Nirale'
    })
})


app.listen(3000, () => {
    console.log('Server is running on port 3000.');
})