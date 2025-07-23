from flask import Flask
from flask import request
import json
import customLoadBalance
import sys
app = Flask(__name__)

@app.route('/algorithm', methods=['POST'])
def algorithm():
    print('Algorithm!', file=sys.stderr)
    data = request.get_json()
    employees = data['employees']
    tasks = data['tasks']
    print(f'Employees: {employees}', file=sys.stderr)
    print(f'Tasks: {tasks}', file=sys.stderr)
    # tasks = data.get('tasks')
    # result = customLoadBalance.customloadbalance(employees, tasks)
    # return jsonify(result)
    return tasks

@app.route('/')
def index():
    print('Index!', file=sys.stderr)
    return """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Microservice hub</title>
    </head>
    <body>
        <h1>Welcome to the Task Balancer App</h1>
        <p><a href="/algorithm">Go to Algorithm Page</a></p>
    </body>
    </html>
    """


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)