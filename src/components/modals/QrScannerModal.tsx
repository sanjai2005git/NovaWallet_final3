import React, { useState, useRef } from 'react'
import {
  X,
  Scan,
  Flashlight,
  Upload,
  CheckCircle2,
  Camera,
  Sparkles,
  ShieldCheck,
  Image as ImageIcon
} from 'lucide-react'
import { useWallet } from '../../context/WalletContext'

interface QrScannerModalProps {
  isOpen: boolean
  onClose: () => void
  onScanSuccess: (scannedAddress: string) => void
}

export const QrScannerModal: React.FC<QrScannerModalProps> = ({
  isOpen,
  onClose,
  onScanSuccess
}) => {
  const { addToast } = useWallet()
  const [torchOn, setTorchOn] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!isOpen) return null

  const handleToggleTorch = () => {
    const next = !torchOn
    setTorchOn(next)
    addToast(
      next ? 'Torch Activated' : 'Torch Deactivated',
      next ? 'Illuminating viewfinder with high-intensity beam.' : 'Flashlight turned off.',
      'info'
    )
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsProcessing(true)
    const reader = new FileReader()
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string
      setUploadedImagePreview(dataUrl)

      // Simulate instantaneous QR decoding
      setTimeout(() => {
        setIsProcessing(false)
        const mockDecodedAddress = '0x1A2b3C4d5E6F708192aBcDeF0123456789aBcDeF'
        addToast('QR Code Decoded', `Successfully read destination address from ${file.name}`, 'success')
        onScanSuccess(mockDecodedAddress)
        onClose()
      }, 900)
    }
    reader.readAsDataURL(file)
  }

  const handlePresetScan = (address: string, label: string) => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      addToast('QR Code Scanned', `Detected ${label} from camera viewfinder`, 'success')
      onScanSuccess(address)
      onClose()
    }, 600)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md rounded-3xl bg-[#0D111A] border border-white/[0.12] shadow-2xl p-6 text-center overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5 text-left">
            <div className="w-8 h-8 rounded-lg bg-[#00F29D]/15 text-[#00F29D] border border-[#00F29D]/30 flex items-center justify-center">
              <Scan className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Scan Recipient QR Code</h3>
              <p className="text-xs text-slate-400">Point at invoice QR or upload image</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Viewfinder Screen */}
        <div className="mt-5 relative w-full h-64 bg-[#05070B] rounded-2xl border-2 border-white/[0.1] overflow-hidden flex flex-col items-center justify-center">
          {/* Torch Illumination Beam */}
          {torchOn && (
            <div className="absolute inset-0 bg-gradient-radial from-amber-100/30 via-white/10 to-transparent pointer-events-none transition-opacity duration-300" />
          )}

          {/* Cyber Scanning Grid & Moving Laser Line */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00F29D08_1px,transparent_1px),linear-gradient(to_bottom,#00F29D08_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]" />

          {/* Animated Laser Scan Line */}
          <div className="absolute left-8 right-8 h-0.5 bg-gradient-to-r from-transparent via-[#00F29D] to-transparent shadow-[0_0_12px_#00F29D] animate-pulse transition-all duration-1000 top-1/4 animate-bounce" />

          {/* 4 HUD Targeting Corners */}
          <div className="relative w-48 h-48 border border-white/[0.15] rounded-xl flex items-center justify-center">
            {/* Top-Left */}
            <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-[#00F29D]" />
            {/* Top-Right */}
            <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-[#00F29D]" />
            {/* Bottom-Left */}
            <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-[#00F29D]" />
            {/* Bottom-Right */}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-[#00F29D]" />

            {uploadedImagePreview ? (
              <img
                src={uploadedImagePreview}
                alt="Uploaded QR"
                className="w-36 h-36 object-contain rounded-lg shadow-glow-sm"
              />
            ) : (
              <div className="text-center p-4">
                <Camera className="w-8 h-8 text-slate-500 mx-auto mb-2 animate-pulse" />
                <span className="text-[11px] font-mono text-slate-400 block">
                  Align QR within frame
                </span>
                <span className="text-[10px] font-mono text-[#00F29D]">
                  Automatic Neural Detection
                </span>
              </div>
            )}
          </div>

          {/* Processing overlay */}
          {isProcessing && (
            <div className="absolute inset-0 bg-black/75 flex flex-col items-center justify-center z-20">
              <div className="w-8 h-8 border-2 border-[#00F29D] border-t-transparent rounded-full animate-spin mb-2" />
              <span className="text-xs font-mono text-white">Decoding Cryptographic Matrix...</span>
            </div>
          )}
        </div>

        {/* The Two Main Required Options Below */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          {/* Option 1: Torch Option */}
          <button
            onClick={handleToggleTorch}
            className={`py-3 px-4 rounded-xl border flex items-center justify-center gap-2 text-xs font-mono font-semibold transition-all ${
              torchOn
                ? 'bg-amber-400/20 border-amber-400/60 text-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.25)]'
                : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/[0.1] text-slate-300 hover:text-white'
            }`}
          >
            <Flashlight className={`w-4 h-4 ${torchOn ? 'text-amber-400 animate-pulse' : 'text-slate-400'}`} />
            <span>{torchOn ? 'Torch: ON' : 'Torch Option'}</span>
          </button>

          {/* Option 2: Upload QR Option */}
          <div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-3 px-4 rounded-xl bg-white/[0.04] hover:bg-[#00F29D]/20 hover:text-[#00F29D] border border-white/[0.1] hover:border-[#00F29D]/40 text-xs font-mono font-semibold text-slate-300 transition-all flex items-center justify-center gap-2"
            >
              <Upload className="w-4 h-4 text-[#00F29D]" />
              <span>Upload QR Option</span>
            </button>
          </div>
        </div>

        {/* Quick Simulation Presets */}
        <div className="mt-4 pt-3 border-t border-white/[0.06] text-left">
          <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1.5">
            Or Test-Scan Approved Whitelist Target:
          </span>
          <div className="flex gap-2">
            <button
              onClick={() =>
                handlePresetScan('0x1A2b3C4d5E6F708192aBcDeF0123456789aBcDeF', 'Cold Storage Alpha')
              }
              className="flex-1 p-2 rounded-lg bg-white/[0.02] hover:bg-[#00F29D]/10 border border-white/[0.04] text-[10px] font-mono text-slate-400 hover:text-[#00F29D] truncate text-center transition-colors"
            >
              Cold Storage Alpha
            </button>
            <button
              onClick={() =>
                handlePresetScan('0x3c2a901fbc019238401928301928401928301928', 'Coinbase Prime')
              }
              className="flex-1 p-2 rounded-lg bg-white/[0.02] hover:bg-[#00F29D]/10 border border-white/[0.04] text-[10px] font-mono text-slate-400 hover:text-[#00F29D] truncate text-center transition-colors"
            >
              Coinbase Prime
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

