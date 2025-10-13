import { useState, useRef, useEffect } from "react";
import { User, Settings, LogOut } from "lucide-react";

type Props = {
  avatarUrl: string;
  onLogout?: () => void;
};

export default function ProfileMenu({ avatarUrl, onLogout }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative inline-block text-left">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="focus:outline-none flex items-center justify-center hover:ring-4 hover:ring-lime-300 rounded-full transition-all"
        aria-label="Abrir menú de perfil"
        aria-expanded={open}
      >
        <img
          src={avatarUrl}
          alt="Perfil"
          className="h-13 aspect-square rounded-full cursor-pointer hover:brightness-95 transition"
        />
      </button>
      
      {open && (
        <div className="absolute right-0 mt-2 w-44 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black/5 z-10 animate-in fade-in slide-in-from-top-2 duration-200">
          <ul className="flex flex-col py-2 text-sm text-gray-700">
            <li>
              <button 
                className="w-full text-left px-4 py-2 hover:bg-lime-100 cursor-pointer flex items-center gap-2 transition-colors"
                onClick={() => setOpen(false)}
              >
                <User size={16} />
                Perfil
              </button>
            </li>
            <li>
              <button 
                className="w-full text-left px-4 py-2 hover:bg-lime-100 cursor-pointer flex items-center gap-2 transition-colors"
                onClick={() => setOpen(false)}
              >
                <Settings size={16} />
                Configuración
              </button>
            </li>
            <li className="border-t border-gray-200 mt-1 pt-1">
              <button
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 cursor-pointer flex items-center gap-2 transition-colors"
                onClick={handleLogout}
              >
                <LogOut size={16} />
                Cerrar sesión
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}