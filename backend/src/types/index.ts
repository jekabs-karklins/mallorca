export interface User {
  id: number;
  name: string;
  email: string;
  oauthSub: string;
  membershipEndDate: Date | null;
  createdAt: Date;
}

export interface Section {
  id: number;
  title: string;
}

export interface Chapter {
  id: number;
  chapterId: number;
  sectionId: number;
  title: string;
  isVip: boolean;
  isFreeForNonRegistered: boolean;
}

export interface Media {
  id: number;
  chapterId: number;
  numericalTitle: string;
  title: string;
  audioFile?: string;
  textFile?: string;
}

export interface Payment {
  id: number;
  userId: number;
  createdAt: Date;
  amount: number;
  stripePaymentId: string;
  paymentMethod: string | null;
  receiptEmail: string | null;
  metadata: Record<string, any> | null; // JSONB can be represented as a generic object in TypeScript
}

export interface JWTToken {}

export type SectionWithChapters = Section & { chapters: Chapter[] };
export type ChapterWithMedia = Chapter & { media: Media[] | null };
