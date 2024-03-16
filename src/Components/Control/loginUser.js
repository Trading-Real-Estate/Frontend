import User from "../Models/userModel.js";
import generateToken from '../Utils/generateToken.js';
import { getLoginMessage } from "../Utils/getLoginMessage.js";
import ethUtil from 'ethereumjs-util';
import sigUtil from 'eth-sig-util';

const loginUser = async (req, res) => {
  try {
    const { address, sign } = req.body;

    // Kiểm tra xem các trường address và sign đã được gửi đến backend chưa
    if (!address || !sign) {
      return res.status(400).json({ message: 'Địa chỉ ví và chữ ký là bắt buộc' });
    }

    // Tìm kiếm người dùng trong cơ sở dữ liệu với địa chỉ ví nhận được
    const user = await User.findOne({ wallet_address: address }).maxTimeMS(20000);

    // Kiểm tra xem người dùng có tồn tại và có số nonce không
    if (!user || !user.nonce) {
      return res.status(404).json({ message: 'Người dùng không tồn tại hoặc không có số nonce' });
    }

    // Tạo buffer hex từ thông điệp đăng nhập
    const msgBufferHex = ethUtil.bufferToHex(Buffer.from(getLoginMessage(user.nonce), 'utf8'));

    // Khôi phục địa chỉ từ chữ ký và thông điệp
    const recoveredAddress = sigUtil.recoverPersonalSignature({
      data: msgBufferHex,
      sig: sign,
    });

    // Kiểm tra xem địa chỉ khôi phục có trùng khớp với địa chỉ nhận được không
    if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
      return res.status(401).json({ message: 'Chữ ký không hợp lệ' });
    }

    // Tạo mã token với ID của người dùng
    const token = generateToken(user._id);

    // Gửi mã token về phía client
    res.json({ token });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error });
  }
};

export default loginUser;
