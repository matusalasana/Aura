import { Link } from "react-router-dom";
import {
  ChevronRight
} from "lucide-react";

interface NavLink {
  name: string;
  linkTo: string;
}

interface BreadcrumbProps {
  links: NavLink[] 
}

const Breadcrumb = ({links}: BreadcrumbProps) => {

  return (
    <nav className="flex items-center gap-2 text-xs uppercase text-black/50 mb-10">
    
      {links.map((l) => (
        <>
        <Link to={l.linkTo}>{l.name}</Link>
        <ChevronRight className="w-3 h-3" />
        </>
      ))}
    
    </nav>
  )
};

export default Breadcrumb