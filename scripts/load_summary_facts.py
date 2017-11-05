import pandas
import sys
from google.cloud import firestore
import math

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
    "<strong>2.</strong> On a scale of 0 to 7, <strong>how upset are you</strong> right now?"
]

if __name__ == '__main__':
    pre_file_loc = sys.argv[1]
    pre_sheet_num = sys.argv[2]
    post_file_loc = sys.argv[3]
    post_sheet_num = sys.argv[4]
    pre_sheet = pandas.read_excel(pre_file_loc, int(pre_sheet_num))
    post_sheet = pandas.read_excel(post_file_loc, int(post_sheet_num))
    db = firestore.Client('khp-dash')
    the_datas = []

    for pre_name in pre_column_names:
        the_datas.append(pre_sheet[pre_name])
    post_datas = []
    for post_name in post_column_names:
        post_datas.append(post_sheet[post_name])

    tot_lt_5 = 0
    tot_6_to_10 = 0
    tot_11_to_15 = 0
    tot_16_to_20 = 0
    tot_21_plus = 0

    ages = {}
    locations = {}
    genders = {}
    before = {}
    after = {}
    for i in range(len(the_datas[0])):
        call_id = the_datas[6][i]

        gender = the_datas[1][i]
        if gender == 'I identify differently than the above':
            gender = 'Other'

        age = str(the_datas[2][i]).split(' ')[0]
        if age == 'Over':
            age = '21'
        age = int(age)

        ind = post_datas[0][post_datas[0] == call_id]
        if ind.size == 0:
            print('No after call log for: ' + str(call_id))
            continue
        ind = ind.index[0]
        print(ind)

        before_rating = the_datas[4][i]
        if str(before_rating) == 'nan':
            print('Before rating is nan')
            continue
        before_rating = int(before_rating)
        after_rating = post_datas[1][ind]
        if str(after_rating) == 'nan':
            print('After rating is nan')
            continue
        after_rating = int(after_rating)
        province = the_datas[3][i]

        age = str(age)
        before_rating = str(before_rating)
        after_rating = str(after_rating)

        if age in ages.keys():
            ages[age] = ages[age]+1
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

        # data = {
        #     'date': the_datas[0][i],
        #     'gender': gender,
        #     'age': age,
        #     'province': the_datas[3][i],
        #     'language': the_datas[5][i],
        #     'before_rating': the_datas[4][i],
        #     'after_rating': post_datas[1][ind]
        # }
        # db.collection(u'call-stats').document(str(call_id)).set(data)
    print(ages)
    print(genders)
    print(locations)
    print(before)
    print(after)
    db.collection(u'summary-stats').document('ages').set(ages)
    db.collection(u'summary-stats').document('genders').set(genders)
    db.collection(u'summary-stats').document('locations').set(locations)
    db.collection(u'summary-stats').document('before').set(before)
    db.collection(u'summary-stats').document('after').set(after)
    