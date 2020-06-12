import firebase from '@/plugins/firebase'
import FireStoreTimestamp = firebase.firestore.Timestamp

declare namespace classData {
  // 汎用的な型の定義
  export type UrlString = string
  export type ColorCodeString = string

  // ID型の定義
  export type ClassId = string
  export type LessonId = string // unused

  export interface ClassData {
    classId: ClassId
    className: string
    lessons: Lesson[]
  }

  export interface Lesson {
    startTime: Date
    endTime: Date
    title: string
    subject: Subject
    goal: string
    description: string
    videos: Video[]
    pages: string
    materials: Material[]
    isHidden: boolean
  }

  export interface Subject {
    name: string
    color: ColorCodeString
  }

  export interface Video {
    title: string
    url: UrlString
    thumbnailUrl: UrlString
  }

  export interface Material {
    title: string
    url: UrlString
  }

  namespace database {
    export interface Lesson {
      startTime: FireStoreTimestamp
      endTime: FireStoreTimestamp
      title: string
      subject: Subject
      goal: string
      description: string
      videos: Video[]
      pages: string
      materials: Material[]
      isHidden: boolean
    }
  }
}
