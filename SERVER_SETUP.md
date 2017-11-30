# How to set up on IIS

Follow these steps to setup the flask app on IIS...

1. Have the FastCGI module for IIS installed.
2. Add new site in IIS.
    1. Physical Path - [path/to/proj]
    2. Connect as... A service account with read, write, execute rights.
    3. Port - `4200`, or make a small code change in server.py
    4. Change whatever else you want, then click OK.
3. Go to "Features View" for the site you just created
4. Go to "Handler Mappings"
5. On the right in the "Actions" window, click "Add Module Mapping..."
    1. Request Path - `*`
    2. Module - `FastCgiModule`
    3. Executable - [path/to/proj]`\env\Scripts\python.exe|`[path/to/proj]`\env\Lib\site-packages\wfastcgi.py`
    4. Name - `PythonHandler`
    5. Click "Request Restrictions"
    6. Uncheck "Invoke handler only if request is mapped to:"
    7. Click "OK"
    8. Click "OK" 
    9. In the window that pops up ("Add Module Mapping"), click "Yes"
6. In the "Connections" pane in the right side, click "Application Pools"
    1. Right click on the Application Pool for the website you just created. Select Advanced Settings.
    2. Change the identity from "ApplicationPoolIdentity" to a service account with read,write,execute privleges.
    3. Click "OK"
7. In the "Connections" pane in the right side, click on the parent server for the website.
8. In the "Features View", select "FastCGI Settings".
9. Double click the Settings for the site you just set up.
    1. In the window that opens, click on "Environment Variables" under "General" in the "FastCGI Properties" box.
    2. Click the `...` on the right side of the "Environment Variables" box.
    3. Click "Add"
    4. Name = WSGI_HANDLER
    5. Value = run.app
    6. Click "OK"
    7. Click "OK"
10. Navigate to your website, it should be working now!