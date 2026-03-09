'use client';

import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-[#E2E8F0] pt-16 pb-8">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="md:col-span-1">
             <Link href="/" className="flex items-center gap-2 group mb-4">
                <div className="w-8 h-8 rounded-lg bg-[#059669] flex items-center justify-center text-white font-bold text-lg group-hover:bg-[#047857] transition-colors">
                  M
                </div>
                <span className="font-semibold text-xl tracking-tight text-[#0F172A]">Mentivo</span>
             </Link>
             <p className="text-sm text-[#475569] leading-relaxed max-w-[250px]">
                AI-powered academic guidance helping students build futures with clarity and confidence.
             </p>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold text-[#0F172A] mb-4">Product</h4>
              <ul className="space-y-3 text-sm text-[#475569]">
                 <li><Link href="#how-it-works" className="hover:text-[#059669] transition-colors">How it Works</Link></li>
                 <li><Link href="#what-you-receive" className="hover:text-[#059669] transition-colors">Features</Link></li>
                 <li><Link href="#sample" className="hover:text-[#059669] transition-colors">Sample Report</Link></li>
                 <li><Link href="#" className="hover:text-[#059669] transition-colors">Pricing</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-[#0F172A] mb-4">Company</h4>
              <ul className="space-y-3 text-sm text-[#475569]">
                 <li><Link href="#" className="hover:text-[#059669] transition-colors">About Us</Link></li>
                 <li><Link href="#" className="hover:text-[#059669] transition-colors">Careers</Link></li>
                 <li><Link href="#" className="hover:text-[#059669] transition-colors">Blog</Link></li>
                 <li><Link href="#" className="hover:text-[#059669] transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1">
              <h4 className="font-semibold text-[#0F172A] mb-4">Legal</h4>
              <ul className="space-y-3 text-sm text-[#475569]">
                 <li><Link href="#" className="hover:text-[#059669] transition-colors">Privacy Policy</Link></li>
                 <li><Link href="#" className="hover:text-[#059669] transition-colors">Terms of Service</Link></li>
                 <li><Link href="#" className="hover:text-[#059669] transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
           <p className="text-sm text-[#475569]">
             © {currentYear} Mentivo. All rights reserved.
           </p>
           <div className="flex gap-4">
             {/* Social placeholders */}
             <div className="w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center cursor-pointer transition-colors" />
             <div className="w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center cursor-pointer transition-colors" />
             <div className="w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center cursor-pointer transition-colors" />
           </div>
        </div>
      </div>
    </footer>
  );
}
