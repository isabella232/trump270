#!/usr/bin/env python

"""
Commands related to syncing copytext from Google Docs.
"""

import app_config
import logging

from fabric.api import task
from oauth import get_document

logging.basicConfig(format=app_config.LOG_FORMAT)
logger = logging.getLogger(__name__)
logger.setLevel(app_config.LOG_LEVEL)


@task(default=True)
def update():
    """
    Downloads a Google Doc as an Excel file.
    """
    get_document(app_config.COPY_GOOGLE_DOC_KEY, app_config.COPY_PATH)
    get_document(app_config.DATA_GOOGLE_DOC_KEY, app_config.DATA_PATH)
