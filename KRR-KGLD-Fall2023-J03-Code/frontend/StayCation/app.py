from flask import Flask, request, jsonify,render_template
from rdflib import Graph, Namespace
from tabulate import tabulate
app = Flask(__name__, static_url_path='', static_folder='static')

stay = Namespace("http://staycation.org#")
rdfs = Namespace("http://www.w3.org/2000/01/rdf-schema#")
acc=Namespace("http://purl.org/acco/ns#")
grph = Graph()
grph.namespace_manager.bind("stay", stay)
grph.namespace_manager.bind("rdfs", rdfs)
grph.parse(r"C:\Users\NAWAB-PC\staycation_output.rdf", format="xml") 
@app.route("/")
def index():
    return render_template("index.html")
@app.route("/query", methods=["GET"])
def query():
    query_text = request.args.get("naam")
    qres = grph.query(query_text)

    # Extract variable names from the SPARQL query
    variables = [var for var in qres.vars]

    # Extract values from the RDFLib query result
    result = []
    for row in qres:
        row_dict = {var: row[var].toPython() if row[var] else None for var in variables}
        result.append(row_dict)

    return render_template("index.html", check=1, table=result, headers=variables)
if __name__ == "__main__":
    app.run(debug=True)
