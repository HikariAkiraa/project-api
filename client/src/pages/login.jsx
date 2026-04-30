import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await api.post(`/user/login?email=${email}&password=${password}`);
            localStorage.setItem('user', JSON.stringify(res.data.payload));
            navigate('/catalog');
        } catch (err) {
            setError(err.response?.data?.message || 'Login gagal');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0f0f14] flex items-center justify-center p-4">
            <div className="w-full max-w-sm">
                <div className="text-center mb-8">
                    <span className="text-2xl font-bold text-white">Login</span>
                    <p className="text-slate-500 text-sm mt-1">Login to your account</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-[#1a1a2e] border border-[#2d2d4a] rounded-xl p-6 space-y-4">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-2.5 rounded-lg">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm text-slate-400 mb-1.5">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-[#12122a] border border-[#2d2d4a] rounded-lg px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-violet-500 transition-colors"
                            placeholder="Email"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-slate-400 mb-1.5">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-[#12122a] border border-[#2d2d4a] rounded-lg px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-violet-500 transition-colors"
                            placeholder="Password"
                            required
                        />
                    </div>

                    <div className="flex flex-col items-center gap-3 pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-violet-600 hover:bg-violet-700 text-white font-medium py-2.5 rounded-lg text-sm transition-colors disabled:opacity-50 cursor-pointer"
                        >
                            {loading ? 'Loading...' : 'Login'}
                        </button>
                        <p className="text-slate-500 text-sm">
                            Belum punya akun?{' '}
                            <span
                                onClick={() => navigate('/register')}
                                className="text-violet-400 hover:text-violet-300 cursor-pointer"
                            >
                                Register
                            </span>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}