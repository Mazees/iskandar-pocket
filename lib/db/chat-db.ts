import Dexie, { type EntityTable } from 'dexie';

export interface ChatMessage {
  id: string; // Menggunakan id sebagai string (Date.now().toString())
  role: 'user' | 'ai';
  content: string;
  thought?: string;
  tools?: any[];
  timestamp: number;
  session?: 'public' | 'admin';
}

const db = new Dexie('IskandarPocketChatDB') as Dexie & {
  messages: EntityTable<ChatMessage, 'id'>;
};

// Skema database
db.version(1).stores({
  messages: 'id, timestamp' // Primary key dan indexed props
});

db.version(2).stores({
  messages: 'id, session, timestamp'
}).upgrade(tx => {
  return tx.table("messages").toCollection().modify(msg => {
    // Default lama kita anggap admin agar tidak hilang (opsional)
    msg.session = msg.session || 'admin';
  });
});

export { db };
