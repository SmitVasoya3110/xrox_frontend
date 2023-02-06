/* eslint-disable import/prefer-default-export */
import {
  PutObjectCommand,
  S3Client,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const AWS_SECRET = process.env.REACT_APP_AWS_SECRET
const AWS_REGION = process.env.REACT_APP_AWS_REGION
const AWS_ACCESS_KEY = process.env.REACT_APP_AWS_ACCESS_KEY
const AWS_BUCKET_NAME = process.env.REACT_APP_AWS_BUCKET_NAME

const s3Client = new S3Client({
  region: AWS_REGION,
  credentials: { accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET },
});

export const uploadFile = async (file, key) => {
  try {
    if (!file || file === undefined || !key) return;
    const { type } = file;
    if (!type) return;

    const uploadParams = {
      Bucket: AWS_BUCKET_NAME,
      Key: key,
      Body: file,
    };

    // upload file to S3
    const cmd = new PutObjectCommand({ ...uploadParams });
    const data = await s3Client.send(cmd, { expiresIn: 3600 });
    // console.log("Success", data)

    //  get uploaded file url
    const commandGet = new GetObjectCommand({
      Bucket: AWS_BUCKET_NAME,
      Key: key,
    });
    const resUrl = await getSignedUrl(s3Client, commandGet, {
      expiresIn: 3600,
    });
    const url = decodeURIComponent(resUrl.split("?")[0]);
    return { url, status: 200 };
  } catch (error) {
    console.error("uploadFile->\n", error);
    // return { status: 500, message: "Something went wrong!", error };
    return error;
  }
};
