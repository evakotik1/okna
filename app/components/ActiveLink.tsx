'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface ActiveLinkProps {
    href: string;
    children: string;
    onClick?: () => void;
}

export default function ActiveLink({ href, children, onClick }: ActiveLinkProps) {
    const pathname = usePathname();
    const isActive = pathname === href;
    
    return (
        <div className="relative">
            {isActive && (
                <div className="absolute -top-9 left-0 right-0 h-1 bg-orange-500"></div>
            )}
            <Link 
                href={href} 
                className={isActive ? 'text-orange-500' : 'text-gray-800 hover:text-orange-500'}
                onClick={onClick}
            >
                {children}
            </Link>
        </div>
    );
}