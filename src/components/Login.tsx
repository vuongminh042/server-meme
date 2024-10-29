// src/components/Login.js
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './css/User.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showMarquee, setShowMarquee] = useState(false); // Thêm trạng thái cho marquee
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const auth = getAuth();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast.success("Đăng nhập thành công!");

            setShowMarquee(true); // Hiển thị marquee

            setTimeout(() => {
                navigate('/logout'); // Chuyển hướng sang logout sau 7.5 giây
            }, 7500); // Chờ 7.5 giây trước khi chuyển hướng
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="auth-container">
            <h2>Đăng Nhập</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email: </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Mật khẩu: </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Đăng Nhập</button>
            </form>
            Bạn chưa có tài khoản <Link to='/'>Đăng ký</Link>
            {showMarquee && (
                <div className="marquee-container">
                    <marquee behavior="scroll" direction="left">
                        Chào mừng đến với server thiên đường :)))
                    </marquee>
                </div>
            )}
        </div>
    );
};

export default Login;
