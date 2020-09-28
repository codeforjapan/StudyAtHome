declare namespace classData {
  // 汎用的な型の定義
  export type UrlString = string
  export type ColorCodeString = string

  // ID型の定義
  export type ClassId = string
  export type LessonId = string

  export interface ClassData {
    classId: ClassId
    className: string
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

  export interface LessonWithId extends Lesson {
    id: LessonId
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
}

export default classData
