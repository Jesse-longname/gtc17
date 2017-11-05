import pandas
import sys
from google.cloud import firestore
import math

user_column_name = "Lookup"

stats_column_names = [
    "01. Counselling Relationship - Total Category Score (Add all scores)",
    "02.	Assessment - Total Category Score (Add all scores)",
    "03.	Intervention - Total Category Score (Add all scores)",
    "04.	Session Closure - Total Category Score (Add all scores)",
    "05. Additional Info / Comments - Maximum Score Attainable (Please take into consideration any scores of N/A)",
    "05. Additional Info / Comments - Total Score (Please add all Category Scores)",

    "CallDateAndTimeStart"
]

stat_groups = [
    'Counselling Relationship', 'Assessment', 'Intervention', 'Session Closure', 'Total'
]

if __name__ == '__main__':
    file_loc = sys.argv[1]
    db = firestore.Client("kids-help-phone-dash")
    sheet1 = pandas.read_excel(file_loc, 0)
    names = sheet1[user_column_name]
    all_stats = []
    for stat_name in stats_column_names:
        all_stats.append(sheet1[stat_name])
    for i in range(len(all_stats[0])):
        for j in range(len(all_stats)-2):
            percent = 0
            if (j == len(all_stats)-3):
                percent = float(all_stats[j+1][i]) / float(all_stats[j][i])
            else:
                percent = float(all_stats[j][i]) / 5.0
            data = {
                'user': names[i],
                'eval_date': all_stats[-1][i],
                'stat_group': stat_groups[j],
                'percent': percent*100
            }
            if (j == len(all_stats)-3):
                data['max'] = float(all_stats[j][i])
            db.collection(u'stats').document().set(data)