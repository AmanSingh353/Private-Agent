import { useState } from "react";
import { Loader2 } from "lucide-react";

interface EncryptedValueProps {
  value: string;
  revealable?: boolean;
}

const EncryptedValue = ({ value, revealable = false }: EncryptedValueProps) => {
  const [revealed, setRevealed] = useState(false);
  const [revealing, setRevealing] = useState(false);

  const handleReveal = () => {
    if (!revealable || revealed) return;
    setRevealing(true);
    setTimeout(() => {
      setRevealing(false);
      setRevealed(true);
    }, 1500);
  };

  if (revealing) {
    return (
      <span className="encrypted-badge">
        <Loader2 className="h-4 w-4 animate-spin" />
        Decrypting...
      </span>
    );
  }

  if (revealed) {
    return <span className="reveal-animation font-semibold text-foreground">{value}</span>;
  }

  return (
    <span
      className={`encrypted-badge animate-pulse-glow ${revealable ? "cursor-pointer hover:opacity-80" : ""}`}
      onClick={handleReveal}
    >
      🔒 {value}
    </span>
  );
};

export default EncryptedValue;
