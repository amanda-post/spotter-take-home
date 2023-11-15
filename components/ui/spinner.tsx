import { Loader2 } from 'lucide-react';

const Spinner = ({
  className = '',
  size,
}: {
  className?: string;
  size?: number;
}) => {
  return <Loader2 className={`animate-spin ${className}`} size={size} />;
};

export default Spinner;
