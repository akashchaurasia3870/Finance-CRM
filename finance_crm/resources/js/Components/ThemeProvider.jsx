import React, { createContext, useContext, useEffect } from 'react';
import { usePage } from '@inertiajs/react';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        return { branding: null };
    }
    return context;
};

export default function ThemeProvider({ children }) {
    let branding = null;
    
    try {
        const page = usePage();
        branding = page.props.branding;
    } catch (error) {
        branding = null;
    }

    // Only update theme when branding changes (for dynamic updates)
    useEffect(() => {
        if (branding) {
            const root = document.documentElement;
            
            // Update CSS custom properties
            root.style.setProperty('--primary-color', branding.primary_color || '#3B82F6');
            root.style.setProperty('--secondary-color', branding.secondary_color || '#10B981');
            root.style.setProperty('--accent-color', branding.accent_color || '#F59E0B');
            root.style.setProperty('--background-color', branding.background_color || '#FFFFFF');
            root.style.setProperty('--text-color', branding.text_color || '#111827');
            
            // Update theme class
            document.body.className = document.body.className.replace(/theme-\w+/g, '');
            document.body.classList.add(`theme-${branding.theme || 'light'}`);
            
            // Update font settings
            if (branding.font_family && branding.font_family !== 'Default') {
                root.style.setProperty('--font-family', `${branding.font_family}, sans-serif`);
            }
            
            const fontSizeMap = { 'small': '14px', 'medium': '16px', 'large': '18px' };
            root.style.setProperty('--font-size', fontSizeMap[branding.font_size] || '16px');
            
            const fontWeightMap = { 'light': '300', 'normal': '400', 'medium': '500', 'semibold': '600', 'bold': '700' };
            root.style.setProperty('--font-weight', fontWeightMap[branding.font_weight] || '400');
        }
    }, [branding]);

    return (
        <ThemeContext.Provider value={{ branding }}>
            {children}
        </ThemeContext.Provider>
    );
}
