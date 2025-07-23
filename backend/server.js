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
        const employeeTasks = await sql`select * from task where emailemployee = ${member}`;
        let tasksArray = employeeTasks.map(task => task);
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

app.post('/api/teamsjobs', async (req, res) => {
    const { idteam } = req.body;
    const result = await sql`select * from job where idteam = ${idteam}`;
    if (result) {
        const jobs = JSON.stringify(result);
        res.json({success: true, jobs: jobs});
    } else {
        res.json({success: false});
    }
});

app.post('/api/createteamjob', async (req, res) => {
    const { idteam, name, description, tasks } = req.body;
    const result = await sql`insert into job (name, description, assingedteam) values (${name}, ${description}, ${idteam}) returning idjob`;
    let today = new Date();
    today = today.toISOString().split('T')[0];
    const status = 'not assigned';
    const email = null;
    if (result) {
        for (const task of tasks) {
            await sql`insert into task (name, description, startdate, enddate, weight, require, status, emailemployee, job) values (${task[0]}, ${task[1]}, ${today}, ${task[2]}, ${Number(task[4])}, ${task[3]}, ${status}, ${email}, ${result[0].idjob})`;
        }
        res.json({success: true, idjob: result[0].idjob});
    } else {
        res.json({success: false});
    }   
});

app.get('/api/job/:idjob', async (req, res) => {
    const { idjob } = req.params;
    const result = await sql`select * from job j join task t on j.idjob = t.job where j.idjob = ${idjob} order by t.idtask`;
    if (result) {
        const job = JSON.stringify(result);
        res.json({success: true, job: job});
    } else {
        res.json({success: false});
    }
})

app.get('/api/getteamjobs/:idteam', async (req, res) => {
    const { idteam } = req.params;
    const result = await sql`select idjob from job where assingedteam = ${idteam}`;
    if (result) {
        const jobs = JSON.stringify(result);
        res.json({success: true, jobs: jobs});
    } else {
        res.json({success: false});
    }
})

app.get('/api/tasks', async (req, res) => {
    const { email, teamId } = req.query;
    try {
        const tasks = await sql`
            select t.* from task t
            join job j on t.job = j.idjob
            where t.emailemployee = ${email} and j.assingedteam = ${teamId} and t.status = 'assigned'
        `;
        res.json({ success: true, tasks: JSON.stringify(tasks) });
    } catch (error) {
        console.error('Error fetching employee tasks:', error);
        res.json({ success: false });
    }
});

app.post('/api/taskcompleted', async (req, res) => {
    const { taskId } = req.body;
    try {
        const result = await sql`update task set status = 'completed' where idtask = ${taskId}`;
        if (result) {
            console.log('Task status updated successfully');
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    } catch (error) {
        console.error('Error updating task status:', error);
        res.json({ success: false });
    }
});

app.post('/api/undotaskcompleted', async (req, res) => {
    const { taskId } = req.body;
    try {
        const result = await sql`update task set status = 'assigned' where idtask = ${taskId}`;
        if (result) {
            console.log('Task status reverted successfully');
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    } catch (error) {
        console.error('Error reverting task status:', error);
        res.json({ success: false });
    }
});

app.post('/api/algorithm', async (req, res) => {
    const { idjob } = req.body;

    const queryemp = await sql`SELECT json_agg(json_build_object(
            'email', email,
            'skills', skills
                )) AS result
                FROM (
                 SELECT
                     e.email,
                     array_agg(s.name ORDER BY s.name) AS skills
                 FROM employee AS e
                          JOIN have h ON e.email = h.emailEmployee
                          JOIN skills s ON h.idSkills = s.idSkills
                          JOIN partof pf ON pf.emailemployee = e.email
                          JOIN team t ON pf.idTeam = t.idTeam
                          JOIN job j ON t.idTeam = j.assingedTeam
                 WHERE j.idjob = ${idjob} -- job 1 to be replaced with a variable
                 GROUP BY e.email
             ) AS subquery;`
    const querytas = await sql`SELECT json_agg(json_build_object(
            'idTask', idTask,
            'language', skill,
            'weight', weight
            )) AS result FROM(
             SELECT t.idTask as idTask, s.name AS skill, t.weight
             FROM task t
                      JOIN skills s ON t.require = s.idSkills
                      JOIN job j ON t.job = j.idJob
             WHERE job = ${idjob}) as subquery;`

    const algorithmResponse = await fetch('http://localhost:8000/algorithm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({employees: queryemp[0].result, tasks: querytas[0].result})
    });

    const algorithmResult = await algorithmResponse.json();
    console.log('Algorithm result:', algorithmResult);
    //res.json({success: true, assignment: algorithmResult});
});

app.listen(3001, () => console.log('Server running on port 3001'));