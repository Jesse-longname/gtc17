import pandas
import sys
import math
import datetime
from server.server import db
from server.models.stat import Stat
from server.models.stat_group import StatGroup
from server.models.user import User
from server.models.summary_stat import SummaryStat
from server.models.summary_stat_entry import SummaryStatEntry
from server.models.call_outcome import CallOutcome
from server.models.post_category import PostCategory
from server.models.post import Post
import click

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
    'Counselling Relationship', 'Assessment', 'Intervention', 'Session Closure', 'Total'
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

stat_summary_columns = [
    '01. Counselling Relationship - Total Category Score (Add all scores)',
    "02.	Assessment - 5.	Counsellor picks up on cues and engages in risk assessment (as required)",
    "03.	Intervention - Total Category Score (Add all scores)",
    "04.	Session Closure - Total Category Score (Add all scores)",
    "05. Additional Info / Comments - Total Score (Please add all Category Scores)",
    "05. Additional Info / Comments - Maximum Score Attainable (Please take into consideration any scores of N/A)",
    "CallDateAndTimeStart"
]


pre_column_names = [
    "Form inserted",
    "* Are you?",
    "* How old are you?",
    "* What Province are you contacting us from?",
    "On a scale of 0 to 7, <strong>how upset are you right now</strong> right now?",
    "siteLanguage",
    "chat id"
]

post_column_names = [
    "chatid",
    "<strong>2.</strong> On a scale of 0 to 7, <strong>how upset are you</strong> right now?",
    "<strong>5.</strong> Would you recommend that others use this service (scale of 0 to 10)"
]

def load_data(file_loc):
    click.echo("Loading Data")
    # file_loc = sys.argv[1]
    sheet1 = pandas.read_excel(file_loc, 0)
    names = sheet1[user_column_name]

    all_stats = []
    for stat_name in stat_summary_columns:
        all_stats.append(sheet1[stat_name])
    for i in range(len(all_stats[0])): # i represents the row of the sheet
        user = User.query.filter_by(username=names[i]).first()
        if not user:
            user = User()
            user.first_name = 'John'
            user.last_name = 'Doe'
            user.employee_id = i
            user.username = names[i]
            db.session.add(user)
            db.session.commit()
            user = User.query.filter_by(username = names[i]).first()
        for j in range(len(stat_summary_columns)-3): # j represents the column in the sheet
            # all_stats[j][i] is the users value for the jth column
            stat = Stat()
            stat.max_val = -1
            stat.percent = float(all_stats[j][i]/5)*100
            if math.isnan(stat.percent):
                stat.percent = -1
            stat.eval_date = all_stats[-1][i]
            if type(stat.eval_date) is not datetime.datetime:
                stat.eval_date = datetime.datetime(datetime.MINYEAR,1,1)
            stat.stat_group_id = j+1
            stat.user_id = user.id
            db.session.add(stat)
            db.session.commit()
        stat = Stat()
        stat.max_val = int(all_stats[len(stat_summary_columns)-2][i])
        stat.percent = float(all_stats[len(stat_summary_columns)-3][i] / all_stats[len(stat_summary_columns)-2][i]) * 100
        if math.isnan(stat.percent):
            stat.percent = -1
        stat.eval_date = all_stats[-1][i]
        if type(stat.eval_date) is not datetime.datetime:
            stat.eval_date = datetime.datetime(datetime.MINYEAR, 1, 1)
        stat.stat_group_id = len(stat_groups)
        stat.user_id = user.id
        db.session.add(stat)
        db.session.commit()
    click.echo("Finished Loading Data")

def create_stat_groups():
    click.echo("Create Stat Grouops")
    for i in range(len(stat_groups)):
        stat_group = StatGroup()
        stat_group.id = i+1
        stat_group.name = stat_groups[i]
        db.session.add(stat_group)
    db.session.commit()
    click.echo("Finished Creating Stat Groups")

def create_summary_stats():
    click.echo("Creating Summary Stats")
    summary_stats = ['age', 'gender', 'locations', 'before', 'after', 'recommends']
    for i in range(len(summary_stats)):
        summary_stat = SummaryStat()
        summary_stat.id = i + 1
        summary_stat.name = summary_stats[i]
        db.session.add(summary_stat)
    db.session.commit()
    click.echo("Finished Creating Summary Stats")

def create_db():
    click.echo("Creating Database")
    db.create_all()
    create_stat_groups()
    create_summary_stats()
    create_call_outcomes()
    create_post_categories()
    click.echo("Finished Creating Database")

def load_summary_stats(pre_file_loc, pre_sheet_num, post_file_loc, post_sheet_num):
    """ Loads and compiles call data into a very simple form """
    """ This method is very ugly, sorry :/ """
    # Get the proper excel file and sheet
    pre_sheet = pandas.read_excel(pre_file_loc, int(pre_sheet_num))
    post_sheet = pandas.read_excel(post_file_loc, int(post_sheet_num))
    
    # Get the desired columns in the Pre-call sheet
    pre_data = []
    for pre_name in pre_column_names:
        pre_data.append(pre_sheet[pre_name])
    
    # Get the desired columns in the Post-call sheet
    post_data = []
    for post_name in post_column_names:
        post_data.append(post_sheet[post_name])

    # Set up the dictionaries to store the values
    ages = {}
    locations = {}
    genders = {}
    before = {}
    after = {}
    recommends = {}

    # Go through each row of the pre-call data
    for i in range(len(pre_data[0])):
        # Gather the data from the sheets
        call_id = pre_data[6][i]

        gender = pre_data[1][i]
        if gender == 'I identify differently than the above':
            gener = 'Other'
        
        age = str(pre_data[2][i]).split(' ')[0]
        if age == 'Over':
            age = '21'
        age = age

        ind = post_data[0][post_data[0] == call_id]
        if ind.size == 0:
            print('No after call log for: ' + str(call_id))
            continue
        ind = ind.index[0]
        print(ind)

        before_rating = str(pre_data[4][i])
        if before_rating == 'nan':
            print('Before rating is nan')
            continue

        after_rating = str(post_data[1][ind])
        if after_rating == 'nan':
            print('After rating is nan')
            continue

        recommend_rating = str(post_data[2][ind])
        if recommend_rating == 'nan':
            print('Recommend rating is nan')
            continue
        
        province = pre_data[3][i]

        # Store the data in the dictionaries
        if age in ages.keys():
            ages[age] = ages[age] + 1
        else:
            ages[age] = 1

        if gender in genders.keys():
            genders[gender] = genders[gender] + 1
        else:
            genders[gender] = 1
        
        if province in locations.keys():
            locations[province] = locations[province] + 1
        else:
            locations[province] = 1

        if before_rating in before.keys():
            before[before_rating] = before[before_rating] + 1
        else:
            before[before_rating] = 1
            
        if after_rating in after.keys():
            after[after_rating] = after[after_rating] + 1
        else:
            after[after_rating] = 1

        if recommend_rating in recommends.keys():
            recommends[recommend_rating] = recommends[recommend_rating] + 1
        else:
            recommends[recommend_rating] = 1
    print(ages)
    print(genders)
    print(locations)
    print(before)
    print(after)
    print(recommends)

    create_entries(1, ages)
    create_entries(2, genders)
    create_entries(3, locations)
    create_entries(4, before)
    create_entries(5, after)
    create_entries(6, recommends)

def create_entries(summary_stat_id, values):
    for key, value in values.items():
        stat_entry = SummaryStatEntry()
        stat_entry.stat_id = summary_stat_id
        stat_entry.key = key
        stat_entry.value = value
        db.session.add(stat_entry)
    db.session.commit()

def create_call_outcomes():
    names = ['Good', 'Neutral', 'Not Well']
    icons = ['sentiment_very_satisfied', 'sentiment_neutral', 'sentiment_very_dissatisfied']
    for i in range(len(names)):
        call_outcome = CallOutcome()
        call_outcome.name = names[i]
        call_outcome.icon_name = icons[i]
        db.session.add(call_outcome)
    db.session.commit()

def create_post_categories():
    categories = [
        'Emotional Health',
        'Dating',
        'LGBTQ',
        'Sexting',
        'Bullying',
        'Physical Abuse',
        'Family Troubles',
        'Other'
    ]
    for category in categories:
        cat = PostCategory()
        cat.name = category
        db.session.add(cat)
    db.session.commit()

def add_sample_data():
    names = ['asdf1', 'asdf2', 'asdf3']
    ids = [209152, 208963, 157644]
    texts = ['Sample text1', 'Sample text2', 'Sample text3']
    for i in range(3):
        user = User()
        user.username = names[i]
        user.first_name = names[i]
        user.last_name = names[i]
        user.employee_id = ids[i]
        post = Post()
        post.category_id = 1
        post.content = texts[i]
        post.outcome_id = 1
        post.user = user
        db.session.add(user)
        db.session.add(post)
    db.session.commit()