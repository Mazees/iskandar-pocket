import Dexie, { type EntityTable } from 'dexie';

export interface ChatMessage {
  id: string; // Menggunakan id sebagai string (Date.now().toString())
  role: 'user' | 'ai';
  content: string;
  thought?: string;
  tools?: any[];
  timestamp: number;
}

const db = new Dexie('IskandarPocketChatDB') as Dexie & {
  messages: EntityTable<ChatMessage, 'id'>;
};

// Skema database
db.version(1).stores({
  messages: 'id, timestamp' // Primary key dan indexed props
});

export { db };
