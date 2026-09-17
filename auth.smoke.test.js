// auth.smoke.test.js
const { login } = require("./auth");

describe("Smoke Test - Authentication", () => {
  test("Đăng nhập thành công với tài khoản hợp lệ (admin / 123)", () => {
    const result = login("admin", "123");
    expect(result).toBe(true);
  });
});
