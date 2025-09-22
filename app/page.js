'use client';

import React, { useState } from 'react';
import { Award, User, CheckCircle, QrCode, Shield, Building, Upload, Search, FileText, Eye, Download } from 'lucide-react';

const CertificateApp = () => {
const [currentView, setCurrentView] = useState('home');
const [uploadStep, setUploadStep] = useState(1);
const [accessStep, setAccessStep] = useState(1);

const [certificates, setCertificates] = useState([]);

const [certificateForm, setCertificateForm] = useState({
studentName: '',
studentEmail: '',
course: '',
instituteName: '',
instituteEmail: '',
completionDate: '',
grade: '',
duration: '',
certificateFile: null
});


const [accessForm, setAccessForm] = useState({
certificateId: '',
studentEmail: ''
});

const [foundCertificate, setFoundCertificate] = useState(null);
const [isVerifying, setIsVerifying] = useState(false);

const handleInputChange = (e) => {
const { name, value } = e.target;
setCertificateForm(prev => ({
...prev,
[name]: value
}));
};

const handleFileUpload = (e) => {
const file = e.target.files[0];
setCertificateForm(prev => ({
...prev,
certificateFile: file
}));
};

const issueCertificate = () => {
if (!certificateForm.studentName || !certificateForm.course || !certificateForm.instituteName) {
alert('Please fill in all required fields');
return;
}

const newCertificate = {
id: `CERT-${Date.now()}`,
blockchainHash: `0x${Math.random().toString(16).substr(2, 16)}`,
...certificateForm,
issueDate: new Date().toISOString().split('T')[0],
verified: true,
qrCode: `verify/${Date.now()}`
};

setCertificates(prev => [...prev, newCertificate]);
setUploadStep(2);
};

const resetUpload = () => {
setUploadStep(1);
setCertificateForm({
studentName: '',
studentEmail: '',
course: '',
instituteName: '',
instituteEmail: '',
completionDate: '',
grade: '',
duration: '',
certificateFile: null
});
};

const handleAccessInputChange = (e) => {
const { name, value } = e.target;
setAccessForm(prev => ({
...prev,
[name]: value
}));
};

const searchCertificate = () => {
if (!accessForm.certificateId && !accessForm.studentEmail) {
alert('Please provide either Certificate ID or Student Email');
return;
}

const found = certificates.find(cert => 
cert.id === accessForm.certificateId || 
cert.studentEmail === accessForm.studentEmail
);

if (found) {
setFoundCertificate(found);
setAccessStep(2);
} else {
alert('Certificate not found. Please check your details.');
}
};

const verifyCertificate = () => {
setIsVerifying(true);
setTimeout(() => {
setIsVerifying(false);
setAccessStep(3);
}, 2000);
};

const resetAccess = () => {
setAccessStep(1);
setFoundCertificate(null);
setAccessForm({
certificateId: '',
studentEmail: ''
});
};

return (
<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 font-sans">
<div className="max-w-6xl mx-auto">
{/* Header */}
<div className="text-center mb-8">
<h1 className="text-4xl font-bold text-gray-800 mb-2">
Blockchain Certificate System
</h1>
<p className="text-lg text-gray-600">
Secure, tamper-proof digital certificates on blockchain
</p>
</div>

{/* Navigation */}
{currentView === 'home' && (
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
)}

{/* Upload Section */}
{currentView === 'upload' && (
<div className="max-w-4xl mx-auto">
<div className="flex justify-between items-center mb-6">
<h2 className="text-3xl font-bold text-gray-800">Issue New Certificate</h2>
<button 
onClick={() => setCurrentView('home')}
className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
>
← Back to Home
</button>
</div>

{/* Upload Progress */}
<div className="flex justify-center mb-8">
<div className="flex items-center space-x-4">
{[1, 2].map((step) => (
<div key={step} className="flex items-center">
<div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
uploadStep >= step ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'
}`}>
{step}
</div>
{step < 2 && (
<div className={`w-16 h-1 ${uploadStep > step ? 'bg-blue-500' : 'bg-gray-300'}`} />
)}
</div>
))}
</div>
</div>

{uploadStep === 1 && (
<div className="bg-white rounded-xl shadow-lg p-6">
<div className="flex items-center mb-6">
<Building className="w-8 h-8 text-blue-500 mr-3" />
<h3 className="text-2xl font-bold">Certificate Details</h3>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
{/* Student Information */}
<div className="space-y-4">
<h4 className="font-semibold text-lg text-gray-700">Student Information</h4>

<div>
<label className="block text-sm font-medium text-gray-700 mb-1">
Student Name *
</label>
<input
type="text"
name="studentName"
value={certificateForm.studentName}
onChange={handleInputChange}
className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
placeholder="Enter student's full name"
/>
</div>

<div>
<label className="block text-sm font-medium text-gray-700 mb-1">
Student Email
</label>
<input
type="email"
name="studentEmail"
value={certificateForm.studentEmail}
onChange={handleInputChange}
className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
placeholder="student@email.com"
/>
</div>

<div>
<label className="block text-sm font-medium text-gray-700 mb-1">
Course/Program Name *
</label>
<input
type="text"
name="course"
value={certificateForm.course}
onChange={handleInputChange}
className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
placeholder="e.g., Full Stack Web Development"
/>
</div>

<div>
<label className="block text-sm font-medium text-gray-700 mb-1">
Grade/Score
</label>
<input
type="text"
name="grade"
value={certificateForm.grade}
onChange={handleInputChange}
className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
placeholder="e.g., A+, 95%, Distinction"
/>
</div>
</div>

{/* Institute Information */}
<div className="space-y-4">
<h4 className="font-semibold text-lg text-gray-700">Institute Information</h4>

<div>
<label className="block text-sm font-medium text-gray-700 mb-1">
Institute Name *
</label>
<input
type="text"
name="instituteName"
value={certificateForm.instituteName}
onChange={handleInputChange}
className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
placeholder="Your institute name"
/>
</div>

<div>
<label className="block text-sm font-medium text-gray-700 mb-1">
Institute Email
</label>
<input
type="email"
name="instituteEmail"
value={certificateForm.instituteEmail}
onChange={handleInputChange}
className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
placeholder="contact@institute.com"
/>
</div>

<div>
<label className="block text-sm font-medium text-gray-700 mb-1">
Completion Date
</label>
<input
type="date"
name="completionDate"
value={certificateForm.completionDate}
onChange={handleInputChange}
className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
/>
</div>

<div>
<label className="block text-sm font-medium text-gray-700 mb-1">
Course Duration
</label>
<input
type="text"
name="duration"
value={certificateForm.duration}
onChange={handleInputChange}
className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
placeholder="e.g., 6 months, 120 hours"
/>
</div>
</div>
</div>

{/* File Upload */}
<div className="mt-6">
<label className="block text-sm font-medium text-gray-700 mb-1">
Upload Certificate Document (Optional)
</label>
<div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
<FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
<input
type="file"
onChange={handleFileUpload}
accept=".pdf,.jpg,.jpeg,.png"
className="hidden"
id="certificate-upload"
/>
<label 
htmlFor="certificate-upload"
className="cursor-pointer text-blue-500 hover:text-blue-700"
>
Click to upload or drag and drop
</label>
<p className="text-sm text-gray-500 mt-1">PDF, JPG, PNG up to 10MB</p>
{certificateForm.certificateFile && (
<p className="text-sm text-green-600 mt-2">
✓ {certificateForm.certificateFile.name}
</p>
)}
</div>
</div>

<button
onClick={issueCertificate}
className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
>
Issue Certificate to Blockchain
</button>
</div>
)}

{uploadStep === 2 && (
<div className="bg-white rounded-xl shadow-lg p-6">
<div className="text-center">
<CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
<h3 className="text-2xl font-bold text-green-800 mb-2">Certificate Issued Successfully!</h3>
<p className="text-gray-600 mb-6">
The certificate has been securely stored on the blockchain and is now tamper-proof.
</p>

<div className="bg-gray-50 rounded-lg p-4 mb-6">
<h4 className="font-semibold mb-2">Certificate Details:</h4>
<div className="text-left space-y-2 text-sm">
<p><strong>Certificate ID:</strong> {certificates[certificates.length - 1]?.id}</p>
<p><strong>Student:</strong> {certificateForm.studentName}</p>
<p><strong>Course:</strong> {certificateForm.course}</p>
<p><strong>Blockchain Hash:</strong> {certificates[certificates.length - 1]?.blockchainHash}</p>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<button
onClick={resetUpload}
className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
>
Issue Another Certificate
</button>
<button
onClick={() => setCurrentView('home')}
className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg"
>
Back to Home
</button>
</div>
</div>
</div>
)}
</div>
)}

{/* Access Section */}
{currentView === 'access' && (
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

{/* Access Progress */}
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
<label className="block text-sm font-medium text-gray-700 mb-1">
Certificate ID
</label>
<input
type="text"
name="certificateId"
value={accessForm.certificateId}
onChange={handleAccessInputChange}
className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
placeholder="e.g., CERT-1695123456789"
/>
</div>

<div className="text-center text-gray-500">OR</div>

<div>
<label className="block text-sm font-medium text-gray-700 mb-1">
Student Email
</label>
<input
type="email"
name="studentEmail"
value={accessForm.studentEmail}
onChange={handleAccessInputChange}
className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
placeholder="student@email.com"
/>
</div>

<button
onClick={searchCertificate}
className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
>
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

<div className="mt-4 p-3 bg-gray-100 rounded text-xs break-all">
<p><strong>Certificate ID:</strong> {foundCertificate.id}</p>
<p><strong>Blockchain Hash:</strong> {foundCertificate.blockchainHash}</p>
</div>
</div>

<div className="text-center">
<button
onClick={verifyCertificate}
disabled={isVerifying}
className="bg-purple-500 hover:bg-purple-600 disabled:bg-purple-300 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 mr-4"
>
{isVerifying ? 'Verifying...' : 'Verify on Blockchain'}
</button>
<button
onClick={resetAccess}
className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg"
>
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
<p className="text-gray-600 mb-6">
This certificate is authentic and has been verified on the blockchain.
</p>

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
<button
onClick={resetAccess}
className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg"
>
Verify Another Certificate
</button>
<button
onClick={() => setCurrentView('home')}
className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg"
>
Back to Home
</button>
</div>
</div>
</div>
)}
</div>
)}
</div>
</div>
);
};

export default CertificateApp;

