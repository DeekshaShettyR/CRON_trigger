// cron-task.js

const cron = require('node-cron');
const axios = require('axios');
const fs = require('fs');

// 🟢 Initial log
console.log('✅ Cron job project started. It will run every 5 seconds, every hour, and every 2 minutes.\n');

// 🧠 Common job logic
async function fetchAndSavePosts(triggerSource) {
  const now = new Date().toLocaleString();
  console.log(`⏰ [${now}] Triggered by: ${triggerSource}`);

  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const posts = response.data.slice(0, 5); // first 5 posts
    fs.writeFileSync('data.json', JSON.stringify(posts, null, 2));
    console.log(`✅ ${triggerSource}: Fetched and saved ${posts.length} posts to data.json\n`);
  } catch (error) {
    console.error(`❌ ${triggerSource}: Error fetching data - ${error.message}\n`);
  }
}

// 🔁 Every 5 seconds
cron.schedule('*/5 * * * * *', () => fetchAndSavePosts('Every 5 Seconds'));

// 🕒 Every 1 hour (at minute 0)
cron.schedule('0 * * * *', () => fetchAndSavePosts('Every Hour'));

// ⏱️ Every 2 minutes
cron.schedule('*/2 * * * *', () => fetchAndSavePosts('Every 2 Minutes'));









// ### 🕒 **Cron Expression Cheat Sheet (Node.js / node-cron)**

// | Field Position | Field Name       | Allowed Values   | Example | Meaning          |
// | -------------- | ---------------- | ---------------- | ------- | ---------------- |
// | 1st            | **Second**       | 0–59             | `*/5`   | Every 5 seconds  |
// | 2nd            | **Minute**       | 0–59             | `30`    | At 30th minute   |
// | 3rd            | **Hour**         | 0–23             | `14`    | At 2 PM          |
// | 4th            | **Day of Month** | 1–31             | `1`     | 1st of the month |
// | 5th            | **Month**        | 1–12             | `7`     | July             |
// | 6th            | **Day of Week**  | 0–7 (Sun=0 or 7) | `1`     | Monday           |

// ---

// ### ✅ **Common Cron Expressions**

// | Purpose                  | Cron Expression | Description                  |
// | ------------------------ | --------------- | ---------------------------- |
// | Every second             | `* * * * * *`   | Runs every second            |
// | Every 5 seconds          | `*/5 * * * * *` | Every 5 seconds              |
// | Every minute             | `0 * * * * *`   | Every minute                 |
// | Every 2 minutes          | `0 */2 * * * *` | Every 2 minutes              |
// | Every hour               | `0 0 * * * *`   | At the start of every hour   |
// | Daily at 9:00 AM         | `0 0 9 * * *`   | Every day at 9:00 AM         |
// | Every Monday at 10:30 AM | `0 30 10 * * 1` | Weekly on Monday at 10:30 AM |
// | First day of every month | `0 0 0 1 * *`   | Monthly on 1st at 12:00 AM   |

// ---

// ### 🔹 Special Symbols

// | Symbol  | Meaning                        |
// | ------- | ------------------------------ |
// | `*`     | Every possible value           |
// | `*/n`   | Every `n` units (e.g., `*/5`)  |
// | `a,b,c` | List of values (e.g., `1,2,5`) |
// | `a-b`   | Range of values (e.g., `1-5`)  |

