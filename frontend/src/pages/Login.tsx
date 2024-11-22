import { useState } from 'react';
import './Login.css';

const Login = () => {
    const [cariKodu, setCariKodu] = useState('');
    const [kullaniciAdi, setKullaniciAdi] = useState('');
    const [sifre, setSifre] = useState('');

    const handleLogin = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log('Giriş yapılacak:', { cariKodu, kullaniciAdi, sifre });
    };

    const handleRegister = () => {
        console.log('Kayıt ol!');
    };

    return (
        <div className='login'>
        <div className="login-container" >
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="cariKodu">Cari Kodu:</label>
                    <input
                        type="text"
                        id="cariKodu"
                        value={cariKodu}
                        onChange={(e) => setCariKodu(e.target.value)}
                        required
                        
                    />
                </div>
                <div>
                    <label htmlFor="kullaniciAdi">Kullanıcı Adı:</label>
                    <input
                        type="text"
                        id="kullaniciAdi"
                        value={kullaniciAdi}
                        onChange={(e) => setKullaniciAdi(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="sifre">Şifre:</label>
                    <input
                        type="password"
                        id="sifre"
                        value={sifre}
                        onChange={(e) => setSifre(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Giriş Yap</button>
                <button type="button" onClick={handleRegister}>Kaydol</button>
            </form>
        </div>
        </div>
    );
};

export default Login;
