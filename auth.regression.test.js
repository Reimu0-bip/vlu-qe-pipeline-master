// auth.regression.test.js
const { login } = require("./auth");

describe("Regression Test - Authentication Edge Cases & Exceptions", () => {
  // Test case kiểm tra mật khẩu sai
  test("Ném ra lỗi khi nhập sai mật khẩu", () => {
    expect(() => {
      login("admin", "wrong_password");
    }).toThrow("Sai mật khẩu");
  });

  // Test case kiểm tra username rỗng hoặc chỉ chứa khoảng trắng
  test("Ném ra lỗi khi username rỗng hoặc chỉ có khoảng trắng", () => {
    expect(() => {
      login("", "123");
    }).toThrow("Username không được để trống");

    expect(() => {
      login("   ", "123");
    }).toThrow("Username không được để trống");
  });

  // Test case kiểm tra mật khẩu rỗng
  test("Ném ra lỗi khi mật khẩu để trống", () => {
    expect(() => {
      login("admin", "");
    }).toThrow("Password không được để trống");
  });

  // Test case kiểm tra mật khẩu chứa ký tự đặc biệt nguy hiểm (SQL Injection / XSS patterns)
  test("Ném ra lỗi khi mật khẩu chứa ký tự cấm (' ; \" < >)", () => {
    expect(() => {
      login("admin", "123' OR 1=1");
    }).toThrow("Mật khẩu chứa ký tự không hợp lệ");

    expect(() => {
      login("admin", "<script>alert(1)</script>");
    }).toThrow("Mật khẩu chứa ký tự không hợp lệ");
  });

  // Test case kiểm tra tài khoản bị khóa
  test("Ném ra lỗi khi tài khoản đã bị khóa", () => {
    expect(() => {
      login("locked_user", "123");
    }).toThrow("Tài khoản đã bị khóa");
  });

  // Test case kiểm tra tài khoản không tồn tại
  test("Ném ra lỗi khi tên người dùng không tồn tại trong hệ thống", () => {
    expect(() => {
      login("non_existent_user", "123");
    }).toThrow("Tài khoản không tồn tại");
  });

  // Test case kiểm tra kiểu dữ liệu đầu vào không hợp lệ (null, undefined, number)
  test("Ném ra lỗi khi truyền tham số không phải là chuỗi", () => {
    expect(() => {
      login(null, "123");
    }).toThrow("Username không được để trống");

    expect(() => {
      login("admin", undefined);
    }).toThrow("Password không được để trống");
  });
});
