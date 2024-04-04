

---

# Index

1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Notes](#notes)
4. [How to Start](#how-to-start)
    - [Creating a New Repo](#creating-a-new-repo)
    - [Configuring Environment Variables in GitHub Actions](#how-to-configure-environment-variables-in-github-actions)
    - [Local Deployment](#local-deployment)
    - [Test Deployment](#test-deployment)
    - [Production Deployment](#production-deployment)
    - [Prolific Deployment](#prolific-deployment)

---

# Introduction :book:

This README provides an overview of the deployment flow for the project generated from the [Mephisto template](https://github.com/d-lab/mephisto).

# Prerequisites :white_check_mark:

You also need to install the following tools:
- Docker (Desktop)

# Notes :notebook:

Please read the below notes carefully before starting your work:

- The practical deployment flow: local -> test -> prod
  - Branch `deployment-test` for test/staging env
  - Branch `deployment-prod` for production env 

- Refer to [Mephisto Documentation](https://mephisto.ai/docs/guides/tutorials/first_task/) for other configuration details.
- Please ensure that you have changed the `taskname` in `hydra_config` in `test.yml` and `prod.yml`. 
  - Note that Heroku app names for each cannot be duplicated and cannot exceed 30 characters.
  - We are now deploying to EC2 instead of Heroku.
  - The `task_name` and `subdomain` should be similar to the repo name to make it easier to track.
- There are some configs in `hydra_config` that are very sensitive and related to cost. Please discuss with your manager before changing them.
  - `units_per_assignment`: number of units per assignment
  - `task_reward`: reward per unit

# How to Start :triangular_flag_on_post:

## Creating a New Repo

1. Create a new repo from `d-lab/mephisto` template with the `deployment` branch.
2. Clone the new repo to your local machine.
3. Switch to the `deployment` branch.

## Local Deployment :hammer:

1. Start from the `deployment` branch.
2. Change directory to `app` directory.
3. Run `make build` to freshly build the Docker image for the first time.
4. Run `make run` to start the local server.
5. Run `make watch` to build and watch the frontend.
6. Start implementing your task in `webapp/src`.

# Deployment :shipit:

## Prerequisites before Deployment :desktop_computer:
Before deploying, you must set the following variables/secrets in your GitHub Actions environment:

- `AWS_ACCESS_KEY_ID` (mephisto-ec2 access key)
- `AWS_SECRET_ACCESS_KEY` (mephisto-ec2 secret key)

## How to Configure Environment Variables in GitHub Actions

1. You must be the owner of the repo to configure the environment variables.
2. Go to Settings -> Secrets and variables -> Actions.
3. Add a new repository secret.

## Test Deployment :test_tube:

1. Once you are happy with your local version.
2. Make sure to configure the `hydra_config` in **test.yml** and environment variables in GitHub Actions.
3. Create a new branch from your current `deployment` branch and name it `deployment-test`.
4. Push your changes to the `deployment-test` branch to remote.
5. View your deployment status in GitHub Actions.

## Production Deployment :rocket:

1. Make sure to configure the `hydra_config` in **prod.yml** and environment variables in GitHub Actions.
2. Create a new branch from your current `deployment` branch and name it `deployment-prod`.
3. Push your changes to the `deployment-prod` branch to remote.
4. Check GitHub Actions log for the deployment status and the production path to access the task.

## Prolific Deployment :rocket:
- We only have production deployment for Prolific.
- Example in `app/hydra_configs/conf/prod_prolific.yaml`.
- Prolific only uses EC2 architecture.
- Make sure to configure `PROLIFIC_API_KEY`.
- Edit `prolific_workspace_name` and `prolific_project_name` to map with workspace and project in prolific account.
  - You have to configure finance in that target workspace before deployment.

---