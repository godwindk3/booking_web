# Booking web app
## Hướng dẫn chạy và cài đặt

- Cài đặt các thư viện cần thiết:
    - Backend:
        - cd vào folder backend: cd backend
        - Chạy lệnh: pip install -r requirements.txt
    
    - Frontend:
        - cd vào folder front-end-web: cd front-end-web
        - Chạy lệnh: npm install
- Cách tạo file .env (Đã có ví dụ trong .env.example)
  - DB_USER_NAME= nhập tên người dùng database(postgres) ví dụ : DB_USER_NAME=postgres
  - DB_HOST= địa chỉ url ví dụ : DB_HOST=localhost
  - DB_NAME= tên databse ví dụ : DB_NAME=booking
  - DB_PASSWORD= mật khẩu database ví dụ : DB_PASSWORD=Matkhau123
  - DB_PORT= cổng post của server ví dụ : DB_PORT=5432
  - SQL_DB_URL=postgresql://${DB_USER_NAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}
  - IMAGES_FOLDER_NAME=images

- Chạy App:
    - Window: .\run.bat
    - Ubuntu: 
        - chmod +x run_client.sh
        - chmod +x run_server.sh
        - chmod +x run.sh

        - bash run.sh




    

