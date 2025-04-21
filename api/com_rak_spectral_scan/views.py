from util import json_checker
from wgrt.authuser import is_password_changed, authenticate
from wgrt.api import Endpoint, resp_ok, request
from .model import get_config_func, set_config_func, get_current_data, get_history_list, get_history_data

ext_name = __name__.split(".")[0]
endpoint = Endpoint(name=ext_name, import_name=__name__)

@endpoint.route('/configuration', methods=['GET'])
@authenticate
def get_config():
    payload = get_config_func()
    return resp_ok(payload)


@endpoint.route('/configuration', methods=['PUT'])
@authenticate                                     
def set_config():
    conf = request().get_json()
    payload = set_config_func(conf)                   
    return resp_ok(payload)


@endpoint.route('/current_data', methods=['GET'])
@authenticate
def current_data():
    payload = get_current_data()
    return resp_ok(payload)


@endpoint.route('/history_list', methods=['GET'])
@authenticate                                    
def history_lisr():                              
    payload = get_history_list()                 
    return resp_ok(payload)


@endpoint.route('/history_data/<id>', methods=['GET'])
@authenticate                                    
def history_data(id):                              
    payload = get_history_data(id)                 
    return resp_ok(payload)
