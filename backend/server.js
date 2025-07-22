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
        await sql`select t.idteam, t.name, t.description from team as t join partof as p on t.idteam = p.idteam join employee as e on p.emailemployee = e.email where e.email = ${member}` :
        await sql`select idteam, name, description from team where emailemployer = ${member}`;
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
        checkMember = await sql`select e.email from employee as e join partof as p on e.email = p.emailemployee join team as t on p.idteam = t.idteam where t.idteam = ${idteam} and e.email = ${member}`;
    } else if (role === 'employer') {
        checkMember = await sql`select emailemployer from team where idteam = ${idteam} and emailemployer = ${member}`;
    } else {
        checkMember = [];
    }

    if (checkMember.length > 0) {
        const result = await sql`select e.email from employee as e join partof as p on e.email = p.emailemployee join team as t on p.idteam = t.idteam where t.idteam = ${idteam} order by e.email`;
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
    const createTeam = await sql`insert into team (name, description, emailemployer) values (${name}, ${description}, ${employer}) returning idteam`;
    if (createTeam.length > 0) {
        res.json({ success: true, idteam: createTeam[0].idteam });
    } else {
        res.json({ success: false });
    }
})

app.get('/api/employee/:employee', async (req, res) => {
    const { employee } = req.params;

    const result = await sql`select h.idskills from employee as e join have as h on e.email = h.emailemployee where e.email = ${employee} group by h.idskills order by h.idskills`;
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
        await sql`delete from have where emailemployee = ${employee}`;
        for (const skill of skills) {
            await sql`insert into have (emailemployee, idskills) values (${employee}, ${skill})`;
        }
        res.json({success: true});
    } catch (error) {
        console.error('Error setting skills:', error);
        res.json({success: false});
    }
});

app.post('/api/addmember', async (req, res) => {
    const { idteam, member } = req.body;
    const existingMember = await sql`select * from partof where idteam = ${idteam} and emailemployee = ${member}`;
    if (existingMember.length > 0) {
        return res.json({success: false});
    }
    const result = await sql`insert into partof (idteam, emailemployee) values (${idteam}, ${member})`;
    if (result) {
        res.json({success: true});
    } else {
        res.json({success: false});
    }
});

app.post('/api/deletemember', async (req, res) => {
    const { idteam, member } = req.body;

    const result = await sql`delete from partof where idteam = ${idteam} and emailemployee = ${member}`;
    if (result) {
        res.json({success: true});
    } else {
        res.json({success: false});
    }
});

app.post('api/teamsjobs', async (req, res) => {
    const { idteam } = req.body;
    const result = await sql`select * from job where idteam = ${idteam}`;
    if (result) {
        const jobs = JSON.stringify(result);
        res.json({success: true, jobs: jobs});
    } else {
        res.json({success: false});
    }
});

app.post('/api/createjob', async (req, res) => {
    const { idteam, name, description } = req.body;
    const result = await sql`insert into job (idteam, name, description) values (${idteam}, ${name}, ${description}) returning idjob`;
    if (result) {
        res.json({success: true, idjob: result[0].idjob});
    } else {
        res.json({success: false});
    }   
});


app.listen(3001, () => console.log('Server running on port 3001'));