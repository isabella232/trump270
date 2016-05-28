#!/usr/bin/env python

"""
Commands that update or process the application data.
"""
import app_config
import codecs
import copytext
import json
import locale

from collections import defaultdict
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
    for row in raw_data['2012_model_turnout']:
        state_data = defaultdict(dict)
        state_data['state'] = row['state']
        for group in DATA_GROUPS:
            group_slug = slugify(group, separator='_')
            for column in DATA_COLUMNS:
                column_slug = slugify(column, separator='_')
                raw_data_column = '{0} {1}'.format(group, column)
                value = row[raw_data_column]
                try:
                    state_data[group_slug][column_slug] = locale.atof(value)
                except ValueError:
                    print('{0}: {1} could not be converted to a float'.format(raw_data_column, value))
        data.append(state_data)
    with codecs.open(app_config.PROCESSED_DATA_PATH, 'w') as f:
        json.dump(data, f)
