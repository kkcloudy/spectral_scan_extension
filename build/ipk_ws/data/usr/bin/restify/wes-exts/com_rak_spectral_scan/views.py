from util import json_checker
from wgrt.authuser import is_password_changed, authenticate
from wgrt.api import Endpoint, resp_ok, request
from .model import get_enable_func, set_enable_func

ext_name = __name__.split(".")[0]
endpoint = Endpoint(name=ext_name, import_name=__name__)


@endpoint.route('/enable', methods=['GET'])
@authenticate
def get_enable():
    payload = get_enable_func()
    return resp_ok(payload)

@endpoint.route('/enable', methods=['PUT'])
@authenticate
def set_enable():
    conf = request().get_json()
    obj = set_enable_func(conf)
    return resp_ok(obj)

