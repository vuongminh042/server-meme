import { getAuth, signOut } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './css/User.css'

const Logout: React.FC = () => {
    const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
    const [showConfirmation, setShowConfirmation] = useState<boolean>(true); 
    const [showCancelButton, setShowCancelButton] = useState<boolean>(false); 
    const navigate = useNavigate();

    const handleLogout = async () => {
        setShowConfirmation(false);
        setIsLoggingOut(true);
        setShowCancelButton(false); 
        const auth = getAuth();

        setTimeout(async () => {
            try {
                await signOut(auth);
                setIsLoggingOut(false);
                toast.success("Đăng xuất thành công!");
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } catch (error) {
                console.log(error);
                toast.error("Có lỗi xảy ra trong quá trình đăng xuất!");
                setIsLoggingOut(false);
                setShowCancelButton(true);
            }
        }, 3000);
    };

    return (
        <div className="logout-container">
            <video className="video-background" autoPlay loop muted>
                <source src="https://res.cloudinary.com/dkqyrejk6/video/upload/v1730190791/meme/yeo2xsq3cs0gz82ezzll.mp4" type="video/mp4" />
                Trình duyệt của bạn không hỗ trợ thẻ video.
            </video>

            {showConfirmation && (
                <div>
                    <p style={{ fontSize: 15, fontWeight: 'bold' }}>Bạn có muốn đăng xuất khỏi trái đất không?</p>
                    <button onClick={() => { setShowConfirmation(false); setShowCancelButton(true); }}>Không</button>
                    <button style={{ padding: '-20px' }} onClick={handleLogout}>Chắc chắn</button>
                </div>
            )}

            {showCancelButton && !isLoggingOut && (
                <span style={{ fontSize: 15, fontWeight: 'bold' }}>Hủy đăng xuất</span>
            )}

            {isLoggingOut && (
                <div className="logout-loading">
                    <div className="spinner"></div>
                    <p>Đang đăng xuất<span className="dots"></span></p>
                </div>
            )}
        </div>
    );
};

export default Logout;
