import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Check, Heart, HandCoins } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useToast } from "@/hooks/use-toast";

const DONATION_DISMISSED_KEY = "rezume_donation_dismissed";
const DONATION_DISMISS_DURATION = 24 * 60 * 60 * 1000; // 24 hours

// USDT TRC20 — low fees, stable, most practical for donations
const USDT_ADDRESS = "TN2ZKzLBQ6jBYAxFwEBTmfAzDSaVBXnDNb";

interface DonationPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DonationPopup({ open, onOpenChange }: DonationPopupProps) {
  const [countdown, setCountdown] = useState(3);
  const [canClose, setCanClose] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      setCountdown(3);
      setCanClose(false);
      setCopied(false);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setCanClose(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [open]);

  const dismiss = (donated: boolean) => {
    localStorage.setItem(DONATION_DISMISSED_KEY, Date.now().toString());
    onOpenChange(false);
    if (donated) {
      toast({ title: "Thank you!", description: "Your support means everything to us." });
    }
  };

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(USDT_ADDRESS);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = USDT_ADDRESS;
      ta.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    toast({ title: "Address copied!", description: "USDT TRC20 address copied to clipboard." });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v && canClose) dismiss(false); }}>
      <DialogContent
        className="sm:max-w-sm p-0 overflow-hidden border-slate-200"
        onPointerDownOutside={(e) => { if (!canClose) e.preventDefault(); }}
        onEscapeKeyDown={(e) => { if (!canClose) e.preventDefault(); }}
      >
        {/* Header */}
        <div className="bg-slate-900 px-6 pt-6 pb-5 text-center">
          <div className="mx-auto w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-3">
            <HandCoins className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-lg font-bold text-white">Help Keep Rezume Free</h2>
          <p className="text-slate-400 text-xs mt-1">
            100% free, no ads. A small donation keeps it running.
          </p>
        </div>

        {/* QR + Address */}
        <div className="px-6 pt-5 pb-4 space-y-4">
          <div className="flex justify-center">
            <div className="bg-white border border-slate-200 rounded-lg p-3">
              <QRCodeSVG value={USDT_ADDRESS} size={140} level="M" />
            </div>
          </div>

          <div className="text-center">
            <span className="inline-block bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-full mb-2">
              USDT (TRC20)
            </span>
            <p className="text-[11px] text-slate-500 leading-relaxed break-all font-mono select-all">
              {USDT_ADDRESS}
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={copyAddress}
            className="w-full text-sm"
          >
            {copied ? (
              <><Check className="w-4 h-4 mr-1.5 text-emerald-600" /> Copied</>
            ) : (
              <><Copy className="w-4 h-4 mr-1.5" /> Copy Address</>
            )}
          </Button>
        </div>

        {/* Action buttons or countdown */}
        <div className="px-6 pb-6">
          {canClose ? (
            <div className="flex gap-2">
              <Button
                onClick={() => dismiss(true)}
                className="flex-1 bg-slate-900 hover:bg-slate-800 text-white text-sm"
              >
                <Heart className="w-4 h-4 mr-1.5" />
                I Already Donated
              </Button>
              <Button
                variant="outline"
                onClick={() => dismiss(false)}
                className="flex-1 text-sm"
              >
                Maybe Later
              </Button>
            </div>
          ) : (
            <p className="text-center text-xs text-slate-400">
              Please wait {countdown}s...
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function useDonationPopup() {
  const [showDonation, setShowDonation] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(DONATION_DISMISSED_KEY);
    if (dismissed) {
      const elapsed = Date.now() - parseInt(dismissed, 10);
      if (elapsed < DONATION_DISMISS_DURATION) return;
    }
    const timer = setTimeout(() => setShowDonation(true), 60000);
    return () => clearTimeout(timer);
  }, []);

  return { showDonation, setShowDonation };
}
