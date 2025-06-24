import express from 'express';
import cors from 'cors';
import sql from './db.js';
import {PythonShell} from 'python-shell';

const app = express();

app.use(express.json())
app.use(cors({ origin: 'http://localhost:3000' }));

app.post('/api/users', async (req, res) => {
    const { email, password } = req.body;
    const employees = await sql`select * from employee where email = ${email} and password = ${password}`;
    const employers = await sql`select * from employer where email = ${email} and password = ${password}`;
    if (employees.length === 1) {
        res.json({ success: true, role: 'employee' });
    } else if (employers.length === 1) {
        res.json({ success: true, role: 'employer' });
    } else {
        res.json({ success: false });
    }
});

app.post('/api/getteams', async (req, res) => {
    const { member, role } = req.body;
    const result = role === 'employee' ?
        null :
        await sql`select idteam,name,description from team join employer on team.idemployer = employer.idemployer where email = ${member}`;

    if (result.length > 0) {
        const teams = JSON.stringify(result);
        res.json({success: true, teams: teams});
    } else {
        res.json({success: false});
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