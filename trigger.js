// | Feature              | 🔔 **Trigger**                                                            | ⏰ **Cron Job**                                               |
// | -------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------ |
// | **Definition**       | A function that runs in response to a specific event                      | A function that runs **at a fixed time schedule**            |
// | **Triggered By**     | Events (e.g., DB change, file upload, user action)                        | Time (e.g., every 10 minutes, hourly, daily)                 |
// | **Example Use Case** | Send email when new user registers                                        | Send daily summary email at 9 AM                             |
// | **Control**          | Event-driven, dynamic                                                     | Time-driven, predictable                                     |
// | **Implementation**   | Code listens for events (e.g., via hooks, listeners, etc.)                | Uses cron expressions (`node-cron`, Linux cron, etc.)        |
// | **Used In**          | Databases (Postgres triggers), Webhooks, Event Listeners                  | System-level tasks, scheduled scripts                        |
// | **Repeatability**    | Runs **only when the event happens**                                      | Runs **repeatedly based on schedule**                        |
// | **Examples**         | - On user signup → trigger email<br>- On file upload → trigger virus scan | - Every Monday → clear logs<br>- Every 10 sec → check server |




// Simulated database (in-memory)
const users = [];

// 🎯 Event trigger function
function onUserRegister(user) {
  console.log(`✅ Triggered: Welcome email sent to ${user.email}`);
}

// 📥 Function to register a user
function registerUser(name, email) {
  const user = { name, email };
  users.push(user);

  console.log(`🆕 User Registered: ${name} (${email})`);

  // 🔔 Trigger action
  onUserRegister(user);
}

// 🔁 Simulate a user registration every 5 seconds
setInterval(() => {
  const timestamp = Date.now();
  registerUser(`User${timestamp}`, `user${timestamp}@example.com`);
}, 5000);

// Exit note
console.log('🚀 Trigger demo running. A new user will be registered every 5 seconds...');

