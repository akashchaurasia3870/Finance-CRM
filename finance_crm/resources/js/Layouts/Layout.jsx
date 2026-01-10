import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { useTheme } from '@/Components/ThemeProvider';
import { ThemedCard, ThemedButton } from '@/Components/ThemedComponents';
import { 
    HomeIcon, 
    UserGroupIcon, 
    ShieldCheckIcon,
    MapPinIcon,
    DocumentTextIcon,
    UserIcon,
    ClockIcon,
    UserPlusIcon,
    FlagIcon,
    PencilSquareIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon,
    EnvelopeIcon,
    DocumentDuplicateIcon,
    SpeakerWaveIcon,
    ClipboardDocumentListIcon,
    CurrencyDollarIcon,
    CalendarDaysIcon,
    CalendarIcon,
    CubeIcon,
    BanknotesIcon,
    BriefcaseIcon,
    ChartBarIcon,
    ArrowsRightLeftIcon,
    DocumentChartBarIcon,
    Cog6ToothIcon,
    ChevronDownIcon,
    ChevronRightIcon
} from '@heroicons/react/24/outline';

const Layout = ({ children }) => {
    const { url } = usePage();
    const { branding, theme } = useTheme();
    const [expandedGroups, setExpandedGroups] = useState({
        core: true,
        finance: true,
        system: true
    });

    const toggleGroup = (group) => {
        setExpandedGroups(prev => ({
            ...prev,
            [group]: !prev[group]
        }));
    };

    const moduleGroups = {
        core: {
            title: 'Core Modules',
            icon: HomeIcon,
            color: 'text-blue-500',
            modules: [
                { name: 'Dashboard', path: '/dashboard', icon: HomeIcon },
                { name: 'User', path: '/user', icon: UserIcon },
                { name: 'Role', path: '/role', icon: ShieldCheckIcon },
                { name: 'Address', path: '/address', icon: MapPinIcon },
                { name: 'Documents', path: '/documents', icon: DocumentTextIcon },
                { name: 'Client', path: '/client', icon: UserGroupIcon },
                { name: 'Attendance', path: '/attendance', icon: ClockIcon },
                { name: 'Leads', path: '/leads', icon: UserPlusIcon },
                { name: 'Target', path: '/target', icon: FlagIcon },
                { name: 'Notes', path: '/notes', icon: PencilSquareIcon },
                { name: 'Tasks', path: '/tasks', icon: CheckCircleIcon },
                { name: 'Complain', path: '/complain', icon: ExclamationTriangleIcon },
                { name: 'Email', path: '/email', icon: EnvelopeIcon },
                { name: 'Email Template', path: '/emailtemplate', icon: DocumentDuplicateIcon },
                { name: 'Campaigns', path: '/campaigns', icon: SpeakerWaveIcon },
                { name: 'Survey', path: '/survey', icon: ClipboardDocumentListIcon },
                { name: 'Payroll', path: '/payroll', icon: CurrencyDollarIcon },
                { name: 'Meetings', path: '/meetings', icon: CalendarDaysIcon },
                { name: 'Calendar', path: '/calendar', icon: CalendarIcon },
            ]
        },
        finance: {
            title: 'Finance Modules',
            icon: BanknotesIcon,
            color: 'text-green-500',
            modules: [
                { name: 'Product', path: '/product', icon: CubeIcon },
                { name: 'Accounts', path: '/accounts', icon: BanknotesIcon },
                { name: 'Portfolio', path: '/portfolio', icon: BriefcaseIcon },
                { name: 'Security Position', path: '/position', icon: ChartBarIcon },
                { name: 'Transaction', path: '/transaction', icon: ArrowsRightLeftIcon },
                { name: 'Reports', path: '/reports', icon: DocumentChartBarIcon },
            ]
        },
        system: {
            title: 'System',
            icon: Cog6ToothIcon,
            color: 'text-gray-500',
            modules: [
                { name: 'Settings', path: '/settings', icon: Cog6ToothIcon },
            ]
        }
    };

    const allModules = Object.values(moduleGroups).flatMap(group => group.modules);

    const ModuleGroup = ({ groupKey, group }) => {
        const isExpanded = expandedGroups[groupKey];
        const GroupIcon = group.icon;
        
        return (
            <div className="mb-4">
                <ThemedButton
                    onClick={() => toggleGroup(groupKey)}
                    variant="ghost"
                    className="w-full flex items-center justify-between px-3 py-2 text-left rounded-lg transition-colors group !border-0"
                >
                    <div className="flex items-center space-x-2">
                        <GroupIcon className={`h-4 w-4 ${group.color}`} />
                        <span className="text-sm font-bold uppercase tracking-wider" style={{ color: 'var(--text-color)' }}>
                            {group.title}
                        </span>
                    </div>
                    {isExpanded ? 
                        <ChevronDownIcon className="h-3 w-3 opacity-50" style={{ color: 'var(--text-color)' }} /> : 
                        <ChevronRightIcon className="h-3 w-3 opacity-50" style={{ color: 'var(--text-color)' }} />
                    }
                </ThemedButton>
                
                {isExpanded && (
                    <div className="mt-2 ml-6 space-y-1">
                        {group.modules.map((module) => {
                            const ModuleIcon = module.icon;
                            const isActive = url === module.path || url.startsWith(module.path + '/');
                            
                            return (
                                <Link
                                    key={module.path}
                                    href={module.path}
                                    className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                                        isActive
                                            ? 'shadow-sm border-l-4'
                                            : 'hover:translate-x-1'
                                    }`}
                                    style={{
                                        backgroundColor: isActive ? 'var(--primary-color)' : 'transparent',
                                        color: isActive ? 'white' : 'var(--text-color)',
                                        borderLeftColor: isActive ? 'var(--accent-color)' : 'transparent'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isActive) {
                                            e.target.style.backgroundColor = `${branding?.primary_color || '#3B82F6'}20`;
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isActive) {
                                            e.target.style.backgroundColor = 'transparent';
                                        }
                                    }}
                                >
                                    <ModuleIcon className={`h-4 w-4 flex-shrink-0`} 
                                               style={{ color: isActive ? 'white' : 'var(--text-color)', opacity: isActive ? 1 : 0.6 }} />
                                    <span className="truncate">{module.name}</span>
                                    {isActive && (
                                        <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="flex h-screen" style={{ backgroundColor: 'var(--background-color)' }}>
            {/* Sidebar */}
            <ThemedCard className="w-72 shadow-xl border-r flex flex-col h-screen rounded-none">
                {/* Logo Section */}
                <div className="p-[18px] border-b flex-shrink-0" style={{ borderColor: 'var(--primary-color)' }}>
                    <div className="flex items-center space-x-3">
                        {branding?.logo_url ? (
                            <div className="relative">
                                <img 
                                    src={branding.logo_url} 
                                    alt={branding.company_name || 'Logo'}
                                    className="h-10 w-10 rounded-lg shadow-sm"
                                />
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2" 
                                     style={{ backgroundColor: 'var(--accent-color)', borderColor: 'var(--background-color)' }}></div>
                            </div>
                        ) : (
                            <div className="h-10 w-10 rounded-lg flex items-center justify-center" 
                                 style={{ background: `linear-gradient(135deg, var(--primary-color), var(--accent-color))` }}>
                                <span className="font-bold text-lg text-white">
                                    {(branding?.company_name || 'FC').charAt(0)}
                                </span>
                            </div>
                        )}
                        <div>
                            <h1 className="text-lg font-bold" style={{ color: 'var(--text-color)' }}>
                                {branding?.company_name || 'Finance CRM'}
                            </h1>
                            <p className="text-xs opacity-60" style={{ color: 'var(--text-color)' }}>Management System</p>
                        </div>
                    </div>
                </div>
                
                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-4">
                    <div className="px-4">
                        {Object.entries(moduleGroups).map(([groupKey, group]) => (
                            <ModuleGroup key={groupKey} groupKey={groupKey} group={group} />
                        ))}
                    </div>
                </nav>
                
                {/* Footer */}
                <div className="p-4 border-t" style={{ borderColor: 'var(--primary-color)' }}>
                    <div className="text-xs text-center opacity-60" style={{ color: 'var(--text-color)' }}>
                        © 2024 Finance CRM
                    </div>
                </div>
            </ThemedCard>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <ThemedCard className="shadow-sm border-b px-6 py-4 rounded-none">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <div>
                                <h2 className="text-xl font-semibold" style={{ color: 'var(--text-color)' }}>
                                    {allModules.find(m => m.path === url)?.name || 'Dashboard'}
                                </h2>
                                <p className="text-sm opacity-60" style={{ color: 'var(--text-color)' }}>
                                    Welcome back! Here's what's happening today.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <ThemedButton 
                                variant="ghost"
                                onClick={() => window.location.href = '/profile'}
                                className="flex items-center space-x-2"
                            >
                                <UserIcon className="h-4 w-4" />
                                <span>Profile</span>
                            </ThemedButton>
                            <ThemedButton 
                                variant="ghost"
                                onClick={() => window.location.href = '/logout'}
                                className="flex items-center space-x-2 hover:!bg-red-50 hover:!text-red-600"
                            >
                                <span>Logout</span>
                            </ThemedButton>
                        </div>
                    </div>
                </ThemedCard>

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto" style={{ backgroundColor: 'var(--background-color)' }}>
                    <div className="p-6">
                        <ThemedCard className="p-6">
                            {children}
                        </ThemedCard>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;
