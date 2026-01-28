
<img width="717" height="74" alt="PMS-v2 Logo - Działki" src="https://github.com/user-attachments/assets/dcb5d527-47fb-48a7-9339-73f7b839adcb" />

# PMS-v2 (property management system version 2.0)
## 📂 About project:
Project is a ```web fullstack database management system``` created using ```MySql, Node.js, Express.js, React.js, Tailwind```  
Project is a better version of ```property management system(system for managing lands, rents, owners, and properties of them)```, better design, logic, UI  
Project includes sending rents ending reports, backup creating, automatic database creation, integration with ORM(Sequelize), rate limit
## ⚙️ Run Project
- You must install ```node.js``` and ```npm``` to run this project
- Clone this repository using:
```
git clone https://github.com/Kamil-Kijak/pms-v2.git
```
- Enter to cloned repository and install dependencies using:
```
npm install
```
- You need also install dependencies in ```frontend application```
- Enter to ```app``` directory and install install dependencies using:
```
npm install
```
- Run this project using:
```
npm run dev
```
- Use this in backend section and also to run vite server in ```app``` directory
- Project will start using ```vite.js``` and can be avaiable on ```localhost:5173``` adress
## 🖋️ Project config
```.env``` file structure
```.env
DB_NAME=<database name default 'pms'>
DB_HOST=<database host default 'localhost'>
DB_USER=<database user default 'root'>
DB_PASSWORD=<user database password default ''>
DEVELOPMENT=<not hosting static files default '0'>
APP_PORT=<application port default '3000'>
COOKIE_SECURITY=<cookie security in backend default '0'>
REFRESH_TOKEN_KEY=<refresh token key default 'inWhm0r9gfwJ_s07KEYrX'>
ACCESS_TOKEN_KEY=<access token key default 'K1BjP6-xTEAS8uKoq1vNm'>
SALT_OR_ROUNDS=<number of rounds(bcrypt) default '12'>
LAND_FILES_FOLDER=<folder of land files operating default 'landFiles'>
FILE_MAX_SIZE=<max upload file size default '10485760'>
REQUESTS_PER_MINUTE=<limited request per minute default '1000'>
MAIL_HOST=<mail host default ''>
MAIL_PORT=<mail port default '110'>
MAIL_USER=<mail user default 'name.surname@domain.com'>
MAIL_PASSWORD=<mail user password default '123456'>
MAIL_ADMIN=<target mail for sending reports default 'name.surname@domain.com'>
BACKUP_DIR=<folder for DB backups default './backups'>
CRON_EXPRESSION=<cron expression for sending report creating backup default '0 12 * * 1'>
```
## 🖼️ Project screens
<img width="1920" height="995" alt="Screenshot 2026-01-28 at 16-13-25 PMS-v2 - Działki" src="https://github.com/user-attachments/assets/5fefb0f4-0624-460b-b7b0-c21d89de7fa8" />
<img width="1920" height="923" alt="Screenshot 2026-01-28 at 16-11-19 PMS-v2 - Działki" src="https://github.com/user-attachments/assets/9b7d3c5b-be55-4bd1-9527-448de583bc97" />
<img width="1920" height="923" alt="Screenshot 2026-01-28 at 16-10-56 PMS-v2 - Właściciele" src="https://github.com/user-attachments/assets/5853bc20-aa45-4fbe-8ef8-5f9c8fbff0a8" />
<img width="1920" height="923" alt="Screenshot 2026-01-28 at 16-09-27 PMS-v2 - Plany ogólne" src="https://github.com/user-attachments/assets/6af0ca1f-3799-4583-8412-1bf223b6eda1" />


## 👦 Authors
- Kamil Kijak ```(solo developer)```

## Project protected using Apache license 2.0
