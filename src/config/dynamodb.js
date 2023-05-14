import dynamoose from "dynamoose";

// Create new DynamoDB instance
const ddb = new dynamoose.aws.ddb.DynamoDB({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

// Set DynamoDB instance to the Dynamoose DDB instance
export const name = "rex";
export default dynamoose.aws.ddb.local();
