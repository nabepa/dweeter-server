import dotenv from 'dotenv';
dotenv.config();

function required(key, defalutValue = undefined) {
  const value = process.env[key] || defalutValue;
  // 존재하지 않는 config인 경우 개발 단계에서 캐치
  if (value == null) {
    throw new Error(`Key ${key} is undefined`);
  }
  return value;
}
export const config = {
  // 관련있는 키끼리 묶는 것도 좋은 방법
  jwt: {
    secretKey: required('JWT_SECRET'),
    // 숫자의 경우 integer로 parsing
    expiresInSec: parseInt(required('JWT_EXPIRES_SEC', 86400)),
  },
  bcrypt: {
    saltRounds: parseInt(required('BCRYPT_SALT_ROUND', 12)),
  },
  host: {
    port: parseInt(required('HOST_PORT', 8080)),
  },
  db: {
    host: required('DB_HOST_MONGO'),
  },
};
