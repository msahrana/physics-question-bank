'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import {
    Menu,
    X,
    ChevronDown,
    BookOpen,
    LayoutDashboard,
    Settings,
    LogOut,
    User,
    GraduationCap,
    FileText,
    CheckCircle,
} from 'lucide-react';

interface NavbarProps {
    isLoggedIn?: boolean;
    user?: {
        name: string;
        image?: string | null;
    };
    onLogout?: () => void | Promise<void>;
}

const navLinks = [
    { title: 'Home', href: '/' },
    { title: 'About Us', href: '/about-us' },
    { title: 'Apply As Teacher', href: '/applyAsTeacher' },
];

const questionTypes = [
    {
        title: 'MCQ',
        subtitle: 'Multiple Choice Questions',
        slug: 'mcq',
        icon: CheckCircle,
    },
    {
        title: 'CQ',
        subtitle: 'Creative Questions',
        slug: 'cq',
        icon: FileText,
    },
    {
        title: 'Short Questions',
        subtitle: 'Short Answer Questions',
        slug: 'short-questions',
        icon: BookOpen,
    },
];

const courseLinks = [
    {
        title: 'Secondary Physics',
        subtitle: 'SSC Physics',
        href: '/courses/secondary-physics',
    },
    {
        title: 'Higher Secondary Physics 1st Paper',
        subtitle: 'HSC 1st Paper',
        href: '/courses/higher-secondary-physics-1st-paper',
    },
    {
        title: 'Higher Secondary Physics 2nd Paper',
        subtitle: 'HSC 2nd Paper',
        href: '/courses/higher-secondary-physics-2nd-paper',
    },
];

const profileLinks = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard,
    },
    {
        title: 'Settings',
        href: '/settings',
        icon: Settings,
    },
];

export default function Navbar({
    isLoggedIn = false,
    user,
    onLogout,
}: NavbarProps) {
    const pathname = usePathname();

    const [mobileOpen, setMobileOpen] = useState(false);
    const [courseOpen, setCourseOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [expandedCourse, setExpandedCourse] = useState<string | null>(null);

    // Separate refs for desktop and mobile elements
    const desktopCourseRef = useRef<HTMLDivElement>(null);
    const desktopProfileRef = useRef<HTMLDivElement>(null);
    const mobileProfileRef = useRef<HTMLDivElement>(null);

    // Track the previous route to close menus only after navigation
    const previousPathname = useRef(pathname);

    // Close dropdowns when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const target = event.target as Node;

            if (!desktopCourseRef.current?.contains(target)) {
                setCourseOpen(false);
                setExpandedCourse(null);
            }

            if (!desktopProfileRef.current?.contains(target)) {
                setProfileOpen(false);
            }

            if (!mobileProfileRef.current?.contains(target)) {
                setProfileOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Close menus when the route changes
    useEffect(() => {
        if (previousPathname.current !== pathname) {
            previousPathname.current = pathname;

            setMobileOpen(false);
            setCourseOpen(false);
            setProfileOpen(false);
            setExpandedCourse(null);
        }
    }, [pathname]);

    const closeMenus = () => {
        setMobileOpen(false);
        setCourseOpen(false);
        setProfileOpen(false);
        setExpandedCourse(null);
    };

    const isActive = (href: string) => {
        if (href === '/') return pathname === '/';

        return pathname === href || pathname.startsWith(`${href}/`);
    };

    const isCourseActive = courseLinks.some((course) => isActive(course.href));

    const handleLogout = async () => {
        try {
            await onLogout?.();
            closeMenus();
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const navClass = (href: string) =>
        `text-sm font-semibold transition-colors ${
            isActive(href)
                ? 'text-blue-600'
                : 'text-gray-600 hover:text-blue-600'
        }`;

    const toggleCourse = (href: string) => {
        setExpandedCourse((current) => (current === href ? null : href));
    };

    return (
        <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur-md">
            <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link
                    href="/"
                    onClick={closeMenus}
                    className="flex shrink-0 items-center gap-2"
                >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                        <GraduationCap size={27} />
                    </div>

                    <div>
                        <span className="block text-xl font-extrabold tracking-tight text-gray-900">
                            Physics
                            <span className="text-blue-600"> Academy</span>
                        </span>

                        <span className="block text-[10px] font-medium tracking-widest text-gray-400">
                            LEARN • PRACTICE • ACHIEVE
                        </span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-8 md:flex">
                    {/* Home & About */}
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={navClass(link.href)}
                        >
                            {link.title}
                        </Link>
                    ))}

                    {/* Courses Dropdown */}
                    <div ref={desktopCourseRef} className="relative">
                        <button
                            type="button"
                            onClick={() => {
                                setCourseOpen((current) => !current);
                                setProfileOpen(false);
                            }}
                            aria-expanded={courseOpen}
                            className={`flex items-center gap-1.5 text-sm font-semibold transition-colors ${
                                isCourseActive
                                    ? 'text-blue-600'
                                    : 'text-gray-600 hover:text-blue-600'
                            }`}
                        >
                            Courses
                            <ChevronDown
                                size={16}
                                className={`transition-transform duration-200 ${
                                    courseOpen ? 'rotate-180' : ''
                                }`}
                            />
                        </button>

                        {courseOpen && (
                            <div className="absolute left-0 top-11 w-92.5 overflow-hidden rounded-xl border border-gray-100 bg-white p-2 shadow-xl">
                                <div className="px-3 py-3">
                                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                                        Explore Courses
                                    </p>
                                </div>

                                {courseLinks.map((course) => (
                                    <div
                                        key={course.href}
                                        className="rounded-lg"
                                    >
                                        {/* Course Name */}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                toggleCourse(course.href)
                                            }
                                            aria-expanded={
                                                expandedCourse === course.href
                                            }
                                            className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-3 text-left transition ${
                                                isActive(course.href)
                                                    ? 'bg-blue-50 text-blue-700'
                                                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                                                    <BookOpen size={20} />
                                                </div>

                                                <div>
                                                    <p className="text-sm font-semibold">
                                                        {course.title}
                                                    </p>

                                                    <p className="mt-0.5 text-xs text-gray-400">
                                                        {course.subtitle}
                                                    </p>
                                                </div>
                                            </div>

                                            <ChevronDown
                                                size={16}
                                                className={`shrink-0 transition-transform duration-200 ${
                                                    expandedCourse ===
                                                    course.href
                                                        ? 'rotate-180'
                                                        : ''
                                                }`}
                                            />
                                        </button>

                                        {/* Question Categories */}
                                        {expandedCourse === course.href && (
                                            <div className="ml-8 mb-2 flex flex-col gap-1 border-l-2 border-blue-100 pl-4">
                                                {questionTypes.map((type) => {
                                                    const Icon = type.icon;
                                                    const href = `${course.href}/${type.slug}`;

                                                    return (
                                                        <Link
                                                            key={type.slug}
                                                            href={href}
                                                            onClick={closeMenus}
                                                            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition ${
                                                                isActive(href)
                                                                    ? 'bg-blue-50 text-blue-700'
                                                                    : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                                                            }`}
                                                        >
                                                            <Icon size={17} />

                                                            <div>
                                                                <p className="text-sm font-semibold">
                                                                    {type.title}
                                                                </p>

                                                                <p className="text-[11px] text-gray-400">
                                                                    {
                                                                        type.subtitle
                                                                    }
                                                                </p>
                                                            </div>
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Contact */}
                    <Link href="/contact-us" className={navClass('/contact-us')}>
                        Contact Us
                    </Link>

                    {/* Authentication */}
                    {!isLoggedIn ? (
                        <Link
                            href="/login"
                            className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                        >
                            Login
                        </Link>
                    ) : (
                        /* Desktop Profile Dropdown */
                        <div ref={desktopProfileRef} className="relative">
                            <button
                                type="button"
                                onClick={() => {
                                    setProfileOpen((current) => !current);
                                    setCourseOpen(false);
                                    setExpandedCourse(null);
                                }}
                                aria-expanded={profileOpen}
                                aria-label="Open profile menu"
                                className="flex items-center gap-2 rounded-full border border-gray-200 p-1 transition hover:bg-gray-50"
                            >
                                {user?.image ? (
                                    <Image
                                        src={user.image}
                                        alt={user.name}
                                        width={40}
                                        height={40}
                                        className="h-10 w-10 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                                        <User size={21} />
                                    </div>
                                )}

                                <ChevronDown
                                    size={16}
                                    className={`mr-2 text-gray-500 transition-transform ${
                                        profileOpen ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>

                            {profileOpen && (
                                <div className="absolute right-0 top-14 w-64 overflow-hidden rounded-xl border border-gray-100 bg-white p-2 shadow-xl">
                                    <div className="border-b border-gray-100 px-3 py-4">
                                        <p className="truncate font-bold text-gray-900">
                                            {user?.name || 'Student'}
                                        </p>

                                        <p className="mt-1 text-xs text-gray-400">
                                            Physics Academy Student
                                        </p>
                                    </div>

                                    {profileLinks.map((item) => {
                                        const Icon = item.icon;

                                        return (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                onClick={closeMenus}
                                                className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
                                                    isActive(item.href)
                                                        ? 'bg-blue-50 text-blue-700'
                                                        : 'text-gray-700 hover:bg-gray-50'
                                                }`}
                                            >
                                                <Icon size={19} />
                                                {item.title}
                                            </Link>
                                        );
                                    })}

                                    <div className="my-1 border-t border-gray-100" />

                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
                                    >
                                        <LogOut size={19} />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    type="button"
                    onClick={() => setMobileOpen((current) => !current)}
                    aria-label="Toggle navigation"
                    aria-expanded={mobileOpen}
                    className="rounded-lg p-2 text-gray-700 transition hover:bg-gray-100 md:hidden"
                >
                    {mobileOpen ? <X size={26} /> : <Menu size={26} />}
                </button>
            </nav>

            {/* Mobile Navigation */}
            {mobileOpen && (
                <div className="border-t border-gray-100 bg-white px-5 py-5 shadow-lg md:hidden">
                    <div className="flex flex-col gap-1">
                        {/* Home & About */}
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={closeMenus}
                                className={`rounded-lg px-3 py-3 text-sm font-semibold ${
                                    isActive(link.href)
                                        ? 'bg-blue-50 text-blue-600'
                                        : 'text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                {link.title}
                            </Link>
                        ))}

                        {/* Mobile Courses */}
                        <button
                            type="button"
                            onClick={() => {
                                setCourseOpen((current) => !current);
                                setExpandedCourse(null);
                            }}
                            aria-expanded={courseOpen}
                            className={`flex items-center justify-between rounded-lg px-3 py-3 text-sm font-semibold ${
                                isCourseActive
                                    ? 'text-blue-600'
                                    : 'text-gray-700'
                            }`}
                        >
                            <span>Courses</span>

                            <ChevronDown
                                size={18}
                                className={`transition-transform ${
                                    courseOpen ? 'rotate-180' : ''
                                }`}
                            />
                        </button>

                        {courseOpen && (
                            <div className="ml-3 flex flex-col gap-1 border-l-2 border-blue-100 pl-3">
                                {courseLinks.map((course) => (
                                    <div key={course.href}>
                                        {/* Mobile Course Name */}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                toggleCourse(course.href)
                                            }
                                            aria-expanded={
                                                expandedCourse === course.href
                                            }
                                            className={`flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm font-semibold ${
                                                isActive(course.href)
                                                    ? 'text-blue-600'
                                                    : 'text-gray-700 hover:bg-gray-50'
                                            }`}
                                        >
                                            <span>{course.title}</span>

                                            <ChevronDown
                                                size={16}
                                                className={`shrink-0 transition-transform ${
                                                    expandedCourse ===
                                                    course.href
                                                        ? 'rotate-180'
                                                        : ''
                                                }`}
                                            />
                                        </button>

                                        {/* Mobile Question Categories */}
                                        {expandedCourse === course.href && (
                                            <div className="mb-2 ml-3 flex flex-col gap-1 border-l-2 border-gray-100 pl-3">
                                                {questionTypes.map((type) => {
                                                    const Icon = type.icon;
                                                    const href = `${course.href}/${type.slug}`;

                                                    return (
                                                        <Link
                                                            key={type.slug}
                                                            href={href}
                                                            onClick={closeMenus}
                                                            className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm ${
                                                                isActive(href)
                                                                    ? 'bg-blue-50 font-semibold text-blue-600'
                                                                    : 'text-gray-600 hover:bg-gray-50'
                                                            }`}
                                                        >
                                                            <Icon size={17} />
                                                            {type.title}
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Contact */}
                        <Link
                            href="/contact"
                            onClick={closeMenus}
                            className={`rounded-lg px-3 py-3 text-sm font-semibold ${
                                isActive('/contact')
                                    ? 'bg-blue-50 text-blue-600'
                                    : 'text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            Contact
                        </Link>

                        {/* Mobile Authentication */}
                        {!isLoggedIn ? (
                            <Link
                                href="/login"
                                onClick={closeMenus}
                                className="mt-3 rounded-lg bg-blue-600 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-blue-700"
                            >
                                Login
                            </Link>
                        ) : (
                            <div
                                ref={mobileProfileRef}
                                className="mt-3 border-t border-gray-100 pt-4"
                            >
                                <button
                                    type="button"
                                    onClick={() =>
                                        setProfileOpen((current) => !current)
                                    }
                                    aria-expanded={profileOpen}
                                    className="flex w-full items-center justify-between rounded-lg p-2 hover:bg-gray-50"
                                >
                                    <div className="flex items-center gap-3">
                                        {user?.image ? (
                                            <Image
                                                src={user.image}
                                                alt={user.name}
                                                width={44}
                                                height={44}
                                                className="h-11 w-11 rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                                                <User size={22} />
                                            </div>
                                        )}

                                        <span className="text-sm font-semibold text-gray-900">
                                            {user?.name || 'Student'}
                                        </span>
                                    </div>

                                    <ChevronDown
                                        size={18}
                                        className={`transition-transform ${
                                            profileOpen ? 'rotate-180' : ''
                                        }`}
                                    />
                                </button>

                                {profileOpen && (
                                    <div className="mt-2 flex flex-col gap-1 pl-3">
                                        {profileLinks.map((item) => {
                                            const Icon = item.icon;

                                            return (
                                                <Link
                                                    key={item.href}
                                                    href={item.href}
                                                    onClick={closeMenus}
                                                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-gray-700 hover:bg-blue-50"
                                                >
                                                    <Icon size={18} />
                                                    {item.title}
                                                </Link>
                                            );
                                        })}

                                        <button
                                            type="button"
                                            onClick={handleLogout}
                                            className="flex items-center gap-3 rounded-lg px-3 py-3 text-left text-sm text-red-600 hover:bg-red-50"
                                        >
                                            <LogOut size={18} />
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
