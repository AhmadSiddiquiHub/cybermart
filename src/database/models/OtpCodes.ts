import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('otp_codes')
export class OtpCodes {
  @PrimaryColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'user_id' })
  public userId: number;

  @PrimaryColumn({ name: 'api_name' })
  public apiName: string;

  @Column({ name: 'mobile_otp' })
  public mobileOtp: number;

  @Column({ name: 'email_otp' })
  public emailOtp: number;

  @Column({ name: 'expired_at' })
  public expiredAt: string;

  @Column({ name: 'is_verified' })
  public isVerified: number;

  @Column({ name: 'fail_otp_attempts' })
  public failOtpAttempts: number;

  @Column({ name: 'blocked_at' })
  public blockedAt: string;
}
