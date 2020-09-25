/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const listClasss = /* GraphQL */ `
  query ListClasss(
    $filter: ModelClassFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listClasss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        className
        schoolName
        owner
        createdAt
        updatedAt
        lessons {
          items {
            id
            classId
            startTime
            endTime
            title
            goal
            description
            pages
            isHidden
            owner
            createdAt
            updatedAt
          }
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getClass = /* GraphQL */ `
  query GetClass($id: ID!) {
    getClass(id: $id) {
      id
      className
      schoolName
      owner
      createdAt
      updatedAt
      lessons {
        items {
          id
          classId
          startTime
          endTime
          title
          subject {
            name
            color
          }
          goal
          description
          videos {
            title
            url
            thumbnailUrl
          }
          pages
          materials {
            title
            url
          }
          isHidden
          owner
          createdAt
          updatedAt
          class {
            id
            className
            schoolName
            owner
            createdAt
            updatedAt
          }
        }
        nextToken
      }
    }
  }
`;
export const getLesson = /* GraphQL */ `
  query GetLesson($id: ID!) {
    getLesson(id: $id) {
      id
      classId
      startTime
      endTime
      title
      subject {
        name
        color
      }
      goal
      description
      videos {
        title
        url
        thumbnailUrl
      }
      pages
      materials {
        title
        url
      }
      isHidden
      owner
      createdAt
      updatedAt
      class {
        id
        className
        schoolName
        owner
        createdAt
        updatedAt
        lessons {
          items {
            id
            classId
            startTime
            endTime
            title
            goal
            description
            pages
            isHidden
            owner
            createdAt
            updatedAt
          }
          nextToken
        }
      }
    }
  }
`;
export const listLessons = /* GraphQL */ `
  query ListLessons(
    $filter: ModelLessonFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLessons(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        classId
        startTime
        endTime
        title
        subject {
          name
          color
        }
        goal
        description
        videos {
          title
          url
          thumbnailUrl
        }
        pages
        materials {
          title
          url
        }
        isHidden
        owner
        createdAt
        updatedAt
        class {
          id
          className
          schoolName
          owner
          createdAt
          updatedAt
          lessons {
            nextToken
          }
        }
      }
      nextToken
    }
  }
`;
export const listLessonsByClass = /* GraphQL */ `
  query ListLessonsByClass(
    $classId: ID
    $startTime: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelLessonFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLessonsByClass(
      classId: $classId
      startTime: $startTime
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        classId
        startTime
        endTime
        title
        subject {
          name
          color
        }
        goal
        description
        videos {
          title
          url
          thumbnailUrl
        }
        pages
        materials {
          title
          url
        }
        isHidden
        owner
        createdAt
        updatedAt
        class {
          id
          className
          schoolName
          owner
          createdAt
          updatedAt
          lessons {
            nextToken
          }
        }
      }
      nextToken
    }
  }
`;
