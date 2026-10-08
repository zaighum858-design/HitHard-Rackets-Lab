import { useState, useMemo } from 'react';
import { X, Check, Mail, Lock, Eye, EyeOff, User, LogOut, Loader2, Award } from 'lucide-react';

interface ProfileModalProps {
  onClose: () => void;
  playerProfile: {
    name: string;
    playStyle: string;
    hand: string;
    gripSize: string;
    surface: string;
  };
  setPlayerProfile: (profile: any) => void;
  currentUser: { email: string; name: string } | null;
  setCurrentUser: (user: { email: string; name: string } | null) => void;
  initialAuthTab?: 'signin' | 'signup';
}

export default function ProfileModal({
  onClose,
  playerProfile,
  setPlayerProfile,
  currentUser,
  setCurrentUser,
  initialAuthTab = 'signin'
}: ProfileModalProps) {
  // Authentication tab state ('signin' | 'signup')
  const [authTab, setAuthTab] = useState<'signin' | 'signup'>(initialAuthTab);
  
  // Form input states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signUpName, setSignUpName] = useState('');
  const [playerTier, setPlayerTier] = useState('Spin Wizard');
  const [showPassword, setShowPassword] = useState(false);
  
  // UI interaction states
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Specs editing states
  const [name, setName] = useState(currentUser ? currentUser.name : playerProfile.name);
  const [playStyle, setPlayStyle] = useState(playerProfile.playStyle);
  const [hand, setHand] = useState(playerProfile.hand);
  const [gripSize, setGripSize] = useState(playerProfile.gripSize);
  const [surface, setSurface] = useState(playerProfile.surface);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const stylesList = [
    { id: 'Aggressive Baseline', label: 'Aggressive Baseline (Power & Spin)' },
    { id: 'All-Court Attacker', label: 'All-Court Attacker (Touch & Volley)' },
    { id: 'Defensive Retriever', label: 'Defensive Retriever (Comfort & Depth)' }
  ];

  const gripSizesList = [
    { id: '4 1/4 (L2)', label: '4 1/4 in (Size 2 - Standard)' },
    { id: '4 3/8 (L3)', label: '4 3/8 in (Size 3 - Large)' }
  ];

  const surfacesList = [
    { id: 'Hard-Court', label: 'Acrylic Hard-Court' },
    { id: 'Clay-Court', label: 'Red Clay Court' },
    { id: 'Grass-Court', label: 'Lawn Grass Court' }
  ];

  // Dynamic racquet specs advisory based on selected playstyle
  const recommendationSummary = useMemo(() => {
    if (playStyle === 'Aggressive Baseline') {
      return {
        racket: 'Carbon-Volt Pro 100',
        tension: '55 lbs',
        string: 'Chrono-Spun Polyester',
        tip: 'Perfect for deep baseline groundstrokes with heavy top-spin.'
      };
    } else if (playStyle === 'All-Court Attacker') {
      return {
        racket: 'Hexa-Carbon Padel Elite',
        tension: '52 lbs',
        string: 'Vortex Natural Gut 16',
        tip: 'Enhances pocketing feel, touch, and reaction speed around the net.'
      };
    } else {
      return {
        racket: 'Saber Featherweight Speed',
        tension: '49 lbs',
        string: 'Vortex Natural Gut 16',
        tip: 'Excellent trampoline depth and premium joint shock protection.'
      };
    }
  }, [playStyle]);

  // Handle Sign In submission
  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsLoading(true);

    // Simulate verification delay
    setTimeout(() => {
      if (!email.includes('@') || password.length < 4) {
        setAuthError('INVALID EMAIL OR PASSWORD (MINIMUM 4 CHARACTERS REQUIRED).');
        setIsLoading(false);
        return;
      }

      // Successful sign in simulation
      const computedName = email.split('@')[0].toUpperCase();
      setCurrentUser({
        email,
        name: computedName
      });
      setName(computedName);
      setSuccessMsg('SIGNED IN SUCCESSFULLY!');
      setIsLoading(false);
      
      // Flash message and transition
      setTimeout(() => {
        setSuccessMsg('');
      }, 1500);
    }, 1200);
  };

  // Handle Sign Up creation
  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsLoading(true);

    setTimeout(() => {
      if (!email.includes('@') || password.length < 4 || !signUpName.trim()) {
        setAuthError('PLEASE COMPILE ALL FIELDS WITH CORRECT FORMATS.');
        setIsLoading(false);
        return;
      }

      // Successful registration simulation
      const newName = signUpName.toUpperCase();
      setCurrentUser({
        email,
        name: newName
      });
      setName(newName);
      setPlayStyle(playerTier === 'Heavy Hitter' ? 'Aggressive Baseline' : 'All-Court Attacker');
      setSuccessMsg('PLAYER ACCOUNT CREATED SUCCESSFULLY!');
      setIsLoading(false);

      setTimeout(() => {
        setSuccessMsg('');
      }, 1500);
    }, 1200);
  };

  // Handle Profile Specs saving
  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    setPlayerProfile({
      name,
      playStyle,
      hand,
      gripSize,
      surface
    });
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 1200);
  };

  // Handle logout
  const handleLogOut = () => {
    setCurrentUser(null);
    setEmail('');
    setPassword('');
    setSignUpName('');
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-xs flex items-center justify-center z-[100] p-4 select-none">
      <div className="bg-theme-card rounded-[24px] max-w-lg w-full border border-theme-border shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh] text-left animate-in fade-in zoom-in-95 duration-200">
        
        {/* Simple Close Icon */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-theme-bg border border-theme-border text-theme-text hover:bg-theme-bg/50 flex items-center justify-center transition-all cursor-pointer z-50 hover:rotate-90 duration-300"
        >
          <X className="w-4.5 h-4.5" />
        </button>

        {/* Dynamic Header Section */}
        <div className="p-6 pb-4 border-b border-theme-border">
          <span className="text-[10px] font-mono font-black text-theme-primary uppercase tracking-widest bg-theme-primary/10 px-2.5 py-1 rounded-md">
            {currentUser ? 'PLAYER SPECS PORTAL' : 'GATEWAY VERIFICATION'}
          </span>
          <h2 className="text-xl font-black uppercase text-theme-text font-display mt-2.5">
            {currentUser ? 'Tuning Analyzer & Profile' : 'Authenticate Player Hub'}
          </h2>
        </div>

        {/* Form Body Context */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5 bg-theme-card">
          
          {/* Flash Success notifications */}
          {successMsg && (
            <div className="bg-emerald-500/15 border border-emerald-500/35 text-emerald-400 text-xs py-3 px-4 rounded-xl flex items-center gap-2 animate-pulse">
              <Check className="w-4 h-4 shrink-0" />
              <span className="font-bold uppercase tracking-wider">{successMsg}</span>
            </div>
          )}

          {/* Error notifications */}
          {authError && (
            <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs py-3 px-4 rounded-xl flex items-center gap-2">
              <span className="font-bold tracking-tight uppercase">{authError}</span>
            </div>
          )}

          {/* CASE A: USER IS NOT LOGGED IN - Show Login & Sign-up Forms */}
          {!currentUser ? (
            <div className="flex flex-col gap-5">
              
              {/* Segmented Sign In / Sign Up tabs switcher */}
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-theme-bg border border-theme-border rounded-xl">
                <button
                  type="button"
                  onClick={() => {
                    setAuthTab('signin');
                    setAuthError('');
                  }}
                  className={`py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                    authTab === 'signin'
                      ? 'bg-theme-primary text-theme-on-primary shadow-sm'
                      : 'text-theme-muted hover:text-theme-text'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuthTab('signup');
                    setAuthError('');
                  }}
                  className={`py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                    authTab === 'signup'
                      ? 'bg-theme-primary text-theme-on-primary shadow-sm'
                      : 'text-theme-muted hover:text-theme-text'
                  }`}
                >
                  Create Account
                </button>
              </div>

              {/* Display loading micro-state or render target form */}
              {isLoading ? (
                <div className="py-12 flex flex-col items-center justify-center gap-3">
                  <Loader2 className="w-10 h-10 text-theme-primary animate-spin" />
                  <span className="text-xs font-mono font-bold text-theme-muted uppercase tracking-widest animate-pulse">
                    Authenticating Player Specs...
                  </span>
                </div>
              ) : authTab === 'signin' ? (
                /* --- SIGN IN FORM --- */
                <form onSubmit={handleSignInSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-theme-muted uppercase tracking-wider">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-theme-muted" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. zaighum858@gmail.com"
                        className="w-full bg-theme-bg border border-theme-border text-xs font-semibold rounded-xl pl-10 pr-4 py-3 outline-none text-theme-text placeholder-theme-muted/40 uppercase tracking-wide"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-theme-muted uppercase tracking-wider">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-theme-muted" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-theme-bg border border-theme-border text-xs font-semibold rounded-xl pl-10 pr-10 py-3 outline-none text-theme-text placeholder-theme-muted/40 tracking-widest"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-3.5 text-theme-muted hover:text-theme-text cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="mt-2 py-3 bg-theme-primary hover:bg-theme-primary-hover text-theme-on-primary text-xs font-black tracking-widest uppercase rounded-xl transition-all cursor-pointer text-center shadow-md hover:shadow-lg"
                  >
                    SIGN INTO BOUTIQUE TUNING
                  </button>

                  <div className="flex items-center gap-2 my-1">
                    <div className="h-px bg-theme-border flex-1"></div>
                    <span className="text-[10px] font-mono text-theme-muted uppercase">or</span>
                    <div className="h-px bg-theme-border flex-1"></div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setCurrentUser({
                        email: 'zaighum858@gmail.com',
                        name: 'ZAIGHUM'
                      });
                      setName('ZAIGHUM');
                      setSuccessMsg('SIGNED IN AS ZAIGHUM!');
                      setTimeout(() => setSuccessMsg(''), 1500);
                    }}
                    className="py-2.5 px-3 bg-theme-primary/10 hover:bg-theme-primary/20 text-theme-primary border border-theme-primary/30 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    ⚡ Instant Demo Sign-In (Zaighum)
                  </button>

                  <p className="text-[10px] text-theme-muted text-center leading-normal uppercase tracking-wider mt-1 select-none">
                    Enter any valid email address above to log in instantly.
                  </p>
                </form>
              ) : (
                /* --- CREATE ACCOUNT FORM --- */
                <form onSubmit={handleSignUpSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-theme-muted uppercase tracking-wider">Player Name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3.5 w-4 h-4 text-theme-muted" />
                      <input
                        type="text"
                        value={signUpName}
                        onChange={(e) => setSignUpName(e.target.value)}
                        placeholder="e.g. ZAIGHUM"
                        className="w-full bg-theme-bg border border-theme-border text-xs font-semibold rounded-xl pl-10 pr-4 py-3 outline-none text-theme-text placeholder-theme-muted/40 uppercase tracking-wide"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-theme-muted uppercase tracking-wider">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-theme-muted" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="player@rackets.com"
                        className="w-full bg-theme-bg border border-theme-border text-xs font-semibold rounded-xl pl-10 pr-4 py-3 outline-none text-theme-text placeholder-theme-muted/40 uppercase tracking-wide"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-theme-muted uppercase tracking-wider">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-theme-muted" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-theme-bg border border-theme-border text-xs font-semibold rounded-xl pl-10 pr-10 py-3 outline-none text-theme-text placeholder-theme-muted/40 tracking-widest"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-3.5 text-theme-muted hover:text-theme-text cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-theme-muted uppercase tracking-wider">Player Level & Tier</label>
                    <select
                      value={playerTier}
                      onChange={(e) => setPlayerTier(e.target.value)}
                      className="w-full bg-theme-bg border border-theme-border text-xs font-semibold rounded-xl p-3 outline-none text-theme-text cursor-pointer uppercase tracking-wider"
                    >
                      <option value="Spin Wizard">Spin Wizard (Top-Spin Bias)</option>
                      <option value="Heavy Hitter">Heavy Hitter (Baseline Power)</option>
                      <option value="Court Architect">Court Architect (Finesse & Control)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="mt-2 py-3 bg-theme-primary hover:bg-theme-primary-hover text-theme-on-primary text-xs font-black tracking-widest uppercase rounded-xl transition-all cursor-pointer text-center shadow-md hover:shadow-lg"
                  >
                    CREATE CHASSIS ACCOUNT
                  </button>
                </form>
              )}

            </div>
          ) : (
            /* CASE B: USER IS LOGGED IN - Show specs calculator and profile */
            <div className="flex flex-col gap-6">
              
              {/* Authenticated user banner badge */}
              <div className="flex justify-between items-center bg-theme-bg border border-theme-border p-4 rounded-xl shadow-inner">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-theme-primary/10 flex items-center justify-center border border-theme-primary/30">
                    <Award className="w-5 h-5 text-theme-primary" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-theme-muted uppercase tracking-wider leading-none">PLAYER AUTHENTICATED</span>
                    <h4 className="text-xs font-black uppercase text-theme-text leading-tight tracking-wide mt-0.5">{currentUser.email}</h4>
                  </div>
                </div>
                <button
                  onClick={handleLogOut}
                  title="Sign Out"
                  className="p-2.5 rounded-full hover:bg-rose-500/10 text-rose-500 border border-theme-border hover:border-rose-500/20 transition-all cursor-pointer flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </div>

              {saveSuccess && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs py-2.5 px-4 rounded-xl flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Specs saved successfully! Tuning advisor updated.</span>
                </div>
              )}

              <form onSubmit={handleProfileSave} className="flex flex-col gap-4">
                {/* Player Name */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-theme-muted uppercase">Player Username / Handle</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-theme-bg border border-theme-border text-sm font-semibold rounded-xl p-2.5 outline-none text-theme-text uppercase placeholder-theme-muted/50"
                    required
                  />
                </div>

                {/* Play Style */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-theme-muted uppercase">Preferred Play Style</label>
                  <select
                    value={playStyle}
                    onChange={(e) => setPlayStyle(e.target.value)}
                    className="w-full bg-theme-bg border border-theme-border text-sm font-semibold rounded-xl p-2.5 outline-none text-theme-text cursor-pointer uppercase tracking-wider"
                  >
                    {stylesList.map((st) => (
                      <option key={st.id} value={st.id}>{st.label}</option>
                    ))}
                  </select>
                </div>

                {/* Dominant Hand Selection */}
                <div className="grid grid-cols-2 gap-2 mt-1">
                  {['Right-Handed', 'Left-Handed'].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setHand(item)}
                      className={`py-2 rounded-xl border text-xs font-bold uppercase transition-all cursor-pointer ${
                        hand === item
                          ? 'bg-theme-primary text-theme-on-primary border-theme-primary'
                          : 'bg-theme-bg border-theme-border text-theme-muted hover:bg-theme-bg/50'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>

                {/* Grip Size */}
                <div className="flex flex-col gap-1 mt-1">
                  <label className="text-xs font-bold text-theme-muted uppercase">Grip Size</label>
                  <select
                    value={gripSize}
                    onChange={(e) => setGripSize(e.target.value)}
                    className="w-full bg-theme-bg border border-theme-border text-sm font-semibold rounded-xl p-2.5 outline-none text-theme-text cursor-pointer uppercase"
                  >
                    {gripSizesList.map((g) => (
                      <option key={g.id} value={g.id}>{g.label}</option>
                    ))}
                  </select>
                </div>

                {/* Main Court Surface */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-theme-muted uppercase">Main Court Surface</label>
                  <select
                    value={surface}
                    onChange={(e) => setSurface(e.target.value)}
                    className="w-full bg-theme-bg border border-theme-border text-sm font-semibold rounded-xl p-2.5 outline-none text-theme-text cursor-pointer uppercase"
                  >
                    {surfacesList.map((surf) => (
                      <option key={surf.id} value={surf.id}>{surf.label}</option>
                    ))}
                  </select>
                </div>

                {/* Save Button */}
                <button
                  type="submit"
                  className="mt-2 py-3 bg-theme-primary hover:bg-theme-primary-hover text-theme-on-primary text-xs font-black tracking-widest uppercase rounded-full transition-all cursor-pointer text-center shadow-md hover:shadow-lg"
                >
                  SAVE SPECS & ALIGN SHOP
                </button>
              </form>

              {/* Simple Clean Recommendation Panel */}
              <div className="border-t border-theme-border pt-5">
                <h3 className="text-xs font-mono font-bold text-theme-primary uppercase tracking-wide mb-3">
                  RECOMMENDED CONFIGURATION
                </h3>
                
                <div className="bg-theme-bg rounded-xl p-4 border border-theme-border text-xs flex flex-col gap-2">
                  <div className="flex justify-between items-center py-1 border-b border-theme-border/50">
                    <span className="text-theme-muted font-medium">Optimal Frame</span>
                    <span className="font-bold text-theme-text">{recommendationSummary.racket}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-theme-border/50">
                    <span className="text-theme-muted font-medium">Optimal String</span>
                    <span className="font-bold text-theme-text">{recommendationSummary.string}</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-theme-muted font-medium">Tension</span>
                    <span className="font-bold text-theme-primary">{recommendationSummary.tension}</span>
                  </div>
                  <p className="text-[11px] text-theme-muted leading-relaxed mt-2 italic bg-theme-card p-2.5 rounded-lg border border-theme-border/50 text-center font-medium">
                    "{recommendationSummary.tip}"
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
