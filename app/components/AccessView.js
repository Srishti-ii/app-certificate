import React from 'react';
import { Search, Eye, CheckCircle, Shield, QrCode } from 'lucide-react';

const AccessView = ({
setCurrentView,
accessStep,
accessForm,
handleAccessInputChange,
searchCertificate,
verifyCertificate,
resetAccess,
foundCertificate,
isVerifying
}) => {
return (
<div className="max-w-4xl mx-auto">
<div className="flex justify-between items-center mb-6">
<h2 className="text-3xl font-bold text-gray-800">Access & Verify Certificates</h2>
<button
onClick={() => setCurrentView('home')}
className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
>
← Back to Home
</button>
</div>

<div className="flex justify-center mb-8">
<div className="flex items-center space-x-4">
{[1, 2, 3].map((step) => (
<div key={step} className="flex items-center">
<div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
accessStep >= step ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
}`}>
{step}
</div>
{step < 3 && (
<div className={`w-16 h-1 ${accessStep > step ? 'bg-green-500' : 'bg-gray-300'}`} />
)}
</div>
))}
</div>
</div>

{accessStep === 1 && (
<div className="bg-white rounded-xl shadow-lg p-6">
<div className="flex items-center mb-6">
<Search className="w-8 h-8 text-green-500 mr-3" />
<h3 className="text-2xl font-bold">Find Certificate</h3>
</div>
<div className="max-w-md mx-auto space-y-4">
<div>
<label className="block text-sm font-medium text-gray-700 mb-1">Certificate ID</label>
<input type="text" name="certificateId" value={accessForm.certificateId} onChange={handleAccessInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="e.g., CERT-1695123456789" />
</div>
<div className="text-center text-gray-500">OR</div>
<div>
<label className="block text-sm font-medium text-gray-700 mb-1">Student Email</label>
<input type="email" name="studentEmail" value={accessForm.studentEmail} onChange={handleAccessInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="student@email.com" />
</div>
<button onClick={searchCertificate} className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200">
Find Certificate
</button>
</div>
<div className="mt-6 p-4 bg-green-50 rounded-lg">
<h4 className="font-semibold text-green-800 mb-2">How to Access:</h4>
<ul className="text-sm text-green-700 space-y-1">
<li>• Students: Use your email to find all your certificates</li>
<li>• Employers: Use the Certificate ID provided by the applicant</li>
<li>• QR Code: Scan with your phone camera (coming soon)</li>
</ul>
</div>
</div>
)}

{accessStep === 2 && foundCertificate && (
<div className="bg-white rounded-xl shadow-lg p-6">
<div className="flex items-center mb-6">
<Eye className="w-8 h-8 text-blue-500 mr-3" />
<h3 className="text-2xl font-bold">Certificate Found</h3>
</div>
<div className="border-2 border-green-200 rounded-lg p-6 mb-6">
<div className="flex items-center justify-between mb-4">
<h4 className="text-xl font-bold">{foundCertificate.studentName}</h4>
<Shield className="w-8 h-8 text-green-500" />
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
<div>
<p className="font-medium text-gray-700">Course:</p>
<p className="text-gray-600">{foundCertificate.course}</p>
</div>
<div>
<p className="font-medium text-gray-700">Institute:</p>
<p className="text-gray-600">{foundCertificate.instituteName}</p>
</div>
<div>
<p className="font-medium text-gray-700">Completion Date:</p>
<p className="text-gray-600">{foundCertificate.completionDate || 'Not specified'}</p>
</div>
<div>
<p className="font-medium text-gray-700">Grade:</p>
<p className="text-gray-600">{foundCertificate.grade || 'Not specified'}</p>
</div>
</div>
<div className="mt-4 p-3 bg-gray-100 rounded text-xs">
<p><strong>Certificate ID:</strong> {foundCertificate.id}</p>
<p><strong>Blockchain Hash:</strong> {foundCertificate.blockchainHash}</p>
</div>
</div>
<div className="text-center">
<button onClick={verifyCertificate} disabled={isVerifying} className="bg-purple-500 hover:bg-purple-600 disabled:bg-purple-300 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 mr-4">
{isVerifying ? 'Verifying...' : 'Verify on Blockchain'}
</button>
<button onClick={resetAccess} className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg">
Search Another
</button>
</div>
</div>
)}

{accessStep === 3 && foundCertificate && (
<div className="bg-white rounded-xl shadow-lg p-6">
<div className="text-center">
<CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
<h3 className="text-2xl font-bold text-green-800 mb-2">Certificate Verified ✅</h3>
<p className="text-gray-600 mb-6">This certificate is authentic and has been verified on the blockchain.</p>
<div className="bg-green-50 rounded-lg p-6 mb-6">
<h4 className="font-semibold text-green-800 mb-4">Verification Details:</h4>
<div className="text-left space-y-2 text-sm">
<p><strong>✓ Blockchain Verified:</strong> Certificate exists on immutable ledger</p>
<p><strong>✓ Institute Verified:</strong> {foundCertificate.instituteName}</p>
<p><strong>✓ Student Verified:</strong> {foundCertificate.studentName}</p>
<p><strong>✓ Course Verified:</strong> {foundCertificate.course}</p>
<p><strong>✓ Issue Date:</strong> {foundCertificate.issueDate}</p>
</div>
</div>
<div className="flex justify-center space-x-4">
<div className="text-center">
<QrCode className="w-16 h-16 text-gray-400 mx-auto mb-2" />
<p className="text-sm text-gray-600">Share QR Code</p>
</div>
</div>
<div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
<button onClick={resetAccess} className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg">
Verify Another Certificate
</button>
<button onClick={() => setCurrentView('home')} className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg">
Back to Home
</button>
</div>
</div>
</div>
)}
</div>
);
};

export default AccessView;

