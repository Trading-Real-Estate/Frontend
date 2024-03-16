// getMessageLogin.js
import User from "../Models/userModel.js";

const getMessageLogin = async (req, res) => {
  try {
    const { address } = req.body;
    // Kiểm tra người dùng tồn tại
    let user = await User.findOne({ wallet_address: address }).maxTimeMS(15000);
    let nonce;
    if (!user || !user.nonce) {
      // Tạo số ngẫu nhiên (nonce)
      nonce = Math.floor(Math.random() * 1000000);
      if (!user) {
        // Người dùng không tồn tại, tạo người dùng mới
        user = new User({ wallet_address: address, nonce });
      } else {
        // Người dùng tồn tại nhưng không có số nonce, cập nhật số nonce cho người dùng
        user.nonce = nonce;
      }
      // Lưu người dùng vào cơ sở dữ liệu
      await user.save();
    } else {
      // Người dùng đã tồn tại, lấy số nonce hiện có
      nonce = user.nonce;
    }
    // Trả về số nonce cho frontend để tạo thông điệp đăng nhập
    res.json({ nonce });
    console.log('so nonce', nonce)
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error });
  }
}

export default getMessageLogin;
