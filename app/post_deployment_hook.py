import os

APP_NAME = os.getenv('APP_NAME', 'temp')
APP_ENV = os.getenv('APP_ENV', 'dev')
def handle(*args):
    # run clean_up.sh script, the script is in the same directory as this file
    print("Running post deployment hook")

    os.system(f"sh {os.path.dirname(os.path.realpath(__file__))}/clean_up.sh")

    if APP_NAME == 'temp' and APP_ENV == 'dev':
        print("APP_NAME is not set, skipping sync_s3.sh")
        return

    # run sync_s3.sh script, the script is in the same directory as this file
    os.system(f"sh {os.path.dirname(os.path.realpath(__file__))}/sync_s3.sh {APP_NAME}")
