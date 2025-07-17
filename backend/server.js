import express, { response } from 'express';
import cors from 'cors';
import sql from './db.js';
import {PythonShell} from 'python-shell';

const app = express();

app.use(express.json())
app.use(cors({ origin: 'http://localhost:3000' }));

app.post('/api/login', async (req, res) => {
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

app.post('/api/signup', async (req, res) => {
    const { email, password, role } = req.body;
    const result = role === 'employee' ?
        await sql`select * from employee where email = ${email}` :
        await sql`select * from employer where email = ${email}`;
    if (result.length === 1) {
        res.json({ success: false });
    } else {
        const insertUser = role === 'employee' ?
            await sql`insert into employee (email, password) values (${email}, ${password})` :
            await sql`insert into employer (email, password) values (${email}, ${password})`;
        if (insertUser) {
            res.json({ success: true });
        }
        else {
            res.json({ success: false });
        }
    }
});

app.post('/api/teams', async (req, res) => {
    const { member, role } = req.body;
    const result = role === 'employee' ?
        await sql`select t.idteam, t.name, t.description from team as t join partof as p on t.idteam = p.idteam join employee as e on p.idemployee = e.idemployee where e.email = ${member}` :
        await sql`select idteam,name,description from team join employer on team.idemployer = employer.idemployer where email = ${member}`;
    if (result) {
        const teams = JSON.stringify(result);
        res.json({success: true, teams: teams});
    } else {
        res.json({success: false});
    }
});

app.get('/api/teams/:idteam', async (req, res) => {
    const { idteam } = req.params;
    const { role } = req.body;
    const result = role === 'employee' ?
    await sql`select e.idemployee, e.email from employee as e join partof as p on e.idemployee = p.idemployee join team as t on p.idteam = t.idteam where t.idteam = ${idteam} order by e.idemployee` :
    await sql`select e.idemployee, e.email from employee as e join partof as p on e.idemployee = p.idemployee join team as t on p.idteam = t.idteam where t.idteam = ${idteam}`;
    if (result) {
        const team = JSON.stringify(result);
        res.json({success: true, team: team});
    } else {
        res.json({success: false});
    }
})

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

app.post('/test', async (req, res) => {
    const result = await sql`select * from employee`;
    if (result) {
        const teams = JSON.stringify(result);
        res.json({success: true, teams: teams});
    } else {
        res.json({success: false});
    }
});

app.post('/api/createTeam', async (req, res) => {
    const { name, description, employer } = req.body;
    const result = await sql`insert into team (name, description, idemployer) values (${name}, ${description}, (select idemployer from employer where email = ${employer})) returning idteam`;
    if (result.length === 1) {
        res.json({ id : result[0].idteam, success: true });
    } else {
        res.json({ success: false });
    }
})

app.post('/api/getSkills', async (req, res) => {

})

app.listen(3001, () => console.log('Server running on port 3001'));