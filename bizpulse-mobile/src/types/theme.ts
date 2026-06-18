export const colors = {
  primary: '#3B9FE8',
  aiPurple: '#6C63FF',
  deepNavy: '#0A2540',
  midNavy: '#1A3A5C',
  lightBlueBg: '#E8F4FD',
  cardBorder: '#DCE8F5',
  success: '#00C896',
  warning: '#FFB020',
  danger: '#FF4757',
  textPrimary: '#0A2540',
  textSecondary: 'rgba(10,37,64,0.5)',
  textTertiary: 'rgba(10,37,64,0.3)',
  white: '#FFFFFF',
  offWhite: '#F8FBFF',
  cardBg: 'rgba(255,255,255,0.9)',
};

export const gradients = {
  ai: ['#6C63FF', '#3B9FE8'],
  hero: ['#0A2540', '#1E6FCC'],
  bg: ['#E8F4FD', '#C2E0F8'],
  success: ['#00C896', '#3B9FE8'],
  gold: ['#FFD700', '#FFA500'],
  silver: ['#C0C0C0', '#A0A0A0'],
  bronze: ['#CD7F32', '#8B4513'],
  darkNav: ['#0A2540', '#0D3470'],
};

export const spacing = { xs: 4, sm: 8, md: 12, base: 16, lg: 20, xl: 24, '2xl': 32, '3xl': 40 };

export const borderRadius = { sm: 8, md: 12, lg: 16, xl: 20, '2xl': 24, full: 9999 };

export const typography = {
  micro: { fontSize: 10, letterSpacing: 0.5 },
  caption: { fontSize: 11, letterSpacing: 0.5, textTransform: 'uppercase' as const },
  meta: { fontSize: 12 },
  link: { fontSize: 13 },
  body: { fontSize: 14 },
  bodyLarge: { fontSize: 15 },
  input: { fontSize: 16 },
  title: { fontSize: 18, fontWeight: '700' as const },
  valueMedium: { fontSize: 20, fontWeight: '700' as const },
  valueLarge: { fontSize: 24, fontWeight: '700' as const },
  heroValue: { fontSize: 28, fontWeight: '700' as const },
  heroLarge: { fontSize: 36, fontWeight: '700' as const },
};
