import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Catalog() {
    const [stores, setStores] = useState([]);
    const [selectedStore, setSelectedStore] = useState(null);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
        navigate('/login');
        return;
    }
    api.get('/store/getAll').then(res => setStores(res.data.payload || []));
    }, []);

    useEffect(() => {
    if (!selectedStore) return;
    setLoading(true);
    api.get(`/item/byStoreId/${selectedStore}`)
        .then(res => setItems(res.data.payload))
        .finally(() => setLoading(false));
    }, [selectedStore]);

    return (
    <div className="min-h-screen bg-[#0f0f14] p-6">
        <h1 className="text-2xl font-bold text-white mb-6">Catalog</h1>

        {/* Pilih Toko */}
        <div className="flex gap-2 flex-wrap mb-8">
            {stores.map(store => (
                <button
                    key={store.id}
                    onClick={() => setSelectedStore(store.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer
                        ${selectedStore === store.id
                            ? 'bg-violet-600 text-white'
                            : 'bg-[#1a1a2e] text-slate-300 hover:bg-[#2d2d4a]'
                        }`}
                >
                    {store.name}
                </button>
            ))}
        </div>

        {/* Items */}
        {!selectedStore && (
            <p className="text-slate-500 text-sm">Pilih toko untuk melihat item.</p>
        )}

        {loading && (
            <p className="text-slate-500 text-sm">Loading...</p>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map(item => (
                <div key={item.id} className="bg-[#1a1a2e] border border-[#2d2d4a] rounded-xl overflow-hidden">
                    {item.image_url
                        ? <img src={item.image_url} alt={item.name} className="w-full h-40 object-cover" />
                        : <div className="w-full h-40 bg-[#12122a] flex items-center justify-center text-slate-600 text-sm">No Image</div>
                    }
                    <div className="p-3">
                        <p className="text-white text-sm font-medium">{item.name}</p>
                        <p className="text-violet-400 text-sm mt-1">Rp {item.price.toLocaleString('id-ID')}</p>
                        <p className="text-slate-500 text-xs mt-1">Stok: {item.stock}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
    );
}