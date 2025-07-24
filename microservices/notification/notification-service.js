import express, { response } from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';


const app = express();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3001' }));

app.post('/notificate', async (req, res) => {
    const { tasks } = req.body;
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
                to: task.emailemployee,
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

app.listen(9000, () => console.log('Server running on port 9000'));