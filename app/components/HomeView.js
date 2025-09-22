import React from 'react';
import { Upload, Search } from 'lucide-react';

const HomeView = ({ setCurrentView }) => {
return (
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
<div
onClick={() => setCurrentView('upload')}
className="bg-white rounded-xl shadow-lg p-8 cursor-pointer hover:shadow-xl transition-shadow duration-300"
>
<div className="text-center">
<Upload className="w-16 h-16 text-blue-500 mx-auto mb-4" />
<h2 className="text-2xl font-bold text-gray-800 mb-3">Issue Certificate</h2>
<p className="text-gray-600 mb-4">
For educational institutes and training centers
</p>
<ul className="text-sm text-gray-500 text-left space-y-2">
<li>• Upload student certificates</li>
<li>• Store on blockchain</li>
<li>• Generate verification QR codes</li>
<li>• Send to students securely</li>
</ul>
<div className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold">
Start Issuing →
</div>
</div>
</div>

<div
onClick={() => setCurrentView('access')}
className="bg-white rounded-xl shadow-lg p-8 cursor-pointer hover:shadow-xl transition-shadow duration-300"
>
<div className="text-center">
<Search className="w-16 h-16 text-green-500 mx-auto mb-4" />
<h2 className="text-2xl font-bold text-gray-800 mb-3">Access & Verify</h2>
<p className="text-gray-600 mb-4">
For students, employers, and verifiers
</p>
<ul className="text-sm text-gray-500 text-left space-y-2">
<li>• View your certificates</li>
<li>• Share with employers</li>
<li>• Instant verification</li>
<li>• QR code scanning</li>
</ul>
<div className="mt-6 bg-green-500 text-white px-4 py-2 rounded-lg font-semibold">
Access Certificates →
</div>
</div>
</div>
</div>
);
};

export default HomeView;

