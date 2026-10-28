
import * as SQLite from 'expo-sqlite';

// Open the local database on the Android device.
const DATABASE_NAME = 'studymate_kids.db';

export async function initializeDatabase(): Promise<void> {
  const db = await SQLite.openDatabaseAsync(DATABASE_NAME);

  // Enable foreign keys to keep related records consistent.
  await db.execAsync('PRAGMA foreign_keys = ON;');

  // Create tables only if they do not already exist.
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS parents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      birth_year INTEGER NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS children (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      parent_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      age INTEGER NOT NULL,
      avatar_id TEXT NOT NULL,
      stars INTEGER NOT NULL DEFAULT 0,
      coins INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (parent_id) REFERENCES parents(id)
    );

    CREATE TABLE IF NOT EXISTS app_settings (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      active_child_id INTEGER,
      onboarding_completed INTEGER NOT NULL DEFAULT 0,
      FOREIGN KEY (active_child_id) REFERENCES children(id)
    );

    INSERT OR IGNORE INTO app_settings (
      id,
      onboarding_completed
    ) VALUES (1, 0);
  `);

  await db.closeAsync();
}

export type ChildProfileData = {
  name: string;
  age: number;
  avatarId: string;
};

export async function saveFamily(
  email: string,
  birthYear: number,
  children: ChildProfileData[]
): Promise<void> {
  if (
    !email.trim() ||
    !Number.isInteger(birthYear) ||
    children.length < 1 ||
    children.length > 2
  ) {
    throw new Error('Invalid family information');
  }

  const db = await SQLite.openDatabaseAsync(DATABASE_NAME);

  try {
    await db.withTransactionAsync(async () => {
      const existingParent = await db.getFirstAsync<{ id: number }>(
        'SELECT id FROM parents LIMIT 1'
      );

      if (existingParent) {
        throw new Error('A family already exists on this device');
      }

      const parentResult = await db.runAsync(
        'INSERT INTO parents (email, birth_year) VALUES (?, ?)',
        [email.trim(), birthYear]
      );

      const parentId = parentResult.lastInsertRowId;
      let firstChildId: number | null = null;

      for (const child of children) {
        const childResult = await db.runAsync(
          `INSERT INTO children
           (parent_id, name, age, avatar_id)
           VALUES (?, ?, ?, ?)`,
          [
            parentId,
            child.name.trim(),
            child.age,
            child.avatarId,
          ]
        );

        if (firstChildId === null) {
          firstChildId = childResult.lastInsertRowId;
        }
      }

      await db.runAsync(
        `UPDATE app_settings
         SET active_child_id = ?,
             onboarding_completed = 1
         WHERE id = 1`,
        [firstChildId]
      );
    });
  } finally {
    await db.closeAsync();
  }
}

export type SavedChild = {
  id: number;
  parent_id: number;
  name: string;
  age: number;
  avatar_id: string;
  stars: number;
  coins: number;
};

export type SavedFamily = {
  parent: {
    id: number;
    email: string;
    birth_year: number;
  };
  children: SavedChild[];
  activeChildId: number;
};

export async function loadFamily(): Promise<SavedFamily | null> {
  const db = await SQLite.openDatabaseAsync(DATABASE_NAME);

  try {
    const settings = await db.getFirstAsync<{
      active_child_id: number | null;
      onboarding_completed: number;
    }>(
      `SELECT active_child_id, onboarding_completed
       FROM app_settings
       WHERE id = 1`
    );

    if (!settings || settings.onboarding_completed !== 1) {
      return null;
    }

    const parent = await db.getFirstAsync<{
      id: number;
      email: string;
      birth_year: number;
    }>(
      'SELECT id, email, birth_year FROM parents LIMIT 1'
    );

    if (!parent) {
      throw new Error('Onboarding is complete but parent data is missing');
    }

    const children = await db.getAllAsync<SavedChild>(
      `SELECT id, parent_id, name, age, avatar_id, stars, coins
       FROM children
       WHERE parent_id = ?
       ORDER BY id`,
      [parent.id]
    );

    if (children.length === 0) {
      throw new Error('Onboarding is complete but no children were found');
    }

    const activeChildExists = children.some(
      (child) => child.id === settings.active_child_id
    );

    const activeChildId = activeChildExists
      ? settings.active_child_id!
      : children[0].id;

    return {
      parent,
      children,
      activeChildId,
    };
  } finally {
    await db.closeAsync();
  }
}
