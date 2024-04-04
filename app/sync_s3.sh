#!/bin/bash
APP_NAME=${1:-temp-app}
S3_BUCKET_NAME=${2:-s3://mephisto-data}
LOG_TIME=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

mephisto_data_root="/mephisto/data/results"

FOLDER_NAME="$APP_NAME-$LOG_TIME"

echo "[$(date)] Syncing $mephisto_data_root to $S3_BUCKET_NAME/data-v2/$FOLDER_NAME!"
aws s3 sync $mephisto_data_root $S3_BUCKET_NAME/data-v2/$FOLDER_NAME --profile mpt

echo "[$(date)] Sync complete!"