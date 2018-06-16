  var AWS = require("aws-sdk");
  let awsConfig = {
    "region": "us-east-2",
    "endpoint": "https://dynamodb.us-east-2.amazonaws.com"
  };

  AWS.config.update(awsConfig);
  console.log('before docClient...');

  let docClient = new AWS.DynamoDB.DocumentClient();
  let fetchByKey = function() {
    
    var params = {
      TableName: 'heros',
      Key: {
		    "id": 3
	    }
    };
    
    console.log('before get...');
    docClient.get(params, function(err, data){
      
      if(err){
        console.log('Heros:fetchByKey: error - ' + JSON.stringify(err, null, 2));  
      }else{
        console.log('Heros:fetchByKey: success - ' + JSON.stringify(data, null, 2));  
      }
      
    })
  }
