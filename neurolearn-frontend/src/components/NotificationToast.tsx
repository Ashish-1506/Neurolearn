import { motion, AnimatePresence } from 'framer-motion';
import { X, Info } from 'lucide-react';

interface NotificationToastProps {
  title: string;
  message: string;
  show: boolean;
  onClose: () => void;
}

const NotificationToast = ({ title, message, show, onClose }: NotificationToastProps) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-5 right-5 w-96 bg-dark-panel border border-dark-border rounded-lg shadow-lg p-4 z-50"
        >
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <Info className="h-6 w-6 text-accent-blue" />
            </div>
            <div className="ml-3 w-0 flex-1">
              <p className="text-sm font-medium text-text-light">{title}</p>
              <p className="mt-1 text-sm text-text-muted">{message}</p>
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                onClick={onClose}
                className="inline-flex text-text-muted hover:text-text-light focus:outline-none"
              >
                <span className="sr-only">Close</span>
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationToast;
