const db = require("./db");

const createPostsTableQuery = `
  CREATE TABLE IF NOT EXISTS posts (
    post_uid UUID DEFAULT uuid_generate_v4() NOT NULL,
    owner_uid TEXT NOT NULL,
    image_url TEXT NOT NULL,
    status TEXT,
    posted_date TEXT NOT NULL,
    likers ARRAY,
    post_id UUID DEFAULT uuid_generate_v4(),
    dislikers ARRAY
);
`;

const createUsersTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    uid UUID DEFAULT uuid_generate_v4() NOT NULL,
    email TEXT,
    username TEXT,
    profile_image_url TEXT,
    joined_date TEXT,
    followers ARRAY,
    following ARRAY,
    saved_posts_uids ARRAY,
    password TEXT,
    bio TEXT
);
`;

const createNotificationsTableQuery = `
  CREATE TABLE IF NOT EXISTS notifications (
    notification_uid UUID DEFAULT uuid_generate_v4() NOT NULL,
    notification TEXT,
    owner_uid TEXT,
    interactor_uid TEXT,
    post_uid TEXT,
    date TEXT,
    comment_uid TEXT
);
`;

const createCommentsTableQuery = `
  CREATE TABLE IF NOT EXISTS comments (
    comment_uid UUID DEFAULT uuid_generate_v4() NOT NULL,
    comment TEXT,
    commenter_uid TEXT,
    post_uid TEXT,
    post_owner_uid TEXT,
    posted_date TEXT,
    likers Array
);
`;

async function createTables() {
  try {
    // Execute the CREATE TABLE queries
    await db.query(createPostsTableQuery);
    await db.query(createNotificationsTableQuery)
    await db.query(createUsersTableQuery)
    await db.query(createCommentsTableQuery)

    console.log('All the tables created successfully!');
  } catch (error) {
    console.error('Error creating table:', error);
  } finally {
  }
}

createTables();
