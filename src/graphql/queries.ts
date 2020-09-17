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
`;
export const getLesson = /* GraphQL */ `
  query GetLesson($id: ID!) {
    getLesson(id: $id) {
      id
      startTime
      endTime
      title
      subject {
        color
        name
      }
      goal
      description
      videos {
        title
        thumbnailUrl
        url
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
        startTime
        endTime
        title
        subject {
          color
          name
        }
        goal
        description
        videos {
          title
          thumbnailUrl
          url
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
`;
