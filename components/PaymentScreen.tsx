import React, { useState, useMemo, useEffect } from 'react';
// FIX: Import `Variants` type from framer-motion to resolve type errors.
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { XMarkIcon } from './icons';
import Logo from './Logo';

interface PaymentScreenProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: () => void;
  amount: number;
}

const UPI_ID = '9540454132@ptaxis';
const PAYEE_NAME = 'Ember & Ash';
const PAYMENT_METHODS = ['Paytm', 'Google Pay', 'PhonePe'];

const PaymentScreen: React.FC<PaymentScreenProps> = ({ isOpen, onClose, onPaymentSuccess, amount }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);

  const qrCodeUrl = useMemo(() => {
    const upiUrl = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${amount.toFixed(2)}&cu=INR`;
    return `https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${encodeURIComponent(upiUrl)}&bgcolor=000000&color=FFFFFF&margin=0&ecc=H`;
  }, [amount]);

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setIsFlipped(false);
        setIsPaymentComplete(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handlePaymentComplete = () => {
    setIsPaymentComplete(true);
    setTimeout(() => {
      onPaymentSuccess();
    }, 3000);
  };

  const handlePaymentMethodClick = (method: string) => {
    const queryString = `pa=${UPI_ID}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${amount.toFixed(2)}&cu=INR`;
    let appUrl = '';

    switch (method) {
      case 'Paytm':
        appUrl = `paytmmp://upi/pay?${queryString}`;
        break;
      case 'Google Pay':
        appUrl = `tez://upi/pay?${queryString}`;
        break;
      case 'PhonePe':
        appUrl = `phonepe://upi/pay?${queryString}`;
        break;
      default:
        appUrl = `upi://pay?${queryString}`;
    }
    window.location.href = appUrl;
  };

  // FIX: Explicitly type variants with `Variants` to fix type inference issue where string literals for 'ease' were not being correctly typed.
  const checkCircleVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeInOut", delay: 0.5 }
    }
  };

  const checkMarkVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut", delay: 1.3 }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="relative w-full max-w-md rounded-3xl border border-white/20 bg-white/10 p-8 text-center backdrop-blur-2xl"
            style={{
              boxShadow: '0 0 40px rgba(212, 175, 55, 0.2), 0 0 80px rgba(10, 26, 47, 0.5)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <AnimatePresence mode="wait">
              {isPaymentComplete ? (
                <motion.div
                  key="success-view"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } }}
                  exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.5, ease: 'easeIn' } }}
                  className="flex flex-col items-center justify-center h-[540px]"
                >
                  <svg className="w-40 h-40" viewBox="0 0 100 100">
                    <motion.circle
                      cx="50" cy="50" r="45"
                      stroke="#D4AF37" strokeWidth="5" fill="none"
                      variants={checkCircleVariants}
                      initial="hidden"
                      animate="visible"
                    />
                    <motion.path
                      d="M30 50 l20 20 l30 -30"
                      stroke="#D4AF37" strokeWidth="6" fill="none"
                      strokeLinecap="round" strokeLinejoin="round"
                      variants={checkMarkVariants}
                      initial="hidden"
                      animate="visible"
                    />
                  </svg>
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0, transition: { duration: 0.6, delay: 1.8 } }}
                    className="font-playfair text-4xl font-bold text-soft-glow text-[#F7E7CE] mt-8"
                  >
                    Thank You!
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0, transition: { duration: 0.6, delay: 2.0 } }}
                    className="text-lg text-gray-300 mt-2"
                  >
                    Enjoy your meal at Ember & Ash.
                  </motion.p>
                </motion.div>
              ) : (
                <motion.div
                  key="payment-view"
                  exit={{ opacity: 0, filter: 'blur(5px)' }}
                  transition={{ duration: 0.3 }}
                >
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-gray-400 transition-colors hover:bg-white/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                    aria-label="Close payment screen"
                  >
                    <XMarkIcon className="h-7 w-7" />
                  </button>

                  <h2 className="font-playfair text-4xl font-bold bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#F7E7CE] bg-clip-text text-transparent text-soft-glow mb-2">
                    Scan & Pay
                  </h2>
                  <p className="text-lg text-gray-300 mb-6">Total: <span className="font-bold text-[#D4AF37]">₹{amount.toFixed(2)}</span></p>

                  <div className="relative mx-auto mb-6 h-80 w-80" style={{ perspective: '1200px' }}>
                    <motion.div
                      className="relative w-full h-full"
                      style={{ transformStyle: 'preserve-3d' }}
                      animate={{ rotateY: isFlipped ? 180 : 0 }}
                      transition={{ duration: 0.8, ease: 'easeInOut' }}
                    >
                      <motion.div
                        className="absolute w-full h-full flex items-center justify-center"
                        style={{ backfaceVisibility: 'hidden' }}
                        animate={{ opacity: isFlipped ? 0 : 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div
                          className="relative flex h-full w-full items-center justify-center rounded-2xl p-4"
                          style={{ boxShadow: '0 0 30px rgba(255, 255, 255, 0.15)' }}
                        >
                          <img
                            src={qrCodeUrl}
                            alt="UPI QR Code"
                            className="h-full w-full rounded-lg object-contain mix-blend-screen border border-white/20"
                          />
                          <div className="absolute flex h-20 w-20 items-center justify-center rounded-xl border-2 border-[#D4AF37] bg-[#0A1A2F] p-1">
                            <div className="scale-[0.45]">
                              <Logo />
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        className="absolute w-full h-full p-6 flex flex-col justify-center items-center gap-4 bg-white/5 rounded-2xl border border-white/10"
                        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isFlipped ? 1 : 0 }}
                        transition={{ duration: 0.3, delay: 0.4 }}
                      >
                        {PAYMENT_METHODS.map((method) => (
                          <motion.button
                            key={method}
                            onClick={() => handlePaymentMethodClick(method)}
                            className="w-full rounded-xl border border-amber-500/50 bg-white/10 py-4 text-center font-semibold text-xl text-gray-100 backdrop-blur-lg"
                            style={{ boxShadow: '0 0 15px rgba(212, 175, 55, 0.3)' }}
                            whileHover={{
                              scale: 1.05,
                              backgroundColor: 'rgba(255, 255, 255, 0.15)',
                              boxShadow: '0 0 25px rgba(212, 175, 55, 0.5)'
                            }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.2 }}
                          >
                            {method}
                          </motion.button>
                        ))}
                      </motion.div>
                    </motion.div>
                  </div>

                  <motion.div
                    className="mt-8 flex w-full flex-col gap-4 sm:flex-row"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5, ease: 'easeOut' }}
                  >
                    <AnimatePresence>
                      {!isFlipped && (
                        <motion.button
                          exit={{ opacity: 0, width: 0, padding: 0, margin: 0 }}
                          transition={{ duration: 0.3 }}
                          type="button"
                          onClick={() => setIsFlipped(true)}
                          className="flex-1 rounded-2xl border border-white/20 bg-white/10 px-8 py-4 text-lg font-semibold text-gray-200 shadow-md backdrop-blur-sm transition-all duration-300 ease-in-out hover:scale-105 hover:border-amber-400/50 hover:text-white hover:shadow-lg hover:shadow-amber-500/20 active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-transparent"
                        >
                          Scan & Pay
                        </motion.button>
                      )}
                    </AnimatePresence>

                    <button
                      type="button"
                      onClick={handlePaymentComplete}
                      className="animate-button-glow flex-1 rounded-2xl bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#F7E7CE] px-8 py-4 text-lg font-bold text-slate-900 transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-transparent"
                    >
                      Payment Complete
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaymentScreen;
