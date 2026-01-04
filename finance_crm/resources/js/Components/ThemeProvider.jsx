import React, { createContext, useContext, useEffect } from 'react';
import { usePage } from '@inertiajs/react';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        return { branding: null }; // Return default instead of throwing error
    }
    return context;
};

export default function ThemeProvider({ children }) {
    let branding = null;
    
    try {
        const page = usePage();
        branding = page.props.branding;
    } catch (error) {
        // usePage not available, use default branding
        branding = null;
    }

    useEffect(() => {
        const root = document.documentElement;
        
        if (branding) {
            // Apply CSS custom properties for theme colors
            root.style.setProperty('--primary-color', branding.primary_color || '#3B82F6');
            root.style.setProperty('--secondary-color', branding.secondary_color || '#10B981');
            root.style.setProperty('--accent-color', branding.accent_color || '#F59E0B');
            root.style.setProperty('--background-color', branding.background_color || '#FFFFFF');
            root.style.setProperty('--text-color', branding.text_color || '#111827');
            
            // Apply theme class to body
            document.body.className = document.body.className.replace(/theme-\w+/g, '');
            document.body.classList.add(`theme-${branding.theme || 'light'}`);
            
            // Apply font settings
            if (branding.font_family && branding.font_family !== 'Default') {
                root.style.setProperty('--font-family', branding.font_family);
            }
            
            if (branding.font_size) {
                const fontSizeMap = {
                    'small': '14px',
                    'medium': '16px',
                    'large': '18px'
                };
                root.style.setProperty('--font-size', fontSizeMap[branding.font_size] || '16px');
            }
            
            if (branding.font_weight) {
                const fontWeightMap = {
                    'light': '300',
                    'normal': '400',
                    'medium': '500',
                    'semibold': '600',
                    'bold': '700'
                };
                root.style.setProperty('--font-weight', fontWeightMap[branding.font_weight] || '400');
            }
        } else {
            // Apply default theme
            root.style.setProperty('--primary-color', '#3B82F6');
            root.style.setProperty('--secondary-color', '#10B981');
            root.style.setProperty('--accent-color', '#F59E0B');
            root.style.setProperty('--background-color', '#FFFFFF');
            root.style.setProperty('--text-color', '#111827');
            document.body.className = document.body.className.replace(/theme-\w+/g, '');
            document.body.classList.add('theme-light');
        }
    }, [branding]);

    return (
        <ThemeContext.Provider value={{ branding }}>
            {children}
        </ThemeContext.Provider>
    );
}