import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-text text-white mt-auto">
      <div className="container-app py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <div>
                <p className="font-bold text-lg leading-tight">Taste of India</p>
                <p className="text-[10px] text-gray-400 tracking-wider uppercase">
                  Fresh &amp; Fast
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Your favorite neighborhood fast-food joint. Serving hot, fresh, and
              delicious food since 2020.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Instagram size={16} />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Facebook size={16} />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Twitter size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-300 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: '/menu', label: 'Full Menu' },
                { href: '/cart', label: 'My Cart' },
                { href: '/track/demo', label: 'Track Order' },
                { href: '/account', label: 'My Account' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-300 mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-gray-400">
                <MapPin size={15} className="mt-0.5 shrink-0 text-primary" />
                <span>42, Rajpur Road, Dehradun, Uttarakhand 248001</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-gray-400">
                <Phone size={15} className="shrink-0 text-primary" />
                <a href="tel:+919876543210" className="hover:text-white transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-gray-400">
                <Mail size={15} className="shrink-0 text-primary" />
                <a href="mailto:hello@bropizza.in" className="hover:text-white transition-colors">
                  hello@bropizza.in
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-300 mb-4">
              Opening Hours
            </h3>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2.5 text-sm text-gray-400">
                <Clock size={15} className="shrink-0 text-primary" />
                <div>
                  <p className="text-white text-sm font-medium">Mon – Sun</p>
                  <p className="text-xs">11:00 AM – 11:00 PM</p>
                </div>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-gray-400">
                <Clock size={15} className="shrink-0 text-accent" />
                <div>
                  <p className="text-white text-sm font-medium">Delivery Hours</p>
                  <p className="text-xs">11:30 AM – 10:30 PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-app py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Taste of India. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <Link href="#" className="hover:text-gray-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
