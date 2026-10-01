import { useState, useRef } from 'react';
import { Pipette, Check, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/EyeDropper.css';

export default function EyeDropperTool() {
  const [pickedColor, setPickedColor] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [copied, setCopied] = useState(false);
  const colorInputRef = useRef(null);

  const applyColor = (hex) => {
    document.documentElement.style.setProperty('--color-primary', hex);
    document.documentElement.style.setProperty('--color-accent', hex);
    setPickedColor(hex);
    
    // Copy to clipboard
    if (navigator.clipboard) {
      navigator.clipboard.writeText(hex).catch(() => {});
    }

    setShowToast(true);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    setTimeout(() => setShowToast(false), 3500);
  };

  const handlePickColor = async () => {
    if (window.EyeDropper) {
      try {
        const eyeDropper = new window.EyeDropper();
        const result = await eyeDropper.open();
        if (result && result.sRGBHex) {
          applyColor(result.sRGBHex);
        }
      } catch {
        // User canceled selection or dismissed loupe
      }
    } else if (colorInputRef.current) {
      // Fallback for browsers without EyeDropper API (e.g. Firefox)
      colorInputRef.current.click();
    }
  };

  const handleColorInputChange = (e) => {
    applyColor(e.target.value);
  };

  return (
    <>
      <button
        type="button"
        className="eyedropper-btn"
        onClick={handlePickColor}
        title="Pick any color on screen to customize theme"
        aria-label="Eye Dropper Color Picker"
      >
        <Pipette size={18} className="eyedropper-icon" />
        {pickedColor && (
          <span 
            className="eyedropper-swatch" 
            style={{ backgroundColor: pickedColor }} 
          />
        )}
      </button>

      {/* Hidden color input fallback */}
      <input
        ref={colorInputRef}
        type="color"
        style={{ position: 'fixed', top: '-100px', left: '-100px', opacity: 0, pointerEvents: 'none' }}
        onChange={handleColorInputChange}
      />

      {/* Toast Notification when a color is picked */}
      <AnimatePresence>
        {showToast && pickedColor && (
          <motion.div
            className="eyedropper-toast"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div 
              className="toast-color-preview" 
              style={{ backgroundColor: pickedColor }}
            />
            <div className="toast-content">
              <span className="toast-title">Color Picked</span>
              <span className="toast-hex">{pickedColor.toUpperCase()}</span>
            </div>
            <button 
              className="toast-copy-btn"
              onClick={() => {
                navigator.clipboard.writeText(pickedColor);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              title="Copy HEX"
            >
              {copied ? <Check size={14} className="text-green" /> : <Copy size={14} />}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
