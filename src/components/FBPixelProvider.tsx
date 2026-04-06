import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    fbq: any;
    _fbq: any;
  }
}

export default function FBPixelProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  // Track Page Views and Dynamic Country 'ViewContent'
  useEffect(() => {
    if (typeof window !== 'undefined' && window.fbq) {
      // The base code fires a PageView on initial load.
      // This will track subsequent route changes in the SPA.
      window.fbq('track', 'PageView');

      // Dynamic Country Tracking
      if (location.pathname.startsWith('/countries/')) {
        const countryPath = location.pathname.split('/').pop();
        if (countryPath) {
          const countryName = countryPath.charAt(0).toUpperCase() + countryPath.slice(1);
          window.fbq('track', 'ViewContent', {
            content_name: countryName,
            content_category: 'Study Destinations',
            content_type: 'destination_page'
          });
        }
      }
    }
  }, [location]);

  // Global listener for Contact links (tel: and mailto:)
  useEffect(() => {
    const handleContactClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor) {
        const href = anchor.getAttribute('href') || '';
        if (href.startsWith('tel:') || href.startsWith('mailto:')) {
          if (typeof window !== 'undefined' && window.fbq) {
            window.fbq('track', 'Contact', {
              contact_method: href.startsWith('tel:') ? 'phone' : 'email',
              value: href
            });
          }
        }
      }
    };

    document.addEventListener('click', handleContactClick);
    return () => {
      document.removeEventListener('click', handleContactClick);
    };
  }, []);

  return <>{children}</>;
}
