# CRM Dev

A simple CRM (Customer Relationship Management) development project.

## Features

- Contact management
- Lead tracking
- Task scheduling
- Reporting and analytics

## Getting Started

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/crm-dev.git
    ```
2. Install dependencies:
    ```bash
    cd crm-dev
    npm install
    ```
3. Start the development server:
    ```bash
    npm start
    ```

## connect backend with react native

⚙️ Backend Setup (FastAPI)

1.Navigate to the backend directory where your main.py is located:
            ------> cd api/src
2.Run the backend server with:
           ---> uvicorn main:app --host 0.0.0.0 --port 8000 --reload
           
🧠 Why 0.0.0.0 instead of 127.0.0.1?
When running on mobile, using 127.0.0.1 or localhost won’t work because that refers to the phone’s own loopback.
Instead, 0.0.0.0 exposes your backend to your local network, so your phone can access it using your laptop/desktop’s IP address.

 ##🔌 Connect React Native to FastAPI
 
 1.Open this file in the frontend project:
        --------> crm-mobile/apiconfig.js
 2.Replace the API base URL with your local machine’s IP address:
       -----------> const LOCAL_URL = "http://10.0.0.25:8000/api"; // Replace with your own IP address
       
✅ To find your local IP address:
On Windows: ipconfig
On macOS/Linux: ifconfig or ip a


##🐞 Debugging React Native on Mobile
To view logs (console.log, console.debug, etc.):
Open Expo Go on your phone.
Shake the device or press Ctrl + M / Cmd + M (on emulator).
Tap “Open JS Debugger”.
A browser window will open — logs will appear in the browser DevTools console and in your terminal.


##💡 Troubleshooting
❌ Network Request Failed?
Check that the IP address in apiconfig.js is correct.
Ensure the backend is running with --host 0.0.0.0.
Confirm that no firewall or VPN is blocking local traffic.
Make sure both the mobile device and development machine are on the same network.


## Contributing

Contributions are welcome! Please open issues or submit pull requests.

## License

This project is licensed under the MIT License.
