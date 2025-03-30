### **Setting Up and Using BrowserSync** - Needed to display the files on a local server for access to app or for troubleshooting  

#### **1. Install BrowserSync**
Ensure you have **Node.js** installed, then install BrowserSync globally:  
```sh
npm install -g browser-sync
```

Or install it locally for a project:  
```sh
npm install browser-sync --save-dev
```

---

#### **2. Run BrowserSync for a Static Site**
If you have an `index.html` file in a folder (e.g., `myproject`), start a local server:  
```sh
browser-sync start --server --files "myproject/**/*"
```
- `--server`: Starts a local server  
- `--files "myproject/**/*"`: Watches for file changes
Or you can use
```
browser-sync start --server --directory --files "**/*"
```

---

#### **3. Use BrowserSync with a Proxy (e.g., for a backend)**
If you're working with a local backend (e.g., running on `http://localhost:3000`), use:  
```sh
browser-sync start --proxy "localhost:3000" --files "**/*"
```
This reloads when files change.

---

#### **4. Use BrowserSync in `package.json` (for automation)**
Add a script:  
```json
"scripts": {
  "start": "browser-sync start --server --files 'src/**/*'"
}
```
Run it with:  
```sh
npm run start
```

---

#### **5. Stop BrowserSync**
Press `CTRL + C` in the terminal.

That's it! 🎉 Now your changes will automatically reload in the browser. 🚀
