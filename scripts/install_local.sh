#!/bin/bash

virutalenv env
source env/scripts/activate

pip install -r requirements.txt

deactivate