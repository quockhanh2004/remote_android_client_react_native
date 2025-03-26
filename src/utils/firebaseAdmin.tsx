import admin from 'firebase-admin';
import serviceAccount from '../../server-service.json';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount), // Ép kiểu về đúng type
  });
}

export const getFCMToken = async () => {
  try {
    const accessToken = await admin.credential
      .cert(serviceAccount as admin.ServiceAccount)
      .getAccessToken();
    console.log('🔑 Access Token:', accessToken);
    return accessToken;
  } catch (error) {
    console.error('❌ Lỗi lấy Access Token:', error);
    return null;
  }
};
