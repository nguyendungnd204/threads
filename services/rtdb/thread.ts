// services/rtdb/thread.ts
import { ref, set, push } from "firebase/database";
import { database } from "../../FirebaseConfig";

// Tạo thread mới
export const createThread = async (authorId: string, content: string) => {
  const threadId = push(ref(database, 'threads')).key;
  await set(ref(database, `threads/${threadId}`), {
    authorId,
    content,
    likes: {},
    comments: {},
    createdAt: Date.now()
  });
  return threadId;
};