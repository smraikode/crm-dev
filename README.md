# 📱 CRM Dev

A simple **CRM (Customer Relationship Management)** development project.

---

## 🚀 Features

- 📇 Contact management  
- 🎯 Lead tracking  
- 📅 Task scheduling  
- 📊 Reporting and analytics  

---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/crm-dev.git
2. Install Frontend Dependencies (React Native)
bash
Copy
Edit
cd crm-dev
npm install
3. Start the React Native App
bash
Copy
Edit
npm start
Make sure you have expo-cli installed globally:

bash
Copy
Edit
npm install -g expo-cli
⚙️ Backend Setup (FastAPI)
Navigate to the backend directory where your main.py is located:

bash
Copy
Edit
cd api/src
Run the backend server with:

bash
Copy
Edit
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
🧠 Why 0.0.0.0 instead of 127.0.0.1?
When running on mobile, using 127.0.0.1 or localhost won’t work because that refers to the phone’s own loopback.
Instead, 0.0.0.0 exposes your backend to your local network, so your phone can access it using your laptop/desktop’s IP.

🔌 Connect React Native to FastAPI
Open this file:

bash
Copy
Edit
crm-mobile/apiconfig.js
Replace the API base URL with your machine’s IP address:

js
Copy
Edit
const LOCAL_URL = "http://10.0.0.25:8000/api"; // Replace with your own IP address
✅ To find your local IP address:

On Windows: ipconfig

On macOS/Linux: ifconfig or ip a

⚠️ Make sure your phone and computer are connected to the same Wi-Fi network.

🐞 Debugging React Native on Mobile
To see logs (console.debug, console.log, etc.):

Open Expo Go on your phone.

Shake the device or press Ctrl + M / Cmd + M (on emulator).

Tap “Open JS Debugger”.

A new tab will open in your browser — logs will appear in browser DevTools console and in your terminal.

💡 Troubleshooting
❌ Network request failed?
Check the following:

Your IP address in apiconfig.js is correct.

Backend is running using --host 0.0.0.0.

You're not behind a firewall or VPN blocking local traffic.

Both devices are on the same network.

📦 Add or Reinstall Dependencies
If you get missing package or module errors, run:

bash
Copy
Edit
npm install <package-name>
Example:

bash
Copy
Edit
npm install axios
npm install @react-navigation/native
Reinstall if needed:

bash
Copy
Edit
rm -rf node_modules package-lock.json
npm install
🤝 Contributing
Contributions are welcome!
Please feel free to:

Submit issues and bug reports

Create feature requests

Submit PRs

📄 License
This project is licensed under the MIT License.

