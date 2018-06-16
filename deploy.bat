##!/bin/bash

## dev:   ./deploy.sh
## prod:  ./deploy.sh prod
## STAGE=${1:-dev}
## PROJECT=aws-heroes-$STAGE

## Change the suffix on the bucket to something unique!
## BUCKET=$PROJECT-sree

## make a build directory to store artifacts
## rm -rf build
## mkdir build

## make the deployment bucket in case it doesn't exist
aws s3 mb s3://aws-heros

## generate next stage yaml file
aws cloudformation package                   \
    --template-file template.yaml            \
    --output-template-file build/output.yaml \
    --s3-bucket aws-heros                      

## the actual deployment step
aws cloudformation deploy                     \
    --template-file build/output.yaml         \
    --stack-name aws-heros-dev                     \
    --capabilities CAPABILITY_IAM             \
    --parameter-overrides Environment=dev


