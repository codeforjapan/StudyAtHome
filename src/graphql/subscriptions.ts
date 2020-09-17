/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateClass = /* GraphQL */ `
  subscription OnCreateClass {
    onCreateClass {
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
export const onUpdateClass = /* GraphQL */ `
  subscription OnUpdateClass {
    onUpdateClass {
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
export const onDeleteClass = /* GraphQL */ `
  subscription OnDeleteClass {
    onDeleteClass {
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
export const onCreateLesson = /* GraphQL */ `
  subscription OnCreateLesson {
    onCreateLesson {
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
export const onUpdateLesson = /* GraphQL */ `
  subscription OnUpdateLesson {
    onUpdateLesson {
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
export const onDeleteLesson = /* GraphQL */ `
  subscription OnDeleteLesson {
    onDeleteLesson {
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
