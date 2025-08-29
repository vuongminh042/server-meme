import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './css/User.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showMarquee, setShowMarquee] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const auth = getAuth();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast.success("Đăng nhập thành công!");

            setShowMarquee(true);

            setTimeout(() => {
                navigate('/logout');
            }, 10000);
        } catch (error) {
            console.log(error);
            toast.error("Có lỗi xảy ra trong quá trình đăng nhập");
        }
    };

    return (
        <div className="auth-container">
            <h2 style={{ color: "black" }}>Đăng Nhập</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label style={{ color: "black" }}>Email: </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label style={{ color: "black" }}>Mật khẩu: </label>
                    <input 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Đăng Nhập</button>
            </form>
            <p>
                <label style={{ color: "#000" }}>Bạn chưa có tài khoản?</label> <Link to='/' style={{ color: 'blue', fontWeight: 'bold' }}>Đăng ký</Link>
            </p>
            {showMarquee && (
                <div className="marquee-container">
                    <div className="scrolling-text">
                        <label style={{ color: 'black' }}>Chào mừng đến với server thiên đường :)))</label>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
