# awsk8
Automate k8 on ec2 with CF + kops

# initial plan:
- use ansible or terraform?
- how to put data on s3 which is not created?
- how to remove s3 after all?
- how to remove the s3 and other components?

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
