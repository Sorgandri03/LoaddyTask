import express, { response } from 'express';
import cors from 'cors';
import sql from './db.js';
import {PythonShell} from 'python-shell';
import nodemailer from 'nodemailer';

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
    const email = req.body;

    const employerCheck = await sql`select 1 from team join employer on team.idemployer = employer.idemployer where team.idteam = ${idteam} and employer.email = ${email}`;

    const employeeCheck = await sql`select 1 from employee as e join partof as p on e.idemployee = p.idemployee where p.idteam = ${idteam} and e.email = ${email}`;

    if (employerCheck.length > 0 || employeeCheck.length > 0) {
        const result = await sql`select e.idemployee, e.email from employee as e join partof as p on e.idemployee = p.idemployee where p.idteam = ${idteam} order by e.idemployee`;
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

app.post('/api/notificate', async (req, res) => {
    const tasks = await sql`
        SELECT
            t.idtask,
            t.name,
            t.description,
            t.startdate,
            t.enddate,
            t.status,
            e.email
        FROM task t
        JOIN employee e ON t.idemployee = e.idemployee
    `;
    console.log(tasks)
    if (tasks.length === 0) {
        return res.status(200).send('No tasks for notifications');
    }

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'loaddytask@gmail.com',
            pass: 'objy ktvx yykp fqjl',
        },
    });

    try {
        for (let task of tasks) {
            const mailOptions = {
                from: 'loaddytask@gmail.com',
                to: task.email,
                subject: `TASK: ${task.name}`,
                text: `
You have a new task:

Name: ${task.name}
Description: ${task.description || '—'}
Start date: ${task.startdate || '—'}
End date: ${task.enddate || '—'}
Status: ${task.status || '—'}
                `.trim(),
            };
            await transporter.sendMail(mailOptions);
        }

        res.status(200).send('Notifications sent successfully');
    } catch (err) {
        console.error('Error while sending notifications:', err);
        res.status(500).send('Error while sending notifications');
    }
});

app.listen(3001, () => console.log('Server running on port 3001'));