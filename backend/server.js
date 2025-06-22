import express from 'express';
import cors from 'cors';
import sql from './db.js';
import {PythonShell} from 'python-shell';

const app = express();

app.use(express.json())
app.use(cors({ origin: 'http://localhost:3000' }));

app.post('/api/users', async (req, res) => {
    const { email, password } = req.body;
    const users = await sql`select * from users where email = ${email} and password = ${password}`;
    if (users.length === 1) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

app.get('/api/algorithm', async (req, res) => {
    let options = {
        mode: 'text',
        pythonOptions: ['-u'],
        args: req.query.q.split(",")
    };

    PythonShell.run('test.py', options).then(result=>{
        res.json(result);
    });
})

app.listen(3001, () => console.log('Server running on port 3001'));