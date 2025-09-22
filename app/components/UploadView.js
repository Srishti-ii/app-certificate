import React from 'react';
import { Building, FileText, CheckCircle } from 'lucide-react';

const UploadView = ({
setCurrentView,
uploadStep,
certificateForm,
handleInputChange,
handleFileUpload,
issueCertificate,
resetUpload,
certificates
}) => {
return (
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
<div className="space-y-4">
<h4 className="font-semibold text-lg text-gray-700">Student Information</h4>
<div>
<label className="block text-sm font-medium text-gray-700 mb-1">Student Name *</label>
<input type="text" name="studentName" value={certificateForm.studentName} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter student's full name" />
</div>
<div>
<label className="block text-sm font-medium text-gray-700 mb-1">Student Email</label>
<input type="email" name="studentEmail" value={certificateForm.studentEmail} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="student@email.com" />
</div>
<div>
<label className="block text-sm font-medium text-gray-700 mb-1">Course/Program Name *</label>
<input type="text" name="course" value={certificateForm.course} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="e.g., Full Stack Web Development" />
</div>
<div>
<label className="block text-sm font-medium text-gray-700 mb-1">Grade/Score</label>
<input type="text" name="grade" value={certificateForm.grade} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="e.g., A+, 95%, Distinction" />
</div>
</div>
<div className="space-y-4">
<h4 className="font-semibold text-lg text-gray-700">Institute Information</h4>
<div>
<label className="block text-sm font-medium text-gray-700 mb-1">Institute Name *</label>
<input type="text" name="instituteName" value={certificateForm.instituteName} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Your institute name" />
</div>
<div>
<label className="block text-sm font-medium text-gray-700 mb-1">Institute Email</label>
<input type="email" name="instituteEmail" value={certificateForm.instituteEmail} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="contact@institute.com" />
</div>
<div>
<label className="block text-sm font-medium text-gray-700 mb-1">Completion Date</label>
<input type="date" name="completionDate" value={certificateForm.completionDate} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
</div>
<div>
<label className="block text-sm font-medium text-gray-700 mb-1">Course Duration</label>
<input type="text" name="duration" value={certificateForm.duration} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="e.g., 6 months, 120 hours" />
</div>
</div>
</div>
<div className="mt-6">
<label className="block text-sm font-medium text-gray-700 mb-1">Upload Certificate Document (Optional)</label>
<div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
<FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
<input type="file" onChange={handleFileUpload} accept=".pdf,.jpg,.jpeg,.png" className="hidden" id="certificate-upload" />
<label htmlFor="certificate-upload" className="cursor-pointer text-blue-500 hover:text-blue-700">Click to upload or drag and drop</label>
<p className="text-sm text-gray-500 mt-1">PDF, JPG, PNG up to 10MB</p>
{certificateForm.certificateFile && (
<p className="text-sm text-green-600 mt-2">✓ {certificateForm.certificateFile.name}</p>
)}
</div>
</div>
<button onClick={issueCertificate} className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200">
Issue Certificate to Blockchain
</button>
</div>
)}

{uploadStep === 2 && (
<div className="bg-white rounded-xl shadow-lg p-6">
<div className="text-center">
<CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
<h3 className="text-2xl font-bold text-green-800 mb-2">Certificate Issued Successfully!</h3>
<p className="text-gray-600 mb-6">The certificate has been securely stored on the blockchain and is now tamper-proof.</p>
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
<button onClick={resetUpload} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg">
Issue Another Certificate
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

export default UploadView;

