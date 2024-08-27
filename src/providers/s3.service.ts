import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { IConfig } from '@/configs'
import { IFile } from '@/core/interfaces/file.interface'

@Injectable()
export class S3Service {
  private readonly s3Client: S3Client
  constructor(private readonly configService: ConfigService<IConfig>) {
    const { accessKeyId, secretAccessKey, region, endpoint } =
      configService.get('awsS3', {
        infer: true,
      }) ?? {}
    console.log(accessKeyId, secretAccessKey, region, endpoint)
    this.s3Client = new S3Client({
      forcePathStyle: true,
      region,
      endpoint,
      credentials: {
        accessKeyId: accessKeyId ?? '',
        secretAccessKey: secretAccessKey ?? '',
      },
    })
  }

  async uploadFileToPublicBucket(
    path: string,
    { file, fileName }: { file: IFile; fileName: string },
  ): Promise<{ location: string | undefined; key: string }> {
    const bucketName = this.configService.get('awsS3.bucket', { infer: true })
    const key = `${path}/${Date.now().toString()}-${fileName}`

    const parallelUploads3 = new Upload({
      client: this.s3Client,
      params: {
        Bucket: bucketName,
        Key: key,
        Body: Buffer.from(file.buffer),
        ACL: 'public-read',
        ContentType: file.mimetype,
      },
      queueSize: 4, // optional concurrency configuration
      partSize: 1024 * 1024 * 5, // optional size of each part, in bytes, at least 5MB
      leavePartsOnError: false, // optional manually handle dropped parts
    })

    const { Location: location } = await parallelUploads3.done()

    return {
      location: location,
      key,
    }
  }

  async deleteFileFromPublicBucket(key: string): Promise<void> {
    await this.s3Client.send(
      new DeleteObjectCommand({
        Bucket: this.configService.get('awsS3.bucket', { infer: true }),
        Key: key,
      }),
    )
  }
}
