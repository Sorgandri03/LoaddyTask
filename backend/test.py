import sys
ListOfEmployees = [
    {"name": "bob", "skills": ["python", "java"]},
    {"name": "alice", "skills": ["c++", "javascript", "python"]},
    {"name": "charlie", "skills": ["java", "c++", "python"]}
]
for employee in range (len(ListOfEmployees)):
    ListOfEmployees[employee]["workload"] = 0

tasksList = [
    {"name": "task1", "language": "python", "weight": 3},
    {"name": "task2", "language": "java", "weight": 3},
    {"name": "task3", "language": "python", "weight": 2},
    {"name": "task4", "language": "python", "weight": 4}
]


def customloadbalance(ListOfEmployees, tasksList):
    resault = []


    ListOfEmployees.sort(key=lambda x: len(x["skills"]), reverse=True)
    tasksList.sort(key=lambda x: x["weight"], reverse=True)

# We use a modified optimized load balancing algorithm for assigning task to employees
# we sort the employess by the least workload and we use the number of skill that the employee has as a tie breaker 

    for task in tasksList:
        candidates= [ employee for employee in ListOfEmployees if task["language"] in employee["skills"]]
    
        min_workload = min(candidates, key=lambda x: (x["workload"], len(x["skills"] )))
        resault.append({"task": task["name"], "employee": min_workload["name"]})
        min_workload["workload"] += task["weight"]

    return resault


if __name__ == "__main__":
     customloadbalance(ListOfEmployees, tasksList)
     import sys
ListOfEmployees = [
    {"name": "bob", "skills": ["python", "java"]},
    {"name": "alice", "skills": ["c++", "javascript", "python"]},
    {"name": "charlie", "skills": ["java", "c++", "python"]}
]
for employee in range (len(ListOfEmployees)):
    ListOfEmployees[employee]["workload"] = 0

tasksList = [
    {"name": "task1", "language": "python", "weight": 3},
    {"name": "task2", "language": "java", "weight": 3},
    {"name": "task3", "language": "python", "weight": 2},
    {"name": "task4", "language": "python", "weight": 4}
]


def customloadbalance(ListOfEmployees, tasksList):
    resault = []


    ListOfEmployees.sort(key=lambda x: len(x["skills"]), reverse=True)
    tasksList.sort(key=lambda x: x["weight"], reverse=True)

# We use a modified optimized load balancing algorithm for assigning task to employees
# we sort the employess by the least workload and we use the number of skill that the employee has as a tie breaker 

    for task in tasksList:
        candidates= [ employee for employee in ListOfEmployees if task["language"] in employee["skills"]]
    
        min_workload = min(candidates, key=lambda x: (x["workload"], len(x["skills"] )))
        resault.append({"task": task["name"], "employee": min_workload["name"]})
        min_workload["workload"] += task["weight"]

    return resault


if __name__ == "__main__":
    res=customloadbalance(ListOfEmployees, tasksList)
    sys.stdout.write(str(res))


