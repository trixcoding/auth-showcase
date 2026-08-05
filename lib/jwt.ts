import { SignJWT, jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);
const JWT_DURATION = '15m'; // Access token کوتاه‌عمر
const REFRESH_DURATION = '7d';

export interface JwtPayload {
  userId: number;
    email: string;
    }

    export async function signAccessToken(payload: JwtPayload): Promise<string> {
      return new SignJWT({ ...payload })
          .setProtectedHeader({ alg: 'HS256' })
              .setIssuedAt()
                  .setExpirationTime(JWT_DURATION)
                      .sign(secret);
                      }

                      export async function signRefreshToken(payload: JwtPayload): Promise<string> {
                        return new SignJWT({ ...payload })
                            .setProtectedHeader({ alg: 'HS256' })
                                .setIssuedAt()
                                    .setExpirationTime(REFRESH_DURATION)
                                        .sign(secret);
                                        }

                                        export async function verifyToken(token: string): Promise<JwtPayload | null> {
                                          try {
                                              const { payload } = await jwtVerify(token, secret);
                                                  return payload as unknown as JwtPayload;
                                                    } catch {
                                                        return null;
                                                          }
                                                          }