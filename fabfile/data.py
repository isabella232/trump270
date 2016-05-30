#!/usr/bin/env python

"""
Commands that update or process the application data.
"""
import app_config
import codecs
import copytext
import json
import locale

from fabric.api import execute, task
from slugify import slugify

locale.setlocale(locale.LC_ALL, 'en_US.UTF-8')

DATA_GROUPS = ['white man', 'white woman', 'black', 'hispanic', 'other']
DATA_COLUMNS = ['r pct', 'd pct', 'turnout', 'eligible voters']


@task(default=True)
def update():
    """
    Update app-specific data.
    """
    execute('data.make_json_data')


@task
def make_json_data():
    raw_data = copytext.Copy(app_config.DATA_PATH)
    data = []
    groups = []

    for i, row in enumerate(raw_data['2012_model_turnout']):
        state_data = {
            'state': row['state'],
            'electoral_votes': int(float(row['electoral votes'])),
            'demographics': [],
        }

        for group in DATA_GROUPS:
            group_slug = slugify(group, separator='_')
            group_data = {
                'demographic': group_slug,
            }

            for column in DATA_COLUMNS:
                column_slug = slugify(column, separator='_')
                raw_data_column = '{0} {1}'.format(group, column)
                value = row[raw_data_column]
                group_data[column_slug] = locale.atof(value)
                if i == 0:
                    groups.append(raw_data_column)

            state_data['demographics'].append(group_data)

        data.append(state_data)

    with codecs.open(app_config.PROCESSED_DATA_PATH, 'w') as f:
        json.dump({
            'data': data,
            'groups': groups,
        }, f)
