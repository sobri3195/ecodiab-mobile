import type { LucideIcon } from 'lucide-react';
import {
  BookOpen,
  Camera,
  ChartNoAxesCombined,
  FileText,
  Flame,
  Handshake,
  House,
  MessageCircleHeart,
  UserRound,
} from 'lucide-react';

export type WorkspaceModule = {
  id: string;
  name: string;
  route: string;
  description: string;
  icon: LucideIcon;
};

export const workspaceModules: WorkspaceModule[] = [
  {
    id: 'beranda',
    name: 'Beranda',
    route: '/',
    description: 'Ringkasan harian, sinyal risiko, dan rekomendasi prioritas.',
    icon: House,
  },
  {
    id: 'edukasi',
    name: 'Edukasi',
    route: '/edukasi',
    description: 'Modul belajar bertahap untuk kendali diabetes berkelanjutan.',
    icon: BookOpen,
  },
  {
    id: 'retinopati',
    name: 'Retinopati',
    route: '/retinopati',
    description:
      'Retinopathy screening AI via kamera depan hape untuk deteksi risiko retina dini dan prioritisasi rujukan di setting sumber daya terbatas.',
    icon: Camera,
  },
  {
    id: 'tracker',
    name: 'Tracker',
    route: '/tracker',
    description: 'Pencatatan gula darah, makan, aktivitas, dan tidur dalam satu alur.',
    icon: ChartNoAxesCombined,
  },
  {
    id: 'komunitas',
    name: 'Komunitas',
    route: '/komunitas',
    description: 'Diskusi suportif, tantangan rutin, dan ruang berbagi pengalaman.',
    icon: MessageCircleHeart,
  },
  {
    id: 'konsultasi',
    name: 'Konsultasi',
    route: '/konsultasi',
    description: 'Akses bantuan profesional dengan konteks data kesehatan terbaru.',
    icon: Handshake,
  },
  {
    id: 'artikel',
    name: 'Artikel',
    route: '/artikel',
    description: 'Kumpulan artikel praktis dari topik nutrisi hingga manajemen stres.',
    icon: FileText,
  },
  {
    id: 'tantangan',
    name: 'Tantangan',
    route: '/tantangan',
    description: 'Program kebiasaan sehat berformat misi harian dan mingguan.',
    icon: Flame,
  },
  {
    id: 'profil',
    name: 'Profil',
    route: '/profil',
    description: 'Kelola identitas kesehatan, target, serta preferensi pengingat.',
    icon: UserRound,
  },
];
