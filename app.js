const express = require('express');
const app = express();
const port = 3000;

const { Projects } = require('./data/projectsData.json');
//const { error } = require('console');

app.set('view engine', 'pug');

app.use('/static', express.static('./public'));

app.get('/', (req, res) => {
    res.render('index', { Projects });
});

app.get('/projects/:id', (req, res) => {
    const project = Projects[req.params.id];
    res.render('project', { project });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.use((req, res, next) => {
    const err = new Error('Page not found');
    err.status = 404;
    res.status(404).render('page-not-found', { err })
})

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).render('error', { err });
});

app.listen(port, () => {
    console.log(`The server is listening on port ${port}`);
});