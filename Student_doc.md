
# SYSTEM DESCRIPTION:

LoaddyTask is a platform that enables organizations to efficiently track and assign tasks. It allows employers to update task details and ensures that employees receive assignments aligned with their specific skill sets.

# USER STORIES:
1) As a User, I want to register and log into the system so that I can use the application	
2) As an Employer, I want to add and remove employees from a project so I can manage my team

3) As an Employer, I want to add a new task so that I can give to the algorithm’s pool 

4) As an Employer, I want to manually assign a task to an employee so that I can be more selective when needed, after the algorithm sorts.

5) As an Employee, I want to tell the system my skillset so that I can receive tasks based on my skillset
6) As an Employee, I want to see my assigned tasks so that I can execute them
7) As an Employee, I want to sign off tasks as delivered so that I can keep track of my work
8) As an Employee, I want to receive notifications so that I can remind my deadlines

# CONTAINERS:

## CONTAINER NAME: task-assignment-algorithm

### DESCRIPTION:
This container hosts the task-assignment-algorithm microservice, which implements a custom load balancing algorithm to assign tasks to employees based on their skills. The algorithm analyzes the skillsets of employees and matches them with the requirements of available tasks, distributing assignments to optimize workload and skill alignment.

### USER STORIES:
3,4

### PORTS: 
```
8000:8000
```
### PERSISTENCE EVALUATION
The task-assignment-algorithm container does not include a database.

### EXTERNAL SERVICES CONNECTIONS
the microservice-algorithm container does not connect to external services.

### MICROSERVICES:

#### MICROSERVICE: load-balancing-algorithm
- TYPE: backend
- DESCRIPTION: algorithm that assigns tasks to employees based on their skills.
- PORTS: 8000:8000
- TECHNOLOGICAL SPECIFICATION:
this microservice is built using Python and Flask. It exposes a RESTful API that allows the employer to obtain a plan of tasks based on the employees' skills and the tasks available in the system. 

- SERVICE ARCHITECTURE: 
The service is realized with a custom load balancing algorithm implemented in Python. This algorithm analyzes the skillsets of employees, matches them with the requirements of available tasks, and distributes assignments to optimize workload and skill alignment. The logic ensures that tasks are allocated fairly and efficiently, taking into account both employee capabilities and project needs using a revised version of the optized load balancing algorithm.

- ENDPOINTS: <put this bullet point only in the case of backend and fill the following table>
		
	| HTTP METHOD | URL | Description | User Stories |
	| ----------- | --- | ----------- | ------------ |
    | GET | /algorithm TODO: ricontrollare il routing | run the algorithm | [3,4] |

#### <other microservices>

## <other containers>
Student_doc.md
Displaying Student_doc.md.