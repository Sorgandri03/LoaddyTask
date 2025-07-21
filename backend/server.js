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

app.post('/api/teams/:idteam', async (req, res) => {
    const { idteam } = req.params;
    const { member, role } = req.body;

    let checkMember;
    if (role === 'employee') {
        checkMember = await sql`select e.idemployee from employee as e join partof as p on e.idemployee = p.idemployee join team as t on p.idteam = t.idteam where t.idteam = ${idteam} and e.email = ${member}`;
    } else if (role === 'employer') {
        checkMember = await sql`select employer.idemployer from employer join team on employer.idemployer = team.idemployer where team.idteam = ${idteam} and employer.email = ${member}`;
    } else {
        checkMember = [];
    }

    if (checkMember.length > 0) {
        const result = await sql`select e.idemployee, e.email from employee as e join partof as p on e.idemployee = p.idemployee join team as t on p.idteam = t.idteam where t.idteam = ${idteam} order by e.idemployee`;
        if (result) {
            const team = JSON.stringify(result);
            res.json({success: true, team: team});
        } else {
            res.json({success: false});
        }
    } else {
        res.json({success: false});
    }
})

app.post('/api/createteam', async (req, res) => {
    const { name, description, employer } = req.body;
    const idemployer = await sql`select idemployer from employer where email = ${employer}`;
    if (!idemployer[0]) {
        return res.json({ success: false });
    }
    const createTeam = await sql`insert into team (name, description, idemployer) values (${name}, ${description}, ${idemployer[0].idemployer}) returning idteam`;
    if (createTeam.length > 0) {
        res.json({ success: true, idteam: createTeam[0].idteam });
    } else {
        res.json({ success: false });
    }
})

app.post('/api/employee/:idemployee', async (req, res) => {
    const { idteam } = req.params;

    const result = await sql`select * from employee as e join have as h on e.idemployee = h.idemployee join skills as s on h.idskills = s.idskills where e.idemployee = ${idteam}`;
    if (result) {
        const skills = JSON.stringify(result);
        res.json({success: true, skills: skills});
    }
    else {
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

app.post('/api/getskills', async (req, res) => {
    const result = await sql`select * from skills`;
    if (result) {
        const skills = JSON.stringify(result);
        res.json({success: true, skills: skills});
    } else {
        res.json({success: false});
    }
});

app.post('/api/setskills', async (req, res) => {
    const { employee, skills } = req.body;
    try {
        const idemployee = await sql`select idemployee from employee where email = ${employee}`;
        for (const skill of skills) {
            await sql`insert into have (idemployee, idskills) values (${idemployee[0].idemployee}, ${skill})`;
        }
        res.json({success: true});
    } catch (error) {
        console.error('Error setting skills:', error);
        res.json({success: false});
    }
});

app.post('/api/addmember', async (req, res) => {
    const { idteam, member } = req.body;

    const idemployee = await sql`select idemployee from employee where email = ${member}`;
    const result = await sql`insert into partof (idteam, idemployee) values (${idteam}, ${idemployee[0].idemployee})`;

    if (result.length > 0) {
        res.json({success: true});
    } else {
        res.json({success: false});
    }
});

app.listen(3001, () => console.log('Server running on port 3001'));