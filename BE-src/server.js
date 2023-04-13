import express from 'express';
// import path from 'path';
import { db, connectTodb } from './db.js';
import fs from 'fs';
import admin from 'firebase-admin';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const credentials = JSON.parse(
    
    fs.readFileSync("./credentials.json")
);

admin.initializeApp({
    credential: admin.credential.cert(credentials),
});
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname,'../build')));

app.get(/^(?!\/api).+/,(req,res)=>{
    res.sendFile(path.join(__dirname,'../build/index.html'));
});

app.use(async (req, res, next) => {
    const { authtoken } = req.headers;

    if (authtoken) {
        try {
            req.user = await admin.auth().verifyIdToken(authtoken);
        }
        catch (e) {
            return res.sendStatus(400);
        }

    }
    req.user = req.user || {}

    next();
});

app.get('/api/articles/:name', async (req, res) => {
    const { name } = req.params;

    const { uid } = req.user;
    const article = await db.collection('articles').findOne({ name });


    if (article) {
        const upvoteids = article.upvoteids || [];
        article.canUpvote = uid && !upvoteids.includes(uid);
        res.json(article);
    }
    else {
        res.sendStatus(404);
    }
});

app.use(async (req, res, next) => {
    if (req.user) {
        next();
    }
    else {
        res.sendStatus(401);
    }
});

app.put('/api/articles/:name/upvote', async (req, res) => {
    const { name } = req.params;
    const { uid } = req.user;
    const articles = await db.collection('articles').findOne({ name });


    if (articles) {
        const upvoteids = articles.upvoteids || [];
        const canUpvote = uid && !upvoteids.includes(uid);
        if (canUpvote) {
            await db.collection('articles').updateOne({ name }, { $inc: { upvotes: 1 }, $push: { upvoteids: uid } });
        }



        const updatedarticles = await db.collection('articles').findOne({ name });
        res.json(articles);

    }
    else {
        res.send(`their no article found in this url`);
    }
});

app.post('/api/articles/:name/comments', async (req, res) => {
    const { name } = req.params;
    const { text } = req.body;
    const {email} = req.body;


    await db.collection('articles').updateOne({ name }, { $push: { comments: { PostedBy :email, text } } });

    const articles = await db.collection('articles').findOne({ name });

    if (articles) {
        res.json(articles);

    }
    else {
        res.send(`their no article found in this  url comments`)
    }
});

// app.post('/api/articles/:name/comments', async (req, res)=>{
//     const {name} = req.params;
//     const {PostedBy} = req.body;

//     await db.collection('articles').updateOne({name},{$push:{comments:{PostedBy}}});
//     const article = await db.collection('articles').findOne({name});

//     if(article){
//         res.send(req.body);
//     }
//     else{
//         res.send("no such comments on this articles");
//     }
// });
const PORT = process.env.PORT||8000;

connectTodb(() => {
    console.log("successfully connected to database!!");
    app.listen(PORT, () => {
        console.log('server is listening on port :' + PORT);
    });
});