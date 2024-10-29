// src/components/Logout.tsx
import { getAuth, signOut } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './css/User.css'

const Logout: React.FC = () => {
    const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
    const [showConfirmation, setShowConfirmation] = useState<boolean>(true);
    const navigate = useNavigate();

    const handleLogout = async () => {
        setIsLoggingOut(true);
        const auth = getAuth();

        try {
            await signOut(auth);
            toast.success("Đăng xuất thành công!");
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            console.log(error);
            toast.error("Có lỗi xảy ra trong quá trình đăng xuất!");
            setIsLoggingOut(false);
        }
    };

    return (
        <div className="logout-container">
            <video className="video-background" autoPlay loop muted>
                <source src="src/assets/Server.mp4" type="video/mp4" />
                Trình duyệt của bạn không hỗ trợ thẻ video.
            </video>
            {showConfirmation ? (
                <div>
                    <p>Bạn có muốn đăng xuất khỏi trái đất không?</p>
                    <button onClick={() => setShowConfirmation(false)}>Không</button>
                    <button onClick={handleLogout}>Chắc chắn</button>
                </div>
            ) : (
                <div>
                    {isLoggingOut ? (
                        <div>
                            <p>Đang đăng xuất...</p>
                        </div>
                    ) : (
                        <p>Hủy đăng xuất</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Logout;
