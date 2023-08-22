import localFont from 'next/font/local'

const visbyCF = localFont({
  src: [
    {
      path: '../../public/fonts/VisbyCF-Heavy.otf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../../public/fonts/VisbyCF-HeavyOblique.otf',
      weight: '900',
      style: 'oblique',
    },
    {
      path: '../../public/fonts/VisbyCF-ExtraBold.otf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../../public/fonts/VisbyCF-ExtraBoldOblique.otf',
      weight: '800',
      style: 'oblique',
    },
    {
      path: '../../public/fonts/VisbyCF-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/VisbyCF-BoldOblique.otf',
      weight: '700',
      style: 'oblique',
    },
    {
      path: '../../public/fonts/VisbyCF-SemiBold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/VisbyCF-SemiBoldOblique.otf',
      weight: '600',
      style: 'oblique',
    },
    {
      path: '../../public/fonts/VisbyCF-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/VisbyCF-MediumOblique.otf',
      weight: '500',
      style: 'oblique',
    },
    {
      path: '../../public/fonts/VisbyCF-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/VisbyCF-RegularOblique.otf',
      weight: '400',
      style: 'oblique',
    },
    {
      path: '../../public/fonts/VisbyCF-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/VisbyCF-LightOblique.otf',
      weight: '300',
      style: 'oblique',
    },
    {
      path: '../../public/fonts/VisbyCF-Thin.otf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../../public/fonts/VisbyCF-ThinOblique.otf',
      weight: '100',
      style: 'oblique',
    },
  ],
  variable: '--font-visbycf'
})

export default visbyCF;