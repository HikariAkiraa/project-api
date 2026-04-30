import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Register() {
    const [name, setName] = useState('');
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
        await api.post(`/user/register?name=${name}&email=${email}&password=${password}`);
        navigate('/login');
    } catch (err) {
        setError(err.response?.data?.message || 'Register gagal');
    } finally {
        setLoading(false);
    }
};

    return (
        <div className="min-h-screen bg-[#0f0f14] flex items-center justify-center p-4">
            <div className="w-full max-w-sm">
                <div className="text-center mb-8">
                    <span className="text-2xl font-bold text-white">Register</span>
                    <p className="text-slate-500 text-sm mt-1">Create a new account</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-[#1a1a2e] border border-[#2d2d4a] rounded-xl p-6 space-y-4">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-2.5 rounded-lg">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm text-slate-400 mb-1.5">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-[#12122a] border border-[#2d2d4a] rounded-lg px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-violet-500 transition-colors"
                            placeholder="Full name"
                            required
                        />
                    </div>

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

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={() => navigate('/login')}
                            className="w-full bg-[#2d2d4a] hover:bg-[#3d3d5a] text-slate-300 font-medium py-2.5 rounded-lg text-sm transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-violet-600 hover:bg-violet-700 text-white font-medium py-2.5 rounded-lg text-sm transition-colors disabled:opacity-50 cursor-pointer"
                        >
                            {loading ? 'Loading...' : 'Register'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}