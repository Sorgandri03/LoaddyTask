import express, { response } from 'express';
import cors from 'cors';
import sql from './db.js';
import nodemailer from 'nodemailer';


const app = express();;

app.use(express.json());
app.use(cors());


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

app.listen(3002, () => console.log('Server running on port 3002'));