#!/bin/bash

mephisto register "$MTURK_TYPE" name="$MTURK_NAME" access_key_id="$MTURK_ACCESS_KEY_ID" secret_access_key="$MTURK_SECRET_ACCESS_KEY"
mephisto register prolific name=prolific api_key="$PROLIFIC_API_KEY"

python3 deploy.py