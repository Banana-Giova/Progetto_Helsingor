from flask import Flask, render_template, request, redirect, jsonify # type: ignore
from flask_restx import Api, Resource #type: ignore
from config import *
import json
import requests
from datetime import date

app = Flask(__name__)
app.config.from_object(DevConfig)
api = Api(app, doc='/docs')

@app.route('/', methods=['GET'])
def helsingor_home():
    context = {
        'requested': False,
        'type': None,
        'query_torno': None
    }
    return render_template('helsingor.html', **context)



# @api.route('/moni_tancini', methods=['POST'])
# def moni_tancini():
#     if request.method == "POST":
#         req_db = request.form["req_db"]
#         req_tab = request.form["req_tab"]
#     else:
#         return render_template('moni_tancini.html')
#     post_it = {
#         'req_db':req_db,
#         'req_tab':req_tab
#     }

#     query_torno = fetchOrMoni(post_it)
#     #print(f"\n\n{isinstance(query_torno, str)}\n\n")
    
#     if isinstance(query_torno, str):
#         query_type = 'string'
#     elif isinstance(query_torno, list):
#         query_type = 'list'
#     else:
#         raise TypeError("The REST Server returned an invalid type.")

#     context = {
#         'requested': True,
#         'type': query_type,
#         'query_torno': query_torno
#     }
#     return render_template('moni_tancini.html', **context)



#api run segment
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=6041)