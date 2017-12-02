from ldap3 import Server, Connection, SIMPLE, SYNC, ALL, Reader, ObjectDef, SUBTREE
from ldap3.core.exceptions import LDAPException
import json

server_host = '10.0.10.2'
ldap_server_url = 'ldap://' + server_host + ':389' # or 389 if only ldap://
user = '' # User email
password = '' # Password for the account

server = Server(ldap_server_url, get_info=ALL) # Should ask what their ldap url is

def get_ldap_connection():
    try:
        return Connection(server, auto_bind=True,
                            client_strategy=SYNC, user=user, password=password,
                            authentication=SIMPLE, check_names=True)
        # OR... Connection(server, auto_bind=True) if we can anonymously connect
    except LDAPException as e:
        raise ValueError('Unable to retrieve information. Ensure service account is up to date.')

c = get_ldap_connection()

def get_user_info(employee_id):
    query = '(&(cn=' + str(employee_id) + ')(objectClass=user))'
    attributes = ['cn', 'sn', 'givenName', 'mail', 'memberOf'] # Emp ID, Surname, GivenName, email, groups
    if not c.bound:
        c.bind()
    
    c.search('dc='.join(server_host.split('.')), query, SUBTREE, attributes=attributes)
    json_res = json.loads(c.response_to_json())
    try:
        user = json_res['entries'][0]['attributes']
        return user
    except IndexError:
        return ['Account does not exist']