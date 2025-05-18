from flask import Flask, request, jsonify
from ariadne import graphql_sync
from ariadne.explorer import ExplorerGraphiQL
from app.scheme import schema
from flask_cors import CORS  # <-- Importa CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

@app.route("/graphql", methods=["POST"])
def graphql_server():
    data = request.get_json()
    success, result = graphql_sync(schema, data, context_value=request, debug=True)
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)
