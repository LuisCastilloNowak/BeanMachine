import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Coffee, 
  Info, 
  MessageSquare, 
  Mail, 
  Lock, 
  ChevronUp, 
  Plus, 
  TrendingUp, 
  TrendingDown, 
  Package, 
  BarChart3,
  Star,
  MapPin,
  Clock,
  Phone,
  ArrowRight,
  X,
  LogOut,
  Archive,
  Inbox,
  Trash2
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Utility ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---
interface Review {
  id: number;
  author: string;
  rating: number;
  comment: string;
  created_at: string;
}

interface AccountingEntry {
  id: number;
  type: 'INCOME' | 'EXPENSE';
  label: string;
  amount: number;
  date: string;
}

interface Ingredient {
  id: number;
  name: string;
  quantity: number;
  purchase_price: number;
}

interface Product {
  id: number;
  name: string;
  quantity: number;
  manufacturing_cost: number;
  selling_price: number;
}

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'NEW' | 'ARCHIVED';
  created_at: string;
}

interface Contract {
  id: number;
  company_name: string;
  nature: 'Hebdomadaire' | 'Journalier';
  status: 'Actif' | 'En pause' | 'Inactif';
  info: string;
  created_at: string;
}

interface MenuItem {
  id: number;
  category: 'Boissons' | 'Plats';
  name: string;
  description: string;
  price: number;
}

// --- Components ---

const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
      >
        <div className="bg-bean-brown p-4 flex justify-between items-center text-white">
          <h3 className="font-bold text-lg">{title}</h3>
          <button onClick={onClose} className="hover:bg-white/10 p-1 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

const LandingPage = ({ onEnterSite }: { onEnterSite: () => void }) => {
  return (
    <div className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center text-white">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ 
          backgroundImage: 'url("https://picsum.photos/seed/beanmachine/1920/1080?blur=2")',
          filter: 'brightness(0.4)'
        }}
      />
      
      {/* Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="z-10 text-center px-4"
      >
        <div className="mb-8 flex justify-center">
          <div className="w-32 h-32 bg-bean-green rounded-full flex items-center justify-center border-4 border-bean-gold shadow-2xl">
            <Coffee size={64} className="text-bean-cream" />
          </div>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold mb-4 tracking-tighter uppercase font-serif">
          Bean Machine
        </h1>
        <p className="text-xl md:text-2xl mb-12 font-light tracking-widest uppercase text-bean-gold">
          Roxwood
        </p>
        
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <button 
            onClick={onEnterSite}
            className="group relative px-10 py-4 bg-bean-green rounded-full overflow-hidden transition-all shadow-xl hover:shadow-bean-green/20"
          >
            <span className="relative z-10 font-bold uppercase tracking-widest flex items-center gap-2">
              Site de l'entreprise <ChevronUp size={20} className="animate-bounce" />
            </span>
            <div className="absolute inset-0 bg-bean-brown translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
        </div>
      </motion.div>
      
      {/* Decorative details */}
      <div className="absolute bottom-10 left-10 z-10 hidden md:block">
        <p className="text-xs uppercase tracking-[0.5em] opacity-50">Authentic Coffee Experience</p>
      </div>
      <div className="absolute bottom-10 right-10 z-10 hidden md:block">
        <p className="text-xs uppercase tracking-[0.5em] opacity-50">Premium Quality Beans</p>
      </div>
    </div>
  );
};

const PinModal = ({ isOpen, onClose, onSuccess, endpoint = '/api/auth/pin' }: { isOpen: boolean; onClose: () => void; onSuccess: () => void; endpoint?: string }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin })
      });
      if (res.ok) {
        onSuccess();
        onClose();
      } else {
        setError('Code PIN incorrect');
        setPin('');
      }
    } catch (err) {
      setError('Erreur de connexion');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-bean-cream p-8 rounded-3xl shadow-2xl max-w-sm w-full border-2 border-bean-brown/10"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-bean-brown/50 hover:text-bean-brown">
              <X size={24} />
            </button>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-bean-brown/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="text-bean-brown" />
              </div>
              <h2 className="text-2xl font-bold text-bean-brown">Accès Sécurisé</h2>
              <p className="text-sm text-bean-brown/60">Veuillez entrer le code PIN pour accéder au dossier.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <input 
                type="password" 
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="••••"
                className="w-full text-center text-4xl tracking-[0.5em] py-4 rounded-2xl border-2 border-bean-brown/20 focus:border-bean-green focus:ring-0 bg-white"
                autoFocus
              />
              {error && <p className="text-red-500 text-sm text-center font-medium">{error}</p>}
              <button type="submit" className="w-full btn-primary py-4 text-lg">
                Valider
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const MenuSection = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMenu = async () => {
    try {
      const res = await fetch('/api/menu');
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const categories = ['Boissons', 'Plats'] as const;

  if (loading) return <div className="text-center py-20">Chargement de la carte...</div>;

  return (
    <div className="space-y-16">
      <div className="grid md:grid-cols-2 gap-12">
        {categories.map((cat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="space-y-8"
          >
            <h3 className="text-3xl font-serif italic text-bean-green border-b-2 border-bean-green/20 pb-2">{cat}</h3>
            <div className="space-y-6">
              {items.filter(i => i.category === cat).map((item) => (
                <div key={item.id} className="group relative">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-lg group-hover:text-bean-green transition-colors">{item.name}</h4>
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-bean-gold">{item.price.toFixed(2)}$</span>
                    </div>
                  </div>
                  <p className="text-sm text-bean-brown/60 italic">{item.description}</p>
                </div>
              ))}
              {items.filter(i => i.category === cat).length === 0 && (
                <p className="text-bean-brown/40 italic">Aucun article dans cette catégorie.</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const ReviewsSection = ({ isEmployeeMode }: { isEmployeeMode: boolean }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchReviews = async () => {
    const res = await fetch('/api/reviews');
    const data = await res.json();
    setReviews(data);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ author, rating, comment })
    });
    setAuthor('');
    setComment('');
    setRating(5);
    fetchReviews();
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Voulez-vous vraiment supprimer cet avis ?')) {
      // Optimistic update: remove from UI immediately
      const previousReviews = [...reviews];
      setReviews(prev => prev.filter(r => r.id !== id));
      
      try {
        const res = await fetch(`/api/reviews/${id}`, { method: 'DELETE' });
        if (!res.ok) {
          // Rollback if server error
          setReviews(previousReviews);
          const data = await res.json();
          alert(`Erreur: ${data.message || 'Impossible de supprimer l\'avis.'}`);
        }
        // No need to call fetchReviews() if successful because we already updated state optimistically
      } catch (err) {
        // Rollback if network error
        setReviews(previousReviews);
        alert('Erreur de connexion au serveur.');
      }
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-16">
      <div>
        <h3 className="text-3xl font-bold mb-8">Laissez votre avis</h3>
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-3xl shadow-lg border border-bean-brown/5">
          <div>
            <label className="block text-sm font-bold uppercase tracking-wider mb-2">Nom / Prénom</label>
            <input 
              required
              value={author}
              onChange={e => setAuthor(e.target.value)}
              className="input-field" 
              placeholder="Ex: John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-bold uppercase tracking-wider mb-2">Note</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(s => (
                <button 
                  key={s}
                  type="button"
                  onClick={() => setRating(s)}
                  className={cn("p-2 transition-colors", rating >= s ? "text-bean-gold" : "text-gray-300")}
                >
                  <Star fill={rating >= s ? "currentColor" : "none"} size={24} />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold uppercase tracking-wider mb-2">Votre message</label>
            <textarea 
              required
              value={comment}
              onChange={e => setComment(e.target.value)}
              className="input-field min-h-[120px]" 
              placeholder="Partagez votre expérience au Bean Machine..."
            />
          </div>
          <button disabled={loading} type="submit" className="w-full btn-primary">
            {loading ? "Envoi en cours..." : "Publier l'avis"}
          </button>
        </form>
      </div>
      
      <div className="space-y-6 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
        <h3 className="text-3xl font-bold mb-8">Derniers avis</h3>
        {reviews.length === 0 ? (
          <p className="text-bean-brown/50 italic">Aucun avis pour le moment. Soyez le premier !</p>
        ) : (
          reviews.map(review => (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              key={review.id} 
              className="bg-white/50 p-6 rounded-2xl border border-bean-brown/10 relative group"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-bold">{review.author}</h4>
                  <div className="flex text-bean-gold">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} />
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-bean-brown/40">{new Date(review.created_at).toLocaleDateString()}</span>
                  {isEmployeeMode && (
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleDelete(review.id);
                      }}
                      className="relative z-20 p-2 text-red-500 hover:text-red-700 transition-all opacity-0 group-hover:opacity-100"
                      title="Supprimer l'avis"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              </div>
              <p className="text-sm italic text-bean-brown/80">"{review.comment}"</p>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

const EmployeeSpace = ({ onLogout }: { onLogout: () => void }) => {
  const [activeTab, setActiveTab] = useState<'accounting' | 'ingredients' | 'products' | 'menu' | 'messages' | 'contracts'>('accounting');
  const [accounting, setAccounting] = useState<AccountingEntry[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [contracts, setContracts] = useState<Contract[]>([]);
  
  // Menu Modal State
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [editingMenuItem, setEditingMenuItem] = useState<MenuItem | null>(null);
  const [menuForm, setMenuForm] = useState<{ category: 'Boissons' | 'Plats'; name: string; description: string; price: string }>({
    category: 'Boissons',
    name: '',
    description: '',
    price: ''
  });

  // Ingredient Modal State
  const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false);
  const [editingIngredient, setEditingIngredient] = useState<Ingredient | null>(null);
  const [ingredientForm, setIngredientForm] = useState<{ name: string; quantity: string; purchase_price: string }>({
    name: '',
    quantity: '',
    purchase_price: ''
  });

  // Product Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState<{ name: string; quantity: string; manufacturing_cost: string; selling_price: string }>({
    name: '',
    quantity: '',
    manufacturing_cost: '',
    selling_price: ''
  });

  // Accounting Modal State
  const [isAccountingModalOpen, setIsAccountingModalOpen] = useState(false);
  const [accountingType, setAccountingType] = useState<'INCOME' | 'EXPENSE'>('INCOME');
  const [accountingForm, setAccountingForm] = useState<{ label: string; amount: string }>({
    label: '',
    amount: ''
  });

  // Contract Modal State
  const [isContractModalOpen, setIsContractModalOpen] = useState(false);
  const [editingContract, setEditingContract] = useState<Contract | null>(null);
  const [contractForm, setContractForm] = useState<{ company_name: string; nature: 'Hebdomadaire' | 'Journalier'; status: 'Actif' | 'En pause' | 'Inactif'; info: string }>({
    company_name: '',
    nature: 'Hebdomadaire',
    status: 'Actif',
    info: ''
  });

  // Delete Confirmation State
  const [deleteTarget, setDeleteTarget] = useState<{ type: 'menu' | 'ingredient' | 'product' | 'accounting' | 'message' | 'contract'; id: number } | null>(null);

  // Message View State
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  const refreshData = async () => {
    const [accRes, ingRes, prodRes, menuRes, msgRes, conRes] = await Promise.all([
      fetch('/api/accounting'),
      fetch('/api/ingredients'),
      fetch('/api/products'),
      fetch('/api/menu'),
      fetch('/api/messages'),
      fetch('/api/contracts')
    ]);
    setAccounting(await accRes.json());
    setIngredients(await ingRes.json());
    setProducts(await prodRes.json());
    setMenuItems(await menuRes.json());
    setMessages(await msgRes.json());
    setContracts(await conRes.json());
  };

  useEffect(() => {
    refreshData();
  }, []);

  // --- Delete Handlers ---
  const confirmDelete = (type: 'menu' | 'ingredient' | 'product' | 'accounting' | 'message' | 'contract', id: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setDeleteTarget({ type, id });
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;

    const { type, id } = deleteTarget;
    try {
      if (type === 'menu') {
        setMenuItems(prev => prev.filter(item => item.id !== id));
        await fetch(`/api/menu/${id}`, { method: 'DELETE' });
      } else if (type === 'ingredient') {
        setIngredients(prev => prev.filter(item => item.id !== id));
        await fetch(`/api/ingredients/${id}`, { method: 'DELETE' });
      } else if (type === 'product') {
        setProducts(prev => prev.filter(item => item.id !== id));
        await fetch(`/api/products/${id}`, { method: 'DELETE' });
      } else if (type === 'accounting') {
        setAccounting(prev => prev.filter(item => item.id !== id));
        await fetch(`/api/accounting/${id}`, { method: 'DELETE' });
      } else if (type === 'message') {
        setMessages(prev => prev.filter(item => item.id !== id));
        await fetch(`/api/messages/${id}`, { method: 'DELETE' });
      } else if (type === 'contract') {
        setContracts(prev => prev.filter(item => item.id !== id));
        await fetch(`/api/contracts/${id}`, { method: 'DELETE' });
      }
      refreshData();
    } catch (err) {
      console.error("Failed to delete", err);
      refreshData();
    }
    setDeleteTarget(null);
  };

  const handleArchiveMessage = async (id: number) => {
    try {
      await fetch(`/api/messages/${id}/archive`, { method: 'PUT' });
      refreshData();
    } catch (err) {
      console.error("Failed to archive", err);
    }
  };

  // --- Menu Handlers ---
  const openAddMenuModal = () => {
    setEditingMenuItem(null);
    setMenuForm({ category: 'Boissons', name: '', description: '', price: '' });
    setIsMenuModalOpen(true);
  };

  const openEditMenuModal = (item: MenuItem) => {
    setEditingMenuItem(item);
    setMenuForm({
      category: item.category,
      name: item.name,
      description: item.description,
      price: item.price.toString()
    });
    setIsMenuModalOpen(true);
  };

  const handleSaveMenuItem = async (e: React.FormEvent) => {
    e.preventDefault();
    const price = parseFloat(menuForm.price);
    if (!menuForm.name || isNaN(price)) return;

    if (editingMenuItem) {
      await fetch(`/api/menu/${editingMenuItem.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...menuForm, price })
      });
    } else {
      await fetch('/api/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...menuForm, price })
      });
    }
    setIsMenuModalOpen(false);
    refreshData();
  };

  // --- Ingredient Handlers ---
  const openAddIngredientModal = () => {
    setEditingIngredient(null);
    setIngredientForm({ name: '', quantity: '', purchase_price: '' });
    setIsIngredientModalOpen(true);
  };

  const openEditIngredientModal = (ing: Ingredient) => {
    setEditingIngredient(ing);
    setIngredientForm({
      name: ing.name,
      quantity: ing.quantity.toString(),
      purchase_price: ing.purchase_price.toString()
    });
    setIsIngredientModalOpen(true);
  };

  const handleSaveIngredient = async (e: React.FormEvent) => {
    e.preventDefault();
    const quantity = parseInt(ingredientForm.quantity);
    const purchase_price = parseFloat(ingredientForm.purchase_price);
    if (!ingredientForm.name || isNaN(quantity) || isNaN(purchase_price)) return;

    if (editingIngredient) {
      await fetch(`/api/ingredients/${editingIngredient.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity, purchase_price })
      });
    } else {
      await fetch('/api/ingredients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: ingredientForm.name, quantity, purchase_price })
      });
    }
    setIsIngredientModalOpen(false);
    refreshData();
  };

  // --- Product Handlers ---
  const openAddProductModal = () => {
    setEditingProduct(null);
    setProductForm({ name: '', quantity: '', manufacturing_cost: '', selling_price: '' });
    setIsProductModalOpen(true);
  };

  const openEditProductModal = (prod: Product) => {
    setEditingProduct(prod);
    setProductForm({
      name: prod.name,
      quantity: prod.quantity.toString(),
      manufacturing_cost: prod.manufacturing_cost.toString(),
      selling_price: prod.selling_price.toString()
    });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const quantity = parseInt(productForm.quantity);
    const manufacturing_cost = parseFloat(productForm.manufacturing_cost);
    const selling_price = parseFloat(productForm.selling_price);
    if (!productForm.name || isNaN(quantity) || isNaN(manufacturing_cost) || isNaN(selling_price)) return;

    if (editingProduct) {
      await fetch(`/api/products/${editingProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity, manufacturing_cost, selling_price })
      });
    } else {
      await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: productForm.name, quantity, manufacturing_cost, selling_price })
      });
    }
    setIsProductModalOpen(false);
    refreshData();
  };

  // --- Accounting Handlers ---
  const openAddAccountingModal = (type: 'INCOME' | 'EXPENSE') => {
    setAccountingType(type);
    setAccountingForm({ label: '', amount: '' });
    setIsAccountingModalOpen(true);
  };

  const handleSaveAccounting = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(accountingForm.amount);
    if (!accountingForm.label || isNaN(amount)) return;

    await fetch('/api/accounting', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: accountingType, label: accountingForm.label, amount })
    });
    setIsAccountingModalOpen(false);
    refreshData();
  };

  const totalIncome = accounting.filter(a => a.type === 'INCOME').reduce((sum, a) => sum + a.amount, 0);
  const totalExpense = accounting.filter(a => a.type === 'EXPENSE').reduce((sum, a) => sum + a.amount, 0);

  // --- Contract Handlers ---
  const openAddContractModal = () => {
    setEditingContract(null);
    setContractForm({ company_name: '', nature: 'Hebdomadaire', status: 'Actif', info: '' });
    setIsContractModalOpen(true);
  };

  const openEditContractModal = (contract: Contract) => {
    setEditingContract(contract);
    setContractForm({
      company_name: contract.company_name,
      nature: contract.nature,
      status: contract.status,
      info: contract.info
    });
    setIsContractModalOpen(true);
  };

  const handleSaveContract = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contractForm.company_name) return;

    if (editingContract) {
      await fetch(`/api/contracts/${editingContract.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contractForm)
      });
    } else {
      await fetch('/api/contracts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contractForm)
      });
    }
    setIsContractModalOpen(false);
    refreshData();
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-bean-brown/10">
      <div className="bg-bean-brown p-6 text-white flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <BarChart3 size={32} className="text-bean-gold" />
          <h2 className="text-2xl font-bold uppercase tracking-widest">Espace Gestion</h2>
        </div>
        <div className="flex flex-wrap bg-white/10 p-1 rounded-xl gap-1">
          <button 
            onClick={() => setActiveTab('accounting')}
            className={cn("px-4 py-2 rounded-lg text-sm font-bold transition-all", activeTab === 'accounting' ? "bg-bean-gold text-bean-brown" : "hover:bg-white/5")}
          >
            Comptabilité
          </button>
          <button 
            onClick={() => setActiveTab('ingredients')}
            className={cn("px-4 py-2 rounded-lg text-sm font-bold transition-all", activeTab === 'ingredients' ? "bg-bean-gold text-bean-brown" : "hover:bg-white/5")}
          >
            Stocks Ingrédients
          </button>
          <button 
            onClick={() => setActiveTab('products')}
            className={cn("px-4 py-2 rounded-lg text-sm font-bold transition-all", activeTab === 'products' ? "bg-bean-gold text-bean-brown" : "hover:bg-white/5")}
          >
            Stock Produits
          </button>
          <button 
            onClick={() => setActiveTab('menu')}
            className={cn("px-4 py-2 rounded-lg text-sm font-bold transition-all", activeTab === 'menu' ? "bg-bean-gold text-bean-brown" : "hover:bg-white/5")}
          >
            Carte / Menu
          </button>
          <button 
            onClick={() => setActiveTab('contracts')}
            className={cn("px-4 py-2 rounded-lg text-sm font-bold transition-all", activeTab === 'contracts' ? "bg-bean-gold text-bean-brown" : "hover:bg-white/5")}
          >
            Contrats
          </button>
          <button 
            onClick={() => setActiveTab('messages')}
            className={cn("px-4 py-2 rounded-lg text-sm font-bold transition-all", activeTab === 'messages' ? "bg-bean-gold text-bean-brown" : "hover:bg-white/5")}
          >
            Messages
          </button>
        </div>
        <button 
          onClick={onLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500 text-red-100 transition-all text-sm font-bold"
        >
          <LogOut size={18} /> Déconnexion
        </button>
      </div>

      <div className="p-8">
        {activeTab === 'accounting' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
                <p className="text-xs font-bold uppercase text-green-600 mb-1">Total Entrées</p>
                <p className="text-3xl font-mono font-bold text-green-700">+{totalIncome.toFixed(2)}$</p>
              </div>
              <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
                <p className="text-xs font-bold uppercase text-red-600 mb-1">Total Sorties</p>
                <p className="text-3xl font-mono font-bold text-red-700">-{totalExpense.toFixed(2)}$</p>
              </div>
              <div className="bg-bean-cream p-6 rounded-2xl border border-bean-brown/10">
                <p className="text-xs font-bold uppercase text-bean-brown/60 mb-1">Bénéfice Net</p>
                <p className={cn("text-3xl font-mono font-bold", totalIncome - totalExpense >= 0 ? "text-bean-green" : "text-red-700")}>
                  {(totalIncome - totalExpense).toFixed(2)}$
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button onClick={() => openAddAccountingModal('INCOME')} className="btn-primary flex items-center gap-2 py-2">
                <TrendingUp size={18} /> Ajouter Entrée
              </button>
              <button onClick={() => openAddAccountingModal('EXPENSE')} className="btn-secondary flex items-center gap-2 py-2">
                <TrendingDown size={18} /> Ajouter Sortie
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-bean-brown/10 text-xs font-bold uppercase tracking-wider text-bean-brown/50">
                    <th className="py-4">Date</th>
                    <th className="py-4">Libellé</th>
                    <th className="py-4">Type</th>
                    <th className="py-4 text-right">Montant</th>
                    <th className="py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-bean-brown/5">
                  {accounting.map(entry => (
                    <tr key={entry.id} className="hover:bg-bean-cream/50 transition-colors">
                      <td className="py-4 text-sm">{new Date(entry.date).toLocaleDateString()}</td>
                      <td className="py-4 font-medium">{entry.label}</td>
                      <td className="py-4">
                        <span className={cn("px-2 py-1 rounded-md text-[10px] font-bold uppercase", entry.type === 'INCOME' ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700")}>
                          {entry.type === 'INCOME' ? 'Entrée' : 'Sortie'}
                        </span>
                      </td>
                      <td className={cn("py-4 text-right font-mono font-bold", entry.type === 'INCOME' ? "text-green-600" : "text-red-600")}>
                        {entry.type === 'INCOME' ? '+' : '-'}{entry.amount.toFixed(2)}$
                      </td>
                      <td className="py-4 text-right">
                        <button 
                          onClick={(e) => confirmDelete('accounting', entry.id, e)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'ingredients' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">Inventaire des Ingrédients</h3>
              <button onClick={openAddIngredientModal} className="btn-primary flex items-center gap-2 py-2">
                <Plus size={18} /> Nouvel Ingrédient
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-bean-brown/10 text-xs font-bold uppercase tracking-wider text-bean-brown/50">
                    <th className="py-4">Nom</th>
                    <th className="py-4">Quantité</th>
                    <th className="py-4">Prix d'Achat</th>
                    <th className="py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-bean-brown/5">
                  {ingredients.map(ing => (
                    <tr key={ing.id} className="hover:bg-bean-cream/50 transition-colors">
                      <td className="py-4 font-medium">{ing.name}</td>
                      <td className="py-4">
                        <span className={cn("font-mono px-2 py-1 rounded bg-bean-brown/5", ing.quantity < 10 ? "text-red-600 font-bold" : "")}>
                          {ing.quantity}
                        </span>
                      </td>
                      <td className="py-4 font-mono">{ing.purchase_price.toFixed(2)}$</td>
                      <td className="py-4 text-right space-x-4">
                        <button 
                          onClick={() => openEditIngredientModal(ing)}
                          className="text-bean-green hover:underline font-bold text-sm"
                        >
                          Modifier
                        </button>
                        <button 
                          onClick={(e) => confirmDelete('ingredient', ing.id, e)}
                          className="text-red-500 hover:underline font-bold text-sm"
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">Stock Produits</h3>
              <button onClick={openAddProductModal} className="btn-primary flex items-center gap-2 py-2">
                <Plus size={18} /> Nouveau Produit
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-bean-brown/10 text-xs font-bold uppercase tracking-wider text-bean-brown/50">
                    <th className="py-4">Nom</th>
                    <th className="py-4">Stock</th>
                    <th className="py-4">Coût Fab.</th>
                    <th className="py-4">Prix Vente</th>
                    <th className="py-4">Marge</th>
                    <th className="py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-bean-brown/5">
                  {products.map(prod => {
                    const margin = prod.selling_price - prod.manufacturing_cost;
                    return (
                      <tr key={prod.id} className="hover:bg-bean-cream/50 transition-colors">
                        <td className="py-4 font-medium">{prod.name}</td>
                        <td className="py-4 font-mono">{prod.quantity}</td>
                        <td className="py-4 font-mono">{prod.manufacturing_cost.toFixed(2)}$</td>
                        <td className="py-4 font-mono">{prod.selling_price.toFixed(2)}$</td>
                        <td className="py-4">
                          <span className={cn("px-2 py-1 rounded-md text-[10px] font-bold uppercase", margin > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700")}>
                            {margin.toFixed(2)}$
                          </span>
                        </td>
                        <td className="py-4 text-right space-x-4">
                          <button 
                            onClick={() => openEditProductModal(prod)}
                            className="text-bean-green hover:underline font-bold text-sm"
                          >
                            Modifier
                          </button>
                          <button 
                            onClick={(e) => confirmDelete('product', prod.id, e)}
                            className="text-red-500 hover:underline font-bold text-sm"
                          >
                            Supprimer
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {activeTab === 'menu' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">Gestion de la Carte</h3>
              <button onClick={openAddMenuModal} className="btn-primary flex items-center gap-2 py-2">
                <Plus size={18} /> Nouvel Article
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-bean-brown/10 text-xs font-bold uppercase tracking-wider text-bean-brown/50">
                    <th className="py-4">Type</th>
                    <th className="py-4">Nom</th>
                    <th className="py-4">Description</th>
                    <th className="py-4">Prix</th>
                    <th className="py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-bean-brown/5">
                  {menuItems.map(item => (
                    <tr key={item.id} className="hover:bg-bean-cream/50 transition-colors">
                      <td className="py-4">
                        <span className={cn("px-2 py-1 rounded-md text-[10px] font-bold uppercase", item.category === 'Boissons' ? "bg-blue-100 text-blue-700" : "bg-orange-100 text-orange-700")}>
                          {item.category}
                        </span>
                      </td>
                      <td className="py-4 font-medium">{item.name}</td>
                      <td className="py-4 text-sm text-bean-brown/70 italic max-w-xs truncate">{item.description}</td>
                      <td className="py-4 font-mono font-bold text-bean-gold">{item.price.toFixed(2)}$</td>
                      <td className="py-4 text-right space-x-4">
                        <button 
                          onClick={() => openEditMenuModal(item)}
                          className="text-bean-green hover:underline font-bold text-sm"
                        >
                          Modifier
                        </button>
                        <button 
                          onClick={(e) => confirmDelete('menu', item.id, e)}
                          className="text-red-500 hover:underline font-bold text-sm"
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {activeTab === 'messages' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">Messages de Contact</h3>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Column: New Messages */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Inbox size={20} className="text-blue-600" />
                  <h4 className="font-bold uppercase tracking-wider text-sm text-bean-brown/60">Nouveaux Messages</h4>
                  <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-[10px] font-bold">
                    {messages.filter(m => m.status === 'NEW').length}
                  </span>
                </div>
                
                {messages.filter(m => m.status === 'NEW').length === 0 ? (
                  <div className="text-center py-12 bg-bean-cream/30 rounded-3xl border border-dashed border-bean-brown/20">
                    <p className="text-bean-brown/40 font-bold">Aucun nouveau message.</p>
                  </div>
                ) : (
                  messages.filter(m => m.status === 'NEW').map(msg => (
                    <div 
                      key={msg.id} 
                      onClick={() => setSelectedMessage(msg)}
                      className="group p-6 rounded-2xl border border-bean-gold bg-white shadow-md hover:shadow-lg transition-all cursor-pointer relative overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 w-1 h-full bg-bean-gold" />
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-lg group-hover:text-bean-gold transition-colors">{msg.subject}</h4>
                            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                          </div>
                          <p className="text-xs text-bean-brown/60">
                            De : <span className="font-bold text-bean-brown">{msg.name}</span> • {new Date(msg.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleArchiveMessage(msg.id); }}
                            className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
                            title="Archiver"
                          >
                            <Archive size={16} />
                          </button>
                          <button 
                            onClick={(e) => { e.stopPropagation(); confirmDelete('message', msg.id, e); }}
                            className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all"
                            title="Supprimer"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-bean-brown/70 line-clamp-2 italic">"{msg.message}"</p>
                    </div>
                  ))
                )}
              </div>

              {/* Sidebar: Archived Messages */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Archive size={20} className="text-gray-500" />
                  <h4 className="font-bold uppercase tracking-wider text-sm text-bean-brown/60">Archives</h4>
                  <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-[10px] font-bold">
                    {messages.filter(m => m.status === 'ARCHIVED').length}
                  </span>
                </div>

                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                  {messages.filter(m => m.status === 'ARCHIVED').length === 0 ? (
                    <p className="text-center py-8 text-xs text-bean-brown/40 italic border border-dashed border-bean-brown/10 rounded-2xl">
                      Aucun message archivé.
                    </p>
                  ) : (
                    messages.filter(m => m.status === 'ARCHIVED').map(msg => (
                      <div 
                        key={msg.id} 
                        onClick={() => setSelectedMessage(msg)}
                        className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 hover:bg-white hover:border-bean-brown/20 transition-all cursor-pointer group"
                      >
                        <div className="flex justify-between items-start mb-1">
                          <h5 className="font-bold text-sm truncate pr-2">{msg.subject}</h5>
                          <button 
                            onClick={(e) => { e.stopPropagation(); confirmDelete('message', msg.id, e); }}
                            className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition-all"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <p className="text-[10px] text-bean-brown/50 mb-2">{msg.name} • {new Date(msg.created_at).toLocaleDateString()}</p>
                        <p className="text-xs text-bean-brown/60 line-clamp-1 italic">"{msg.message}"</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'contracts' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">Contrats Entreprise</h3>
              <button onClick={openAddContractModal} className="btn-primary flex items-center gap-2 py-2">
                <Plus size={18} /> Nouveau Contrat
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-bean-brown/10 text-xs font-bold uppercase tracking-wider text-bean-brown/50">
                    <th className="py-4">Entreprise</th>
                    <th className="py-4">Nature</th>
                    <th className="py-4">Statut</th>
                    <th className="py-4">Informations</th>
                    <th className="py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-bean-brown/5">
                  {contracts.map(contract => (
                    <tr key={contract.id} className="hover:bg-bean-cream/50 transition-colors">
                      <td className="py-4 font-bold">{contract.company_name}</td>
                      <td className="py-4">
                        <span className={cn(
                          "px-2 py-1 rounded-md text-[10px] font-bold uppercase",
                          contract.nature === 'Hebdomadaire' ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"
                        )}>
                          {contract.nature}
                        </span>
                      </td>
                      <td className="py-4">
                        <span className={cn(
                          "px-2 py-1 rounded-md text-[10px] font-bold uppercase",
                          contract.status === 'Actif' ? "bg-green-100 text-green-700" : 
                          contract.status === 'En pause' ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"
                        )}>
                          {contract.status}
                        </span>
                      </td>
                      <td className="py-4 text-sm text-bean-brown/70 italic max-w-xs truncate">{contract.info}</td>
                      <td className="py-4 text-right space-x-4">
                        <button 
                          onClick={() => openEditContractModal(contract)}
                          className="text-bean-green hover:underline font-bold text-sm"
                        >
                          Modifier
                        </button>
                        <button 
                          onClick={(e) => confirmDelete('contract', contract.id, e)}
                          className="text-red-500 hover:underline font-bold text-sm"
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Message View Modal */}
      <Modal 
        isOpen={!!selectedMessage} 
        onClose={() => setSelectedMessage(null)} 
        title="Détails du message"
      >
        {selectedMessage && (
          <div className="space-y-6">
            <div className="flex justify-between items-start border-b border-bean-brown/10 pb-4">
              <div>
                <h3 className="text-2xl font-serif font-bold text-bean-brown mb-1">{selectedMessage.subject}</h3>
                <p className="text-sm text-bean-brown/60">
                  De : <span className="font-bold text-bean-brown">{selectedMessage.name}</span> ({selectedMessage.email})
                </p>
                <p className="text-xs text-bean-brown/40 mt-1">
                  Reçu le : {new Date(selectedMessage.created_at).toLocaleString()}
                </p>
              </div>
              <span className={cn(
                "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                selectedMessage.status === 'NEW' ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"
              )}>
                {selectedMessage.status === 'NEW' ? 'Nouveau' : 'Archivé'}
              </span>
            </div>
            
            <div className="bg-bean-cream/30 p-6 rounded-2xl border border-bean-brown/5 min-h-[200px]">
              <p className="text-bean-brown leading-relaxed whitespace-pre-wrap">
                {selectedMessage.message}
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              {selectedMessage.status === 'NEW' && (
                <button 
                  onClick={() => { handleArchiveMessage(selectedMessage.id); setSelectedMessage(null); }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white font-bold transition-all"
                >
                  <Archive size={18} /> Archiver
                </button>
              )}
              <button 
                onClick={(e) => { confirmDelete('message', selectedMessage.id, e); setSelectedMessage(null); }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white font-bold transition-all"
              >
                <Trash2 size={18} /> Supprimer
              </button>
              <button 
                onClick={() => setSelectedMessage(null)}
                className="px-6 py-2 rounded-lg bg-bean-brown text-white font-bold hover:bg-bean-brown/90 transition-all"
              >
                Fermer
              </button>
            </div>
          </div>
        )}
      </Modal>

      <Modal 
        isOpen={!!deleteTarget} 
        onClose={() => setDeleteTarget(null)} 
        title="Confirmer la suppression"
      >
        <div className="space-y-4">
          <p className="text-bean-brown">Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible.</p>
          <div className="flex justify-end gap-3">
            <button 
              onClick={() => setDeleteTarget(null)}
              className="px-4 py-2 rounded-lg text-bean-brown hover:bg-bean-brown/5 font-bold"
            >
              Annuler
            </button>
            <button 
              onClick={handleConfirmDelete}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-bold transition-colors"
            >
              Supprimer
            </button>
          </div>
        </div>
      </Modal>

      <Modal 
        isOpen={isMenuModalOpen} 
        onClose={() => setIsMenuModalOpen(false)} 
        title={editingMenuItem ? "Modifier l'article" : "Nouvel article"}
      >
        <form onSubmit={handleSaveMenuItem} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-bean-brown mb-1">Catégorie</label>
            <select 
              value={menuForm.category}
              onChange={(e) => setMenuForm({...menuForm, category: e.target.value as 'Boissons' | 'Plats'})}
              className="w-full p-2 rounded-lg border border-bean-brown/20 focus:outline-none focus:border-bean-green"
            >
              <option value="Boissons">Boissons</option>
              <option value="Plats">Plats</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-bean-brown mb-1">Nom</label>
            <input 
              type="text"
              value={menuForm.name}
              onChange={(e) => setMenuForm({...menuForm, name: e.target.value})}
              className="w-full p-2 rounded-lg border border-bean-brown/20 focus:outline-none focus:border-bean-green"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-bean-brown mb-1">Description</label>
            <textarea 
              value={menuForm.description}
              onChange={(e) => setMenuForm({...menuForm, description: e.target.value})}
              className="w-full p-2 rounded-lg border border-bean-brown/20 focus:outline-none focus:border-bean-green"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-bean-brown mb-1">Prix ($)</label>
            <input 
              type="number"
              step="0.01"
              value={menuForm.price}
              onChange={(e) => setMenuForm({...menuForm, price: e.target.value})}
              className="w-full p-2 rounded-lg border border-bean-brown/20 focus:outline-none focus:border-bean-green"
              required
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button 
              type="button" 
              onClick={() => setIsMenuModalOpen(false)}
              className="px-4 py-2 rounded-lg text-bean-brown hover:bg-bean-brown/5 font-bold"
            >
              Annuler
            </button>
            <button 
              type="submit" 
              className="btn-primary px-6 py-2"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </Modal>

      <Modal 
        isOpen={isIngredientModalOpen} 
        onClose={() => setIsIngredientModalOpen(false)} 
        title={editingIngredient ? "Modifier l'ingrédient" : "Nouvel ingrédient"}
      >
        <form onSubmit={handleSaveIngredient} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-bean-brown mb-1">Nom</label>
            <input 
              type="text"
              value={ingredientForm.name}
              onChange={(e) => setIngredientForm({...ingredientForm, name: e.target.value})}
              className="w-full p-2 rounded-lg border border-bean-brown/20 focus:outline-none focus:border-bean-green"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-bean-brown mb-1">Quantité</label>
            <input 
              type="number"
              value={ingredientForm.quantity}
              onChange={(e) => setIngredientForm({...ingredientForm, quantity: e.target.value})}
              className="w-full p-2 rounded-lg border border-bean-brown/20 focus:outline-none focus:border-bean-green"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-bean-brown mb-1">Prix d'Achat ($)</label>
            <input 
              type="number"
              step="0.01"
              value={ingredientForm.purchase_price}
              onChange={(e) => setIngredientForm({...ingredientForm, purchase_price: e.target.value})}
              className="w-full p-2 rounded-lg border border-bean-brown/20 focus:outline-none focus:border-bean-green"
              required
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button 
              type="button" 
              onClick={() => setIsIngredientModalOpen(false)}
              className="px-4 py-2 rounded-lg text-bean-brown hover:bg-bean-brown/5 font-bold"
            >
              Annuler
            </button>
            <button 
              type="submit" 
              className="btn-primary px-6 py-2"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </Modal>

      <Modal 
        isOpen={isProductModalOpen} 
        onClose={() => setIsProductModalOpen(false)} 
        title={editingProduct ? "Modifier le produit" : "Nouveau produit"}
      >
        <form onSubmit={handleSaveProduct} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-bean-brown mb-1">Nom</label>
            <input 
              type="text"
              value={productForm.name}
              onChange={(e) => setProductForm({...productForm, name: e.target.value})}
              className="w-full p-2 rounded-lg border border-bean-brown/20 focus:outline-none focus:border-bean-green"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-bean-brown mb-1">Stock</label>
            <input 
              type="number"
              value={productForm.quantity}
              onChange={(e) => setProductForm({...productForm, quantity: e.target.value})}
              className="w-full p-2 rounded-lg border border-bean-brown/20 focus:outline-none focus:border-bean-green"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-bean-brown mb-1">Coût de Fabrication ($)</label>
            <input 
              type="number"
              step="0.01"
              value={productForm.manufacturing_cost}
              onChange={(e) => setProductForm({...productForm, manufacturing_cost: e.target.value})}
              className="w-full p-2 rounded-lg border border-bean-brown/20 focus:outline-none focus:border-bean-green"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-bean-brown mb-1">Prix de Vente ($)</label>
            <input 
              type="number"
              step="0.01"
              value={productForm.selling_price}
              onChange={(e) => setProductForm({...productForm, selling_price: e.target.value})}
              className="w-full p-2 rounded-lg border border-bean-brown/20 focus:outline-none focus:border-bean-green"
              required
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button 
              type="button" 
              onClick={() => setIsProductModalOpen(false)}
              className="px-4 py-2 rounded-lg text-bean-brown hover:bg-bean-brown/5 font-bold"
            >
              Annuler
            </button>
            <button 
              type="submit" 
              className="btn-primary px-6 py-2"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </Modal>

      <Modal 
        isOpen={isAccountingModalOpen} 
        onClose={() => setIsAccountingModalOpen(false)} 
        title={accountingType === 'INCOME' ? "Ajouter une entrée" : "Ajouter une sortie"}
      >
        <form onSubmit={handleSaveAccounting} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-bean-brown mb-1">Libellé</label>
            <input 
              type="text"
              value={accountingForm.label}
              onChange={(e) => setAccountingForm({...accountingForm, label: e.target.value})}
              className="w-full p-2 rounded-lg border border-bean-brown/20 focus:outline-none focus:border-bean-green"
              required
              placeholder="Ex: Vente du jour, Achat lait..."
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-bean-brown mb-1">Montant ($)</label>
            <input 
              type="number"
              step="0.01"
              value={accountingForm.amount}
              onChange={(e) => setAccountingForm({...accountingForm, amount: e.target.value})}
              className="w-full p-2 rounded-lg border border-bean-brown/20 focus:outline-none focus:border-bean-green"
              required
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button 
              type="button" 
              onClick={() => setIsAccountingModalOpen(false)}
              className="px-4 py-2 rounded-lg text-bean-brown hover:bg-bean-brown/5 font-bold"
            >
              Annuler
            </button>
            <button 
              type="submit" 
              className="btn-primary px-6 py-2"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </Modal>

      <Modal 
        isOpen={isContractModalOpen} 
        onClose={() => setIsContractModalOpen(false)} 
        title={editingContract ? "Modifier le contrat" : "Nouveau contrat entreprise"}
      >
        <form onSubmit={handleSaveContract} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-bean-brown mb-1">Nom de l'entreprise</label>
            <input 
              type="text"
              value={contractForm.company_name}
              onChange={(e) => setContractForm({...contractForm, company_name: e.target.value})}
              className="w-full p-2 rounded-lg border border-bean-brown/20 focus:outline-none focus:border-bean-green"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-bean-brown mb-1">Nature du contrat</label>
              <select 
                value={contractForm.nature}
                onChange={(e) => setContractForm({...contractForm, nature: e.target.value as any})}
                className="w-full p-2 rounded-lg border border-bean-brown/20 focus:outline-none focus:border-bean-green"
              >
                <option value="Hebdomadaire">Hebdomadaire</option>
                <option value="Journalier">Journalier</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-bean-brown mb-1">Statut</label>
              <select 
                value={contractForm.status}
                onChange={(e) => setContractForm({...contractForm, status: e.target.value as any})}
                className="w-full p-2 rounded-lg border border-bean-brown/20 focus:outline-none focus:border-bean-green"
              >
                <option value="Actif">Actif</option>
                <option value="En pause">En pause</option>
                <option value="Inactif">Inactif</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-bean-brown mb-1">Informations du contrat</label>
            <textarea 
              value={contractForm.info}
              onChange={(e) => setContractForm({...contractForm, info: e.target.value})}
              className="w-full p-2 rounded-lg border border-bean-brown/20 focus:outline-none focus:border-bean-green"
              rows={4}
              placeholder="Termes du contrat, détails spécifiques..."
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button 
              type="button" 
              onClick={() => setIsContractModalOpen(false)}
              className="px-4 py-2 rounded-lg text-bean-brown hover:bg-bean-brown/5 font-bold"
            >
              Annuler
            </button>
            <button 
              type="submit" 
              className="btn-primary px-6 py-2"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState<'landing' | 'site'>('landing');
  const [isEmployeePinModalOpen, setIsEmployeePinModalOpen] = useState(false);
  const [isEmployeeMode, setIsEmployeeMode] = useState(false);
  const [activeSection, setActiveSection] = useState<'menu' | 'about' | 'reviews' | 'contact' | 'employee'>('menu');

  const handleEnterSite = () => {
    setView('site');
  };

  const handleEmployeeAccess = () => {
    if (isEmployeeMode) {
      setActiveSection('employee');
    } else {
      setIsEmployeePinModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {view === 'landing' ? (
          <motion.div 
            key="landing"
            initial={{ opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-50"
          >
            <LandingPage 
              onEnterSite={handleEnterSite} 
            />
          </motion.div>
        ) : (
          <motion.div 
            key="site"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="bg-bean-cream min-h-screen"
          >
            {/* Navigation */}
            <nav className="sticky top-0 z-40 bg-bean-cream/80 backdrop-blur-md border-b border-bean-brown/10">
              <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <div 
                  className="flex items-center gap-2 cursor-pointer" 
                  onClick={() => setView('landing')}
                >
                  <div className="w-10 h-10 bg-bean-green rounded-full flex items-center justify-center text-white">
                    <Coffee size={20} />
                  </div>
                  <span className="font-serif font-bold text-xl tracking-tight uppercase">Bean Machine</span>
                </div>
                
                <div className="hidden md:flex items-center gap-8">
                  {[
                    { id: 'menu', label: 'Menu', icon: Coffee },
                    { id: 'about', label: 'À Propos', icon: Info },
                    { id: 'reviews', label: 'Avis', icon: MessageSquare },
                    { id: 'contact', label: 'Contact', icon: Mail },
                    { id: 'employee', label: 'Gestion', icon: Lock }
                  ].map(item => (
                    <button 
                      key={item.id}
                      onClick={() => {
                        if (item.id === 'employee') {
                          handleEmployeeAccess();
                        } else {
                          setActiveSection(item.id as any);
                        }
                      }}
                      className={cn(
                        "flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-all",
                        activeSection === item.id ? "text-bean-green" : "text-bean-brown/60 hover:text-bean-brown"
                      )}
                    >
                      <item.icon size={16} />
                      {item.label}
                      {item.id === 'employee' && isEmployeeMode && <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />}
                    </button>
                  ))}
                </div>
                
                <button 
                  onClick={() => setView('landing')}
                  className="md:hidden text-bean-brown"
                >
                  <ChevronUp size={24} />
                </button>
              </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-16">
              <AnimatePresence mode="wait">
                {activeSection === 'menu' && (
                  <motion.section 
                    key="menu"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-16"
                  >
                    <div className="text-center max-w-2xl mx-auto">
                      <h2 className="text-5xl font-serif font-bold mb-6 italic">Notre Carte</h2>
                      <p className="text-bean-brown/60">Découvrez nos sélections de grains rares, torréfiés avec passion à Roxwood.</p>
                    </div>
                    <MenuSection />
                  </motion.section>
                )}

                {activeSection === 'about' && (
                  <motion.section 
                    key="about"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="grid md:grid-cols-2 gap-16 items-center"
                  >
                    <div className="space-y-8">
                      <h2 className="text-5xl font-serif font-bold italic">L'Histoire du Bean</h2>
                      <div className="space-y-4 text-bean-brown/80 leading-relaxed">
                        <p>Fondé en 2012 au cœur de Roxwood, le Bean Machine n'est pas qu'un simple café. C'est le point de ralliement de toute une communauté.</p>
                        <p>Notre mission a toujours été simple : offrir le meilleur café de l'état tout en créant un espace chaleureux où chaque client se sent comme à la maison.</p>
                        <p>Aujourd'hui, sous une nouvelle direction passionnée, nous continuons d'écrire cette histoire, grain après grain, avec vous.</p>
                        <p className="font-bold text-bean-green italic">Laissez-vous servir par les meilleurs frère & sœur du coin : Luis & Irma, la Castillo familia.</p>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                        <img 
                          src="https://picsum.photos/seed/cafe-interior/800/1000" 
                          alt="Intérieur du café" 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="absolute -bottom-8 -left-8 bg-bean-green p-8 rounded-3xl text-white shadow-xl hidden lg:block">
                        <p className="text-2xl font-serif italic">"Le meilleur café de Roxwood, sans exception."</p>
                      </div>
                    </div>
                  </motion.section>
                )}

                {activeSection === 'reviews' && (
                  <motion.section 
                    key="reviews"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <ReviewsSection isEmployeeMode={isEmployeeMode} />
                  </motion.section>
                )}

                {activeSection === 'contact' && (
                  <motion.section 
                    key="contact"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="grid md:grid-cols-2 gap-16"
                  >
                    <div className="space-y-12">
                      <h2 className="text-5xl font-serif font-bold italic">Nous Trouver</h2>
                      <div className="space-y-8">
                        <div className="flex gap-6 items-start">
                          <div className="w-12 h-12 bg-bean-green/10 rounded-2xl flex items-center justify-center text-bean-green shrink-0">
                            <MapPin size={24} />
                          </div>
                          <div>
                            <h4 className="font-bold text-lg mb-1">Adresse</h4>
                            <p className="text-bean-brown/60">Main Street, Roxwood District, Los Santos</p>
                          </div>
                        </div>
                        <div className="flex gap-6 items-start">
                          <div className="w-12 h-12 bg-bean-green/10 rounded-2xl flex items-center justify-center text-bean-green shrink-0">
                            <Clock size={24} />
                          </div>
                          <div>
                            <h4 className="font-bold text-lg mb-1">Horaires</h4>
                            <p className="text-bean-brown/60">Lundi - Dimanche : 07:00 - 22:00</p>
                          </div>
                        </div>
                        <div className="flex gap-6 items-start">
                          <div className="w-12 h-12 bg-bean-green/10 rounded-2xl flex items-center justify-center text-bean-green shrink-0">
                            <Phone size={24} />
                          </div>
                          <div>
                            <h4 className="font-bold text-lg mb-1">Téléphone</h4>
                            <p className="text-bean-brown/60">555-BEAN-ROX</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-8 rounded-3xl shadow-xl border border-bean-brown/5">
                      <h3 className="text-2xl font-bold mb-6">Envoyez-nous un message</h3>
                      <form 
                        className="space-y-4"
                        onSubmit={async (e) => {
                          e.preventDefault();
                          const formData = new FormData(e.currentTarget);
                          const data = {
                            name: formData.get('name'),
                            email: formData.get('email'),
                            subject: formData.get('subject'),
                            message: formData.get('message'),
                          };
                          try {
                            await fetch('/api/messages', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify(data)
                            });
                            alert('Message envoyé avec succès !');
                            (e.target as HTMLFormElement).reset();
                          } catch (err) {
                            alert('Erreur lors de l\'envoi du message.');
                          }
                        }}
                      >
                        <div className="grid grid-cols-2 gap-4">
                          <input name="name" placeholder="Nom" className="input-field" required />
                          <input name="email" type="email" placeholder="Email" className="input-field" required />
                        </div>
                        <input name="subject" placeholder="Sujet" className="input-field" required />
                        <textarea name="message" placeholder="Votre message..." className="input-field min-h-[150px]" required />
                        <button type="submit" className="w-full btn-primary flex items-center justify-center gap-2">
                          Envoyer <ArrowRight size={18} />
                        </button>
                      </form>
                    </div>
                  </motion.section>
                )}

                {activeSection === 'employee' && (
                  <motion.section 
                    key="employee"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <EmployeeSpace onLogout={() => {
                      setIsEmployeeMode(false);
                      setActiveSection('menu');
                    }} />
                  </motion.section>
                )}
              </AnimatePresence>
            </main>

            {/* Footer */}
            <footer className="bg-bean-brown text-white py-12 mt-32">
              <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12 items-center">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-bean-green rounded-full flex items-center justify-center text-white border-2 border-bean-gold">
                    <Coffee size={24} />
                  </div>
                  <span className="font-serif font-bold text-2xl uppercase tracking-tighter">Bean Machine</span>
                </div>
                <div className="text-center text-sm text-white/40">
                  <p>© 2026 Bean Machine Roxwood. Tous droits réservés.</p>
                  <p className="mt-1 italic">Propulsé par la passion du grain.</p>
                </div>
                <div className="flex justify-end gap-6">
                  <button onClick={() => setView('landing')} className="text-xs uppercase tracking-widest font-bold hover:text-bean-gold transition-colors">Retour Accueil</button>
                </div>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      <PinModal 
        isOpen={isEmployeePinModalOpen} 
        onClose={() => setIsEmployeePinModalOpen(false)} 
        endpoint="/api/auth/employee-pin"
        onSuccess={() => {
          setIsEmployeeMode(true);
          setActiveSection('employee');
        }} 
      />
    </div>
  );
}
