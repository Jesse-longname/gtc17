from ldap3 import Server, Connection, SIMPLE, SYNC, ALL, Reader, ObjectDef, SUBTREE
from ldap3.core.exceptions import LDAPException
import json
from server.config import Config

server = Server(Config.LDAP_SERVER_URL, get_info=ALL) # Should ask what their ldap url is

def get_ldap_connection():
    try:
        return Connection(server, auto_bind=True,
                            client_strategy=SYNC, user=Config.LDAP_USERNAME, password=Config.LDAP_PASSWORD,
                            authentication=SIMPLE, check_names=True)
        # OR... Connection(server, auto_bind=True) if we can anonymously connect
    except LDAPException as e:
        raise ValueError('Unable to retrieve information. Ensure service account is up to date.')

if Config.ENVIRONMENT != 'Local':
    c = get_ldap_connection()

def get_user_info(employee_id):
    if Config.ENVIRONMENT == 'Local':
        return {
            'cn': 'Test CN',
            'sn': 'Surname',
            'givenName': 'Firstname',
            'mail': 'test@test.test',
            'uid': 'fsurname',
            'description': 'adesc'
        }
    query = '(&(userPrincipalName=' + str(employee_id) + '@kidshelp.ca)(objectClass=person))'
    attributes = ['cn', 'sn', 'givenName', 'mail', 'memberOf', 'uid', 'description'] # Emp ID, Surname, GivenName, email, groups
    if not c.bound:
        c.bind()
    
    c.search('dc=kidshelp,dc=ca', query, SUBTREE, attributes=attributes)
    json_res = json.loads(c.response_to_json())
    try:
        user = json_res['entries'][0]['attributes']
        return user
    except IndexError:
        return ['Account does not exist']