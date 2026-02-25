export type TemplateId = 'walk' | 'dance' | 'fly' | 'spin' | 'bounce' | 'zoom' | 'shake';

export interface AnimationTemplate {
  id: TemplateId;
  name: string;
  emoji: string;
  description: string;
  animClass: string;
  color: string;
  bgColor: string;
  duration: string;
}

export const ANIMATION_TEMPLATES: AnimationTemplate[] = [
  {
    id: 'walk',
    name: 'Walk',
    emoji: '🚶',
    description: 'Photo chalti hai left-right, jaise koi chal raha ho!',
    animClass: 'anim-walk',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    duration: '2s',
  },
  {
    id: 'dance',
    name: 'Dance',
    emoji: '💃',
    description: 'Photo thumke lagati hai, full dance mode on!',
    animClass: 'anim-dance',
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
    duration: '1.2s',
  },
  {
    id: 'fly',
    name: 'Fly',
    emoji: '🦋',
    description: 'Photo upar uda jaati hai, jaise parinda ho!',
    animClass: 'anim-fly',
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
    duration: '3s',
  },
  {
    id: 'spin',
    name: 'Spin',
    emoji: '🌀',
    description: 'Photo ghoomti rehti hai, chakkar pe chakkar!',
    animClass: 'anim-spin',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    duration: '1.5s',
  },
  {
    id: 'bounce',
    name: 'Bounce',
    emoji: '⚡',
    description: 'Photo upar-neeche uchhalti hai, full energy!',
    animClass: 'anim-bounce',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    duration: '1.4s',
  },
  {
    id: 'zoom',
    name: 'Zoom',
    emoji: '🔍',
    description: 'Photo badi-choti hoti rehti hai, zoom zoom!',
    animClass: 'anim-zoom',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    duration: '1.8s',
  },
  {
    id: 'shake',
    name: 'Shake',
    emoji: '🎸',
    description: 'Photo hilti-dulti hai, rock star style!',
    animClass: 'anim-shake',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    duration: '0.8s',
  },
];
