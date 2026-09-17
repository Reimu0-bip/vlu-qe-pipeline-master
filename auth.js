// auth.js
// ==========================================
// Feature Branch Update: Bổ sung ghi chú kiểm tra định dạng
// Cập nhật ngày: 17/09/2026
// ==========================================
//aaaaaaaa
// Giả lập cơ sở dữ liệu tài khoản
const USERS_DB = {
  admin: {
    password: "9999",
    isLocked: false
  },
  locked_user: {
    password: "123",
    isLocked: true
  }
};

/**
 * Hàm xác thực đăng nhập
 * @param {string} username 
 * @param {string} password 
 * @returns {boolean} true nếu thành công
 * @throws {Error} Nếu dữ liệu không hợp lệ hoặc đăng nhập thất bại
 */
function login(username, password) {
  // 1. Kiểm tra username rỗng hoặc không đúng định dạng chuỗi
  if (typeof username !== "string" || username.trim() === "") {
    throw new Error("Username không được để trống");
  }

  // 2. Kiểm tra password rỗng
  if (typeof password !== "string" || password === "") {
    throw new Error("Password không được để trống");
  }

  // 3. Kiểm tra ký tự đặc biệt nguy hiểm trong mật khẩu (ví dụ minh họa ràng buộc bảo mật)
  const forbiddenCharsRegex = /['";<>]/;
  if (forbiddenCharsRegex.test(password)) {
    throw new Error("Mật khẩu chứa ký tự không hợp lệ");
  }

  // 4. Tìm kiếm tài khoản trong DB
  const user = USERS_DB[username];
  if (!user) {
    throw new Error("Tài khoản không tồn tại");
  }

  // 5. Kiểm tra trạng thái tài khoản
  if (user.isLocked) {
    throw new Error("Tài khoản đã bị khóa");
  }

  // 6. Kiểm tra mật khẩu
  if (user.password !== password) {
    throw new Error("Sai mật khẩu");
  }

  return true;
}

module.exports = { login };
