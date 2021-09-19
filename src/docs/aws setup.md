### login to https://console.aws.amazon.com/

- s3 storage
- create bucket with any name say twitterbucket, select nearest region (eg mumbai)
- go to iam service in aws https://console.aws.amazon.com/iamv2/home#/policies
- create policy --> with read and write access given, resources-> select all resources
- go to https://console.aws.amazon.com/iamv2/home#/users
- add user (twitter)
  - Access key - Programmatic access(select this option)
  - set permission - Attach existing policies directly - s3demopolicy(the policy you created in prev. step)
