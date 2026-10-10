'use client';

import { useState } from 'react';
import {
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { encryptPDF } from '@pdfsmaller/pdf-encrypt-lite';
import Dropzone from '../../components/Dropzone';
import { tools } from '../../lib/toolsConfig';

export default function ProtectPdfTool() {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const toolInfo = tools?.find((t) => t.id === 'protect-pdf');

  const formatSize = (bytes) => {
    if (!bytes || bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleDrop = (acceptedFiles) => {
    setErrorMessage('');
    setIsSuccess(false);
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  };

  const protectPdf = async () => {
    if (!file) return;
    if (!password || password.trim().length === 0) {
      setErrorMessage('Please enter a password to protect your PDF.');
      return;
    }

    setErrorMessage('');
    setIsSuccess(false);
    setIsProcessing(true);
    setStatusText('Encrypting PDF with password...');

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfBytes = new Uint8Array(arrayBuffer);

      // تشفير قياسي 128-bit للـ PDF في المتصفح
      const encryptedBytes = await encryptPDF(pdfBytes, password, {
        ownerPassword: password + '_owner',
        allowPrinting: true,
        allowModifying: false,
        allowCopying: false,
      });

      const blob = new Blob([encryptedBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `protected-${file.name}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      setErrorMessage('Error encrypting PDF. Please try a different password or check if the file is already encrypted.');
    } finally {
      setIsProcessing(false);
      setStatusText('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
          Password Protect a PDF – Free Online PDF Encryption
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {toolInfo?.description || 'Add strong password encryption to protect your PDF from unauthorized viewing, copying, or editing.'}
        </p>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span className="text-sm font-medium">{errorMessage}</span>
        </div>
      )}

      {!file ? (
        <Dropzone onDrop={handleDrop} multiple={false} text="Drag & drop a PDF file to encrypt" />
      ) : (
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
            <div className="flex items-center space-x-3 overflow-hidden">
              <Lock className="w-8 h-8 text-red-500 shrink-0" />
              <div>
                <h2 className="text-xl font-bold text-gray-800 truncate max-w-xs sm:max-w-md">{file.name}</h2>
                <p className="text-sm text-gray-500">{formatSize(file.size)}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setFile(null);
                setPassword('');
                setIsSuccess(false);
                setErrorMessage('');
              }}
              className="text-red-500 hover:text-red-700 font-semibold bg-red-50 px-4 py-2 rounded-xl text-sm transition-colors"
            >
              Change file
            </button>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Set Document Password:
            </label>
            <div className="relative max-w-md">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setIsSuccess(false);
                }}
                placeholder="Enter password..."
                className="w-full border border-gray-300 rounded-xl p-3 pr-12 text-gray-800 focus:outline-red-500 font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Make sure to save this password. Anyone viewing the file will be prompted to enter it.
            </p>
          </div>

          {isSuccess && (
            <div className="mb-6 p-4 bg-green-50 rounded-2xl border border-green-200 text-center flex items-center justify-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
              <p className="text-green-800 font-semibold text-sm">
                Document encrypted successfully and downloaded!
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={protectPdf}
            disabled={isProcessing || !password}
            className={`w-full py-4 rounded-2xl font-bold text-white text-lg transition-all ${
              isProcessing || !password
                ? 'bg-red-300 cursor-not-allowed'
                : 'bg-red-600 hover:bg-red-700 shadow-md'
            }`}
          >
            {isProcessing ? statusText || 'Encrypting...' : 'Protect PDF with Password'}
          </button>
        </div>
      )}
    </div>
  );
}