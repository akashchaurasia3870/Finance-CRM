import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, usePage } from '@inertiajs/react';
import { useTheme } from '@/Components/ThemeProvider';

export default function GuestLayout({ children }) {
    const { branding } = usePage().props;

    const backgroundStyle = branding?.login_background ? {
        backgroundImage: `url(${branding.login_background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    } : {};

    return (
        <div 
            className="flex min-h-screen flex-col items-center bg-theme-secondary pt-6 sm:justify-center sm:pt-0"
            style={backgroundStyle}
        >
            <div>
                <Link href="/">
                    {branding?.logo_url ? (
                        <img 
                            src={branding.logo_url} 
                            alt={branding.company_name || 'Logo'}
                            className="h-20 w-20"
                        />
                    ) : (
                        <ApplicationLogo className="h-20 w-20 fill-current text-theme-secondary" />
                    )}
                </Link>
            </div>

            {branding?.banner_quote && (
                <div className="mt-4 text-center">
                    <p className="text-lg font-medium text-theme-primary">
                        {branding.banner_quote}
                    </p>
                </div>
            )}

            <div className="mt-6 w-full overflow-hidden bg-theme-primary px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
