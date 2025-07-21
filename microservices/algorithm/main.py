from flask import Flask
import customLoadBalance
app = Flask(__name__)

@app.route('/algorithm', methods=['GET'])
def algorithm():
    return "Algorithm service is running!"
    #return customLoadBalance.customloadbalance(ListOfEmployees, tasksList)

@app.route('/')
def index():
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