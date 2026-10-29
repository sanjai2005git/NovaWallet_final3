import React from 'react'
import { CheckCircle2, AlertCircle, Info, XCircle, X } from 'lucide-react'
import { useWallet } from '../../context/WalletContext'

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useWallet()

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => {
        let Icon = CheckCircle2
        let borderClass = 'border-[#00F29D]/40'
        let textClass = 'text-[#00F29D]'
        let bgClass = 'bg-[#0D111A]/95'

        if (toast.type === 'error') {
          Icon = XCircle
          borderClass = 'border-red-500/40'
          textClass = 'text-red-400'
        } else if (toast.type === 'warning') {
          Icon = AlertCircle
          borderClass = 'border-amber-500/40'
          textClass = 'text-amber-400'
        } else if (toast.type === 'info') {
          Icon = Info
          borderClass = 'border-blue-500/40'
          textClass = 'text-blue-400'
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3.5 p-4 rounded-xl border backdrop-blur-xl shadow-2xl transition-all duration-300 animate-slide-in ${bgClass} ${borderClass}`}
          >
            <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${textClass}`} />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-white tracking-tight">{toast.title}</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )
      })}
    </div>
  )
}
