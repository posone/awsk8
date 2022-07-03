# awsk8
Automate k8 on ec2 with CF + kops

# initial plan:
- use ansible or terraform?
- github integration - public repo/token/oauth?
- how to put data on s3 which is not created?
- how to remove s3 after all?
- how to remove the s3 and other components?

# aws cf command:
aws cloudformation deploy --stack-name posone-cf --template-file cf.yaml --capabilities CAPABILITY_NAMED_IAM --no-fail-on-empty-changeset --profile posone

aws codebuild start-build --project-name "BuildImage-posone-cf" 

aws s3 cp s3://posone-kops-bucket/kubeconfig ~/.kube/config

aws codebuild start-build --project-name "RemBuild-posone-cf" 

aws cloudformation delete-stack --stack-name posone-cf  --profile posone
-------
Call cloudformation task from Ansible
CFN creates the bucket and in the Outputs exports the bucket name
Ansible uploads the files using s3_sync in the next task once the CFN one is done.

-------

-------
https://stackoverflow.com/questions/40383470/can-i-force-cloudformation-to-delete-non-empty-s3-bucket
You should empty the bucket:

$ aws s3 rm s3://bucket-name --recursive
Then delete the Bucket

$ aws cloudformation delete-stack --stack-name mys3stack

OR

You can create a lambda function to clean up your bucket and invoke your lambda from your CloudFormation stack using a CustomResource.

-------

Sample app:
kubectl create deployment my-nginx --image=nginx --replicas=1 --port=80;
kubectl expose deployment my-nginx -> will be available through cluster port 
kubectl expose deployment my-nginx --port=80 --type=LoadBalancer; -> will not work because there is no external DNS