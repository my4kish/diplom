import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FileService {
  constructor(private readonly configService: ConfigService) {}

  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
  });

  async upload(key: string, buffer: Buffer) {
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: 'arlan-diplom-bucket',
        Key: key,
        Body: buffer,
      }),
    );
  }

  async delete(key: string) {
    await this.s3Client.send(
      new DeleteObjectCommand({
        Bucket: 'arlan-diplom-bucket',
        Key: key,
      }),
    );
  }
}
