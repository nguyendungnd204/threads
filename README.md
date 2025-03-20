Xây Dựng Ứng Dụng Threads Clone với React Native

Giới Thiệu

Project này là một bản sao của ứng dụng Threads, được xây dựng bằng React Native với sự hỗ trợ của các công nghệ hiện đại như Convex, Clerk, Sentry, và Expo. Mục tiêu của project là tạo ra một ứng dụng mạng xã hội đơn giản nhưng mạnh mẽ, cho phép người dùng đăng bài, tương tác, và nhận thông báo.

Các Tính Năng Chính

Đăng Nhập & Xác Thực Người Dùng:

Sử dụng Clerk để quản lý xác thực người dùng.

Bảo vệ các trang với Expo Router và Clerk authentication.

Quản Lý Dữ Liệu:

Kết nối ứng dụng với Convex để quản lý dữ liệu thời gian thực.

Sử dụng Convex HTTP Actions và Clerk Webhooks để xử lý các yêu cầu HTTP.

Giao Diện Người Dùng:

Thanh tab với nút hành động tùy chỉnh.

Component phóng to ảnh.

Giao diện người dùng Profile với khả năng cập nhật thông tin.

Trình soạn thảo Thread và khả năng thêm hình ảnh vào bài đăng.

Tương Tác Người Dùng:

Feed với phân trang.

Chức năng like bài viết và hiệu ứng cuộn.

Để lại bình luậu trên các bài viết.

Thông Báo:

Tích hợp Expo Push Notifications để gửi thông báo đẩy.

Debugging & Profiling:

Sử dụng Sentry để debug và profile ứng dụng.

Công Nghệ Sử Dụng

React Native: Framework để xây dựng ứng dụng di động đa nền tảng.

Expo: Công cụ để phát triển ứng dụng React Native với các tính năng như file-based routing và push notifications.

Convex: Backend-as-a-service để quản lý dữ liệu thời gian thực.

Clerk: Dịch vụ xác thực người dùng.

Sentry: Công cụ để theo dõi lỗi và hiệu suất ứng dụng.