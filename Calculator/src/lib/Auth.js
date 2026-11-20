
import users from "../data/users.json";
import User from "../models/User";

export const login = (username, password) => {

    // Tìm tài khoản khớp username và password
    const account = users.find(
        (item) =>
            item.username === username.trim() &&
            item.password === password
    );

    // Không tìm thấy tài khoản
    if (!account) {
        return null;
    }

    // Tạo và trả về đối tượng User
    return new User(
        account.username,
        account.password
    );
};
