import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  txt1: string;
  txt2: string;
  topTitle: string;
}

const Title = ({ txt1, txt2, topTitle }: Props) => {
  return (
    <div className="flex justify-between items-end py-5">
      <div className="space-y-2">
        <span className="text-[10px] uppercase tracking-[0.4em] text-aura-black/40">{topTitle}</span>
        <h2 className="text-5xl font-serif italic">{txt1} {txt2}</h2>
      </div> 
    </div>
  );
};

export default Title;
