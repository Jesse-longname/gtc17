import pandas
import sys
import math
import datetime
from server.server import db
from server.models.stat import Stat
from server.models.stat_group import StatGroup
from server.models.user import User

"""
The file is provided through the first command line argument
This script adds all the stats in a provided Quality Data xlsx to the firestore
"""
user_column_name = "Lookup"

stats_column_names = [
'01.	Counselling Relationship - 1.	Consistently demonstrates empathy',
"01.	Counselling Relationship - 2.	Maintains a non-judgemental position",
"01.	Counselling Relationship - 3.	Demonstrates active listening",
"01.	Counselling Relationship - 4.	Utilizes a strengths-based approach",
"01.	Counselling Relationship - 5.	Counsellor demonstrates professionalism and appropriate boundaries",

"02.	Assessment - 1.	Counsellor maintains a position of curiosity",
"02.	Assessment - 2.	Demonstrates ability to assess the type of session/client need(s) for session",
"02.	Assessment - 3.	Elicits the clients preferred future; what is wanted",
"02.	Assessment - 4.	Adequately explores relevant client factors",
"02.	Assessment - 5.	Counsellor picks up on cues and engages in risk assessment (as required)",

"03.	Intervention - 1.	Supports the client to explore and express their feelings/emotions",
"03.	Intervention - 2.	Takes a non-directive approach and supports the client to develop their own ideas plans and possible next step(s)",
"03.	Intervention - 3.	Explores potential referral needs and provides suitable and relevant referral options when required",
"03.	Intervention - 4.	Counsellor adheres to legal and regulatory requirements",
"03.	Intervention - 5.	Engages in safety planning (if required)",

"04.	Session Closure - 1.	Prepares the client for end of session - closure is positive and appropriately timed",
"04.	Session Closure - 2.	Encourages the client to reflect on what they will take away from the session",
"04.	Session Closure - 3.	Invites client to review next steps to be taken (if applicable)",
"04.	Session Closure - 4.	The Counsellor collects iCarol data when appropriate to do so",
"04.	Session Closure - 5.	iCarol data is accurate and correctly inputted",

"05. Additional Info / Comments - Maximum Score Attainable (Please take into consideration any scores of N/A)",
"05. Additional Info / Comments - Total Score (Please add all Category Scores)",

"CallDateAndTimeStart"
]

stat_groups = [
    'Counselling Relationship', 'Assessment', 'Intervention', 'Session Closure', 'Addition Info'
]

stat_names = [
    'Consistently demonstrates empathy', 'Maintains a non-judgemental position', 'Demonstrates active listening', 'Utilizes a strengths-based approach', 'Counsellor demonstrates professionalism and appropriate boundaries',
    'Counsellor maintains a position of curiosity', 'Demonstrates ability to assess the type of session/client need(s) for session', 'Elicits the clients preferred future; what is wanted', 'Adequately explores relevant client factors', 'Counsellor picks up on cues and engages in risk assessment (as required)',
    'Supports the client to explore and express their feelings/emotions','Takes a non-directive approach and supports the client to develop their own ideas plans and possible next step(s)','Explores potential referral needs and provides suitable and relevant referral options when required', 'Counsellor adheres to legal and regulatory requirements', 'Engages in safety planning (if required)',
    'Prepares the client for end of session - closure is positive and appropriately timed','Encourages the client to reflect on what they will take away from the session','Invites client to review next steps to be taken (if applicable)','The Counsellor collects iCarol data when appropriate to do so','iCarol data is accurate and correctly inputted',
    'Maximum Score Attainable','Total Score'
]

data_keys = [
    'user', 'eval_date', 'stat_group', 'stat', 'score'
]

def load_data(file_loc):
    # file_loc = sys.argv[1]
    sheet1 = pandas.read_excel(file_loc, 0)
    names = sheet1[user_column_name]

    all_stats = []
    for stat_name in stats_column_names:
        all_stats.append(sheet1[stat_name])
    for i in range(len(all_stats[0])): # i represents the row of the sheet
        for j in range(len(all_stats)-1): # j represents the column in the sheet
            # all_stats[j][i] is the users value for the jth column
            user = User.query.filter_by(username=names[i]).first()
            if not user:
                user = User()
                user.first_name = 'John'
                user.last_name = 'Doe'
                user.username = names[i]
                db.session.add(user)
                db.session.commit()
                user = User.query.filter_by(username=names[i]).first()
            stat = Stat()
            stat.percent = float(all_stats[j][i])
            if math.isnan(stat.percent):
                stat.percent = -1
            stat.eval_date = all_stats[-1][i]
            if type(stat.eval_date) is not datetime.datetime:
                stat.eval_date = datetime.datetime(datetime.MINYEAR,1,1)
            stat.stat_group_id = (math.floor(j/5))+1
            stat.user_id = user.id
            stat.max_val = -1
            db.session.add(stat)
            db.session.commit()
            # db.collection(u'stats').document().set(data)

def create_stat_groups():
    for i in range(len(stat_groups)):
        stat_group = StatGroup()
        stat_group.id = i+1
        stat_group.name = stat_groups[i]
        db.session.add(stat_group)
    db.session.commit()