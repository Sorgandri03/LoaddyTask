import sys
import json

lsi = '''[
  {
    "email": "brandon.clark@example.com",
    "skills": [
      "C++",
      "CSS",
      "HTML",
      "Java",
      "JavaScript",
      "PHP",
      "Python",
      "Ruby",
      "SQL",
      "Swift"
    ]
  }
]'''

tsk = '''[
  {
    "idTask": 2,
    "language": "Python",
    "weight": 0
  },
  {
    "idTask": 3,
    "language": "JavaScript",
    "weight": 0
  },
  {
    "idTask": 4,
    "language": "C++",
    "weight": 0
  },
  {
    "idTask": 5,
    "language": "SQL",
    "weight": 0
  },
  {
    "idTask": 6,
    "language": "HTML",
    "weight": 0
  },
  {
    "idTask": 7,
    "language": "CSS",
    "weight": 0
  },
  {
    "idTask": 8,
    "language": "PHP",
    "weight": 0
  },
  {
    "idTask": 9,
    "language": "Ruby",
    "weight": 0
  },
  {
    "idTask": 1,
    "language": "Java",
    "weight": 0
  }
]
'''

def customloadbalance(ListOfEmployees_json, tasksList_json):
    resault = []
    ListOfEmployees = json.loads(ListOfEmployees_json)
    tasksList = json.loads(tasksList_json)
    for employee in range (len(ListOfEmployees)):
        ListOfEmployees[employee]["workload"] = 0


    ListOfEmployees.sort(key=lambda x: len(x["skills"]), reverse=True)
    tasksList.sort(key=lambda x: x["weight"], reverse=True)

# We use a modified optimized load balancing algorithm for assigning task to employees
# we sort the employess by the least workload and we use the number of skill that the employee has as a tie breaker 

    for task in tasksList:
        candidates= [ employee for employee in ListOfEmployees if task["language"] in employee["skills"]]
    
        min_workload = min(candidates, key=lambda x: (x["workload"], len(x["skills"] )))
        resault.append({"task": task["idTask"], "emailemployee": min_workload["email"]})
        min_workload["workload"] += task["weight"]

    return resault


if __name__ == "__main__":

    res= customloadbalance(lsi, tsk)
    sys.stdout.write(str(res))


