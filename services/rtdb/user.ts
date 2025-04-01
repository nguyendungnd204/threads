// services/rtdb/user.ts
import { ref, set, update, get, query, orderByChild, equalTo } from "firebase/database";
import { database } from "../../FirebaseConfig";

// Tạo user mới
export const createUser = async (userId: string, userData: any) => {
  await set(ref(database, `users/${userId}`), {
    ...userData,
    followers: {},
    following: {},
    createdAt: Date.now(),
    updatedAt: Date.now()
  });
};

// Lấy thông tin user
export const getUser = async (userId: string) => {
  const snapshot = await get(ref(database, `users/${userId}`));
  return snapshot.val();
};

// Theo dõi user khác
export const followUser = async (followerId: string, followingId: string) => {
  await update(ref(database), {
    [`users/${followerId}/following/${followingId}`]: true,
    [`users/${followingId}/followers/${followerId}`]: true
  });
};