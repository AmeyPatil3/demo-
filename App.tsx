
import React, { useState, useEffect, useCallback } from 'react';
import { 
  BarChart3, 
  ShieldCheck, 
  Zap, 
  Globe, 
  Code2, 
  ArrowRight, 
  CheckCircle2, 
  ExternalLink,
  Menu,
  X,
  Play,
  Activity,
  Settings2,
  MousePointer2
} from 'lucide-react';

/**
 * MatomoDemo - Enhanced with live tracking testing capabilities.
 */

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'benefits' | 'setup' | 'lab'>('benefits');
  
  // Tracking State
  const [matomoUrl, setMatomoUrl] = useState('');
  const [siteId, setSiteId] = useState('');
  const [isTracking, setIsTracking] = useState(false);

  // Function to inject Matomo script
  const startTracking = useCallback(() => {
    if (!matomoUrl || !siteId) return;

    // Clean URL
    const url = matomoUrl.endsWith('/') ? matomoUrl : `${matomoUrl}/`;
    
    // Matomo standard initialization
    (window as any)._paq = (window as any)._paq || [];
    const _paq = (window as any)._paq;
    _paq.push(['setTrackerUrl', url + 'matomo.php']);
    _paq.push(['setSiteId', siteId]);
    _paq.push(['trackPageView']);
    _paq.push(['enableLinkTracking']);

    const d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
    g.async = true;
    g.src = url + 'matomo.js';
    if (s && s.parentNode) {
      s.parentNode.insertBefore(g, s);
    } else {
      d.head.appendChild(g);
    }
    
    setIsTracking(true);
    alert('Matomo tracking initialized! Check your dashboard for real-time visitors.');
  }, [matomoUrl, siteId]);

  // Function to track a custom event
  const trackCustomEvent = (category: string, action: string) => {
    if ((window as any)._paq) {
      (window as any)._paq.push(['trackEvent', category, action]);
      alert(`Event Sent: ${category} -> ${action}`);
    } else {
      alert('Tracking not active. Please set up the lab first.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">MatomoLab</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              {isTracking && (
                <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold animate-pulse">
                  <Activity className="w-3 h-3" /> TRACKING ACTIVE
                </div>
              )}
              <a href="#features" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Features</a>
              <a href="#matomo" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Test Lab</a>
              <button className="bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-indigo-700 transition-all shadow-md">
                Get Started
              </button>
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-slate-600">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-6">
            <Settings2 className="w-3 h-3" />
            Live Testing Environment
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-6">
            Test Matomo <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Live</span> <br /> On This Page.
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
            Connect your own Matomo instance below to see exactly how page views, events, and user behaviors are captured in real-time.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a href="#matomo" className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-xl">
              Open Test Lab <Play className="w-5 h-5" />
            </a>
          </div>
        </div>
      </header>

      {/* Feature Grid */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Core Analytics Features</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">See how these features look in your dashboard after connecting.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<ShieldCheck className="w-6 h-6 text-emerald-600" />}
              title="Privacy Protection"
              description="Matomo allows you to anonymize user IPs and respect 'Do Not Track' settings easily."
              color="bg-emerald-50"
            />
            <FeatureCard 
              icon={<MousePointer2 className="w-6 h-6 text-amber-600" />}
              title="Event Tracking"
              description="Capture clicks, file downloads, and custom interactions using the JavaScript API."
              color="bg-amber-50"
            />
            <FeatureCard 
              icon={<Globe className="w-6 h-6 text-indigo-600" />}
              title="Real-time Map"
              description="Watch visitors move through this page live on your Matomo World Map."
              color="bg-indigo-50"
            />
          </div>
        </div>
      </section>

      {/* Matomo Lab Section */}
      <section id="matomo" className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
            <div className="p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Code2 className="text-indigo-600 w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900">Matomo Testing Lab</h2>
              </div>
              
              <div className="flex border-b border-slate-200 mb-8 overflow-x-auto">
                <button 
                  onClick={() => setActiveTab('benefits')}
                  className={`px-6 py-4 font-semibold text-sm whitespace-nowrap transition-all border-b-2 ${activeTab === 'benefits' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                >
                  Key Benefits
                </button>
                <button 
                  onClick={() => setActiveTab('lab')}
                  className={`px-6 py-4 font-semibold text-sm whitespace-nowrap transition-all border-b-2 ${activeTab === 'lab' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                >
                  Live Test Lab
                </button>
                <button 
                  onClick={() => setActiveTab('setup')}
                  className={`px-6 py-4 font-semibold text-sm whitespace-nowrap transition-all border-b-2 ${activeTab === 'setup' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                >
                  Manual Code
                </button>
              </div>

              {activeTab === 'benefits' && (
                <div className="space-y-6 animate-in fade-in duration-500">
                  <p className="text-slate-600 leading-relaxed">Matomo gives you the insights you need without the privacy compromises of Google Analytics. By testing it here, you can verify:</p>
                  <ul className="grid sm:grid-cols-2 gap-4">
                    <BenefitItem text="Real-time visitor logs" />
                    <BenefitItem text="Custom event triggers" />
                    <BenefitItem text="Device & browser detection" />
                    <BenefitItem text="Page performance metrics" />
                  </ul>
                </div>
              )}

              {activeTab === 'lab' && (
                <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
                  <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-2xl">
                    <h3 className="text-indigo-900 font-bold mb-4 flex items-center gap-2">
                      <Settings2 className="w-4 h-4" /> 1. Configure Connection
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-indigo-700 uppercase tracking-wider mb-1">Matomo URL</label>
                        <input 
                          type="text" 
                          placeholder="https://your-matomo.cloud/"
                          value={matomoUrl}
                          onChange={(e) => setMatomoUrl(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-indigo-200 focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-indigo-700 uppercase tracking-wider mb-1">Site ID</label>
                        <input 
                          type="text" 
                          placeholder="e.g. 1"
                          value={siteId}
                          onChange={(e) => setSiteId(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-indigo-200 focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                        />
                      </div>
                    </div>
                    <button 
                      onClick={startTracking}
                      disabled={isTracking || !matomoUrl || !siteId}
                      className="mt-4 w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-200"
                    >
                      {isTracking ? '✓ Tracking Initialized' : 'Connect & Start Tracking'}
                    </button>
                  </div>

                  <div className={`p-6 rounded-2xl border ${isTracking ? 'bg-white border-slate-200' : 'bg-slate-50 border-slate-100 opacity-50 grayscale'}`}>
                    <h3 className="text-slate-900 font-bold mb-4 flex items-center gap-2">
                      <Activity className="w-4 h-4" /> 2. Test Custom Events
                    </h3>
                    <p className="text-sm text-slate-500 mb-6">Once connected, click these buttons to send custom event data to your Matomo dashboard.</p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <button 
                        onClick={() => trackCustomEvent('Interface', 'Demo Click')}
                        className="flex items-center justify-center gap-2 p-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl font-semibold text-slate-700 transition-all"
                      >
                        <MousePointer2 className="w-4 h-4" /> Track Button Click
                      </button>
                      <button 
                        onClick={() => trackCustomEvent('Content', 'Guide Read')}
                        className="flex items-center justify-center gap-2 p-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl font-semibold text-slate-700 transition-all"
                      >
                        <ExternalLink className="w-4 h-4" /> Track Interaction
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'setup' && (
                <div className="space-y-6 animate-in fade-in duration-500">
                  <p className="text-slate-600">Standard snippet for your production environment:</p>
                  <div className="bg-slate-900 rounded-xl p-6 overflow-x-auto relative group">
                    <pre className="text-indigo-300 text-xs md:text-sm font-mono leading-relaxed">
                      {`<!-- Matomo Tracking Code -->
<script>
  var _paq = window._paq = window._paq || [];
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  (function() {
    var u="${matomoUrl || '//your-matomo-url.com/'}";
    _paq.push(['setTrackerUrl', u+'matomo.php']);
    _paq.push(['setSiteId', '${siteId || 'YOUR_SITE_ID'}']);
    var d=document, g=d.createElement('script'), 
        s=d.getElementsByTagName('script')[0];
    g.async=true; g.src=u+'matomo.js'; 
    s.parentNode.insertBefore(g,s);
  })();
</script>`}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Satisfied with the results?</h2>
          <p className="text-indigo-100 mb-10 max-w-xl mx-auto">Matomo can be self-hosted on your own server or used as a cloud service.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-indigo-600 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-50 transition-all shadow-xl">
              Cloud Free Trial
            </button>
            <button className="bg-indigo-500 text-white border border-indigo-400 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-400 transition-all">
              Download On-Premise
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-slate-900 rounded flex items-center justify-center">
                <BarChart3 className="text-white w-4 h-4" />
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900">MatomoLab</span>
            </div>
            <div className="flex gap-8 text-sm text-slate-500">
              <a href="https://matomo.org" target="_blank" rel="noreferrer" className="hover:text-indigo-600">Official Website</a>
              <a href="#" className="hover:text-indigo-600">Support</a>
              <a href="#" className="hover:text-indigo-600">Privacy</a>
            </div>
            <p className="text-sm text-slate-400">Experimental Matomo Tester Page</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, color }) => (
  <div className="p-8 rounded-3xl border border-slate-100 bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
    <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center mb-6`}>
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600 leading-relaxed text-sm">{description}</p>
  </div>
);

const BenefitItem: React.FC<{ text: string }> = ({ text }) => (
  <li className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
    <CheckCircle2 className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
    <span className="text-slate-700 text-sm font-medium">{text}</span>
  </li>
);

export default App;
