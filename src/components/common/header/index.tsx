'use client';

import { LogOut, Menu, Settings, User, UserCircle, X } from 'lucide-react';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';

import SignInModal from '@/components/modals/auth/sign-in';
import SignUpModal from '@/components/modals/auth/sign-up';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/auth.context';
import { useSignOutMutation } from '@/graphql/hooks';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/libs/utils';
import { StringUtil } from '@/shared/utils/string.util';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const { isLoggedIn, user, logout } = useAuth();

  const [signOut] = useSignOutMutation();

  const navLinks = [
    { name: 'Photocopy', href: '/service' },
    { name: 'Handmade', href: '/handmade' },
    { name: 'Đặt trước', href: '/booking' },
    { name: 'Giới thiệu', href: '/about-us' },
    { name: 'Liên hệ', href: '/contact' },
    { name: 'Đơn hàng', href: '/order-tracking' },
    { name: 'Giỏ hàng', href: '/cart' },
  ];

  const openSignIn = () => {
    setIsSignInOpen(true);
    setIsMobileMenuOpen(false);
  };

  const openSignUp = () => {
    setIsSignUpOpen(true);
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    const { errors } = await signOut();

    if (errors) {
      toast({
        title: 'Có lỗi xảy ra',
        description: errors.map((error) => error.message).join(', '),
        variant: 'destructive',
      });
    }
    logout();
  };

  return (
    <Fragment>
      <header
        className={cn(
          'fixed top-0 left-0 w-full z-50 transition-all-300 mb-auto',
          isScrolled ? 'bg-white/80 backdrop-blur-card py-3 shadow-sm' : 'bg-transparent py-5',
        )}
      >
        <div className="container mx-auto flex items-center justify-between px-4 md:px-6">
          <Link
            href="/"
            className="text-primary font-serif text-xl md:text-2xl font-semibold transition-all-300 hover:opacity-80"
          >
            Print & Photocopy99
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-primary/80 hover:text-primary transition-colors relative after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-primary after:transition-all hover:after:w-full flex items-center"
              >
                {link.name}
              </Link>
            ))}

            {/* Auth Buttons - Desktop */}
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="focus:outline-none flex items-center space-x-2">
                    <Avatar className="h-8 w-8 cursor-pointer transition-opacity hover:opacity-80">
                      <AvatarImage
                        src={user?.avatar?.url}
                        alt={[user?.first_name, user?.last_name].join(' ')}
                      />
                      <AvatarFallback className="bg-primary text-white">
                        {StringUtil.getFirstLetters(
                          [user?.first_name, user?.last_name].filter(Boolean).join(' '),
                        )
                          .slice(-2)
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">
                      {[user?.first_name, user?.last_name].filter(Boolean).join(' ')}
                    </span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Tài khoản của tôi</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer" asChild>
                    <Link href="/profile" className="flex w-full items-center">
                      <User className="h-4 w-4 mr-2" />
                      Thông tin cá nhân
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" asChild>
                    <Link href="/profile/settings" className="flex w-full items-center">
                      <Settings className="h-4 w-4 mr-2" />
                      Cài đặt
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="cursor-pointer text-red-500 focus:text-red-500"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Đăng xuất
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <button
                onClick={openSignIn}
                className="text-sm font-medium text-primary/80 hover:text-primary transition-colors relative after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-primary after:transition-all hover:after:w-full flex items-center"
              >
                <UserCircle className="h-4 w-4 mr-1" />
                Đăng nhập
              </button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-primary p-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            'fixed inset-0 bg-white z-40 py-6 px-6 md:hidden transition-all-300 transform',
            isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0',
          )}
        >
          <nav className="flex flex-col space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-primary text-lg font-medium py-2 border-b border-secondary/50 transition-colors flex items-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {/* Auth Buttons - Mobile */}
            <div className="flex flex-col space-y-4 pt-4">
              {isLoggedIn ? (
                <Fragment>
                  <Link
                    href="/profile"
                    className="text-primary text-lg font-medium py-2 border-b border-secondary/50 transition-colors flex items-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Thông tin cá nhân
                  </Link>
                  <Link
                    href="/profile/settings"
                    className="text-primary text-lg font-medium py-2 border-b border-secondary/50 transition-colors flex items-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Cài đặt
                  </Link>
                  <button
                    onClick={logout}
                    className="text-white bg-red-500 rounded-md py-3 font-medium transition-colors hover:bg-red-600 flex items-center justify-center"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Đăng xuất
                  </button>
                </Fragment>
              ) : (
                <Fragment>
                  <button
                    onClick={openSignIn}
                    className="text-primary text-lg font-medium py-2 border-b border-secondary/50 transition-colors flex items-center"
                  >
                    <UserCircle className="h-4 w-4 mr-2" />
                    Đăng nhập
                  </button>
                  <button
                    onClick={openSignUp}
                    className="text-white bg-primary rounded-md py-3 font-medium transition-colors hover:bg-primary/90 flex items-center justify-center"
                  >
                    Đăng ký
                  </button>
                </Fragment>
              )}
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-primary bg-secondary rounded-md py-3 font-medium transition-colors hover:bg-secondary/90 flex items-center justify-center"
            >
              Quay lại
            </button>
          </nav>
        </div>
      </header>

      {/* Auth Modals */}
      <SignInModal
        open={isSignInOpen}
        onOpenChange={setIsSignInOpen}
        onSignUpClick={() => {
          setIsSignInOpen(false);
          setIsSignUpOpen(true);
        }}
      />

      <SignUpModal
        open={isSignUpOpen}
        onOpenChange={setIsSignUpOpen}
        onSignInClick={() => {
          setIsSignUpOpen(false);
          setIsSignInOpen(true);
        }}
      />
    </Fragment>
  );
};
Header.displayName = 'Header';

export { Header };
